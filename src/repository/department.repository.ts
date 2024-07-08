import { DeepPartial, Repository } from "typeorm";
import dataSource from "../db/data-source.db";
import Department from "../entity/department.entity";
import Employee from "../entity/employee.entity";

class DepartmentRepository {
	constructor(private departmentRepository: Repository<Department>) {}
	//  = dataSource.getRepository(Department)

	async findAll() {
		return this.departmentRepository.find({ relations: { employees: true } });
	}

	async findOneBy(filter: Partial<Department>) {
		return this.departmentRepository.findOne({
			where: filter,
			relations: { employees: true },
		});
	}

	async save(newDepartment: Department) {
		return this.departmentRepository.save(newDepartment);
	}

	async count(filter: Partial<Department>) {
		return this.departmentRepository.count({ where: filter });
	}

	async softDelete(filter: Partial<Department>) {
		return this.departmentRepository.softDelete(filter);
	}

	async softRemove(filter: Partial<Department>) {
		return this.departmentRepository.softRemove(filter);
	}
}

export default DepartmentRepository;
