var express = require("express");
var app = express();
var db  = require("./configs/db");
var multer = require("multer");
var upload = multer();

//para poder hacer peticiones entre localhost. Esto se llama cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    next();
});

//para que las peticiones xwww-form-urlencoded puedan ser formateadas a JSON
app.use(express.urlencoded({ extended: true }));

//para poder formatear las peticiones de tipo formdata (que es nuestro caso -> ver frontend)
app.use(upload.array());

db.connectToDb;

app.get('/', (req,res) => (
    res.send('Hola mundo'),
    console.log('GET /')
))

var usuarios = require("./routes/usuarios");
app.use("/usuarios",usuarios);

var autenticar = require("./routes/autenticar");
app.use("/autenticar",autenticar);

var libros = require("./routes/libros");
app.use("/libros",libros);

var autores = require("./routes/autores")
app.use("/autores",autores);

var generos = require ("./routes/generos")
app.use("/generos",generos);

var editoriales = require ("./routes/editoriales")
app.use("/editoriales",editoriales);

var novedadesAdmin = require("./routes/novedadesAdmin");
app.use("/novsAdmin",novedadesAdmin);

var profileData = require("./routes/profileData")
app.use("/profileData",profileData);


app.listen(4000, () => (

    console.log('Escuchando peticiones en el puerto 4000')
))
