//const getCTR = require('../model/ctr.js')
const returnEvents = require('../model/eventsList.js')
const alasql = require('alasql');

function routeProducts(app) {
    
    app.get('/products/summary', function (req, res) {

        res.format({
            html: function () {
                getCTR(app, req, res, 'GET', 'browser');
                
            },
            json: function() {
                getCTR(app, req, res, 'GET', 'browser');
                
            }
        });
        
    });

    app.post('/products/summary', function (req, res) {
        res.format({
            html: function () {
                getCTR(app, req, res, 'POST', 'pageRendered');

            },
            json: function () {
                getCTR(app, req, res, 'POST', 'browser');
            }
        });


    });
}

function getCTR(app, request, response, method, returnType) {
    let conn = app.infra.connectionFactory();
    let productsDAO = new app.infra.ProductsDAO(conn);

    let ProductsList;
    let EventsList;
    let ResultMessage = [];

    let startDate;
    let endDate;
    let aggregation;
    let platform;
    let product;

    switch (method) {
        case 'GET':
            startDate = request.query.startdate;
            endDate = request.query.enddate;
            aggregation = request.query.aggregation;
            platform = request.query.platform;
            product = request.query.product;

            break;

        case 'POST':
            startDate = request.body.startdate;
            endDate = request.body.enddate;
            aggregation = request.body.aggregation;
            platform = request.body.platform;
            product = request.body.product;
            
            break;            
    
        default:
            response.send("Not a valid HTTP request");
    }

    function retornoProduto(callback){
        productsDAO.getSummary(startDate, endDate, aggregation, platform, null, function (err, result) {
            ProductsList = result;
            callback();
        });
    };

    EventsList = returnEvents(startDate, endDate, aggregation, platform);

    function applyAggregation(){

        let result = alasql(
            'SELECT T1.d_MinDateInPartition, T1.d_Platform, T1.d_TotalTransactions, T2.d_TotalEvents, T1.d_TotalTransactions / T2.d_TotalEvents as d_CTR \
                FROM ? AS T1 \
                    INNER JOIN ? AS T2 \
                    ON T1.d_Partition = T2.d_Partition \
                    AND T1.d_Platform = T2.d_Platform \
                LIMIT 5'
                , [ProductsList, EventsList]
        );

        for (let index = 0; index < result.length; index++) {
            ResultMessage.push({
                timestamp : result[index].d_MinDateInPartition,
                platform : result[index].d_Platform,
                product : '',
                CTR : result[index].d_CTR
            });
        }
    
        switch (returnType) {
            case 'browser':
                response.send(ResultMessage);
                break;

            case 'pageRendered':
                response.render('viewProducts', { productsEvents: ResultMessage});
                break;
            default:
                console.log(ResultMessage);
                break;
        }
        
        
    }

    retornoProduto(applyAggregation);
}

module.exports = routeProducts;