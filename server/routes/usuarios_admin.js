var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");
var connection = db.connection;

router.get('/', function(req,res){

    var query = "SELECT `id_usuario`, `nombre`, `apellido`, `email`, IF(tipo_suscripcion = 1, 'Premium', 'Basico') as suscripcion, DATE(fecha_alta) as fecha FROM usuarios";
    console.log('tratando de hacer fetch');
    console.log(query)
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
    console.log(rows);
        res.status(200).send(rows);
    });
})

module.exports = router;
