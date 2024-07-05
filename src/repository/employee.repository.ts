import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    // private dataSource: DataSource;
    constructor(private employeeRepository: Repository<Employee>) {}

    async find(): Promise<Employee[]> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.find({
            relations: ["address"],
        });
    }

    async findOneBy(filter: Partial<Employee>): Promise<Employee> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.findOne({
            where: filter,
            relations: ["address"],
        });
    }

    async save(newEmployee: Employee): Promise<Employee> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.save(newEmployee);
    }

    async count(filter: Partial<Employee>): Promise<number> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.count({ where: filter });
    }
    async softDelete(filter: Partial<Employee>): Promise<UpdateResult> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.softDelete(filter);
    }

    async delete(filter: Partial<Employee>): Promise<DeleteResult> {
        return this.employeeRepository.delete(filter);
    }

    async softRemove(filter: Partial<Employee>): Promise<Employee> {
        return this.employeeRepository.softRemove(filter);
    }
}

export default EmployeeRepository;
