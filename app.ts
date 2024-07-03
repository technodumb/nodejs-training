import express from "express";
import employeeRouter from "./employeeRoutes";
import loggerMiddleware from "./loggerMiddleware";
import bodyParser from "body-parser";

const server = express();
server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use(employeeRouter);

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello World");
});

server.listen(3000, () => {
    console.log("server listening to 3000");
});
