const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var nombre = "David";
const port = 4000;
//Creamos una variable para tener todas las
//funcionalidades de express
const app = express();

//////////////////////////////////Middleware para body parser.

//Para cuando se llena un formulario.
app.use(bodyParser.urlencoded({
    extended: false
}));

//Cuando enviamos las respuestas json.
app.use(bodyParser.json());


var obj = {
    nombre: "David",
    edad: 23,
    sexo: "Masculino"
}

app.listen(port, () => {
    console.log("Habilitado puerto 4000");
});

//////////////////////////////////////Conexion a MongoDB con mongoose.


//Conexion a MongoDB con mongoose.
mongoose.connect('mongodb://localhost:27017/apirest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, res) => {
    //Si hay un error, tiramos un error.
    if (err) throw err;
    //sino
    console.log("Conexion exitosa!");
});

//Esquema para mongoose con MongoDB
var Schema = mongoose.Schema;

var datos = new Schema({
    //Definimos los datos que vamos a obtener de MongoDB
    nombre: {
        type: String,
        //el required es para cuando un campo es obligatorio y el mensaje,
        //si no es required solo ponemos required:false.
        required: [true, "Nombre obligatorio jeje"]
    },
    apellidos: {
        type: String,
        required: [true, "Apellidos obligatorios jeje xd"]
    },
    descripcion: {
        type: String,
        required: false
    }

})

//Creamos conexion entre la coleccion "slide" y modelo creado "datos".
const Slide = mongoose.model("slides", datos);

///////////////////////////////////////////////Hacemos peticion GET
app.get("/", function(req, res) {
    // res.send(`hola ${nombre}`);
    // res.send(obj);
    // Recibimos los datos a traves de un Callback con el metodo exec()
    Slide.find({}).exec((err, data) => {
        if (err) {
            // retornamos la respuesta en un json 
            return res.json({
                status: 500,
                mensaje: "Error en la peticion."
            })
        }

        res.json({
            status: 200,
            datos: data
        })

    })

})

/////////////////////////////////////////////////Hacemos peticion POST

app.post("/crear-slide", (req, res) => {
    let slide = req.body;

    res.json({
        slide,
        mensaje: "Creado con exito"
    })

})

/////////////////////////////////////////////////Hacemos peticion PUT
//Para editar necesitamos pasarle el id del archivo a editar.
app.put("/editar-slide:id/", (req, res) => {

    //recibimos el id como parametro.
    let id = req.params.id;

    res.json({
        id,
        mensaje: "Modificado con exito"
    })
})

//////////////////////////////////////////////////Hacemos peticion DELETE
//Tambien necesitamos el id.
app.delete("/borrar-slide:id/", (req, res) => {

    let id = req.params.id;

    res.json({
        id,
        mensaje: "borrado con exito"
    })

})