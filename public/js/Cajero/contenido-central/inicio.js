document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');

    // Función para filtrar productos por tipo
    function filtrarProductos(tipo) {
        fetch('/api/productos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de productos');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar los productos anteriores
                productosContainer.innerHTML = '';

                // Filtrar los productos por tipo
                const productosFiltrados = tipo === 'Todos' ? data.productos : data.productos.filter(producto => producto.tipo === tipo);

                // Mostrar los productos filtrados
                productosFiltrados.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto');
                    productoDiv.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h4>${producto.nombre}</h4>
                        <p>Precio: $${producto.precio}</p>
                    `;
                    productosContainer.appendChild(productoDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Obtener los elementos del menú horizontal
    const menuItems = document.querySelectorAll('.horizontal-menu ul li a');

    // Agregar evento de clic a cada elemento del menú
    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const tipo = item.textContent.trim();
            filtrarProductos(tipo);
        });
    });

    // Por defecto, mostrar todos los productos al cargar la página
    filtrarProductos('Todos');
});
