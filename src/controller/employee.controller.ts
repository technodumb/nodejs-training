import { plainToInstance } from "class-transformer";
import HttpException from "../exception/http.exception";
import { EmployeeService } from "../service/employee.service";
import { Router, Request, Response, NextFunction } from "express";
import CreateEmployeeData from "../dto/employee.dto";
import CreateEmployeeDto from "../dto/employee.dto";
import { validate } from "class-validator";

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

    public getEmployeeByID = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const employeeID = parseInt(req.params.employeeID);
            if (!Number.isInteger(employeeID)) {
                throw new HttpException(400, "ID is not an integer!");
            }
            const employee = await this.employeeService.getEmployeeByID(
                employeeID
            );
            if (!employee) {
                throw new HttpException(
                    404,
                    `Employee with id: ${employeeID} not found`
                );
            }
            res.status(200).send(employee);
        } catch (error) {
            next(error);
        }
    };

    public createEmployee = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { name, email, age, address } = req.body;
        try {
            const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(employeeDto);

            if (errors.length) {
                const errorString = JSON.stringify(errors);
                console.log(errorString);
                throw new HttpException(400, errorString);
            }
            const savedEmployee = await this.employeeService.createEmployee(
                employeeDto.email,
                employeeDto.name,
                employeeDto.age,
                employeeDto.address
            );
            res.status(201).send(savedEmployee);
        } catch (error) {
            next(error);
        }
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
