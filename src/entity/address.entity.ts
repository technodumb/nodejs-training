import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity {
    constructor(line1: string, pincode: string) {
        super();
        this.line1 = line1;
        this.pincode = pincode;
    }
    @Column()
    line1: string;

    @Column()
    pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address)
    @JoinColumn()
    employee: Employee;
}

export default Address;
