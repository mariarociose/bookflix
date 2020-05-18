var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;


router.post('/',(req,res) => {

  console.log(req.body);

//  var query = "insert into libros SET isbn=('"+req.body.isbn+"'),titulo=('"+req.body.titulo+"'),fecha_vencimiento=('"+req.body.fecha_vencimiento+"'),portada_img=('"+req.body.portada_img+"'),id_autor=('"+req.body.autor+"'),id_editorial=('"+req.body.editorial+"'),id_genero=('"+req.body.genero+"')";
  var query = `insert into libros SET isbn='${req.body.isbn}',titulo=('${req.body.titulo}'),fecha_vencimiento=('${req.body.fecha_vencimiento}'),portada_img=('${req.body.portada_img}'),id_autor=('${req.body.autor}'),id_editorial=('${req.body.editorial}'),id_genero=('${req.body.genero}')`;
  console.log('insertando nuevo elemento');
  console.log(query)

  connection.query(query, function(err,result){
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
              mensaje: "El codigo de ISBN ya se encuentra en el sistema"
          }
        )

  }

  }
  else{

  console.log('nuevo elemento insertado');
  res.json(
      {
          mensaje: "Libro cargado con exito"
      }
    )
  }
}
  )




})
module.exports = router;
