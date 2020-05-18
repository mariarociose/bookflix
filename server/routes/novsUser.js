var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.get("/", function(req,res){
    console.log("haciendo fechito")
    let query = "select * from novedades where habilitado = 1";
    connection.query(query,function(err,rows,fields){
        if(err){
            res.status(500).send("hubo un error");
            return;
        }
        console.log(rows);
        res.json(rows);
    })
})

module.exports = router;