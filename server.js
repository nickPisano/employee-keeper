const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'abc123',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const serverLogo = () => {
  console.log(`
▄████████   ▄▄▄▄███▄▄▄▄      ▄███████▄  ▄█        ▄██████▄  ▄██   ▄      ▄████████    ▄████████         ▄█   ▄█▄    ▄████████    ▄████████    ▄███████▄    ▄████████    ▄████████ 
███    ███ ▄██▀▀▀███▀▀▀██▄   ███    ███ ███       ███    ███ ███   ██▄   ███    ███   ███    ███        ███ ▄███▀   ███    ███   ███    ███   ███    ███   ███    ███   ███    ███ 
███    █▀  ███   ███   ███   ███    ███ ███       ███    ███ ███▄▄▄███   ███    █▀    ███    █▀         ███▐██▀     ███    █▀    ███    █▀    ███    ███   ███    █▀    ███    ███ 
▄███▄▄▄     ███   ███   ███   ███    ███ ███       ███    ███ ▀▀▀▀▀▀███  ▄███▄▄▄      ▄███▄▄▄           ▄█████▀     ▄███▄▄▄      ▄███▄▄▄       ███    ███  ▄███▄▄▄      ▄███▄▄▄▄██▀ 
▀▀███▀▀▀     ███   ███   ███ ▀█████████▀  ███       ███    ███ ▄██   ███ ▀▀███▀▀▀     ▀▀███▀▀▀          ▀▀█████▄    ▀▀███▀▀▀     ▀▀███▀▀▀     ▀█████████▀  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
███    █▄  ███   ███   ███   ███        ███       ███    ███ ███   ███   ███    █▄    ███    █▄         ███▐██▄     ███    █▄    ███    █▄    ███          ███    █▄  ▀███████████ 
███    ███ ███   ███   ███   ███        ███▌    ▄ ███    ███ ███   ███   ███    ███   ███    ███        ███ ▀███▄   ███    ███   ███    ███   ███          ███    ███   ███    ███ 
██████████  ▀█   ███   █▀   ▄████▀      █████▄▄██  ▀██████▀   ▀█████▀    ██████████   ██████████        ███   ▀█▀   ██████████   ██████████  ▄████▀        ██████████   ███    ███ 
                                        ▀                                                               ▀                                                               ███    ███                                                                      
`);
};

const serverLpr = () => {
  serverLogo();
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
      },
    ])
    .then(res => {
      switch (res.choice) {
        case "View All Employees":
          viewEmployee()
          break;

        case "Add Employees":
          addEmployee()
          break;

        case "Update Employee Role":
          updateEmployee()
          break;

        case "View All Roles":
          viewRoles()
          break;

        case "Add Role":
          addRoles()
          break;

        case "View All Departments":
          viewDepartments()
          break;

        case "Add Department":
          addDepartments()
          break;

        case "Quit":
          finishPrompt()
          break;
      }
    })
}

function viewEmployee() {
  const sql = `
  SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ' ,m.last_name) AS Manager
  FROM employee e 
  LEFT JOIN employee m 
  ON e.manager_id = m.id
  JOIN role
  ON e.role_id = role.id
  JOIN department
  ON role.department_id = department.id;
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\n")
      console.table(rows)
    }
    console.log("\n")
    serverLpr();
  });
}

function addEmployee() {
  const sql = `
        SELECT employee.id, first_name, last_name, title, role.id FROM employee
        JOIN role ON employee.role_id = role.id; `;

  const sql2 = `
        SELECT id, title
        FROM role;
        `;

  let roleInp = []
  let roleInpId = []
  let mngerInp = []
  let mngerInpId = []

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    mngerInp = rows;
    mngerInpId = mngerInp.map(element => {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id
      }
    })
    mngerInpId.unshift({ name: "none", value: null });
    db.query(sql2, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      roleInp = rows
      roleInpId = roleInp.map(element => {
        return {
          name: element.title,
          value: element.id
        }
      })
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
          },
          {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
          },
          {
            type: 'list',
            name: 'roleChoice',
            message: "What is the employee's role?",
            choices: roleInpId
          },
          {
            type: 'list',
            name: 'managerChoice',
            message: "Who is the employee's manager?",
            choices: mngerInpId
          },
        ])
        .then(res => {
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
          const params = [res.firstName, res.lastName, res.roleChoice, res.managerChoice];

          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            serverLpr();
          })
        });
    });
  });
}

function updateEmployee() {

  const sql = `
        SELECT employee.id, first_name, last_name, title, role.id 
        FROM employee
        JOIN role ON employee.role_id = role.id;`;
  let roleInp = []
  let roleInpId = []
  let employeeInp = []
  let employeeInpId = []

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    employeeInp = rows
    employeeInpId = employeeInp.map(element => {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id
      }
    })
    roleInp = rows
    roleInpId = roleInp.map(element => {
      return {
        name: element.title,
        value: element.id
      }
    })
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employeeName',
          message: "Which employee's role do you want to update?",
          choices: employeeInpId,
        },
        {
          type: 'list',
          name: 'roleChoice',
          message: "Which role do you want to assign the selected employee?",
          choices: roleInpId,
        },
      ])
      .then(res => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

        const params = [res.roleChoice, res.employeeName];

        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          serverLpr()
        })
      });
  });
}

function addRoles () {
  const sql = `SELECT id, name FROM department `;
  let departmentInp = []
  let departmentInpId = []
  
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    departmentInp = rows
    departmentInpId = departmentInp.map(element => {
      return {name: element.name, value: element.id}
      })
      inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleName',
          message: 'What is the name of the role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
        },          {
          type: 'list',
          name: 'departmentChoice',
          message: 'Which department does the role belong to?',
          choices: departmentInpId
        },
      ])
      .then(res => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
        const params = [res.roleName, res.salary, res.departmentChoice];
        
        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          
          serverLpr ()
        })
      });
    });
  };

  function viewDepartments() {
            
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log("\n")
        console.table(rows)
      }
      console.log("\n")
      serverLpr ();
    });
  }

serverLpr();