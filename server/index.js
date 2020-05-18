var express = require("express");
var app = express();
var db  = require("./configs/db");
var multer = require("multer");
var upload = multer();

//para poder hacer peticiones entre localhost. Esto se llama cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
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

var novedadesUser = require("./routes/novsUser");
app.use("/novsUser",novedadesUser);

var profileData = require("./routes/profileData")
app.use("/profileData",profileData);

var libro = require("./routes/libro_by_id")
app.use("/libro_by_id",libro);

var editorial = require("./routes/editorial_insert")
app.use("/editorial_insert",editorial);

var genero = require("./routes/genero_insert")
app.use("/genero_insert",genero);

var autor = require("./routes/autor_insert")
app.use("/autor_insert",autor);

var libro_new = require ("./routes/libro_insert")
app.use("/libro_insert",libro_new);

app.listen(4000, () => (

    console.log('Escuchando peticiones en el puerto 4000')
))
