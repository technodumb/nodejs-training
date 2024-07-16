import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
    constructor(
        name: string,
        email: string,
        age: number,
        address: Address,
        department: Department,
        password: string,
        role: Role,
        joiningDate: Date,
        status: string,
        experience: number
    ) {
        super();
        this.name = name;
        this.email = email;
        this.age = age;
        this.role = role;
        this.password = password;
        this.address = address;
        this.department = department;
        this.joiningDate = joiningDate;
        this.status = status;
        this.experience = experience;
    }

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true,
        onDelete: "CASCADE",
    })
    address: Address;

    @ManyToOne(() => Department, (department) => department.employees)
    department: Department;

    @Column()
    password: string;

    @Column()
    role: Role;

    @Column()
    joiningDate: Date;

    @Column()
    status: string;

    @Column()
    experience: number;
}

export default Employee;
