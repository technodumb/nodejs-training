import express from "express";

const employeeRouter = express.Router();
const userRouter = express.Router();

employeeRouter.get("/employees", (req, res) => {
    console.log(req.url);
    res.status(200).send("get all employees");
});

employeeRouter.get("/employees/:id", (req, res) => {
    console.log(req.url);
    const id = parseInt(req.params.id);
    console.log(id);
    if (id >= 1 && id <= 10) {
        res.status(200).send("gets employee #" + req.params.id);
    } else {
        res.status(404).send("Employee not found");
    }
});

employeeRouter.post("/employees", (req, res) => {
    console.log(req.url);
    res.status(201).send("added an employee");
});

employeeRouter.put("/employees/:id", (req, res) => {
    console.log(req.url);
    res.status(200).send("updated an employee");
});

employeeRouter.delete("/employees/:id", (req, res) => {
    console.log(req.url);
    res.status(200).send("deleted an employee");
});

export { employeeRouter, userRouter };

export default employeeRouter;
