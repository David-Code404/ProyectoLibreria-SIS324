const express = require('express'); // Importar el módulo express
const db = require('../db/db'); // Importar el módulo db
const router = express.Router(); // Crear una instancia de Router



// <!-----------------------Ruta para el inicio de sesión----------------------------->
// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
    const { pin } = req.body; // Suponiendo que el PIN se envía en el cuerpo de la solicitud
    // Verificar las credenciales del usuario en la base de datos
    db.get('SELECT * FROM Usuarios WHERE pin = ?', [pin], (err, row) => {
        if (err) {
            console.error('Error al verificar las credenciales del usuario:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else if (!row) {
            // Si no se encuentra ningún usuario con el PIN proporcionado, muestra un mensaje de error
            res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        } else {
            // Usuario autenticado correctamente
            if (row.tipo_usuario === 'Administrador') {
                // Obtener más información del usuario si es necesario
                const userData = {
                    id: row.id_usuario,
                    nombre: row.nombre,
                    email: row.email,
                    tipo: row.tipo_usuario
                };
                res.status(200).json({ success: true, userData, redirectURL: `/pages/administrador.html` });
            } else if (row.tipo_usuario === 'Vendedor') {
                // Obtener más información del usuario si es necesario
                const userData = {
                    id: row.id_usuario,
                    nombre: row.nombre,
                    email: row.email,
                    tipo: row.tipo_usuario
                };
                res.status(200).json({ success: true, userData, redirectURL: `/pages/Home.html` });
            } else if (row.tipo_usuario === 'Mesero') {
                // Obtener más información del usuario si es necesario
                const userData = {
                    id: row.id_usuario,
                    nombre: row.nombre,
                    email: row.email,
                    tipo: row.tipo_usuario
                };
                res.status(200).json({ success: true, userData, redirectURL: `/pages/mesero.html` });
            } else {
                res.status(500).json({ success: false, message: 'Tipo de usuario desconocido' });
            }
        }
    });
});



// Ruta para obtener la lista de productos // Para el menu-bar -> Inicio
router.get('/productos', (req, res) => {
    // Obtener la lista de productos desde la base de datos
    db.all('SELECT * FROM Productos', (err, rows) => {
        if (err) {
            console.error('Error al obtener la lista de productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        // Enviar la lista de productos como respuesta
        res.json({ productos: rows });
    });
});



// Ruta para obtener el historial  // Para el menu-bar -> Historial
router.get('/historial-pedidos', (req, res) => {
    const query = `
        SELECT HistorialOrdenes.id_orden,
            HistorialOrdenes.fecha_orden,
            Usuarios.nombre AS nombre_usuario
        FROM HistorialOrdenes
        JOIN Usuarios ON HistorialOrdenes.id_usuario = Usuarios.id_usuario
    `;
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error al obtener el historial de pedidos:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.status(200).json(rows);
        }
    });
});




module.exports = router;
