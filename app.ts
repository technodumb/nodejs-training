import express from "express";
import { employeeRouter } from "./employeeRoutes";

const server = express();

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello World");
});

server.use(employeeRouter);

server.listen(3000, () => {
    console.log("server listening to 3000");
});
