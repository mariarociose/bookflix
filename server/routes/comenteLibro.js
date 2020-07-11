var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.post("/", function(req, res){
    let query = `SELECT * from libros_puntuaciones where id_libro=${req.body.idLibro} and id_perfil=${req.body.idPerfil}`;
    console.log(query)
    connection.query(query, (err, rows, fields) => {
            if(err){
                console.log(err);
                res.status(500).send({response: "Hubo un error"});
                return;
            }
            console.log("resultado de la busqueda");
            console.log(rows.length);
            if(rows.length == 0){
                res.status(200).send({yaComente: false})
            }else{
                res.status(200).send({yaComente: true})
            }

    })
})

module.exports = router;