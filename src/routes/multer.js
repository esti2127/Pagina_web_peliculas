const express = require('express')
const multer = require('multer')
const { pool } = require('../config/pool.js')
const cloudinary = require('../config/cloudinary.js')
const validateAdmin = require('../middlewares/validateAdmin.js')


const router = express.Router()


// // 2. Definir dónde se guardarán los archivos
// configurar storage de multer:
//         indicar carpeta donde guardar imágenes
//        
const storage = multer.diskStorage({
    destination: 'src/public/uploads',
    //         crear nombre único para evitar repetir archivos


    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})


// // 3. Filtrar tipos de archivo permitidos


const fileFilter = (req, file, cb) => {




    const archivosPermitidos = ['image/jpeg', 'image/png', 'image/webp']


    if (archivosPermitidos.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Tipo de archivo no aceptado'))
    }


}


// // 4. Configurar multer
const upload = multer({ storage, fileFilter })


// // 5. Crear endpoint para subir archivo


router.post('/upload', upload.single('file'), async (req, res) => {
    try {
     console.log(req.file);   //         // 6. Comprobar si llegó archivo
        if (!req.file) {
            return res.status(400).json({
                error: 'no se ha subido ningun archivo'
            })
        }
        // 7. Obtener datos del body si los necesitas
        const { id_pelicula } = req.body


        const result = await cloudinary.uploader.upload(req.file.path);
        // 8. Guardar la ruta en base de datos
        await pool.query(
            `UPDATE peliculas
            SET imagen = $1
            WHERE id_pelicula = $2`,
            [result.secure_url, id_pelicula]
        )
        // 9. Responder al cliente
        res.json({
            message: 'Imagen subida correctamente',
            id_pelicula,
            imagen: result.secure_url
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'error  al subir la imagen'
        })
    }
})


// // 10. Exportar router


module.exports = router