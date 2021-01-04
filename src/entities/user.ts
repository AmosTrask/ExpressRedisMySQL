import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

enum Role {
    Admin = 'Admin',
    Member = 'Member',
    Guest = 'Guest'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    _id?: number;

    @Column()
    username: string;

    @Column()
    role: Role
}
