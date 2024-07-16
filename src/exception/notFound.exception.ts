import HttpException from "./http.exception";

class EmployeeNotFoundException extends HttpException {
    constructor(private employeeID: number) {
        super(404, `Employee #${employeeID} does not exist`);
    }
}

class DepartmentIDNotFoundException extends HttpException {
    constructor(private departmentID: number) {
        super(404, `Department #'${departmentID}' does not exist`);
    }
}

class DepartmentNameNotFoundException extends HttpException {
    constructor(private departmentName: string) {
        super(404, `Department '${departmentName}' does not exist`);
    }
}

export {
    EmployeeNotFoundException,
    DepartmentNameNotFoundException,
    DepartmentIDNotFoundException,
};
