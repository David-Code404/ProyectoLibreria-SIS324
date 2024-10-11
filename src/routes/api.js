const express = require('express'); // Importar el módulo express
const db = require('../db/db'); // Importar el módulo db
const router = express.Router(); // Crear una instancia de Router

// <!-----------------------Ruta para el inicio de sesión----------------------------->
// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
    const { pin } = req.body; // Suponiendo que el PIN se envía en el cuerpo de la solicitud
    db.get('SELECT * FROM Usuarios WHERE pin = ?', [pin], (err, row) => {
        if (err) {
            console.error('Error al verificar las credenciales del usuario:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else if (!row) {
            res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        } else {
            const userData = {
                id: row.id_usuario,
                nombre: row.nombre,
                email: row.email,
                tipo: row.tipo_usuario
            };
            res.status(200).json({ success: true, userData, redirectURL: `/pages/${row.tipo_usuario.toLowerCase()}.html` });
        }
    });
});

// Ruta para obtener la lista de productos // Para el menu-bar -> Inicio
router.get('/productos', (req, res) => {
    db.all('SELECT * FROM Productos', (err, rows) => {
        if (err) {
            console.error('Error al obtener la lista de productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
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

// Ruta para obtener las categorías y sus productos
router.get('/categorias', (req, res) => {
    const sql = `
        SELECT c.id_categoria, c.nombre AS nombre_categoria, p.id_producto, p.nombre AS nombre_producto, p.precio
        FROM Categorias c
        LEFT JOIN Productos p ON c.id_categoria = p.id_categoria
        ORDER BY c.id_categoria
    `;
    db.all(sql, (err, rows) => {
        if (err) {
            console.error('Error al obtener las categorías y productos:', err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const categorias = rows.reduce((acc, row) => {
                const { id_categoria, nombre_categoria, id_producto, nombre_producto, precio } = row;
                if (!acc[id_categoria]) {
                    acc[id_categoria] = {
                        id_categoria,
                        nombre_categoria,
                        productos: []
                    };
                }
                if (id_producto) {
                    acc[id_categoria].productos.push({ id_producto, nombre_producto, precio });
                }
                return acc;
            }, {});
            res.status(200).json(Object.values(categorias));
        }
    });
});

module.exports = router;
