// declaraciones 
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
require('dotenv').config()

const app = express();

// para capturar el body con bodyParser
app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());

// datos para la conexion a MongoDB
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.CONTRASENA}@cluster0.3qxca7l.mongodb.net/${process.env.BBDD}?retryWrites=true&w=majority`;

console.log(uri) 

// en un inicio ocupé esto y no fucionaba, luego revisé en la documentación 
//y no era compatible con mi version de mongoDB por ello está comentado

// Me conecto a MongoDB
mongoose.connect(uri,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
    .then( () => console.log("Base de datos conectada"))
    .catch( e => console.log(e))

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// // definición de rutas
// app.use(express.static(__dirname + "/public"));

// Importar el enrutador
const authRoutes = require('./router/auth');



// codigo de los enrutadores
app.use('/api/user', authRoutes);
app.use('/pacientes', require('./router/pacientesRouter'));
app.use('/', require('./router/rutasWeb'))
app.use('/user', require('./router/auth'))



// aplicacion de los routes de index.js
app.get('/', (request, response) =>{
    response.json({
        estado: true,
        mensaje: 'Todo joya'
    })
});

// inicio del server 
const PORT = 8080;
app.listen(PORT, () =>{
    console.log("Navegando en el puerto 8080 y todo sigue joya")
})