import express from "express";

const server = express();

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello World");
});

server.get("/employees", (req, res) => {
    console.log(req.url);
    res.status(200).send("get all employees");
});

server.get("/employees/:id", (req, res) => {
    console.log(req.url);
    const id = parseInt(req.params.id);
    console.log(id);
    if (id >= 1 && id <= 10) {
        res.status(200).send("gets employee #" + req.params.id);
    } else {
        res.status(404).send("Employee not found");
    }
});

server.post("/employees", (req, res) => {
    console.log(req.url);
    res.status(201).send("added an employee");
});

server.put("/employees/:id", (req, res) => {
    console.log(req.url);
    res.status(200).send("updated an employee");
});

server.delete("/employees/:id", (req, res) => {
    console.log(req.url);
    res.status(200).send("deleted an employee");
});

server.listen(3000, () => {
    console.log("server listening to 3000");
});
