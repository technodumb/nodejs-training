import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async getAllEmployees() {
        return this.employeeRepository.find();
    }

    async getEmployeeByID(employeeID: Number): Promise<Employee> {
        const employee = this.employeeRepository.findOneBy({ id: employeeID });
        return employee;
    }

    async createEmployee(email: String, name: String) {
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        return this.employeeRepository.save(newEmployee);
    }

    async updateEmployeeByID(
        id: Number,
        { email, name }: { email?: String; name?: String }
    ) {
        const existingEmployee = await this.getEmployeeByID(id);
        if (!email && !name) {
            console.log(email);
            throw new Error("Nothing to update");
        }
        existingEmployee.name = name;
        existingEmployee.email = email;
        return this.employeeRepository.save(existingEmployee);
    }

    async deleteEmployeeByID(employeeID: Number): Promise<String | void> {
        const employeeIsPresent = await this.employeeRepository.count({
            id: employeeID,
        });
        return this.employeeRepository.softDelete({ id: employeeID });
    }
}
