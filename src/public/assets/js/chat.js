console.log("Bienvenidos - Chat")

const socket = io()

let user
let chatbox = document.getElementById("chatbox")

Swal.fire({
    text: "INGRESE SU NOMBRE DE USUARIO",
    allowOutsideClick: false,
    title: "IDENTIFICATE",
    input: "text",

    inputValidator: value => { //VALIDAMOS QUE INGRESE UN USUARIO
        return !value && "ESCRIBA SU USUARIO PARA CONTINURAR"
    }
}).then(result => {
    user = result.value //GUARDAMOS EL VALOR DEL INPUT EN 'user'
    console.log(user)
})

chatbox.addEventListener('keypress' , event => {
    if(event.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message' , {user: user , message: chatbox.value}) //MANDAMOS EL MENSAJE
            chatbox.value = "" //RESETEAMOS EL INPUT
        }
    }
})

socket.on('messageLogs' , data => {
    let log = document.getElementById("messageLogs")
    let messages = ''

    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}<br>`
    })

    log.innerHTML = messages
})