var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");
var connection = db.connection;

router.get('/', function(req,res){

    var query = `SELECT id_usuario, nombre, apellido, email, IF(tipo_suscripcion = 1, 'Premium', 'Basico') as suscripcion, (DATE_FORMAT(fecha_alta, "%d / %M / %Y")) as fecha FROM usuarios`;
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


router.post("/", function(req,res){

    let query = `SELECT id_usuario, nombre, apellido, email, IF(tipo_suscripcion = 1, 'Premium', 'Basico') as suscripcion, (DATE_FORMAT(fecha_alta, "%d / %M / %Y")) as fecha FROM usuarios where fecha_alta between '${req.body.fecha_desde}' and '${req.body.fecha_hasta}'`;
    console.log(query);
    connection.query(query, function(err, rows, fields){
        if(err){
            console.log(err)
            res.status(500).send({mensaje:"hubo un error"});
            return;
        }
        console.log(rows)
        let mensaje;
        if(rows.length == 0){
            res.status(200).send({mensaje: "No hay usuarios registrados entre las fechas seleccionadas",usuarios: rows})
        }else
            res.status(200).send({mensaje: null,usuarios: rows})

    })
})



module.exports = router;
