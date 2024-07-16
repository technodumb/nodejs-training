import { when } from "jest-when";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "./department.service";
import {
    DepartmentIDNotFoundException,
    DepartmentNameNotFoundException,
} from "../exception/notFound.exception";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";

describe("Department Services", () => {
    let departmentRepository: DepartmentRepository;
    let departmentService: DepartmentService;
    let dummyDepartments: Department[];

    beforeAll(() => {
        // dataSource = jest.fn();
        const dataSource = {
            getRepository: jest.fn(),
        };

        departmentRepository = new DepartmentRepository(
            dataSource.getRepository(Department)
        ) as jest.Mocked<DepartmentRepository>;

        departmentService = new DepartmentService(departmentRepository);

        dummyDepartments = [
            {
                id: 1,
                name: "HR",
                employees: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                id: 2,
                name: "Engineering",
                employees: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                id: 3,
                name: "Security",
                employees: [
                    {
                        name: "Alnas",
                    },
                ] as Employee[],
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
        ];
    });

    it("should return all Departments", async () => {
        const mock = jest
            .fn(departmentRepository.findAll)
            .mockResolvedValue(dummyDepartments);
        departmentRepository.findAll = mock;

        const users = await departmentService.getAllDepartments();
        expect(users[0].name).toEqual("HR");
    });

    it("should return one department by ID", async () => {
        const mock = jest.fn(departmentRepository.findOneBy);
        when(mock)
            .calledWith({ id: 1 })
            .mockResolvedValue(dummyDepartments[0])
            .calledWith({ id: 3 })
            .mockResolvedValue(undefined);
        departmentRepository.findOneBy = mock;

        try {
            const department1 = await departmentService.getDepartmentByID(1);
            expect(department1.name).toEqual("HR");
        } catch (error) {
            expect(true).toEqual(false);
        }

        try {
            const department2 = await departmentService.getDepartmentByID(3);
            expect(true).toEqual(false);
        } catch (error) {
            if (error instanceof DepartmentIDNotFoundException) {
                expect(error.status).toEqual(404);
            } else {
                expect(true).toEqual(false);
            }
        }
    });

    it("should return one department by Name", async () => {
        const mock = jest.fn(departmentRepository.findOneBy);
        when(mock)
            .calledWith({ name: "Engineering" })
            .mockResolvedValue(dummyDepartments[1])
            .calledWith({ name: "Security" })
            .mockResolvedValue(undefined);
        departmentRepository.findOneBy = mock;

        try {
            const department1 = await departmentService.getDepartmentByName(
                "Engineering"
            );
            expect(department1.id).toEqual(2);
        } catch (error) {
            expect(true).toEqual(false);
        }

        try {
            const department2 = await departmentService.getDepartmentByName(
                "Security"
            );
            expect(true).toEqual(false);
        } catch (error) {
            if (error instanceof DepartmentNameNotFoundException) {
                expect(error.status).toEqual(404);
            } else {
                expect(true).toEqual(false);
            }
        }
    });

    it("should create an employee", async () => {
        const mockSave = jest.fn(departmentRepository.save);
        mockSave.mockResolvedValue({
            name: "Security",
            id: 5,
        } as Department);
        departmentRepository.save = mockSave;

        const newDepartment = await departmentService.createDepartment(
            "Security"
        );
        expect(newDepartment).toEqual({ id: 5, name: "Security" });
    });

    it("should update an existing employee", async () => {
        const mockDepartment = jest.fn(departmentService.getDepartmentByID);
        when(mockDepartment)
            .calledWith(2)
            .mockResolvedValue(dummyDepartments[1]);
        departmentService.getDepartmentByID = mockDepartment;

        const mockSave = jest
            .fn(departmentRepository.save)
            .mockResolvedValue({ ...dummyDepartments[1], name: "Security" });
        departmentRepository.save = mockSave;

        const updatedDepartment = await departmentService.updateDepartment(
            1,
            "Security"
        );
        expect(updatedDepartment.name).toEqual("Security");
    });

    it("should delete an employee", async () => {
        const mockDeptGet = jest.fn(departmentService.getDepartmentByID);
        when(mockDeptGet)
            .calledWith(2)
            .mockResolvedValue(dummyDepartments[1])
            .calledWith(3)
            .mockResolvedValue(dummyDepartments[2]);
        departmentService.getDepartmentByID = mockDeptGet;

        const mockSoftRemove = jest.fn(departmentRepository.softRemove);
        when(mockSoftRemove)
            .calledWith(dummyDepartments[1])
            .mockResolvedValue(dummyDepartments[1]);
        departmentRepository.softRemove = mockSoftRemove;

        try {
            const deletedDepartment = await departmentService.deleteDepartment(
                2
            );
            expect(deletedDepartment.name).toEqual("Engineering");
        } catch (error) {
            console.log(error);
            expect(true).toEqual(false);
        }

        try {
            const deletedDepartment = await departmentService.deleteDepartment(
                3
            );
            expect(true).toEqual(false);
        } catch (error) {
            if (error instanceof HttpException) {
                expect(error.status).toEqual(400);
            } else {
                expect(true).toEqual(false);
            }
        }
    });
});
