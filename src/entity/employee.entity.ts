import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    age: Number;

    @OneToOne(() => Address, (address) => address.employee,)
    address: Address;

    @ManyToOne(()=>Department, (department) => department.employees)
    department: Department;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    role: Role;
}

export default Employee;
