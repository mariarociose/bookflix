var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.get('/', function(req,res){
    console.log(req.body);
    var query = "SELECT id_usuario, nombre, apellido, password, email, habilitado, tarjeta_titular, tarjeta_dni, tarjeta_numero, tarjeta_ccv, tarjeta_tipo_id, DATE_FORMAT(tarjeta_fecha_vencimiento, '%Y-%m-%d') AS t_fecha_vencimiento  FROM usuarios WHERE id_usuario="+parseInt(req.query.userId)+"";
    console.log("TRATANTO DE HACER FETCH");
    console.log(query)
    connection.query(query, function(err,rows,fields){
        console.log(rows)
        if(err){
            res.status(500).send('Hubo un error');
            return;
        }
            res.status(200).send(rows[0]);
        });
    })

    module.exports = router;
