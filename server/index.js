var express = require("express");
var app = express();
var mysql = require("mysql");
var config = require("./configs/config");
var jwt = require("jsonwebtoken");
var multer = require("multer");
var upload = multer();


//setea la llave usada para el JWT
app.set("llave",config.llave);


//para poder hacer peticiones entre localhost. Esto se llama cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//para que las peticiones xwww-form-urlencoded puedan ser formateadas a JSON
app.use(express.urlencoded({ extended: true }));

//para poder formatear las peticiones de tipo formdata (que es nuestro caso -> ver frontend)
app.use(upload.array());

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: 'bookflix'
})

connection.connect(function(err){
    if(err){
        console.log(err)
    }
})


app.get('/', (req,res) => (
    res.send('Hola mundo'),
    console.log('GET /')
))

app.get('/usuarios', function(req,res){
    
    var query = "Select * from usuarios";
    console.log('tratando de hacer fetch');
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        res.status(200).send(rows);
    });
})

app.post("/autenticar",(req,res) => {
    console.log(req.body);
    let query = "SELECT * FROM ";
    let commonQuery = "WHERE email='"+req.body.email+"' AND password='"+ req.body.password+"'";
    if(req.body.userType == 1)
        query += "usuarios "
    else
        query += "administradores "

    query += commonQuery;
    console.log(query);    
    connection.query(query, (err,rows,fields) => {

        if(err){
            console.log(err);
            res.status(500);
            return;
        }

        
        let response = rows;
       

        if(response[0] != undefined){
            
            
            console.log("existe un usuario");
            
            const payload = {
                check: true
            };
    
            const token = jwt.sign(payload,app.get("llave"),{expiresIn: 1440});
            res.json(
                {
                    mensaje: "Autenticacion correcta",
                    token : token,
                    user: response[0]
                }
    
            );
                
        } else {
            console.log("no")
            res.json({mensaje: "Usuario o contraseña incorrecto",
                      token: null, 
                      user: null  });
            
        }




    });


    
    

})


app.listen(4000, () => (

    console.log('Escuchando peticiones en el puerto 4000')
))

