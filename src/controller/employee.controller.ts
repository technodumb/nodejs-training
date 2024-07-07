import { plainToInstance } from "class-transformer";
import HttpException from "../exception/http.exception";
import { EmployeeService } from "../service/employee.service";
import { Router, Request, Response, NextFunction } from "express";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import authorize from "../middleware/authorize.middleware";

export class EmployeeController {
	public router: Router;
	constructor(private employeeService: EmployeeService) {
		this.router = Router();

		this.router.get("/", authorize, this.getAllEmployees);
		this.router.get("/:employeeID", authorize, this.getEmployeeByID);
		this.router.post("/", authorize, this.createEmployee);
		this.router.put("/:employeeID", authorize, this.updateEmployeeByID);
		this.router.delete("/:employeeID", authorize, this.deleteEmployeeByID);
		this.router.post("/login", this.loginEmployee);
	}

	public getAllEmployees = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (!req.role) {
				// throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
				throw new HttpException(403, "Access Forbidden");
			}
			const employees = await this.employeeService.getAllEmployees();
			res.status(200).send(employees);
		} catch (error) {
			next(error);
		}
	};

	public getEmployeeByID = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (!req.role) {
				// throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
				throw new HttpException(403, "Access Forbidden");
			}
			const employeeID = Number(req.params.employeeID);
			if (!Number.isInteger(employeeID)) {
				throw new HttpException(400, "ID is not an integer!");
			}
			const employee = await this.employeeService.getEmployeeByID(employeeID);

			res.status(200).send(employee);
		} catch (error) {
			next(error);
		}
	};

	public createEmployee = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
			const errors = await validate(employeeDto);
			const role = req.role;

			if (role !== Role.HR) {
				// throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
				throw new HttpException(403, "Access Forbidden");
			}
			if (errors.length) {
				const errorString = "Validation Failed!";
				throw new HttpException(400, errorString, errors);
			}

			const savedEmployee = await this.employeeService.createEmployee(
				employeeDto.email,
				employeeDto.name,
				employeeDto.age,
				employeeDto.password,
				employeeDto.role,
				employeeDto.address
			);
			res.status(201).send(savedEmployee);
		} catch (error) {
			next(error);
		}
	};

	public updateEmployeeByID = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const employeeID = Number(req.params.employeeID);
			if (!Number.isInteger(employeeID)) {
				throw new HttpException(400, "ID is not an integer!");
			}
			const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
			const errors = await validate(employeeDto);
			const role = req.role;
			if (role !== Role.HR) {
				// throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
				throw new HttpException(403, "Access Forbidden");
			}
			if (errors.length) {
				const errorString = "Validation Failed!";
				throw new HttpException(400, errorString, errors);
			}
			const updatedEmployee = await this.employeeService.updateEmployeeByID(
				employeeID,
				employeeDto.email,
				employeeDto.name,
				employeeDto.age,
				employeeDto.address
			);
			res.status(200).send(updatedEmployee);
		} catch (error) {
			next(error);
		}
	};
	public deleteEmployeeByID = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const employeeID = Number(req.params.employeeID);
			if (!Number.isInteger(employeeID)) {
				throw new HttpException(400, "ID is not an integer!");
			}
			const role = req.role;
			if (role !== Role.HR) {
				// throw new IncorrectPasswordException(ErrorCodes.UNAUTHORIZED)
				throw new HttpException(403, "Access Forbidden");
			}
			const deleteStatus = await this.employeeService.deleteEmployeeByID(
				employeeID
			);
			res.status(200).send(deleteStatus);
		} catch (error) {
			next(error);
		}
	};

	public loginEmployee = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { email, password } = req.body;
			const token = await this.employeeService.loginEmployee(email, password);
			res.status(200).send(token);
		} catch (error) {
			next(error);
		}
	};
}
