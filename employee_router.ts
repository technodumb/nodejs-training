import express from "express";
import Employee from "./Employee";
import dataSource from "./data-source";

const employeeRouter = express.Router();
const userRouter = express.Router();

// let currentID = 1;
// const employees: Employee[] = [
//     {
//         id: 23,
//         name: "Alnas",
//         email: "alnaskabeer@gmail.com",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: undefined,
//     },
//     {
//         id: 46,
//         name: "Akku",
//         email: "akkusseei@gmail.com",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: undefined,
//     },
//     {
//         id: 12,
//         name: "Joel",
//         email: "joelkabeer@gmail.com",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: undefined,
//     },
// ];

employeeRouter.get("/", async (req, res) => {
    const employeeRepository = await dataSource.getRepository(Employee);
    const employees = await employeeRepository.find();
    res.status(200).send(employees);
});

employeeRouter.get("/:employeeID", async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    // console.log(req.url);
    const employeeID = parseInt(req.params.employeeID);
    if (Number.isNaN(employeeID)) {
        res.status(400).send("Employee ID must be a number");
        return;
    }
    console.log(employeeID);
    // const employee = employees.find(
    //     (employee) => employeeID === employee.id
    // );
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({ id: employeeID });
    if (!employee) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
    console.log(req.body);

    const { name, email } = req.body;
    if (name === undefined || email === undefined) {
        res.status(400).send("Provide 'name' and 'email'");
        return;
    }

    const employeeRepository = dataSource.getRepository(Employee);
    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    const savedEmployee = await employeeRepository.save(newEmployee);
    res.status(201).send(savedEmployee);
});

employeeRouter.put("/:employeeID", async (req, res) => {
    const employeeID = parseInt(req.params.employeeID);
    if (Number.isNaN(employeeID)) {
        res.status(400).send("Employee ID must be a number");
        return;
    }
    // const employee = employees.find((employee) => employeeID === employee.id);
    // if (!employee) {
    //     res.status(404).send("Employee not found");
    //     return;
    // }
    const employeeRepository = dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({ id: employeeID });

    const { name, email } = req.body;
    if (name === undefined && email === undefined) {
        res.status(400).send("Please provide name or email or both.");
    }
    employee.name = name;
    employee.email = email;

    const savedEmployee = await employeeRepository.save(employee);

    res.status(200).send(savedEmployee);
});

employeeRouter.delete("/:employeeID", async (req, res) => {
    const employeeID = parseInt(req.params.employeeID);
    if (Number.isNaN(employeeID)) {
        res.status(400).send("Employee ID must be a number");
        return;
    }
    console.log(employeeID);
    const employeeRepository = dataSource.getRepository(Employee);
    const isEmployeePresent = await employeeRepository.countBy({
        id: employeeID,
    });
    if (!isEmployeePresent) {
        res.status(404).send("Employee not found");
    }
    const deleteStatus = await employeeRepository.softDelete({
        id: employeeID,
    });
    console.log(deleteStatus);
    res.status(200).send("deleted employee #" + employeeID);
});

// export { employeeRouter, userRouter };

export default employeeRouter;
