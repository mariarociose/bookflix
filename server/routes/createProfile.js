var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.post('/',(req,res) => {

    console.log(req.body);
    //var query = "INSERT INTO editoriales SET desc_editorial='prueba'";


    let query = `INSERT INTO usuarios SET nombre='${req.body.nombre}', apellido='${req.body.apellido}', password='${req.body.password}', email='${req.body.email}, tarjeta_titular='${req.body.titular}', tarjeta_dni='${req.body.dni}', tarjeta_numero='${req.body.cardId}', tarjeta_ccv='${req.body.cardCod}', tarjeta_tipo_id='${req.body.tipo}', tarjeta_fecha_vencimiento='${req.body.Fecha_vencimiento}'`; 

    console.log('insertando nuevo elemento');
    console.log(query)
    connection.query(query, function(err,result){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        console.log('nuevo usuario insertado');
    });
})

module.exports = router;
