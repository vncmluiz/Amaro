const alasql = require('alasql');
const returnEvents = require('../model/eventsList.js');
const returnProducts = require('../model/productsList.js');


function getCTR(productsDAO, startDate, endDate, aggregation, platform, product) {

    //  ---- NOT IMPLEMENTED ---- //
    // let ProductsList;
    // let EventsList;

    // returnProducts(productsDAO, startDate, endDate, aggregation, platform, product);

    // function waitForResponse(callback) {
    //     ProductsList = returnProducts(productsDAO, startDate, endDate, aggregation, platform, product);
    //     EventsList = returnEvents(startDate, endDate, aggregation, platform, product);

    //     callback()
    // }

    // function applyAggregation(){

    //     console.log(ProductsList);
    //     console.log(EventsList);
        
    //     var result = alasql(
    //         'SELECT T1.d_MinDateInPartition, T1.d_Platform, T1.d_TotalTransactions, T2.d_TotalEvents, T1.d_TotalTransactions / T2.d_TotalEvents \
    //            FROM ? AS T1 \
    //                 INNER JOIN ? AS T2 \
    //                 ON T1.d_Partition = T2.d_Partition \
    //                 AND T1.d_Platform = T2.d_Platform \
    //           LIMIT 5'
    //           , [ProductsList, EventsList]
    //     );

    //     return result;                    

    // }

    // waitForResponse(applyAggregation);
}

module.exports = getCTR;