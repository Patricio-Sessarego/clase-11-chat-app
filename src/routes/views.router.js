const { Router } = require('express') //CLASE 9
const router = Router()

router.get('/' , (req , res) => {
    res.render('index.handlebars' , {
        style: 'style.css',
        isMenu: true
    })
})

const users = [
    {id: '1' , name: 'User 1' , email: 'user1@gmail.com'},
    {id: '2' , name: 'User 2' , email: 'user2@gmail.com'},
    {id: '3' , name: 'User 3' , email: 'user3@gmail.com'}
]

router.get('/users' , (req , res) => { //'render' => METODO PARA RENDERIZAR UNA PLANTILLA
    const userLogin = {
        role: 'admin',
        name: 'Patricio',
        title: "Home - GamingGear"
    }
    
    res.render('users.handlebars' , { //NOMBRE DE LA PLANTILLA Y INFORMACION QUE QUEREMOS QUE RECIBA
        isAdmin: userLogin.role == 'admin',
        style: 'style.css',
        user: userLogin,
        title: 'HOME',
        isMenu: true,
        users
    })
})

const products = [
    {id: '1' , name: 'Product 1' , price: 1000},
    {id: '2' , name: 'Product 2' , price: 2000},
    {id: '3' , name: 'Product 3' , price: 3000},
]

router.get('/products' , (req , res) => {
    res.render('products.handlebars' , {
        isProducts: products.length == 0,
        style: 'products.css',
        userName: 'Patricio',
        title: 'PRODUCTS',
        isMenu: true,
        products
    })
})

router.get('/chat' , (req , res) => {
    res.render('chat.handlebars' , {
        style: 'chat.css',
        isMenu: true,
    })
})

module.exports = router