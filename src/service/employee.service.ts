import { CreateAddressDto } from "../dto/address.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

export class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    getAllEmployees = async () => {
        return this.employeeRepository.find();
    };

    getEmployeeByID = async (employeeID: Number): Promise<Employee> => {
        const employee = await this.employeeRepository.findOneBy({
            id: employeeID,
        });
        if (!employee) {
            throw new HttpException(
                404,
                `Employee with id: ${employeeID} not found`
            );
        }
        return employee;
    };

    createEmployee = async (
        email: String,
        name: String,
        age: Number,
        address: CreateAddressDto
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
        email: String,
        name: String,
        age: Number,
        address: CreateAddressDto
    ) => {
        const existingEmployee = await this.getEmployeeByID(id);
        existingEmployee.name = name;
        existingEmployee.email = email;
        existingEmployee.age = age;
        if (address) {
            existingEmployee.address.line1 = address.line1;
            existingEmployee.address.pincode = address.pincode;
        }

        console.log("errorString");

        return this.employeeRepository.save(existingEmployee);
    };

    deleteEmployeeByID = async (employeeID: Number) => {
        const employee = await this.getEmployeeByID(employeeID);
        return this.employeeRepository.softRemove(employee);
    };
}
