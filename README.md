# 12 SQL: Employee Tracker

## The Motivation

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role ✅

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids ✅

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role ✅

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to ✅

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database ✅

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database ✅

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database ✅

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database ✅
```

## Technologies Used

- Javascript
- Inquirer
- MySQL
- Node.JS

## Installation

1. Clone the repository

```
https://github.com/BavKudhail/Employee-Tracker.git
```

2. Change the working directory

```
cd employee-tracker
```

4. Install dependencies

```
npm i
```

6. Run the app

```
node index.js
```

## Usage

```
To use the employee tracker type node index.js in the terminal and follow the prompts
```

## Screenshot

![terminal screenshot](https://raw.githubusercontent.com/BavKudhail/Read-Me-Generator/main/assets/images/screenshot.JPG)

## Walkthrough

https://user-images.githubusercontent.com/93915846/155854603-056e4ccb-589e-4c17-ba03-c71c40e418d0.mp4

## Contributing

There are no guidelines for contributing at this time.

## Tests

There is no test information for this application at this time.

## Questions

If you have any questions about this project please feel free to email me @ bavkudhail@gmail.com. You can also view more of my projects here https://www.github.com/bavkudhail
