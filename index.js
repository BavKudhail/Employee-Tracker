// node modules
const inquirer = require("inquirer");
const figlet = require("figlet");
const connection = require("./config/connection");
const cTable = require("console.table");
const res = require("express/lib/response");

// If connection is successful display logo
connection.connect((err) => {
  if (err) throw err;
  //   show logo
  logo();
});

// Once logo is displayed run prompt
function logo() {
  figlet("Employee Database!!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
    runPrompt();
  });
}

// Run prompt
const runPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do today?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View Budget",
          "None",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.action) {
        //   cases
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees By Department":
          viewEmployeesByDept();
          break;

        case "View All Employees By Manager":
          viewEmployeeByManager();

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "Delete Department":
          deleteDept();
          break;

        case "Delete Role":
          deleteRole();
          break;

        case "Delete Employee":
          deleteEmployee();
          break;

        case "View Budget":
          viewBudget();
          break;

        case "None":
          // end
          figlet("Goodbye!", function (err, data) {
            if (err) {
              console.log("Something went wrong...");
              console.dir(err);
              return;
            }
            console.log(data);
            runPrompt();
          });

          connection.end();
      }
    });
};

// FUNCTIONS

// Function to view all departments
function viewAllDepartments() {
  const sql = `SELECT 
  department.id AS ID,
  department.name AS Department
  FROM
  department
  `;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    runPrompt();
  });
}

// Function to view all roles
function viewAllRoles() {
  const sql = `SELECT 
    role.title AS Job_Title,
    role.id AS Role_ID,
    department.name AS department,
    role.salary
    FROM
    role
    JOIN department ON role.department_id = department.id
  `;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    runPrompt();
  });
}

// Function to view all employees
function viewAllEmployees() {
  const sql = `SELECT 
    employee.id AS ID,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    role.title AS Job_Title,
    department.name AS Department,
    role.salary AS Salary,
    CONCAT (manager.first_name, " ", manager.last_name) AS Reporting_Manager
    FROM 
    employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager on employee.manager_id = manager.id
    `;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    runPrompt();
  });
}

// Function to add department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What department would you like to add?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please enter a valid department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log(`Added ${answer.addDept} to departments!`);
        viewAllDepartments();
      });
    });
}

