// import { when } from "jest-when";
// import Employee from "../entity/employee.entity";
// import EmployeeRepository from "../repository/employee.repository";
// import DepartmentRepository from "../repository/department.repository";
// import { EmployeeService } from "./employee.service";
// import Department from "../entity/department.entity";
// import { Role } from "../utils/role.enum";
// import Address from "../entity/address.entity";
// import { CreateAddressDto } from "../dto/address.dto";
// import DepartmentService from "./department.service";
// import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";

// describe("Employee Service", () => {
//     let employeeRepository: EmployeeRepository;
//     let departmentRepository: DepartmentRepository;
//     let employeeService: EmployeeService;
//     let departmentService: DepartmentService;
//     let dummyEmployees: Employee[];
//     let dummyAddresses: CreateAddressDto[];
//     let dummyDepartments: Department[];

//     beforeAll(() => {
//         dotenv.config();
//         const dataSource = {
//             getRepository: jest.fn(),
//         };
//         employeeRepository = new EmployeeRepository(
//             dataSource.getRepository(Employee)
//         ) as jest.Mocked<EmployeeRepository>;

//         departmentRepository = new DepartmentRepository(
//             dataSource.getRepository(Department)
//         ) as jest.Mocked<DepartmentRepository>;

//         departmentService = new DepartmentService(departmentRepository);

//         employeeService = new EmployeeService(
//             employeeRepository,
//             departmentService
//         );

//         dummyAddresses = [
//             {
//                 line1: "line1",
//                 pincode: "123",
//             },
//             {
//                 line1: "line2",
//                 pincode: "456",
//             },
//         ];

//         dummyDepartments = [
//             {
//                 id: 1,
//                 name: "HR",
//                 employees: [],
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 deletedAt: null,
//             },
//             {
//                 id: 2,
//                 name: "Engineering",
//                 employees: [],
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//                 deletedAt: null,
//             },
//         ];
//         const newAddress = new Address(
//             dummyAddresses[0].line1,
//             dummyAddresses[0].pincode
//         );

//         dummyEmployees = [
//             new Employee(
//                 "test1",
//                 "test1@gmail.com",
//                 20,
//                 newAddress,
//                 dummyDepartments[0],
//                 "password123",
//                 Role.HR,
//                 new Date(),
//                 "Probation",
//                 2
//             ),
//             new Employee(
//                 "test2",
//                 "test2@gmail.com",
//                 23,
//                 newAddress,
//                 dummyDepartments[1],
//                 "password456",
//                 Role.DEVELOPER,
//                 new Date(),
//                 "Probation",
//                 2
//             ),
//         ];
//         dummyEmployees.forEach(async (dummyEmployee) => {
//             const password = dummyEmployee.password;
//             dummyEmployee.password = await bcrypt.hash(password, 10);
//             console.log(dummyEmployee.password);
//         });
//     });

//     it("should return allEmployees", async () => {
//         const mock = jest
//             .fn(employeeRepository.find)
//             .mockResolvedValue(dummyEmployees);
//         employeeRepository.find = mock;

//         const users = await employeeService.getAllEmployees();
//         expect(users).toEqual(dummyEmployees);
//         expect(mock).toHaveBeenCalledTimes(1);
//     });

//     it("should return employee with id", async () => {
//         // const idEmployee = new Employee();
//         // idEmployee.
//         // const mock = jest
//         //     .fn(employeeRepository.findOneBy)
//         //     .mockResolvedValue({ id: 1, name: "as" } as Employee);
//         const mock = jest.fn(employeeRepository.findOneBy);
//         when(mock)
//             .calledWith({ id: 1 })
//             .mockResolvedValue(dummyEmployees[0])
//             .calledWith({ id: 2 })
//             .mockResolvedValue(dummyEmployees[1]);
//         employeeRepository.findOneBy = mock;

//         const users = await employeeService.getEmployeeByID(1);
//         expect(users.name).toEqual("test1");
//         expect(users.address.line1).toEqual("line1");
//         expect(mock).toHaveBeenCalledTimes(1);

//         const users2 = await employeeService.getEmployeeByID(2);
//         expect(users2.name).toEqual("test2");
//         expect(users2.department.name).toEqual("Engineering");
//         expect(mock).toHaveBeenCalledTimes(2);
//     });

