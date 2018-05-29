const express = require('express');
const expressLoad = require('express-load');
const bodyParser = require('body-parser');

function definirExpress () {

    let app = express();

    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    expressLoad('infra', {cwd: './app'})
        .then('routes')
        .into(app);


    return app;
}

module.exports = definirExpress;