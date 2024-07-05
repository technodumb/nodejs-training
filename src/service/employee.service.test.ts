import { when } from "jest-when";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { EmployeeService } from "./employee.service";

describe("Employee Service", () => {
    let employeeRepository: EmployeeRepository;
    let employeeService: EmployeeService;

    beforeAll(() => {
        const dataSource = {
            getRepository: jest.fn(),
        };
        employeeRepository = new EmployeeRepository(
            dataSource.getRepository(Employee)
        ) as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it("should return allEmployees", async () => {
        const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
        employeeRepository.find = mock;

        const users = await employeeService.getAllEmployees();
        expect(users).toEqual([]);
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("should return employee with id", async () => {
        // const idEmployee = new Employee();
        // idEmployee.
        // const mock = jest
        //     .fn(employeeRepository.findOneBy)
        //     .mockResolvedValue({ id: 1, name: "as" } as Employee);
        const mock = jest.fn();
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue({ id: 1, name: "as" } as unknown as Employee)
            .calledWith({ id: 2 })
            .mockResolvedValue({ id: 2, name: "valuess" });
        employeeRepository.findOneBy = mock;

        const users = await employeeService.getEmployeeByID(2);
        expect(users.name).toEqual("as");
        expect(mock).toHaveBeenCalledTimes(1);
    });
});
