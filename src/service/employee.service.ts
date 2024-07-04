import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    getAllEmployees = async () => {
        return this.employeeRepository.find();
    };

    getEmployeeByID = async (employeeID: Number): Promise<Employee> => {
        const employee = this.employeeRepository.findOneBy({ id: employeeID });
        return employee;
    };

    createEmployee = async (
        email: String,
        name: String,
        age: Number,
        address: Address
    ) => {
        const newEmployee = new Employee();
        const newAddress = new Address();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        newEmployee.address = newAddress;
        return this.employeeRepository.save(newEmployee);
    };

    updateEmployeeByID = async (
        id: Number,
        { email, name }: { email?: String; name?: String }
    ) => {
        const existingEmployee = await this.getEmployeeByID(id);
        if (!email && !name) {
            console.log(email);
            throw new Error("Nothing to update");
        }
        existingEmployee.name = name;
        existingEmployee.email = email;
        return this.employeeRepository.save(existingEmployee);
    };

    deleteEmployeeByID = async (employeeID: Number): Promise<String | void> => {
        const employeeIsPresent = await this.employeeRepository.count({
            id: employeeID,
        });
        return this.employeeRepository.softRemove({ id: employeeID });
    };
}
