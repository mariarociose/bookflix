var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.get("/", function(req,res){

    let query = `SELECT max_capitulos from libros where id_libro=${req.query.id}`;
    connection.query(query, (err,rows,fields) => {
        if(err){
            console.log(err);
            return;
        }
        
        res.status(200).send({cantidad: rows[0]['max_capitulos']})

    })

})

module.exports = router;