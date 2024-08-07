const multer = require('multer') //IMPORTAMOS MULTER
const { dirname } = require('node:path')

const storage = multer.diskStorage({ //PARA CREAR ARCHIVOS EN LA COMPUTADORA
    destination: (req , file , callback)=>{
        callback(null , dirname(__dirname) + '/public/img')
    },
    filename: (req , file , callback)=>{
        callback(null , `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({ storage })

module.exports = { uploader }