document.addEventListener('DOMContentLoaded', () => {
    const pinInput = document.getElementById('pin');

    // Función para manejar la acción del botón "DEL"
    function deleteDigit() {
        const currentValue = pinInput.value;
        // Verificar si hay al menos un dígito en el PIN
        if (currentValue.length > 0) {
            // Eliminar el último dígito del PIN
            const newValue = currentValue.slice(0, -1);
            // Actualizar el valor del PIN en el campo de entrada
            pinInput.value = newValue;
        }
    }

    // Obtener todos los botones numéricos y el botón "DEL"
    const numericButtons = document.querySelectorAll('.numeric-button');
    const deleteButton = document.querySelector('.delete-button');

    // Agregar un evento de clic a cada botón numérico
    numericButtons.forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.value; // Obtener el valor del botón numérico
            const currentValue = pinInput.value;
            const newValue = currentValue + digit; // Agregar el dígito al PIN actual
            // Verificar si el PIN tiene menos de 4 dígitos
            if (newValue.length <= 4) {
                // Actualizar el valor del PIN en el campo de entrada
                pinInput.value = newValue;
                // Cambiar temporalmente el color del borde del input
                pinInput.classList.add('border-color-change');
                setTimeout(() => {
                    pinInput.classList.remove('border-color-change');
                }, 200); // Cambiar el tiempo según necesites
            }
        });
    });

    // Agregar un evento de clic al botón "DEL"
    deleteButton.addEventListener('click', () => {
        deleteDigit();
        // Cambiar temporalmente el color del borde del input cuando se presiona el botón "DEL"
        pinInput.classList.add('del-border-color-change');
        setTimeout(() => {
            pinInput.classList.remove('del-border-color-change');
        }, 200); // Cambiar el tiempo según necesites
    });
});








document.addEventListener("DOMContentLoaded", function() {
    // Agrega un event listener para el envío del formulario de inicio de sesión
    document.getElementById("login-form").addEventListener("submit", function(event) {
        // Evita que el formulario se envíe automáticamente
        event.preventDefault();
        // Obtiene el valor del PIN ingresado por el usuario
        var pin = document.getElementById("pin").value;

        // Verifica si el PIN está en uso localmente
        if (isPinUsed(pin)) {
            // Muestra el mensaje de "Usuario ya logeado"
            document.getElementById("error-message").textContent = 'Usuario ya logeado';
            return; // Detiene la ejecución
        }
        
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
// Función para verificar si un PIN está en uso localmente
function isPinUsed(pin) {
    // Obtener los PINs utilizados del almacenamiento local
    var usedPins = JSON.parse(localStorage.getItem('usedPins')) || [];
    // Verificar si el PIN está en la lista de PINs utilizados
    return usedPins.includes(pin);
}
