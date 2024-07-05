import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/role.enum";

@Entity()
class Employee extends AbstractEntity {
    @Column()
    email: String;

    @Column()
    name: String;

    @Column()
    age: Number;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true,
        onDelete: "CASCADE",
    })
    address: Address;

    @Column({ nullable: true })
    password: String;

    @Column({ nullable: true })
    role: Role;
}

export default Employee;
