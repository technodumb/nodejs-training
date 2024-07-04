import { DataSource, Repository } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
    // private dataSource: DataSource;
    constructor(private employeeRepository: Repository<Employee>) {}

    async find(): Promise<Employee[]> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.find();
    }

    async findOneBy(filter: Partial<Employee>) {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.findOne({ where: filter });
    }

    async save(newEmployee: Employee) {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.save(newEmployee);
    }

    async count(filter: Partial<Employee>) {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.count({ where: filter });
    }
    async softDelete(filter: Partial<Employee>): Promise<any> {
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.softDelete(filter);
    }

    async delete(filter: Partial<Employee>): Promise<void> {
        await this.employeeRepository.delete(filter);
    }
}

export default EmployeeRepository;
