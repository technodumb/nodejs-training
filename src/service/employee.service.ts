import { CreateAddressDto, UpdateAddressDto } from "../dto/address.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { DepartmentNameNotFoundException } from "../exception/notFound.exception";
import DepartmentService from "./department.service";

export class EmployeeService {
    constructor(
        private employeeRepository: EmployeeRepository,
        private departmentService: DepartmentService
    ) {}

    getAllEmployees = async () => {
        return this.employeeRepository.find();
    };

    getEmployeeByID = async (employeeID: number): Promise<Employee> => {
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
        email: string,
        name: string,
        age: number,
        password: string,
        role: Role,
        address: CreateAddressDto,
        departmentName: string,
        joiningDate: Date,
        status: string,
        experience: number
    ) => {
        const department = await this.departmentService.getDepartmentByName(
            departmentName
        );

        if (!department) {
            throw new HttpException(
                404,
                `Department with name: ${departmentName} was not found`
            );
        }
        const newAddress = new Address(address.line1, address.pincode);
        const passwordHash = password ? await bcrypt.hash(password, 10) : "";
        const newEmployee = new Employee(
            name,
            email,
            age,
            newAddress,
            department,
            passwordHash,
            role,
            joiningDate,
            status,
            experience
        );

        // console.log(newEmployee);

        const result = await this.employeeRepository.save(newEmployee);
        return result;
    };

    updateEmployeeByID = async (
        id: number,
        email: string,
        name: string,
        age: number,
        password: string,
        role: Role,
        address: UpdateAddressDto,
        departmentName: string,
        joiningDate: Date,
        status: string,
        experience: number
    ) => {
        const department = await this.departmentService.getDepartmentByName(
            departmentName
        );

        if (!department) {
            throw new DepartmentNameNotFoundException(departmentName);
        }
        const existingEmployee = await this.getEmployeeByID(id);
        existingEmployee.name = name;
        existingEmployee.email = email;
        existingEmployee.age = age;
        const passwordHash = password ? await bcrypt.hash(password, 10) : "";

        existingEmployee.password = passwordHash;
        existingEmployee.role = role;

        if (address) {
            existingEmployee.address.line1 = address.line1;
            existingEmployee.address.pincode = address.pincode;
        }

        existingEmployee.department = department;

        console.log("errorString");

        return this.employeeRepository.save(existingEmployee);
    };

    deleteEmployeeByID = async (employeeID: number) => {
        const employee = await this.getEmployeeByID(employeeID);
        return this.employeeRepository.softRemove(employee);
    };

    loginEmployee = async (email: string, password: string) => {
        const employee = await this.employeeRepository.findOneBy({ email });

        if (!employee) {
            throw new HttpException(403, "Incorrect Username or Password");
        }

        const result = await bcrypt.compare(password, employee.password);
        if (!result) {
            // console.log(employee.password, await bcrypt.hash(password, 10));
            throw new HttpException(403, "Incorrect Username or Password");
        }

        const payload: jwtPayload = {
            name: employee.name,
            email: employee.email,
            role: employee.role,
        };

        const token = jsonwebtoken.sign(payload, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        });

        return { token };
    };
}
