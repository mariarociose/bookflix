var express = require("express");
var router  = express.Router();
var db = require("../configs/db");
var connection = db.connection;
var protectedAdminRoute = require("../middlewares/protectedAdminRoute");

router.get("/",protectedAdminRoute, function(req,res){

    let query = "select * from novedades";
    connection.query(query,function(err,rows,fields){
        
        
        if(err){
            res.status(500).send("Hubo un error")
            return;
        }

        res.json({datos: rows,mensaje:"Novedades"});

    })

} )

module.exports = router;