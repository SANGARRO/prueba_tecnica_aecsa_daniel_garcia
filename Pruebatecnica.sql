CREATE DATABASE prueba_tecnica_db;

USE prueba_tecnica_db;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(255),
  codigo_validacion VARCHAR(255),
  celular VARCHAR(20),
  correo VARCHAR(255),
  ciudad VARCHAR(255)
);

CREATE TABLE creditos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  numero_credito VARCHAR(255),
  valor_desembolso_inicial DECIMAL(10, 2),
  valor_pagado DECIMAL(10, 2),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE alivios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  valor_ingreso_mensual DECIMAL(10, 2),
  valor_ingresos_adicionales DECIMAL(10, 2),
  gastos_mensuales DECIMAL(10, 2),
  capacidad_pago DECIMAL(10, 2),
  plazo_solicitado INT,
  tasa_solicitada DECIMAL(5, 2),
  valor_cuota_solicitada DECIMAL(10, 2),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
SHOW databases;
INSERT INTO usuarios (usuario, codigo_validacion, celular, correo, ciudad) 
VALUES ('admin', '12345', '1234567890', 'admin@example.com', 'Bogotá');
select * from usuarios