import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BlogEntity } from "src/modules/blogs/blog.entity";
import { ReadingListEntity } from "../reading-list/entities/reading-list.entity";

@Entity()
// @Unique(['username'])
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(()=> BlogEntity, blog => blog.user, {eager: true})
    blogs: BlogEntity[];

    @OneToMany(type => ReadingListEntity, readingList => readingList.user)
    readingList: ReadingListEntity[];

    @BeforeInsert()
    ToLowerCase(){
        this.username = this.username.toLowerCase();
    }

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        console.log(hash === this.password);
        return hash === this.password;
    }
}