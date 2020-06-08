var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var connection = db.connection;

router.get("/", function(req,res){

    let query = `select count(id_trailer) from trailers where id_libro=${req.query.id}`;
    console.log(query)
    connection.query(query,(err,rows,field) => {
        if(err){
            console.log("Hubo un error");
            console.log(err)
            return;
        }

        let cant = rows[0]['count(id_trailer)'];
        console.log(cant);
        res.send({'cantidad': cant})


    })

})

module.exports = router;
