import { EmployeeService } from "../service/employee.service";
import { Router, Request, Response } from "express";

export class EmployeeController {
    public router: Router;
    constructor(private employeeService: EmployeeService) {
        // this.employeeService = new EmployeeService();
        this.router = Router();

        this.router.get("/", this.getAllEmployees);
        this.router.get("/:employeeID", this.getEmployeeByID);
        this.router.post("/", this.createEmployee);
        this.router.put("/:employeeID", this.updateEmployeeByID);
        this.router.delete("/:employeeID", this.deleteEmployeeByID);
    }
    public getAllEmployees = async (req: Request, res: Response) => {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    };

    public getEmployeeByID = async (req: Request, res: Response) => {
        const employeeID = parseInt(req.params.employeeID);
        if (Number.isNaN(employeeID)) {
            res.status(400).send("Employee ID must be a number");
            return;
        }
        const employee = await this.employeeService.getEmployeeByID(employeeID);
        if (!employee) {
            res.status(404).send("Employee not found.");
            return;
        }
        res.status(200).send(employee);
    };

    public createEmployee = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        if (name === undefined || email === undefined) {
            res.status(400).send("Provide 'name' and 'email'");
            return;
        }

        const savedEmployee = await this.employeeService.createEmployee(
            email,
            name
        );
        res.status(201).send(savedEmployee);
    };

    public updateEmployeeByID = async (req: Request, res: Response) => {
        // const employees = await this.employeeService.getAllEmployees();
        const { name, email } = req.body;
        const employeeID = Number(req.params.employeeID);
        try {
            const updatedEmployee =
                await this.employeeService.updateEmployeeByID(employeeID, {
                    email,
                    name,
                });
            res.status(200).send(updatedEmployee);
        } catch (e) {
            res.status(400).send(e.message);
        }
        // const employee = await
        // res.status(200).send(employees);
    };
    public deleteEmployeeByID = async (req: Request, res: Response) => {
        const employeeID = Number(req.params.employeeID);
        const deleteStatus = await this.employeeService.deleteEmployeeByID(
            employeeID
        );
        res.status(200).send(deleteStatus);
    };
}
