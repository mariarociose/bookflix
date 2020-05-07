var express = require("express");
var router = express.Router();
var db = require("../configs/db");
var jwt  = require("../configs/jwt");
var config = require("../configs/config");
var connection = db.connection;




router.post("/",(req,res) => {
    console.log(req.body);
    var key;
    let query = "SELECT * FROM ";
    let commonQuery = "WHERE email='"+req.body.email+"' AND password='"+ req.body.password+"'";
    if(req.body.userType == 1){
        query += "usuarios "
        key = config.llaveUser;
    }else{
        query += "administradores "
        key = config.llaveAdmin;
    }
    query += commonQuery;
    console.log(query);    
    connection.query(query, (err,rows,fields) => {

        if(err){
            console.log(err);
            res.status(500);
            return;
        }

        
        let response = rows;
       

        if(response[0] != undefined){
            
            
            console.log("existe un usuario");
            
            const payload = {
                check: true,
                
            };
    
            const token = jwt.sign(payload,key,{expiresIn: 1440});
            console.log("Token del cliente");
            console.log(token);
            res.json(
                {
                    mensaje: "Autenticacion correcta",
                    user: response[0],
                    userType: req.body.userType,
                    token: token
                }
    
            );
                
        } else {
            console.log("no")
            res.json({
                mensaje: "Usuario o contraseña incorrecto",
                user: null  
                    });
            
        }




    });


    
    

})

module.exports = router;