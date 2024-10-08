// <!--------Contenido de Órdenes - Total a pagar--------->
document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const listaPedidos = document.getElementById('lista-pedidos');

    const itemCountElement = document.getElementById('item-count');
    const subtotalElement = document.getElementById('subtotal');

    const descuentoInput = document.getElementById('descuento');
    
    const totalAmountElement = document.getElementById('total-amount');

    const botonBorrarTodo = document.querySelector('.boton-borrar');
    const botonHacerPedido = document.querySelector('.boton-pedido');

    let productosEnPedidos = {};
    let descuentoSeleccionado = 0; // Variable para almacenar el descuento seleccionado






// <!-- -----------------------------------Orden------------------------------------------ -->

    // Función para agregar un producto a la lista de pedidos
    function agregarProductoAPedidos(nombre, precio) {
        // Verificar si el producto ya está en la lista
        if (productosEnPedidos[nombre]) {
            // Incrementar la cantidad del producto
            productosEnPedidos[nombre]++;
            // Actualizar la cantidad en el elemento existente
            const pedidoExistente = document.querySelector(`.pedido-item[data-nombre="${nombre}"]`);
            const cantidadElement = pedidoExistente.querySelector('.cantidad');
            cantidadElement.textContent = `x${productosEnPedidos[nombre]}`;
        } else {
            // Crear un nuevo pedido
            const nuevoPedido = document.createElement('li');
            nuevoPedido.classList.add('pedido-item');
            nuevoPedido.dataset.nombre = nombre; // Almacenar el nombre del producto en el atributo de datos

            nuevoPedido.innerHTML = `
                <button class="decrementar-cantidad">-</button>
                <span class="cantidad">x1</span>
                <button class="incrementar-cantidad">+</button>
                <span class="nombre-producto">${nombre}</span>
                <span class="precio">$${precio.toFixed(2)}</span>
                <button class="eliminar-pedido">x</button>
            `;


            // Agregar evento de clic para el botón de decremento
            const botonDecrementar = nuevoPedido.querySelector('.decrementar-cantidad');
            botonDecrementar.addEventListener('click', () => {
                if (productosEnPedidos[nombre] > 1) {
                    productosEnPedidos[nombre]--;
                    const cantidadElement = nuevoPedido.querySelector('.cantidad');
                    cantidadElement.textContent = `x${productosEnPedidos[nombre]}`;
                    // Actualizar el total a pagar después de decrementar la cantidad
                    actualizarTotalAPagar();
                }
            });

            // Agregar evento de clic para el botón de incremento
            const botonIncrementar = nuevoPedido.querySelector('.incrementar-cantidad');
            botonIncrementar.addEventListener('click', () => {
                productosEnPedidos[nombre]++;
                const cantidadElement = nuevoPedido.querySelector('.cantidad');
                cantidadElement.textContent = `x${productosEnPedidos[nombre]}`;
                // Actualizar el total a pagar después de incrementar la cantidad
                actualizarTotalAPagar();
            });

            // Agregar evento de clic para el botón de eliminación
            const botonEliminar = nuevoPedido.querySelector('.eliminar-pedido');
            botonEliminar.addEventListener('click', () => {
                // Agregar clase para iniciar la animación de eliminación
                nuevoPedido.classList.add('eliminando');
                
                // Esperar el tiempo de la animación (0.5s) antes de eliminar el pedido
                setTimeout(() => {
                    nuevoPedido.remove();
                    delete productosEnPedidos[nombre];
                    // Actualizar el total a pagar después de eliminar un pedido
                    actualizarTotalAPagar();
                }, 300);
            });


            listaPedidos.appendChild(nuevoPedido);
    
            // Agregar el producto al registro con una cantidad inicial de 1
            productosEnPedidos[nombre] = 1;
        }
    
        // Actualizar el total a pagar después de agregar un nuevo pedido
        actualizarTotalAPagar();
    }


    // Evento para agregar un producto al hacer clic en la lista de productos (imagen o texto)
    productosContainer.addEventListener('click', (event) => {
        // Encuentra el elemento .producto más cercano al que se hizo clic
        const productoElement = event.target.closest('.producto');

        // Verifica si se encontró un elemento .producto
        if (productoElement) {
            // Extrae el nombre del producto del elemento h4 dentro del elemento .producto
            const nombreProducto = productoElement.querySelector('h4').textContent;
            // Extrae el precio del producto del elemento p dentro del elemento .producto, y lo convierte a un número flotante
            const precioProducto = parseFloat(productoElement.querySelector('p').textContent.split('$')[1]);

            // Agrega el producto a la lista de pedidos
            agregarProductoAPedidos(nombreProducto, precioProducto);
        }
    });







// <!-- --------------------------------Iotal a pagar-------------------------------------- -->

     // Evento para seleccionar el descuento
    const dropdownContent = document.getElementById('myDropdown');
    dropdownContent.addEventListener('click', (event) => {
        const selectedDiscount = event.target.textContent; // Obtiene el descuento seleccionado
        document.getElementById('dropbtn').textContent = selectedDiscount; // Actualiza el botón desplegable con el descuento seleccionado
        descuentoSeleccionado = parseFloat(selectedDiscount.replace('%', '')); // Almacena el descuento seleccionado como un número
    });

    // Evento para aplicar el descuento
    const aplicarDescuentoBtn = document.querySelector('.aplicar-descuento');
    aplicarDescuentoBtn.addEventListener('click', () => {
        actualizarTotalAPagar(); // Llama a la función para actualizar el total aplicando el descuento seleccionado
    });

    // Función para actualizar el total a pagar
    function actualizarTotalAPagar() {
        let itemCount = 0;
        let subtotal = 0;
        // Calcular el subtotal sumando el precio de cada producto por su cantidad
        for (const nombreProducto in productosEnPedidos) {
            const cantidad = productosEnPedidos[nombreProducto];
            const precioUnitario = parseFloat(document.querySelector(`.pedido-item[data-nombre="${nombreProducto}"] .precio`).textContent.slice(1));
            itemCount += cantidad;
            subtotal += cantidad * precioUnitario;
        }
        const totalConDescuento = subtotal * (1 - descuentoSeleccionado / 100); // Aplica el descuento al total
        // Actualizar elementos HTML
        itemCountElement.textContent = itemCount;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalAmountElement.textContent = `$${totalConDescuento.toFixed(2)}`;
    }







// <!-- -----------------------Botones: Borrar - Hacer Pedido------------------------------- -->
    // Evento para borrar todos los pedidos
    botonBorrarTodo.addEventListener('click', () => {
        // Eliminar todos los pedidos de la lista
        const pedidos = document.querySelectorAll('.pedido-item');
        pedidos.forEach(pedido => pedido.remove());
        // Restablecer el registro de productos en pedidos
        productosEnPedidos = {};
        // Actualizar el total a pagar después de borrar todos los pedidos
        actualizarTotalAPagar();
    });

    // Añadir la lógica para realizar el pedido
    botonHacerPedido.addEventListener('click', () => {
        // Lógica para realizar el pedido
        // Aquí puedes agregar la lógica para enviar la orden al servidor, por ejemplo.
        // También puedes mostrar un mensaje de confirmación al usuario o realizar otras acciones según tus necesidades.
        console.log('Pedido realizado con éxito');
    });

});
