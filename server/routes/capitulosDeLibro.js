var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.get("/", function(req,res){

    let query = `select * from capitulos where id_libro=${req.query.id_libro} and fecha_vencimiento > DATE(CURRENT_DATE)`;
    console.log(query)

    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        res.status(200).send(rows);
    });
})

module.exports = router;
