INSERT INTO department(name)
VALUES
("Marketing"),
("Sales"),
("Finance"),
("Engineering"),
("Design"),
("HR");

INSERT INTO role(title, salary, department_id)
VALUES
-- MARKETING ROLES
("Head of Marketing", 50000, 1),
("Marketing Assistant", 25000, 1),
-- SALES ROLES
("Head of Sales", 50000, 2),
("Sales Assistant", 25000, 2),
-- FINANCE ROLES
("Head of Finance", 30000, 3),
("Accountant", 25000, 3),
-- ENGINEERING ROLES
("Lead Engineer", 50000, 4),
("Software Engineer", 30000, 4),
-- DESIGN ROLES
("Senior Product Designer", 30000, 5),
("Junior Product Designer", 25000, 5),
-- HR ROLES
("Recruitment Manager", 25000, 6),
("Recruitment Consultant", 25000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Sarah", "Parker", 1, NULL), 
("James","Lee", 2, 1),
("Arun","Singh", 3, NULL),
("Dav", "Kudhail", 4, 2),
("Peter", "Parker", 5, NULL),
("Hannah", "Millar", 6, 4),
("Bav", "Kudhail", 7, NULL),
("Yavor", "Ivanov", 8, 4),
("Mia", "Malora", 9, NULL),
("John", "Doe", 10, 4), 
("Polly","Smith", 11, NULL),
("Thomas","Shelby", 12, 5);

