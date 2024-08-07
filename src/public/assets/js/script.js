console.log("Bienvenidos - Sockets")

const socket = io()

socket.emit('message' , 'HOLA, SOY EL CLIENTE') //EMITIMOS EL METODO 'message' QUE HICIMOS

socket.on('eventoParaSocketActual' , data => { //ESCUCHAMOS EL METODO 'eventoParaSocket' QUE HICIMOS
    console.log(data)
})

socket.on('eventoParaTodosLosSocketsMenosElActual' , data => {
    console.log(data)
})

socket.on('eventoParaTodosLosSockets' , data => {
    console.log(data)
})