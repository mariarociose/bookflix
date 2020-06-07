var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");
var connection = db.connection;

router.get('/', function(req,res){

    var query =
    "Select * from trailers ";
    console.log('tratando de hacer fetch');
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        console.log(rows);
        res.json({datos: rows,mensaje:"Listado de Trailers"});
    });
})

router.delete("/",function(req,res){
    console.log(req.body);
    let query = `delete from trailers WHERE id_trailer=${req.body.id}`;
    connection.query(query,function(err,rows,fields){
        if(err){
            console.log(err);
            res.status(500).send("Hubo un error");
            return;
        }
        console.log(rows);
        res.json(rows);

    })


})


module.exports = router;
