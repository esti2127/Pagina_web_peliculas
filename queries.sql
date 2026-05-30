DROP TABLE IF EXISTS peliculas_generos, peliculas, usuarios, favoritos, generos CASCADE;

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(250) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('user', 'admin', 'guest'))
  
);

CREATE TABLE peliculas (
  id_pelicula SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  imagen VARCHAR(250) NOT NULL,
  anio INT NOT NULL,
  director VARCHAR(100) NOT NULL,
  genero VARCHAR(100) NOT NULL,
  duracion INT NOT NULL

);

CREATE TABLE generos (
  id_genero SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL

);

CREATE TABLE peliculas_generos (
  id_pelicula_genero SERIAL PRIMARY KEY,
  id_pelicula INT NOT NULL,
  id_genero INT NOT NULL,
  CONSTRAINT fk_peliculas_genero
	FOREIGN KEY (id_genero) REFERENCES generos(id_genero) ON DELETE CASCADE,
  CONSTRAINT fk_peliculas_link 
  FOREIGN KEY (id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE

);

CREATE TABLE favoritos (
  id_favorito SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_pelicula INT NOT NULL,
  CONSTRAINT fk_usuarios_pelicula
	FOREIGN KEY (id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE CASCADE,
  CONSTRAINT fk_usuarios_favorito 
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
	
);










INSERT INTO usuarios(nombre, email, password_hash, rol)
VALUES
('Pepe', 'pepe@gmail.com', '1994', 'user'),

('Ana', 'ana@gmail.com', '1972', 'user'),

('Juan', 'juan@gmail.com', '2010', 'guest'),

('Iñigo', 'iñigo@gmail.com', '2019', 'admin'),

('Nati', 'nati@gmail.com', '2014', 'admin');


INSERT INTO peliculas(titulo, imagen, anio, director, genero, duracion)
VALUES
('The Shawshank Redemption', 'https://www.imdb.com/title/tt0111161/', 1994, 'Frank Darabont', 'Drama', 142),

('The Godfather', 'https://www.imdb.com/title/tt0068646/', 1972, 'Francis Ford Coppola', 'Crime, Drama', 175),

('Inception', 'https://www.imdb.com/title/tt1375666/', 2010, 'Christopher Nolan', 'Action, Adventure, Sci-Fi', 148),

('Parasite', 'https://www.imdb.com/title/tt6751668/', 2019, 'Bong Joon Ho', 'Drama, Thriller', 132),

('Interstellar', 'https://www.imdb.com/title/tt0816692/', 2014, 'Christopher Nolan', 'Adventure, Drama, Sci-Fi', 169);



INSERT INTO generos(nombre)
VALUES
('Action'),

('Adventure'),

('Animation'),

('Biography'),

('Comedy'),

('Crime'),

('Documentary'),

('Drama'),

('Family'),

('Fantasy'),

('History'),

('Horror'),

('Music'),

('Musical'),

('Mystery'),

('Romance'),

('Sci-Fi'),

('Sport'),

('Thriller'),

('War'),

('Western');





INSERT INTO peliculas_generos(id_pelicula, id_genero)
VALUES
(1, 8), -- Shawshank -> Drama
(2, 6), -- Godfather -> Crime
(2, 8), -- Godfather -> Drama
(3, 1), -- Inception -> Action
(3, 2), -- Inception -> Adventure
(3, 17); -- Inception -> Sci-Fi








