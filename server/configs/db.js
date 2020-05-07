var mysql = require("mysql");


var connectionToDatabase = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: 'bookflix'
})

module.exports = {
    
    connectToDb: connectionToDatabase.connect(function(err){
        if(err){
            console.log(err)
        }
    }),
    connection : connectionToDatabase
}