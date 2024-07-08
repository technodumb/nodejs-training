import { NextFunction, Response, Router } from "express";
import DepartmentService from "../service/department.service";
import { RequestWithUser } from "../utils/requestWithUser";
import HttpException from "../exception/http.exception";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
import {
	CreateDepartmentDto,
	UpdateDepartmentDto,
} from "../dto/department.dto";
import { validate } from "class-validator";
import authorize from "../middleware/authorize.middleware";

class DepartmentController {
	public router: Router;
	// private departmentService = new DepartmentService()
	constructor(private departmentService: DepartmentService) {
		this.router = Router();

		this.router.get("/", authorize, this.getAllDepartments);
		this.router.get("/:departmentID", authorize, this.getDepartmentByID);
		this.router.post("/", authorize, this.createDepartment);
		this.router.put("/:departmentID", authorize, this.updateDepartment);
		this.router.delete("/:departmentID", authorize, this.deleteDepartment);
	}
	getAllDepartments = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (!req.role) {
				throw new HttpException(403, "Access Forbidden");
			}
			const departments = await this.departmentService.getAllDepartments();
			res.status(200).send(departments);
		} catch (error) {
			next(error);
		}
	};

	getDepartmentByID = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (!req.role) {
				throw new HttpException(403, "Access Forbidden");
			}
			const departmentID = Number(req.params.departmentID);
			if (!departmentID) {
				throw new HttpException(400, "The department ID must be an integer");
			}
			const department = this.departmentService.getDepartmentByID(departmentID);
			res.status(200).send(department);
		} catch (error) {
			next(error);
		}
	};

	createDepartment = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (req.role !== Role.HR) {
				throw new HttpException(403, "Access Forbidden");
			}
			const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
			const errors = await validate(departmentDto);
			if (errors.length) {
				const errorString = "Validation Failed!";
				throw new HttpException(400, errorString, errors);
			}
			const newDepartment = await this.departmentService.createDepartment(
				departmentDto.name
			);
			// const { name } = req.body;
			// const newDepartment = await this.departmentService.createDepartment(name);
			res.status(201).send(newDepartment);
		} catch (error) {
			next(error);
		}
	};

	updateDepartment = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (req.role !== Role.HR) {
				throw new HttpException(403, "Access Forbidden");
			}
			const departmentID = Number(req.params.departmentID);
			if (!departmentID) {
				throw new HttpException(400, "The department ID must be an integer");
			}
			const departmentDto = plainToInstance(UpdateDepartmentDto, req.body);
			const errors = await validate(departmentDto);
			if (errors.length) {
				const errorString = "Validation Failed!";
				throw new HttpException(400, errorString, errors);
			}
			const updatedDepartment = await this.departmentService.updateDepartment(
				departmentID,
				departmentDto.name
			);
			res.status(200).send(updatedDepartment);
		} catch (error) {
			next(error);
		}
	};

	deleteDepartment = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			if (req.role !== Role.HR) {
				throw new HttpException(403, "Access Forbidden");
			}
			const departmentID = Number(req.params.departmentID);
			if (!departmentID) {
				throw new HttpException(400, "The department ID must be an integer");
			}
			const deletedDepartment = await this.departmentService.deleteDepartment(
				departmentID
			);
			// return deletedDepartment;
			res.status(200).send(deletedDepartment);
		} catch (error) {
			next(error);
		}
	};
}

export default DepartmentController;
