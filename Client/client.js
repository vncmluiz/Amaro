var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/products/summary',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log('Corpo:' + body);
    });
});

var requestCTR = {
    startdate: 1454284800,
    enddate: 1454371199,
    aggregation: 10,
    platform: 'MobileWeb',
    product: 'vazio'
}

client.end(

    
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
    })
);


//client.end(JSON.stringify(requestCTR));