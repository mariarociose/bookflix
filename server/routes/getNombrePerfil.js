var express = require("express");
var router = express.Router();
var db = require("../configs/db");

var connection = db.connection;


router.get("/", function(req,res){
    let query = `select nombre from perfiles where id_usuario=${req.query.userId} and id_perfil=${req.query.perfilId} and habilitado=1`
    console.log(query);
    connection.query(query,(err,rows,fields) => {
        if(err){
            console.log(err);

        }
        console.log(rows)
        res.status(200).send({perfiles: rows})

    })
})

module.exports = router;
