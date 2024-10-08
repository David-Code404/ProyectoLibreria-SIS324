// Para la lógica de las secciones en el menu-bar
function mostrarContenido(seccion) {
    // Ocultar todas las secciones
    var secciones = document.getElementsByClassName('contenido-seccion');
    for (var i = 0; i < secciones.length; i++) {
        secciones[i].classList.add('oculto');
    }

    // Mostrar la sección seleccionada
    document.getElementByIdseccion).classList.remove('oculto');
}



// Para el order-section -> Nombre
document.addEventListener("DOMContentLoaded", function() {
    // Obtener los datos del usuario almacenados localmente
    var userData = JSON.parse(localStorage.getItem('userData'));

    // Actualizar el contenido de los elementos HTML con los datos del usuario
    document.getElementById('iniciales-usuario').textContent = getInicialesUsuario(userData.nombre);
    document.getElementById('cargo-usuario').textContent = userData.tipo;
    document.getElementById('nombre-usuario').textContent = userData.nombre;
});
// Función para obtener las iniciales del usuario
function getInicialesUsuario(nombre) {
    // Dividir el nombre en palabras
    var palabras = nombre.split(' ');
    // Obtener la primera letra de cada palabra
    var iniciales = palabras.map(palabra => palabra.charAt(0)).join('');
    return iniciales.toUpperCase(); // Convertir las iniciales a mayúsculas
}

