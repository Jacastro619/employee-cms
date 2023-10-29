INSERT INTO departments (name)
VALUES ("Human Resources"),("Accounting"), ("Engineering"),("Legal"),("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Director Of HR", 125000, 1),('Head Accountant', 150000, 2),('Lead Engineer', 180000, 3),('Senior Engineer', 140000, 3),('Junior Engineer', 80000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jorge", 'Castro', 3, NULL), ("John", "Doe", 4, 1), ("Jane", "Doe", 5, 2);