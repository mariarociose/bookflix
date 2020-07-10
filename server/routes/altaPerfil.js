var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.post("/", function(req, res){
    
    let query = `INSERT INTO perfiles set id_usuario=${req.body.userId}, nombre="${req.body.nombre}", avatar="${req.body.avatar}" ON DUPLICATE KEY UPDATE habilitado=1`
    console.log(query);
    console.log(req.body)
    connection.query(query, (err, rows, fields) => {

        if(err){
            console.log(err);
            
            if(err.errno == 1062){
                res.status(500).send({text: "Ya hay un perfil con ese nombre"})
            }else
                res.status(500).send({text: "Hubo un error"});
            return;
        }

       

        res.status(200).send({text: "El perfil ha sido creado con éxito"})
        
    })
})


router.put("/",function(req, res){
    let query = `UPDATE perfiles set nombre="${req.body.nombre}", avatar="${req.body.avatar}" where (id_usuario=${req.body.userId} AND id_perfil=${req.body.perfilId})`;
    console.log(query);
    connection.query(query, (err, rows, fields) => {

        if(err){
            console.log(err);
            if(err.errno == 1062){
                res.status(500).send({text: "Ya hay un perfil con ese nombre"})
            }else{
                res.status(500).send({text: "Hubo un error"})
                
            }
            return
        }

        res.status(200).send({text: "El perfil ha sido modificado con exito"})

    })

})



module.exports = router;