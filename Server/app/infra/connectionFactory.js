const sql = require("mysql");

function dbConnection() {
    // config for your database
    var config = {
        user: 'root',
        password: 'admin',
        server: "localhost",
        database: "amarovinicius"            
    };

    let connection =  sql.createConnection(config);

    return connection;
}


module.exports = function() {
    return dbConnection;
}	