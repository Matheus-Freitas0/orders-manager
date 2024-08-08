DROP DATABASE db_ecommerce;

CREATE DATABASE IF NOT EXISTS db_ecommerce;

USE db_ecommerce;

DROP TABLE IF EXISTS products_orders;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS categories;

CREATE TABLE customers (
	id					INT 			NOT NULL PRIMARY KEY AUTO_INCREMENT	,
	first_name			VARCHAR(255)	NOT NULL							,
	customer_document	VARCHAR(30)		NOT NULL
)

CREATE TABLE categories (
	id 		INT 			NOT NULL PRIMARY KEY AUTO_INCREMENT	,
	name 	VARCHAR(255)	NOT NULL
)

CREATE TABLE products (
	id			INT 			NOT NULL PRIMARY KEY AUTO_INCREMENT	,
	code 		VARCHAR(50) 	NOT NULL UNIQUE						,
	name 		VARCHAR(255) 	NOT NULL UNIQUE						,
	value 		DECIMAL(8,2) 	NOT NULL							,
    active      BOOL            NOT NULL DEFAULT true               ,
	stock 		INT 			NOT NULL DEFAULT 0 					,
	category_id	INT 			NOT NULL							,
	CONSTRAINT KF_category_id FOREIGN KEY (category_id) REFERENCES categories(id)	 	
)

CREATE TABLE orders (
	id					INT 												NOT NULL PRIMARY KEY AUTO_INCREMENT	,
	code 				VARCHAR(50) 										NOT NULL UNIQUE						,
	created				TIMESTAMP 											NOT NULL DEFAULT NOW()				,
	status 				ENUM('CANCELLED', 'AWATING_PAYMENT', 'FINISHED')	NOT NULL DEFAULT 'AWATING_PAYMENT'	,
	status_payment		ENUM('NOT_PAID', 'PAID') 							NOT NULL DEFAULT 'NOT_PAID'			,
	payment_method		ENUM('CASH', 'CREDIT', 'PIX', 'DEBIT') 				NULL								,
	customer_id			INT 												NOT NULL							,
	CONSTRAINT KF_customer_id FOREIGN KEY (customer_id) REFERENCES customers(id)
)

CREATE TABLE products_orders (
	product_id 			INT 			NOT NULL									,
	order_id 			INT 			NOT NULL									,
	quantity 			INT 			NOT NULL									,
	discount_percent	DECIMAL (4,2)	NOT NULL DEFAULT 0							,
	total 				DECIMAL(8,2) 	NOT NULL									,
	PRIMARY KEY (product_id, order_id)												,
	CONSTRAINT FK_product_id	FOREIGN KEY (product_id)	REFERENCES products(id)	,
	CONSTRAINT KF_order_id 		FOREIGN KEY (order_id)		REFERENCES orders(id)
)
