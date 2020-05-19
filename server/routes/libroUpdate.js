var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.put("/", function(req,res){
    var query = `update libros set isbn="${req.body.isbn}", titulo="${req.body.titulo}", fecha_vencimiento="${req.body.Fecha_vencimiento}", id_autor="${req.body.autor}", id_editorial="${req.body.editorial}", id_genero="${req.body.genero}" WHERE id_libro="${req.body.id}"`
    console.log(req.body)
    console.log(query)
    connection.query(query,function(err,rows,fields){
      if(err){
    if(err.errno==500){
        res.status(500).send('Hubo un error');
        // 1062 es el codigo de error de mysql para duplicate entry
        return;
      }
    if(err.errno==1062){
      // 1062 es el codigo de error de mysql para duplicate entry
        console.log('Duplicado');
        res.json(
            {
                mensaje1: "El codigo de ISBN ya se encuentra en el sistema"
            }
          )

    }

    }
    else{

    console.log('elemento modificado');
    res.json(
        {
            mensaje1: "Libro actualizado con exito"
        }
      )
    }

    }

  )

})

module.exports = router;
