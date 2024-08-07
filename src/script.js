//MOTORES DE PLANTILLAS - CLASE 9
//WEBAPP => PAGINAS COMPLEJAS => DINASMIMO ALTO
//WEBSITE => PAGINAS INTERMEDIAS => DINAMISMO MEDIO
//LANDING PAGES => PAGINAS SENCILLAS => DINAMISMO NULO

//HANDLEBARS => MOTOR DE PLANTILLAS(EL QUE SE USA EN EL CURSO)
//=> ES UN MOTOR DE PLANTILLAS PENSADO PARA UN NIVEL MEDIO DE DINANISMO

//INSTALACION
//1) npm i express-handlebars

const viewsRouter = require('./routes/views.router.js')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static' , express.static(__dirname + '/public'))

//CONFIGURACION | HANDLEBARS
const handlebars = require('express-handlebars')
app.engine('handlebars' , handlebars.engine()) //LE INDICAS QUE MOTOR VA A UTILIZAR
app.set('views' , __dirname + '/views') //CARPETA DONDE DEBE TOMAR LAS PLANTILLAS
app.set('view engine' , 'handlebars') //EXTENCION DE LAS PLANTILLAS

app.use((error , req , res , next) => {
    console.log(error.stack)
    res.status(500).send('ERROR DE SERVER')
})

//WEBSOCKETS - CLASE 10
//=> ESTABLECE DOS ENDPOINTS DE COMUNICACIONES, A CADA ENDPOINT SE LO CONOCE COMO SOCKET
//=> ES UN PROTOCOLO DE COMUNICACION BASADO EN TCP PARA ESTABLECER UNA CONEXION ENTRE CLIENTE Y SERVIDOR
//=> ESTOS DOS SOCKETS PERMITIRAN ESTABLECER UNA COMUNICACION BIDIRECCIONAL ENTRE EL CLIENTE Y EL SERVIDOR

//SOCKETS EN EXPRESS - SOCKET.IO
//=> SIMPLIFICA EL USO DE LAS WEBSOCKETS
//=> LIBRERIA DE JAVA SCRIPT
//=> npm i socket.io

const { Server } = require('socket.io')

const httpServer = app.listen(PORT , () => {
    console.log(`ESCUCHANDO EN EL PUERTO ${PORT}`)
})

const socketServer = new Server(httpServer)
socketServer.on('connection' , (socket) => { //LO PONEMOS EN MODO LISTEN CON EL METODO 'connection'
    console.log('NUEVO CLIENTE CONECTADO')

    socket.on('message' , data => { //DEFINIMOS UN EVENTO 'message'. LO INVENTAMOS NOSOTROS
        console.log(data)
    })

    socket.emit('eventoParaSocketActual' , 'ESTE MENSAJE SOLO LO DEBE RECIBIR EL SOCKET ACTUAL')

    socket.broadcast.emit('eventoParaTodosLosSocketsMenosElActual' , 'ESTE MENSAJE LO DEBEN RECIBIR TODOS LOS CLIENTE CONECTADOS MENOS EL ACTUAL')

    socketServer.emit('eventoParaTodosLosSockets' , 'ESTE MENSAJE VA A SER RECIBIDO POR TODOS LOS SOCKETS')
})

app.use('/' , viewsRouter) //HOME
app.use('/users' , viewsRouter) //USERS
app.use('/products' , viewsRouter) //PRODUCTS

//APLICACION CHAT CON WEBSOCKETS - CLASE 11
//=> INSTALAMOS LA VERSION 6.0.7 DE HANDLEBARS
//npm i express-handlebars@6.0.7

const io = new Server(httpServer)
app.use('/chat' , viewsRouter) //CHAT

let messages = []

io.on('connection' , socket => {
    console.log("NUEVO CLIENTE CONECTADO")

    socket.on("message" , data => {
        messages.push(data)
        console.log(data)

        io.emit('messageLogs' , messages) //EMITIMOS EL MENSAJE A TODOS LOS SOCKETS
    })
})