//     it("should create employee", async () => {
//         const mockSave = jest.fn(employeeRepository.save);
//         mockSave.mockResolvedValue(dummyEmployees[0]);
//         // when(mockSave)
//         // .calledWith(dummyEmployees[0])
//         // .mockResolvedValue(dummyEmployees[0]);
//         // when(mockSave);
//         //     .calledWith(dummyEmployees[1])
//         //     .mockResolvedValue(dummyEmployees[1]);
//         employeeRepository.save = mockSave;

//         const mockDepartment = jest.fn(departmentService.getDepartmentByName);
//         when(mockDepartment)
//             .calledWith("HR")
//             .mockResolvedValue(dummyDepartments[0]);
//         when(mockDepartment)
//             .calledWith("Engineering")
//             .mockResolvedValue(dummyDepartments[1]);
//         departmentService.getDepartmentByName = mockDepartment;

//         const user = await employeeService.createEmployee(
//             dummyEmployees[0].email,
//             dummyEmployees[0].name,
//             dummyEmployees[0].age,
//             dummyEmployees[0].password,
//             dummyEmployees[0].role,
//             dummyAddresses[0],
//             dummyDepartments[0].name
//         );
//         expect(user).toEqual(dummyEmployees[0]);
//         expect(mockSave).toHaveBeenCalledTimes(1);
//         expect(mockDepartment).toHaveBeenCalledTimes(1);
//     });

//     it("should update employee details", async () => {
//         const mockSave = jest
//             .fn(employeeRepository.save)
//             .mockResolvedValue(dummyEmployees[1]);
//         employeeRepository.save = mockSave;

//         const mockDepartment = jest.fn(departmentService.getDepartmentByName);
//         when(mockDepartment)
//             .calledWith("HR")
//             .mockResolvedValue(dummyDepartments[0])
//             .calledWith("Engineering")
//             .mockResolvedValue(dummyDepartments[1]);
//         departmentService.getDepartmentByName = mockDepartment;

//         const user = await employeeService.updateEmployeeByID(
//             2,
//             dummyEmployees[1].email,
//             dummyEmployees[1].name,
//             dummyEmployees[1].age,
//             dummyEmployees[1].password,
//             dummyEmployees[1].role,
//             dummyAddresses[1],
//             dummyDepartments[1].name
//         );
//         expect(user).toEqual(dummyEmployees[1]);
//         expect(mockDepartment).toHaveBeenCalledTimes(1);
//         expect(mockSave).toHaveBeenCalledTimes(1);
//     });

//     it("should delete an employee", async () => {
//         const mockGet = jest.fn(employeeService.getEmployeeByID);
//         when(mockGet)
//             .calledWith(1)
//             .mockResolvedValue(dummyEmployees[0])
//             .calledWith(2)
//             .mockResolvedValue(dummyEmployees[1]);
//         employeeService.getEmployeeByID = mockGet;

//         const mockSoftRemove = jest.fn(employeeRepository.softRemove);
//         when(mockSoftRemove)
//             .calledWith(dummyEmployees[0])
//             .mockResolvedValue(dummyEmployees[0])
//             .calledWith(dummyEmployees[1])
//             .mockResolvedValue(dummyEmployees[1]);
//         employeeRepository.softRemove = mockSoftRemove;

//         const deletedUser = await employeeService.deleteEmployeeByID(1);
//         expect(deletedUser).toEqual(dummyEmployees[0]);
//         expect(mockSoftRemove).toHaveBeenCalledTimes(1);
//         expect(mockGet).toHaveBeenCalledTimes(1);
//     });

//     it("should return a valid token", async () => {
//         const mockGet = jest.fn(employeeRepository.findOneBy);
//         when(mockGet)
//             .calledWith({ email: "test1@gmail.com" })
//             .mockResolvedValue(dummyEmployees[0])
//             .calledWith({ email: "test2@gmail.com" })
//             .mockResolvedValue(dummyEmployees[1]);
//         employeeRepository.findOneBy = mockGet;

//         const token1 = await employeeService.loginEmployee(
//             "test1@gmail.com",
//             "password123"
//         );
//         const token2 = await employeeService.loginEmployee(
//             "test1@gmail.com",
//             "password123"
//         );

//         try {
//             const check2 = jsonwebtoken.verify(
//                 token2.token,
//                 process.env.JWT_SECRET
//             );

//             expect((check2 as JwtPayload).name).toEqual("test1");

//             const check1 = jsonwebtoken.verify(
//                 token1.token,
//                 // process.env.JWT_SECRET
//                 "abc123"
//             );
//         } catch (error) {
//             expect(error.message).toEqual("invalid signature");
//         }
//     });
// });
