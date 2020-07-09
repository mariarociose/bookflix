var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.delete("/",function(req,res){
    let query = `UPDATE perfiles set habilitado=0 where id_perfil=${req.body.perfilId}`;
    console.log(req.body);
    connection.query(query, (err,rows,fields) => {
        console.log(query);
        if(err){
            console.log(err);
        }
        console.log(rows);
        res.status(200).send("Se ha eliminado con exito");
    })
})

module.exports = router;