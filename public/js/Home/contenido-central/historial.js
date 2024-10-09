
// <!---------------Contenido de Historial---------------->
document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar el historial de pedidos en la tabla
    function cargarHistorial() {
        fetch('/api/historial-pedidos')
            .then(response => response.json())
            .then(data => {
                const tablaBody = document.querySelector('#tablaHistorial tbody');
                tablaBody.innerHTML = '';
                data.forEach(orden => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${orden.id_orden}</td>
                        <td>${orden.fecha_orden}</td>
                        <td>${orden.nombre_usuario}</td>
                        <td>${orden.id_producto}</td>
                        <td>${orden.precio_total}</td>
                    `;
                    tablaBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error al cargar el historial de pedidos:', error);
            });
    }

    // Llamar a la función para cargar el historial al cargar la página
    cargarHistorial();
});




