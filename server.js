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

const init = () => {
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

    }
  })
}