// Function to add role
function addRole() {
  // inquirer prompt for adding a new role
  inquirer
    //   role title
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What role title would you like to add?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a valid role");
            return false;
          }
        },
      },
      //   role salary
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
        validate: (addSalary) => {
          if (isNaN(addSalary)) {
            console.log("Please enter a valid salary (numbers only)");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((answer) => {
      // create array using destructuring
      const inputs = [answer.role, answer.salary];
      console.log(inputs);

      //   SQL to get department information
      const deptSql = `SELECT
      name, 
      id
      FROM
      department`;

      connection.query(deptSql, (err, data) => {
        if (err) throw err;
        console.log(data);

        // functional loop to create a list of departments
        const deptartments = data.map(({ name, id }) => ({
          name: name,
          value: id,
        }));

        // inquirer prompt to select department
        inquirer
          .prompt([
            {
              type: "list",
              name: "dept",
              message: "What department is this role in?",
              choices: deptartments,
            },
          ])
          .then((choice) => {
            //   push the selected department into the input array
            const dept = choice.dept;
            inputs.push(dept);

            // sql query with dynamic options
            const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;

            connection.query(sql, inputs, (err, result) => {
              if (err) throw err;
              console.log(`Added ${answer.role} to roles!`);
              viewAllRoles();
            });
          });
      });
    });
}

// Function to view add an employee
function addEmployee() {
  // inquirer prompt
  inquirer
    .prompt([
      //   employee first name
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log("Please enter a valid first name");
            return false;
          }
        },
      },
      // employee last name
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log("Please enter a valid last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      // create input array
      const inputs = [answer.firstName, answer.lastName];

      //   SQL query to get role information
      const roleSql = `SELECT
      role.id,
      role.title
      FROM role`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err;

        // functional loop to create a list of roles
        const roles = data.map(({ id, title }) => ({
          // has to be name and value, WHY???
          name: title,
          value: id,
        }));

        console.log(roles);

        // inquirer prompt to select role
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the role of the employee?",
              choices: roles,
            },
          ])
          .then((selection) => {
            //   push selection to inputs array
            const role = selection.role;
            inputs.push(role);

            const managerSql = `SELECT * FROM employee`;

            // sql query to get all employee data
            connection.query(managerSql, (err, data) => {
              if (err) throw err;

              //   functional loop to get names of all employees
              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              //   inquirer prompt to select a manager
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager of this employee?",
                    choices: managers,
                  },
                ])
                .then((managerSelection) => {
                  // push chosen manager to input array
                  const manager = managerSelection.manager;
                  inputs.push(manager);

                  // SQL query
                  const managerSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                  VALUES (?, ?, ?, ?)`;

                  connection.query(managerSql, inputs, (err, result) => {
                    if (err) throw err;
                    console.log("You have successfully added a new employee!");

                    // execute view all employees function
                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
}

// const roleArr = [];

// function updateRolesArray() {
//   const sql = `SELECT * FROM role`;
//   connection.query(sql, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.forEach((role) => {
//         let roleParams = {
//           name: role.title,
//           value: role.id,
//         };
//         roleArr.push(roleParams);
//       });
//     }
//   });
// }

// function updateEmployeeRole() {
//   updateRolesArray();

// }

// Function to update employee role
function updateEmployeeRole() {
  const employeeSql = `
    SELECT * FROM employee
  `;
  connection.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employee = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    // inquirer prompt to select an employee
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Please select the employee that you wish to update",
          choices: employee,
        },
      ])
      .then((employeeSelection) => {
        const employee = employeeSelection.employee;
        // employee number 7
        console.log(employee);

        // const inputs = [];
        // inputs.push(employee);

        const roleSql = `SELECT
        * FROM role`;

        // sql query to get all possible roles
        connection.query(roleSql, (err, data) => {
          if (err) throw err;

          // get employee role
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "Please select the new role of the employee",
                choices: roles,
              },
            ])
            .then((roleSelection) => {
              const role = roleSelection.role;
              console.log(role);

              console.log(
                `Here is the employee ${employee} and here is the role ${role}`
              );

              const updateSql = 
              `
              UPDATE employee SET role_id=${role} WHERE id=${employee}
              `;

              connection.query(updateSql, (err, result) => {
                if (err) throw err;
                console.log("Employee has been updated");
                viewAllEmployees();
                // show the updated employee role on screen
              });
            });
        });
      });
  });
}

// ======================================================= BONUS FUNCTIONALITY ===========================================

// ============ DEBUG ============================
// Function to update employee manager

function updateEmployeeManager() {
  const employeeSql = `SELECT * FROM employee`;
  connection.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((employeeSelection) => {
        const employee = employeeSelection.employee;
        const inputs = [];
        inputs.push(employee);

        const managerSql = `SELECT * FROM employee`;

        connection.query(managerSql, (err, data) => {
          if (err) throw err;
          const managers = data.map(({ id, first_name, last_name }) => ({
            name: first_name + " " + last_name,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "name",
                message: "Which is the manager of the employee?",
                choices: managers,
              },
            ])
            .then((managerSelection) => {
              const manager = managerSelection.manager;
              inputs.push(manager);
              //
              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              connection.query(sql, inputs, (err, result) => {
                if (err) throw err;
                console.log("Employee's Manager has been successfully updated");
                viewAllEmployees();
              });
            });
        });
      });
  });
}
// ============ DEBUG ============================

// Function to view employee by manager
function viewEmployeeByManager() {}

// Function to view employees by department
function viewEmployeesByDept() {
  // View employees by department
  // 1 - Select a department

  //   SQL to get department information
  const deptSql = `SELECT
      name, 
      id
      FROM
      department`;

  connection.query(deptSql, (err, data) => {
    if (err) throw err;
    console.log(data);

    // functional loop to create a list of departments
    const department = data.map(({ name, id }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "Please select the department you wish to view",
          choices: department,
        },
      ])
      .then((selection) => {
        const department = selection.dept;

        const sql = `SELECT * FROM employee WHERE role_id = ?`;

        connection.query(sql, department, (err, result) => {
          if (err) throw err;
          console.log("Showing all employees from your selected department");
          console.table(result);
        });
      });
  });
}

// Function to view employee by manager
function viewEmployeeByManager() {
  //   SQL query
  const managerSQL = `
  SELECT * FROM employee
  `;
  // creating a connection
  connection.query(managerSQL, (err, data) => {
    if (err) throw err;

    const managers = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    // inquirer prompt
    inquirer
      .prompt([
        {
          type: "list",
          name: "manager",
          message: "Which manager would you like to select?",
          choices: managers,
        },
      ])
      .then((managerSelection) => {
        const manager = managerSelection.manager;
        const sql = `SELECT * FROM employee WHERE manager_id=?`;
        connection.query(sql, manager, (err, result) => {
          if (err) throw err;
          console.table(result);
          runPrompt();
        });
      });
  });
}

function deleteDept() {
  console.log("Execute Delete Department");
  // SQL query to get departments
  const deptSQL = `SELECT * FROM department`;

  // connect to database
  connection.query(deptSQL, (err, data) => {
    if (err) throw err;

    const department = data.map(({ name, id }) => ({
      name: name,
      value: id,
    }));

    // prompt to select the department
    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "Please select the department you wish to delete",
          choices: department,
        },
      ])
      .then((selection) => {
        const department = selection.dept;

        const sql = `DELETE FROM department WHERE id = ?`;
        connection.query(sql, department, (err, result) => {
          if (err) throw err;
          console.log("Department has been successfully deleted");
          viewAllDepartments();
        });
      });
  });
}

function deleteRole() {
  console.log("Execute Delete Role");
  // delete role
  const roleSql = `SELECT * FROM role`;

  connection.query(roleSql, (err, data) => {
    if (err) throw err;

    const roles = data.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Please select the role you wish to delete",
          choices: roles,
        },
      ])
      .then((roleSelection) => {
        const role = roleSelection.role;
        const sql = `DELETE FROM role WHERE id = ?`;
        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log("Role has been deleted from database");
          viewAllRoles();
        });
      });
  });
}

function deleteEmployee() {
  console.log("Execute Delete Employee");
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Please select the employee you wish to delete",
          choices: employees,
        },
      ])
      .then((employeeSelection) => {
        const employee = employeeSelection.employee;
        const sql = `DELETE FROM employee WHERE id = ?`;
        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Employee has been successfully deleted");
          viewAllEmployees();
        });
      });
  });
}

function viewBudget() {
  // 1 - SELECT THE DEPARTMENT
  const departmentSql = `SELECT * FROM department`;
  connection.query(departmentSql, (err, data) => {
    if (err) throw err;

    const departments = data.map(({ id, name }) => ({ name: name, value: id }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message:
            "Please select the department you would like to the budget from",
          choices: departments,
        },
      ])
      .then((departmentSelection) => {
        const department = departmentSelection.dept;
        console.log(department);
        const budgetSql = `SELECT SUM(salary) AS Total_Budget FROM role WHERE department_id = ?`;
        connection.query(budgetSql, department, (err, result) => {
          if (err) throw err;
          console.log("Here are the total salaries for your chosen department");
          console.table(result);
        });
      });
  });
}
