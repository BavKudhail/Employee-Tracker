DROP DATABASE eTracker_db;

CREATE DATABASE eTracker_db;

USE eTracker_db

-- DEPARTMENT TABLE 
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)


-- ROLE TABLE
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,

)


-- EMPLOYEE TABLE 
CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,

)