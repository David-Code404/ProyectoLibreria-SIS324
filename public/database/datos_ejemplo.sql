-- Datos de ejemplo para la tabla Usuarios
INSERT INTO Usuarios (nombre, email, tipo_usuario, pin, estado) VALUES
('David', 'admin1@example.com', 'Administrador', '1111', 0),
('Jose', 'admin2@example.com', 'Vendedor', '2222', 0),
('Luis', 'a@example.com', 'Mesero', '3333', 0);

INSERT INTO Categorias (nombre) VALUES 
('Libros de Texto'),
('Útiles Escolares'),
('Papelería'),
('Material Deportivo'),
('Arte y Manualidades'),
('Material Tecnológico');





-- Datos de ejemplo para la tabla Sesiones
-- Una sesión iniciada por un usuario administrador:
INSERT INTO Sesiones (id_usuario, inicio, fin) VALUES (1, '2024-03-28 09:00:00', '2024-03-28 10:30:00');

-- Una sesión iniciada por un :
INSERT INTO Sesiones (id_usuario, inicio) VALUES (2, '2024-03-28 10:15:00');

-- Una sesión iniciada por un mesero sin hora de finalización (sesión actual):
INSERT INTO Sesiones (id_usuario, inicio) VALUES (3, '2024-03-28 11:00:00');

