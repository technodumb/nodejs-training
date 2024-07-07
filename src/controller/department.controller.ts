import { Request, Response, Router } from "express";
import DepartmentService from "../service/department.service";

class DepartmentController {
	public router: Router;
	// private departmentService = new DepartmentService()
	constructor(private departmentService: DepartmentService) {
		this.router = Router();

		this.router.get("/", this.getAllDepartments);
		this.router.get("/:departmentID", this.getDepartmentByID);
		this.router.post("/", this.createDepartment);
		this.router.put("/:departmentID", this.updateDepartment);
		this.router.delete("/:departmentID", this.deleteDepartment);
	}
	getAllDepartments = async (req: Request, res: Response) => {
		const departments = await this.departmentService.getAllDepartments();
		res.status(200).send(departments);
	};

	getDepartmentByID = async (req: Request, res: Response) => {
		const departmentID = Number(req.params.departmentID);
		const department = this.departmentService.getDepartmentByID(departmentID);
		res.status(200).send(department);
	};

	createDepartment = async (req: Request, res: Response) => {
		const { name } = req.body;
		const newDepartment = await this.departmentService.createDepartment(name);
		res.status(200).send(newDepartment);
	};

	updateDepartment = async (req: Request, res: Response) => {
		const departmentID = Number(req.params.departmentID);
		const { name } = req.body;
		const updatedDepartment = await this.departmentService.updateDepartment(
			departmentID,
			name
		);
		res.status(200).send(updatedDepartment);
	};

	deleteDepartment = async (req: Request, res: Response) => {
		const departmentID = Number(req.params.departmentID);
		const deletedDepartment = await this.departmentService.deleteDepartment(
			departmentID
		);
		// return deletedDepartment;
		res.status(200).send(deletedDepartment);
	};
}

export default DepartmentController;
