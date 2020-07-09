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

var autores = require("./routes/autores");
app.use("/autores",autores);

var generos = require ("./routes/generos");
app.use("/generos",generos);

var editoriales = require ("./routes/editoriales");
app.use("/editoriales",editoriales);

var novedadesAdmin = require("./routes/novedadesAdmin");
app.use("/novsAdmin",novedadesAdmin);

var novedadesUser = require("./routes/novsUser");
app.use("/novsUser",novedadesUser);

var profileData = require("./routes/profileData");
app.use("/profileData",profileData);

var tipoTarjeta = require("./routes/tipoTarjeta");
app.use("/tipoTarjeta",tipoTarjeta);

var tiposTarjeta = require("./routes/tiposTarjeta");
app.use("/tiposTarjeta",tiposTarjeta);

var editProfile = require("./routes/editProfile");
app.use("/editProfile",editProfile);


var libro = require("./routes/libro_by_id");
app.use("/libro_by_id",libro);

var editorial = require("./routes/editorial_insert");
app.use("/editorial_insert",editorial);

var genero = require("./routes/genero_insert");
app.use("/genero_insert",genero);

var autor = require("./routes/autor_insert");
app.use("/autor_insert",autor);

var libro_new = require ("./routes/libro_insert");
app.use("/libro_insert",libro_new);

var user_new = require ("./routes/createProfile");
app.use("/createProfile",user_new);

var libroUpdate = require("./routes/libroUpdate");
app.use("/libroUpdate",libroUpdate);

var traerTrailers = require("./routes/traerTrailers");
app.use("/traerTrailers",traerTrailers);

var altaCapitulo = require("./routes/altaCapitulo");
app.use("/altaCapitulo",altaCapitulo);

var countCapitulos = require("./routes/countCapitulos");
app.use("/countCapitulos",countCapitulos);

var getMaxCapitulos = require("./routes/getMaxCapitulos");
app.use("/maxCapitulos", getMaxCapitulos);

var altaTrailer = require("./routes/altaTrailer");
app.use("/altaTrailer",altaTrailer);

var countTrailer = require("./routes/countTrailer");
app.use("/countTrailer",countTrailer);

var altaTrailerLibre = require("./routes/altaTrailerSinLibro");
app.use("/altaTrailerSinLibro",altaTrailerLibre);

var trailers = require("./routes/trailers");
app.use("/trailers",trailers);

var librosUser = require ("./routes/librosUser")
app.use("/librosUser",librosUser);

var marcarLeido = require ("./routes/marcarLeido")
app.use("/marcarLeido",marcarLeido);

var capitulosDeLibro = require ("./routes/capitulosDeLibro")
app.use("/capitulosDeLibro",capitulosDeLibro);

var registroVisita = require ("./routes/registroVisita")
app.use("/registroVisita",registroVisita);

var historialLectura = require ("./routes/historialLectura")
app.use("/historialLectura",historialLectura);

var getCapitulos = require("./routes/getCapitulo")
app.use("/getCapitulos", getCapitulos);

var marcarFavorito = require("./routes/marcarFavorito")
app.use("/marcarFavorito", marcarFavorito);

var comentarios = require("./routes/getComentarios");
app.use("/getComentarios", comentarios);

var libros_ranking = require("./routes/libros_ranking");
app.use("/libros_ranking", libros_ranking);


var usuarios_admin = require("./routes/usuarios_admin");
app.use("/usuarios_admin",usuarios_admin);

var getPerfiles = require("./routes/getPerfiles");
app.use("/getPerfiles", getPerfiles);

var borrarPerfiles = require("./routes/borrarPerfil");
app.use("/borrarPerfil", borrarPerfiles);



var cambiarSuscripcion = require("./routes/changeSuscription");
app.use("/changeSuscription", cambiarSuscripcion);

app.listen(4000, () => (

    console.log('Escuchando peticiones en el puerto 4000')
))
