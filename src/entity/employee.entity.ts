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
        role: Role
    ) {
        super();
        this.name = name;
        this.email = email;
        this.age = age;
        this.role = role;
        this.password = password;
        this.address = address;
        this.department = department;
    }

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee)
    address: Address;

    @ManyToOne(() => Department, (department) => department.employees)
    department: Department;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    role: Role;
}

export default Employee;
