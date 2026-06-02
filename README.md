# Backend Pagina Web Peliculas

## Descripcion del proyecto

Este backend permite administ

## Tecnologías

- Node.js y Express (servidor y rutas)
- CORS (permisos de conexión)
- PostgreSQL y pg (base de datos y consultas)
- bcryptjs y jsonwebtoken (encriptar contraseñas y manejo de tokens)
- dotenv (variables de entorno)
- multer, Cloudinary y multer-storage-cloudinary (subida de imágenes a la nube)
- express-validator (validación de datos)
- nodemon (reiniciar servidor en desarrollo)

## Configuracion local 

1. Clonar el repositorio:
```bash
git clone https://github.com/esti2127/Pagina_web_peliculas/tree/dev
```
2. Entrar en la carpeta del proyecto:

```bash
cd Pagina_web_peliculas
```
3. Instalar dependencias
   
```bash
npm install
```
4. Crear el archivo .env en la raiz del proyecto.
   
5. Configurar las variables de entorno
   
6. Ejecutar el servidor en desarrollo:
```bash
npm run dev
```
7. Ejecutar el servidor en producción:
   
```bash
npm start
```
8. El servidor se ejecuta por defecto en:
   
http://localhost:3000

## Variables de entorno
PORT=3000

DB_USER=a
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=

JWT_SECRET=

API_KEY_CLOUDY=
API_KEY_CLOUDY_SECRET=
## Tabla de Endpoints
### /api/auth

- POST /api/auth/signup - Registro de uasuario.
- POST /api/auth/login - Login de uasuario.

### /api/movies

- GET /api/movies/search?title=... - Busca películas en la BD local.

- GET /api/movies/favorites - Lista las películas favoritas del usuario autenticado.

- POST /api/movies/favorites - Añade una película a favoritos (si viene de API externa, la crea primero en la BD).

- DELETE /api/movies/favorites/:id - Elimina una película de los favoritos del usuario.

### /api/admin/movies

- GET /api/admin/movies - Lista todas las películas de la BD local.

- GET /api/admin/movies/:id - Vista de detalle de una película por su ID.

- POST /api/admin/movies - Sube una nueva película.

- PUT /api/admin/movies/:id - Modifica los datos o la imagen de una película existente.

- DELETE /api/admin/movies/:id - Elimina físicamente la película.

## Ejemplo para subir una imagen

## Credenciales de prueba

## Enlace tablero agil 

https://trello.com/b/viL2Mziw/mi-tablero-de-trello

