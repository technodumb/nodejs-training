import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: String;

    @Column()
    name: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

// class Employee {
//     id: number;
//     name: string;
//     email: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

export default Employee;
