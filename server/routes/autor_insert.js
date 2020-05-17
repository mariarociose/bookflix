var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;

router.post('/',(req,res) => {
//INSERT INTO table_name (column1, column2, column3, ...)
//VALUES (value1, value2, value3, ...);
    console.log(req.body);
    //var query = "INSERT INTO editoriales SET desc_editorial='prueba'";
    var query = "insert into autores SET nombre=('"+req.body.nombre+"'), apellido=('"+req.body.apellido+"')";
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
                mensaje: "El Autor ya se encuentra en el sistema"
            }
          )

    }

    }
    else{

    console.log('nuevo elemento insertado');
    res.json(
        {
            mensaje: "Autor cargado con exito"
        }
      )
    }
  }
)
})


module.exports = router;
