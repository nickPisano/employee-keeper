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
  console.log (`
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
        viewEmployee ()
        break;
        
        case "Add Employees":
        addEmployee ()
        break;
        
        case "Update Employee Role":
        updateEmployee ()
        break;
        
        case "View All Roles":
        viewRoles ()
        break;
        
        case "Add Role":
        addRoles ()
        break;
        
        case "View All Departments":
        viewDepartments ()
        break;
        
        case "Add Department":
        addDepartments ()
        break;
        
        case "Quit":
        finishPrompt ()
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

serverLpr();