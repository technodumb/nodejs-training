import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    // private dataSource: DataSource;
    constructor(private employeeRepository: Repository<Employee>) {}
    
    async find(): Promise<Employee[]> {
        return this.employeeRepository.find({
            // relations: ["address"],
            relations: { address: true }, 
        });
    }

    async findOneBy(filter: Partial<Employee>): Promise<Employee> {
        return this.employeeRepository.findOne({
            where: filter,
            // relations: ["address"],
            relations: { address: true },
        });
    }

    async save(newEmployee: Employee): Promise<Employee> {
        return this.employeeRepository.save(newEmployee);
    }

    async count(filter: Partial<Employee>): Promise<number> {
        return this.employeeRepository.count({ where: filter });
    }

    async softDelete(filter: Partial<Employee>): Promise<UpdateResult> {
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
