// import httpMocks from "node-mocks-http";
// import { EmployeeController } from "./employee.controller";
// import { EmployeeService } from "../service/employee.service";
// import dotenv from "dotenv";
// import EmployeeRepository from "../repository/employee.repository";
// import Employee from "../entity/employee.entity";
// import DepartmentRepository from "../repository/department.repository";
// import Department from "../entity/department.entity";
// import DepartmentService from "../service/department.service";

// describe("Employee Controller", () => {
//     let employeeControler: EmployeeController;
//     let employeeService: EmployeeService;
//     beforeAll(() => {
//         dotenv.config();
//         const dataSource = {
//             getRepository: jest.fn(),
//         };
//         const employeeRepository = new EmployeeRepository(
//             dataSource.getRepository(Employee)
//         ) as jest.Mocked<EmployeeRepository>;

//         const departmentRepository = new DepartmentRepository(
//             dataSource.getRepository(Department)
//         ) as jest.Mocked<DepartmentRepository>;
//         const departmentService = new DepartmentService(
//             departmentRepository
//         ) as jest.Mocked<DepartmentService>;

//         employeeService = new EmployeeService(
//             employeeRepository,
//             departmentService
//         ) as jest.Mocked<EmployeeService>;

//         employeeControler = new EmployeeController(employeeService);
//     });

//     it("should get all employees", () => {
//         const request = httpMocks.createRequest();
//         const response = httpMocks.createResponse();

//     });
// });
