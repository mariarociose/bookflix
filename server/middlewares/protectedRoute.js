var express = require("express");
const protectedRoute = express.Router();
var jwt  = require("../configs/jwt");
var config = require('../configs/config');



protectedRoute.use((req,res,next)=> {

    var key;
    
    if(req.query.userType == 1){
        key = config.llaveUser;
    }else{
        key = config.llaveAdmin;
    }

    const token = req.headers["access-token"];
    console.log("Token del server");
    console.log(token);
    if(token){

        jwt.verify(token,key,(err,decoded) => {
            if(err){
                console.log(err)
                return res.send({mensaje: "Token invalida"})
            }else{
                req.decoded = decoded;
                next();
            }
        });

    }else{
        res.send({
            mensaje: "Token no proveido"
        })
    }

})

module.exports = protectedRoute;