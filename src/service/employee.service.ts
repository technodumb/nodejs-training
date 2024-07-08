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
import DepartmentRepository from "../repository/department.repository";

export class EmployeeService {
	constructor(
		private employeeRepository: EmployeeRepository,
		private departmentRepository: DepartmentRepository
	) {}

	getAllEmployees = async () => {
		return this.employeeRepository.find();
	};

	getEmployeeByID = async (employeeID: Number): Promise<Employee> => {
		const employee = await this.employeeRepository.findOneBy({
			id: employeeID,
		});
		if (!employee) {
			throw new HttpException(404, `Employee with id: ${employeeID} not found`);
		}
		return employee;
	};

	createEmployee = async (
		email: string,
		name: string,
		age: Number,
		password: string,
		role: Role,
		address: CreateAddressDto,
		departmentName: string
	) => {
		const department = await this.departmentRepository.findOneBy({
			name: departmentName,
		});

		if (!department) {
			throw new HttpException(
				404,
				`Department with name: ${departmentName} was not found`
			);
		}
		const newEmployee = new Employee();
		const newAddress = new Address();
		newEmployee.name = name;
		newEmployee.email = email;
		newEmployee.age = age;
		newEmployee.role = role;
		newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
		newAddress.line1 = address.line1;
		newAddress.pincode = address.pincode;
		newEmployee.address = newAddress;
		newEmployee.department = department;

		return this.employeeRepository.save(newEmployee);
	};

	updateEmployeeByID = async (
		id: Number,
		email: string,
		name: string,
		age: Number,
		address: UpdateAddressDto,
		departmentName: string
	) => {
		const department = await this.departmentRepository.findOneBy({
			name: departmentName,
		});

		if (!department) {
			throw new HttpException(
				404,
				`Department with name: ${departmentName} was not found`
			);
		}
		const existingEmployee = await this.getEmployeeByID(id);
		existingEmployee.name = name;
		existingEmployee.email = email;
		existingEmployee.age = age;
		if (address) {
			existingEmployee.address.line1 = address.line1;
			existingEmployee.address.pincode = address.pincode;
		}
		existingEmployee.department = department;

		console.log("errorString");

		return this.employeeRepository.save(existingEmployee);
	};

	deleteEmployeeByID = async (employeeID: Number) => {
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
			console.log(employee.password, password);
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
