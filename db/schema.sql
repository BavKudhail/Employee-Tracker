DROP DATABASE IF EXISTS eTracker_db;

-- CREATE DATABASE 
CREATE DATABASE eTracker_db;

-- USE DATABASE 
USE eTracker_db

-- CREATE DEPARTMENT TABLE 
CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- CREATE ROLE TABLE 
CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- CREATE EMPLOYEE TABLE 
CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL,
    FOREIGN KEY(manager_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);