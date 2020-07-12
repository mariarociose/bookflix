var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;


router.post("/", function(req, res){
    let query = `Insert into libros_puntuaciones set id_libro=${req.body.idLibro}, id_perfil=${req.body.idPerfil}, puntuacion=${req.body.puntuacion}, comentario="${req.body.comentario}", status_comentario=0`;
    connection.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
            res.status(500).send({mensaje:"Ya dio su opinión de este libro"})
            return;
        }

        res.status(200).send({mensaje: "El comentario ha sido publicado con exito"});
    })
})

module.exports = router;