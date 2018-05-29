drop database if exists amarovinicius;
create database amarovinicius;
use amarovinicius;

drop table if exists order_items;
drop table if exists orders;

create table orders (
	id INTEGER NOT NULL, 
    user_id VARCHAR(255), 
    order_date_original VARCHAR(16), 
    order_subtotal DECIMAL(14,2), 
    order_discount DECIMAL(14,2), 
    order_total DECIMAL(14,2), 
    order_status VARCHAR(255),
    payment_type VARCHAR(255), 
    shipping_cost DECIMAL(14,2), 
    shipping_service VARCHAR(255), 
    address_city VARCHAR(255), 
    address_state VARCHAR(255), 
    utm_source_medium VARCHAR(255), 
    device_type VARCHAR(255), 
    CONSTRAINT PRIMARY KEY(id)
);

create table order_items (
	id INTEGER NOT NULL, 
    order_id INTEGER NOT NULL, 
    sku VARCHAR(255), 
    quantity DECIMAL(14,2), 
    code_color VARCHAR(255), 
    CONSTRAINT PRIMARY KEY(id), 
    CONSTRAINT FOREIGN KEY(order_id) REFERENCES orders (id)
);

SET SQL_SAFE_UPDATES = 0;
SET @@session.time_zone = '+00:00';

LOAD DATA LOCAL INFILE "C:\\Users\\vmartinl\\Desktop\\Amaro\\Server\\bin\\Datasets\\SQLTables\\orders.csv"
INTO TABLE amarovinicius.orders
COLUMNS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;


LOAD DATA LOCAL INFILE "C:\\Users\\vmartinl\\Desktop\\Amaro\\Server\\bin\\Datasets\\SQLTables\\order_items.csv"
INTO TABLE amarovinicius.order_items
COLUMNS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;

ALTER TABLE orders 
ADD COLUMN order_date DATETIME;

UPDATE orders 
SET order_date = STR_TO_DATE(order_date_original, '%d/%m/%Y %H:%i');

ALTER TABLE orders 
DROP COLUMN order_date_original;

DELIMITER ;
DROP PROCEDURE IF EXISTS proc_GetTransactions;

DELIMITER $$
CREATE PROCEDURE proc_GetTransactions(p_StartDate INTEGER, p_EndDate INTEGER, p_aggregation INTEGER, p_DeviceType VARCHAR(255))
BEGIN 
	DROP TABLE IF EXISTS TransactionsInRange;
    CREATE TABLE TransactionsInRange AS
	SELECT	  d_Partition as d_Partition
			, FROM_UNIXTIME(MIN(d_DateAsTimestamp)) AS d_MinDateInPartition
			, d_Platform AS d_Platform
			, SUM(d_Transaction) as d_TotalTransactions
	  FROM
			(
				SELECT	  UNIX_TIMESTAMP(OD.order_date) DIV (60 * p_aggregation) AS d_Partition
						, UNIX_TIMESTAMP(OD.order_date) AS d_DateAsTimestamp
                        , OD.device_type AS d_Platform
						, 1 as d_Transaction
				  FROM	orders OD
				 WHERE	UNIX_TIMESTAMP(OD.order_date) BETWEEN p_StartDate AND p_EndDate
						AND CASE
								WHEN p_DeviceType = 'All' THEN 1 = 1
								ELSE LOWER(LTRIM(RTRIM(OD.device_type))) = LOWER(p_DeviceType)
						END
			) AS TransactionsInRange
	 GROUP BY
			d_Partition, d_DeviceType
	 ORDER BY
			1,3,2;
  
END $$