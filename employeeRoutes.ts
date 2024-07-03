import express from "express";
import Employee from "./Employee";

const employeeRouter = express.Router();
const userRouter = express.Router();

let currentID = 1;
const employees: Employee[] = [
    {
        id: 23,
        name: "Alnas",
        email: "alnaskabeer@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 46,
        name: "Akku",
        email: "akkusseei@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 12,
        name: "Joel",
        email: "alnaskabeer@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

employeeRouter.get("/employees", (req, res) => {
    res.status(200).send(employees);
});

employeeRouter.get("/employees/:employeeID-:lastEmployeeID", (req, res) => {
    console.log(`${req.method} ${req.url}`);
    // console.log(req.url);
    const employeeID = parseInt(req.params.employeeID);
    if (Number.isNaN(employeeID)) {
        res.status(400).send("Employee ID must be a number");
        return;
    }
    const lastEmployeeID = Number(req.params.lastEmployeeID);
    console.log(employeeID, lastEmployeeID);
    if (Number.isInteger(lastEmployeeID)) {
        const employeeRange = employees.filter(
            (employee) => employee.id >= employeeID && employee.id <= employeeID
        );
        if (employeeRange.length == 0) {
            res.status(404).send("Employees not found");
            return;
        }
        res.status(200).send(employeeRange);
        return;
    }
    console.log(employeeID);
    const employee = employees.find((employee) => employeeID === employee.id);
    if (!employee) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).send(employee);
});

employeeRouter.post("/employees", (req, res) => {
    console.log(req.body);
    const { name, email } = req.body;
    if (name === undefined || email === undefined) {
        res.status(400).send("Provide 'id', 'name' and 'email'");
        return;
    }
    const newEmployee: Employee = new Employee();
    newEmployee.id = currentID++;
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.createdAt = new Date();
    newEmployee.updatedAt = new Date();

    employees.push(newEmployee);

    res.status(201).send("added an employee");
});

employeeRouter.put("/employees/:employeeID", (req, res) => {
    const employeeID = parseInt(req.params.employeeID);
    if (Number.isNaN(employeeID)) {
        res.status(400).send("Employee ID must be a number");
        return;
    }
    const employee = employees.find((employee) => employeeID === employee.id);
    if (!employee) {
        res.status(404).send("Employee not found");
        return;
    }

    const { name, email } = req.body;
    if (name === undefined && email === undefined) {
        res.status(400).send("Please provide name or email or both.");
    }
    employee.name = name;
    employee.email = email;
    employee.updatedAt = new Date();

    res.status(200).send("updated an employee");
});

employeeRouter.delete("/employees/:employeeID", (req, res) => {
    const employeeID = parseInt(req.params.employeeID);
    if (Number.isNaN(employeeID)) {
        res.status(400).send("Employee ID must be a number");
        return;
    }
    console.log(employeeID);
    // const employee = employees.find((employee) => employeeID === employee.id);
    // if (!employee) {
    //     res.status(404).send("Employee not found");
    //     return;
    // }
    // employees = employees.filter((employee) => employee.id != employeeID);
    const employeeInd = employees.findIndex(
        (employee) => employee.id === employeeID
    );
    if (Number.isNaN(employeeInd)) {
        res.status(404).send("Employee not found");
    }
    employees.splice(employeeInd, 1);
    res.status(200).send("deleted employee #" + employeeID);
});

export { employeeRouter, userRouter };

export default employeeRouter;
