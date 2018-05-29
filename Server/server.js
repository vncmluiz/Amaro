var definirExpress = require('./config/express');
var app = definirExpress();

app.listen(3000, function () {
    console.log("Servidor está rodando! Acesse localhost:3000");
    
});