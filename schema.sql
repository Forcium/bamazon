CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price FLOAT(7, 2) NOT NULL,
    stock_quantity INTEGER(7) NOT NULL,
	PRIMARY KEY (item_id)
);

DESCRIBE products;

DROP TABLE products;

SELECT * FROM products;

-- 1
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Sweater',
	'Clothes',
	39.99,
	25
);

-- 2
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Jacket',
	'Clothes',
	49.99,
	30
);

-- 3
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'T-Shirt',
	'Clothes',
	19.99,
	50
);

-- 4
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Shoes',
	'Clothes',
	79.99,
	45
);

-- 5
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Macbook',
	'Electronics',
	999.99,
	20
);

-- 6
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'iPad',
	'Electronics',
	499.99,
	100
);

-- 7
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Asus Laptop',
	'Electronics',
	399.99,
	10
);

-- 8
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Sofa',
	'Furniture',
	299.99,
	15
);

 -- 9
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Desk',
	'Furniture',
	99.99,
	30
);

-- 10
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (
	'Bed',
	'Furniture',
	399.99,
	5
);

USE bamazonDB;

CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT,
	department_name VARCHAR(30) NOT NULL,
	overhead FLOAT(11,2) NOT NULL,
	total_sales FLOAT(11,2) NOT NULL,
	PRIMARY KEY (department_id)
);

DESCRIBE departments;

DROP TABLE departments;

SELECT * FROM departments;

INSERT INTO departments (department_name, overhead, total_sales) VALUES (
'Clothes',
10000,
0);

INSERT INTO departments (department_name, overhead, total_sales) VALUES (
'Electronics',
50000,
0);

INSERT INTO departments (department_name, overhead, total_sales) VALUES (
'Furniture',
100000,
0);
