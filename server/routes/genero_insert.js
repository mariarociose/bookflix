var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.post('/',(req,res) => {
//INSERT INTO table_name (column1, column2, column3, ...)
//VALUES (value1, value2, value3, ...);
    console.log(req.body);
    //var query = "INSERT INTO editoriales SET desc_editorial='prueba'";
    var query = "insert into generos SET desc_genero=('"+req.body.desc_genero+"')";
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
