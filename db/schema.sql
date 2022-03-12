DROP DATABASE eTracker_db;

CREATE DATABASE eTracker_db;

USE eTracker_db

-- DEPARTMENT TABLE 
CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT 
);


CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);