document.addEventListener("DOMContentLoaded", function () {
    const sidebarButton = document.getElementById("toggle-sidebar-button");
    const menuBar = document.querySelector(".menu-bar");
    const contenidoCentral = document.querySelector(".contenido-central");

    sidebarButton.addEventListener("click", function () {
        menuBar.classList.toggle("minimized");
        sidebarButton.classList.toggle("minimized"); // Agrega o quita la clase 'minimized' al botón
        ajustarAnchoContenido(); // Llama a la función para ajustar el ancho del contenido
    });

    const menuLinks = document.querySelectorAll(".menu-links .nav-link");

    menuLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que el enlace cambie de página automáticamente
            const contentId = link.querySelector("a").getAttribute("href").substring(1); // Obtiene el ID del contenido a mostrar
            mostrarContenido(contentId); // Llama a la función mostrarContenido con el ID correspondiente
            ajustarAnchoContenido(); // Llama a la función para ajustar el ancho del contenido
    
            // Agregar o quitar la clase 'active' al enlace correspondiente
            menuLinks.forEach(function (menuLink) {
                if (menuLink === link) {
                    menuLink.classList.add("active");
                    menuLink.querySelector(".link-content").classList.add("active"); // Resalta el link-content de la sección activa
                } else {
                    menuLink.classList.remove("active");
                    menuLink.querySelector(".link-content").classList.remove("active"); // Elimina el resaltado de link-content de las secciones inactivas
                }
            });
        });
    });
    

    // Función para ajustar el ancho del contenido central
    function ajustarAnchoContenido() {
        if (menuBar.classList.contains("minimized")) {
            contenidoCentral.style.marginLeft = "100px"; // Ajusta el margen izquierdo cuando se minimiza el menú-bar
        } else {
            contenidoCentral.style.marginLeft = "280px"; // Restablece el margen izquierdo cuando se expande el menú-bar
        }
    }
});

// Función para mostrar el contenido correspondiente
function mostrarContenido(contenidoId) {
    const contenidoSecciones = document.querySelectorAll(".contenido-seccion");
    contenidoSecciones.forEach(function (seccion) {
        if (seccion.id === contenidoId) {
            seccion.classList.remove("oculto"); // Muestra la sección correspondiente
        } else {
            seccion.classList.add("oculto"); // Oculta las demás secciones
        }
    });
}
