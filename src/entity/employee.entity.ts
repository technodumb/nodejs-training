import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";

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
}

export default Employee;
