USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(4,2) NOT NULL,
  stock_quantity MEDIUMINT NOT NULL,
  PRIMARY KEY (item_id)
)
