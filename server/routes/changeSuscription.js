var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;



router.put("/", function(req, res){
    let query = `UPDATE usuarios SET tipo_suscripcion=${req.body.tipo} where id_usuario=${req.body.userId}`
    connection.query(query, (err, rows, fields) => {
        console.log(query);
        if(err){
            console.log(err);
            return null;
        }
        let newState;
       
        res.status(200).send({state:req.body.tipo})
    })
})

module.exports = router;