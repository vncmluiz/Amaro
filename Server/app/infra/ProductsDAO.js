function ProductsDAO(connection) {
    this._connection = connection;
}

ProductsDAO.prototype.getSummary = function(startTime, endTime, aggregation, platform, product = null, callback) {

    this._connection.query(`CALL proc_GetTransactions(${startTime}, ${endTime}, ${aggregation}, '${platform}')`);
    this._connection.query("SELECT * FROM TransactionsInRange", callback);
}

module.exports = function() {
    return ProductsDAO;

}   