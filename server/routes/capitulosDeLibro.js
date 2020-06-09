var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.get("/", function(req,res){

    let query = `select * from capitulos where id_libro=${req.query.id_libro} and fecha > DATE(CURRENT_DATE) order by numero_capitulo`;
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

module.exports = router;
