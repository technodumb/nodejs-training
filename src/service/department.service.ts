import { Request, Response } from "express";
import dataSource from "../db/data-source.db";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
	// get, post, put, delete, patch
	constructor(private departmentRepository: DepartmentRepository) {}
	//  = new DepartmentRepository()

	getAllDepartments = async () => {
		return this.departmentRepository.findAll();
	};

	getDepartmentByID = async (departmentID: number) => {
		return this.departmentRepository.findOneBy({ id: departmentID });
	};

	createDepartment = async (name: string) => {
		const newDepartment = new Department();
		newDepartment.name = name;
		return this.departmentRepository.save(newDepartment);
	};

	updateDepartment = async (id: number, name: string) => {
		// const newDepartment = new Department()
		const existingDepartment = await this.getDepartmentByID(id);
		existingDepartment.name = name;
		return this.departmentRepository.save(existingDepartment);
	};

	deleteDepartment = async (id: number) => {
		const existingDepartment = await this.getDepartmentByID(id);
		await this.departmentRepository.softRemove(existingDepartment);
		return existingDepartment;
	};
}

export default DepartmentService;
