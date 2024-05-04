CREATE DATABASE Aerolinea;
USE Aerolinea;

CREATE TABLE Cliente(
	id_Cliente INT PRIMARY KEY AUTO_INCREMENT,
	nombre_Cliente VARCHAR(30) NOT NULL,
	apellidos_Cliente VARCHAR(50) NOT NULL,
	curp VARCHAR(18) NOT NULL,
	telefono VARCHAR(12) NOT NULL,
	direccion VARCHAR(45) NOT NULL
);

CREATE TABLE Aeropuerto(
	id_Aeropuerto INT PRIMARY KEY AUTO_INCREMENT,
	nombre_Aeropuerto VARCHAR(50) NOT NULL,
	pais VARCHAR(25) NOT NULL,
	localidad VARCHAR(50) NOT NULL
);

CREATE TABLE Avion(
	id_Avion INT PRIMARY KEY AUTO_INCREMENT,
	no_Plazas INT NOT NULL,
	id_Aeropuerto INT NOT NULL,

	FOREIGN KEY(id_Aeropuerto) REFERENCES Aeropuerto(id_Aeropuerto)
);

CREATE TABLE Vuelo(
	id_Vuelo INT PRIMARY KEY AUTO_INCREMENT,
	id_Avion INT NOT NULL,
	fecha_Salida DATETIME NOT NULL,
	fecha_Llegada DATETIME NOT NULL,
	id_aeropuerto_Salida INT NOT NULL,
	id_aeropuerto_Llegada INT NOT NULL,
	no_plazas_disponibles INT NOT NULL, /*RESTAR LAS PLAZAS DEL AVION Y LAS PLAZAS OCUPADAS*/
	no_plazas_ocupadas INT NOT NULL, /*LEER LOS ASIENTOS DE LAS RESERVACIONES*/

	FOREIGN KEY(id_Avion) REFERENCES Avion(id_Avion),
	FOREIGN KEY(id_aeropuerto_Salida) REFERENCES Aeropuerto(id_Aeropuerto),
	FOREIGN KEY(id_aeropuerto_Llegada) REFERENCES Aeropuerto(id_Aeropuerto)
);

CREATE TABLE Reservacion(
	id_Reserva INT PRIMARY KEY AUTO_INCREMENT,
	id_Cliente INT NOT NULL,
	id_Vuelo INT NOT NULL,
	plazas_compradas INT NOT NULL,

	FOREIGN KEY(id_Cliente) REFERENCES Cliente(id_Cliente),
	FOREIGN KEY(id_Vuelo) REFERENCES Vuelo(id_Vuelo)
);

CREATE TABLE Asiento(
	id_Asiento INT PRIMARY KEY AUTO_INCREMENT,
	id_Avion INT NOT NULL,
	piso INT NOT NULL,
	columna INT NOT NULL,
	fila INT NOT NULL,

	FOREIGN KEY(id_Avion) REFERENCES Avion(id_Avion)
);

CREATE TABLE Pase_Abordo(
	id_Pase INT PRIMARY KEY AUTO_INCREMENT,
	id_Cliente INT NOT NULL,
	id_Reserva INT NOT NULL,
	id_Asiento INT NOT NULL,
	fecha_Vuelo DATE NOT NULL,
	no_Vuelo INT NOT NULL,
	no_Tarjeta_Pago VARCHAR(20) NOT NULL,
	FOREIGN KEY(id_Cliente) REFERENCES Cliente(id_Cliente),
	FOREIGN KEY(id_Reserva) REFERENCES Reservacion(id_Reserva),
	FOREIGN KEY(id_Asiento) REFERENCES Asiento(id_Asiento)
);

 CREATE TRIGGER asientos_ocupados AFTER INSERT ON Pase_Abordo FOR EACH ROW
     UPDATE Avion SET no_Plazas_Dis = no_Plazas_Dis - 1 WHERE id_Avion = Pase_Abordo.id_Avion;

INSERT INTO Aeropuerto(nombre_Aeropuerto, pais, localidad) VALUES ("AICM", "México", "Ciudad de México");
INSERT INTO Aeropuerto(nombre_aeropuerto, localidad, pais) VALUES ("AIFA", "Estado de México", "México");
INSERT INTO Aeropuerto(nombre_aeropuerto, localidad, pais) VALUES ("Cancún", "Quintana Roo", "México");
INSERT INTO Aeropuerto(nombre_aeropuerto, localidad, pais) VALUES ("Aguascalientes", "Aguascalientes", "México");
INSERT INTO Aeropuerto(nombre_aeropuerto, localidad, pais) VALUES ("Klaipeda Palanga Palanga International", "Klaipeda/Palanga", "Lituania");
INSERT INTO Aeropuerto(nombre_aeropuerto, localidad, pais) VALUES ("Aeropuerto Adolfo Súarez Madrid-Barajas", "Madrid", "España");

INSERT INTO Avion(no_Plazas, id_Aeropuerto) VALUES (100, 1);
INSERT INTO Avion(no_Plazas, id_Aeropuerto) VALUES (100, 2);
INSERT INTO Avion(no_Plazas, id_Aeropuerto) VALUES (100, 3);
INSERT INTO Avion(no_Plazas, id_Aeropuerto) VALUES (100, 4);
INSERT INTO Avion(no_Plazas, id_Aeropuerto) VALUES (100, 5);

INSERT INTO Vuelo(id_Avion, fecha_Salida, fecha_Llegada, id_aeropuerto_Salida, id_aeropuerto_Llegada, no_plazas_disponibles, no_plazas_ocupadas) VALUES (1, "2024/05/01 19:00:00", "2024/05/01", 1,2,0,0);
INSERT INTO Vuelo(id_Avion, fecha_Salida, fecha_Llegada, id_aeropuerto_Salida, id_aeropuerto_Llegada, no_plazas_disponibles, no_plazas_ocupadas) VALUES (2, "2024/05/02 23:30:00", "2024/05/02", 3,5,0,0);
INSERT INTO Vuelo(id_Avion, fecha_Salida, fecha_Llegada, id_aeropuerto_Salida, id_aeropuerto_Llegada, no_plazas_disponibles, no_plazas_ocupadas) VALUES (3, "2024/05/03 13:30:00", "2024/05/03", 2,4,0,0);
INSERT INTO Vuelo(id_Avion, fecha_Salida, fecha_Llegada, id_aeropuerto_Salida, id_aeropuerto_Llegada, no_plazas_disponibles, no_plazas_ocupadas) VALUES (4, "2024/05/02 09:00:00", "2024/05/02", 1,2,0,0);
INSERT INTO Vuelo(id_Avion, fecha_Salida, fecha_Llegada, id_aeropuerto_Salida, id_aeropuerto_Llegada, no_plazas_disponibles, no_plazas_ocupadas) VALUES (5, "2024/05/01 09:00:00", "2024/05/01", 5,6,0,0);
INSERT INTO Vuelo(id_Avion, fecha_Salida, fecha_Llegada, id_aeropuerto_Salida, id_aeropuerto_Llegada, no_plazas_disponibles, no_plazas_ocupadas) VALUES (4, "2024/05/01 22:00:00", "2024/05/01", 1,6,0,0);
