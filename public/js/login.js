document.addEventListener("DOMContentLoaded", function() {
    // Agrega un event listener para el envío del formulario de inicio de sesión
    document.getElementById("login-form").addEventListener("submit", function(event) {
        // Evita que el formulario se envíe automáticamente
        event.preventDefault();
        // Obtiene el valor del PIN ingresado por el usuario
        var pin = document.getElementById("pin").value;
        
        // Realiza una solicitud al servidor para validar el PIN
        fetch('/api/login', {
            method: 'POST', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json' // Establece el tipo de contenido del cuerpo de la solicitud como JSON
            },
            body: JSON.stringify({ pin: pin }) // Convierte el objeto a JSON y lo establece como cuerpo de la solicitud
        })        
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta del servidor
            if (data.success) {
                // Guardar los datos del usuario localmente
                localStorage.setItem('userData', JSON.stringify(data.userData));
                // Si la autenticación es exitosa, redirige al usuario a la URL proporcionadas
                window.location.href = data.redirectURL;
            } else {
                // Si la autenticación falla, muestra el mensaje de error devuelto por el servidor
                document.getElementById("error-message").textContent = data.message;
                document.getElementById("pin").value = "";
            }
        })
        .catch((error) => {
            // Muestra un mensaje de error genérico en el elemento con el ID "error-message"
            console.error('Error de conexión:', error);
            document.getElementById("error-message").textContent = 'Error de conexión';
        });
    });
});

