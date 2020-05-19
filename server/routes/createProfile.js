var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.post('/',(req,res) => {

    console.log(req.body);
    //var query = "INSERT INTO editoriales SET desc_editorial='prueba'";


    var query = `INSERT INTO usuarios SET nombre=('${req.body.nombre}'),apellido=('${req.body.apellido}'),password=('${req.body.password}'),email=('${req.body.email}'),tarjeta_titular='${req.body.tarjeta_titular}', tarjeta_dni='${req.body.tarjeta_dni}', tarjeta_numero='${req.body.tarjeta_numero}', tarjeta_ccv='${req.body.tarjeta_ccv}', tarjeta_tipo_id='${req.body.tarjeta_tipo_id}', tarjeta_mes='${req.body.mesVencimiento}', tarjeta_anio='${req.body.anioVencimiento}'`;

    console.log('insertando nuevo elemento');
    console.log(query)
    connection.query(query, function(err,result){
    if(err){
      if(err.errno==500){
          res.status(500).send({mensaje:"El mail ya esta en uso"});
          // 1062 es el codigo de error de mysql para duplicate entry
          return;
        }
      if(err.errno==1062){
        // 1062 es el codigo de error de mysql para duplicate entry
          console.log('Duplicado');
          res.json(
              {
                  mensaje: "El email ya se encuentra en el sistema"
              }
            )

      }

      }
      else{

        console.log('nuevo usuario insertado');
        res.json(
            {
                mensaje: "Usuario cargado con exito"
            }
          )
        }
      })

})

module.exports = router;
