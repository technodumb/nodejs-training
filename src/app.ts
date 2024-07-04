import express from "express";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.routes";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/data-source";

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
