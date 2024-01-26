-- Table Userlogin
CREATE TABLE userlogin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)

-- User Login Dump Dev
INSERT INTO userlogin (username, password) VALUES
    ('userdev', '$2b$10$RDvJu3NsWNFXudWcB8ARf.vE3Yfy3xi6s.r920Xhm7/ad5m1ABPxy');
   

-- Table Category
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    percentage DECIMAL NOT NULL
);

-- Category Dump Dev
INSERT INTO category (name, percentage) VALUES
    ('Informática', 5),
    ('Automotivo', 2.5),
    ('Móveis', 1);
   
-- Table Product
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES category(id),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    value DECIMAL NOT NULL
);

-- Product Dump Dev
INSERT INTO product (category_id, name, description, value) VALUES
    (1, 'Playstation 5', 'Sony Video Game', 5.000),
    (2, 'Tire', 'Michelin Tire', 400),
   	(3, 'Chair', 'Wassily Chair', 1000);
