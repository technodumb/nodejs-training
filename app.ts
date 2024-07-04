import express from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./data-source";

const server = express();
server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/employees", employeeRouter);

server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello World");
});

(async () => {
    try {
        await dataSource.initialize();
    } catch (e) {
        console.log("Failed", e);
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
})();
