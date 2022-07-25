INSERT INTO department (id, name)
VALUES (1, "Sales"),
VALUES (2, "Developtment"),
VALUES (3, "Marketing"),
VALUES (4, "Legal"),
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Engineer", 180000, 2),
VALUES (2, "Back-end Developer", 120000, 2),
VALUES (3, "Front-end Developer", 100000, 2),
VALUES (4, "Full-stack Developer",140000, 2),

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (777, "John", "Sanchez", 1, null),
VALUES (001, "Ryan", "Patterson", 1, 777),
VALUES (002, "Sadie", "Richards", 2, 777),
VALUES (003, "Mali ", "Gutierrez", 2, 777),
VALUES (004, "Teegan ", "Johnston", 2, 777),
VALUES (005, "Lina ", "Patel", 3, 777),
VALUES (006, "Sanaya ", "Jenkins", 4, 777),