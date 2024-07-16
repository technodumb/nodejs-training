import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import HttpException from "../exception/http.exception";
import {
    DepartmentIDNotFoundException,
    DepartmentNameNotFoundException,
} from "../exception/notFound.exception";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}
    //  = new DepartmentRepository()

    getAllDepartments = async () => {
        return this.departmentRepository.findAll();
    };

    getDepartmentByID = async (departmentID: number) => {
        const employee = await this.departmentRepository.findOneBy({
            id: departmentID,
        });
        if (!employee) {
            throw new DepartmentIDNotFoundException(departmentID);
        }
        return employee;
    };

    getDepartmentByName = async (departmentName: string) => {
        // return this.departmentRepository.findOneBy({ name: departmentName });
        const employee = await this.departmentRepository.findOneBy({
            name: departmentName,
        });
        if (!employee) {
            throw new DepartmentNameNotFoundException(departmentName);
        }
        return employee;
    };

    createDepartment = async (name: string) => {
        const newDepartment = new Department();
        newDepartment.name = name;
        return this.departmentRepository.save(newDepartment);
    };

    updateDepartment = async (id: number, name: string) => {
        // const newDepartment = new Department()
        const existingDepartment = await this.getDepartmentByID(id);
        existingDepartment.name = name;
        return this.departmentRepository.save(existingDepartment);
    };

    deleteDepartment = async (id: number) => {
        const existingDepartment = await this.getDepartmentByID(id);
        if (existingDepartment.employees.length) {
            throw new HttpException(
                400,
                "Non-empty departments cannot be deleted"
            );
        }
        await this.departmentRepository.softRemove(existingDepartment);
        return existingDepartment;
    };
}

export default DepartmentService;
