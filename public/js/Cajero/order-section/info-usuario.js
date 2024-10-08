// <!---------Contenido de Información de Usuario--------->
document.addEventListener("DOMContentLoaded", function() {
    // Obtener los datos del usuario almacenados localmente
    var userData = JSON.parse(localStorage.getItem('userData'));

    // Actualizar el contenido de los elementos HTML con los datos del usuario
    document.getElementById('iniciales-usuario').textContent = getInicialesUsuario(userData.nombre);
    document.getElementById('cargo-usuario').textContent = userData.tipo;
    document.getElementById('nombre-usuario').textContent = userData.nombre;
});
function getInicialesUsuario(nombre) {
    // Dividir el nombre en palabras
    var palabras = nombre.split(' ');
    // Obtener la primera letra de cada palabra
    var iniciales = palabras.map(palabra => palabra.charAt(0)).join('');
    return iniciales.toUpperCase(); // Convertir las iniciales a mayúsculas
}