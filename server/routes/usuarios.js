var express = require("express");
var router  = express.Router();

router.get('/', function(req,res){
    
    var query = "Select * from usuarios";
    console.log('tratando de hacer fetch');
    connection.query(query, function(err,rows,fields){
    if(err){
        res.status(500).send('Hubo un error');
        return;
    }
        res.status(200).send(rows);
    });
})

module.exports = router;