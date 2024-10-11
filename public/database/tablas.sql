-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('Administrador','Vendedor','Mesero')),
    pin TEXT NOT NULL,
    estado INTEGER NOT NULL CHECK (estado IN (0, 1))
);





--tabla categorias

CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
);


CREATE TABLE Productos (
    id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    id_categoria INTEGER,
    FOREIGN KEY (id_categoria) REFERENCES Categorias (id_categoria)
);






-- Tabla de Sesiones
CREATE TABLE IF NOT EXISTS Sesiones (
    id_sesion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fin TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
