const express = require('express');
const path = require('path');
const device = require('express-device');
const apiRouter = require('../routes/api');

const app = express();
const PORT = process.env.PORT || 3000; // Definir el puerto del servidor


// Middleware para detectar el dispositivo del usuario
app.use(device.capture());


// <!---------------------Middleware para registrar accesos a la página-------------------------->
const uniqueIPs = new Set();
app.use((req, res, next) => {
    const clientIP = req.ip;
    if (!uniqueIPs.has(clientIP)) {
        // Verde = \x1b[32m%s\x1b[0m
        console.log('\x1b[32m%s\x1b[0m', `   - Acceso a la página web desde la dirección IP: ${clientIP}`);
        uniqueIPs.add(clientIP);
    }
    next();
});

// <!--------Menejar solicitudes JSON------------->
app.use(express.json());



// <!-----------------middleware para servir archivos estáticos de 'public'---------------------->
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/api', apiRouter);



// Ruta para dispositivos móviles
app.get('/', (req, res) => {
    if (req.device.type === 'phone' || req.device.type === 'tablet') {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'mobile.html'));
    } else {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'index.html'));
    }
});




// <!---------middleware para manejar errores 404 y errores internos del servidor---------------->
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});



// <!-------------------Iniciar servidor y escuchar puertos especificados------------------------>
app.listen(PORT, () => {
    // códigos ANSI para colores y estilos en la terminal:
    // Cian = \x1b[36m%s\x1b[0m
    // Morado = \x1b[35m%s\x1b[0m
    console.log('\x1b[32m%s\x1b[0m', `Servidor Express corriendo en el puerto ${PORT}`);
    console.log('\x1b[32m%s\x1b[0m', `Para acceder a la aplicación, visita: http://localhost:${PORT}`);
});