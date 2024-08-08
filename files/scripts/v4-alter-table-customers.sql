ALTER TABLE customers CHANGE `first_name` `name` VARCHAR(255) NOT NULL;
ALTER TABLE customers CHANGE `customer_document` `document` VARCHAR(30) NOT NULL UNIQUE;

CREATE INDEX idx_customers_document ON customers (document);