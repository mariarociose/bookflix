var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.post('/',(req,res) => {

    console.log(req.body);

    var query = "insert into usuarios SET nombre=('"+req.body.nombre+"'), apellido=('"+req.body.apellido+"'), password=('"+req.body.password+"'), email=('"+req.body.email+"')";
    console.log('insertando nuevo elemento');
    console.log(query)
    connection.query(query, function(err,result){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        console.log('nuevo elemento insertado');
    });
})

module.exports = router;
