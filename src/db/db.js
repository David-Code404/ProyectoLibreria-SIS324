const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos (creará el archivo si no existe)
const db = new sqlite3.Database('./Libreria.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos', err.message);
    } else {
        console.log('\x1b[36m%s\x1b[0m','Conexión exitosa a la base de datos');
    }
});

module.exports = db;