import { type } from "os";
import { UserEntity } from "src/Modules/auth/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ReadingListEntity } from "../reading-list/entities/reading-list.entity";

@Entity()
export class BlogEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(()=> UserEntity, user => user.blogs, {eager: false})
    user: UserEntity;

    @OneToMany(type => ReadingListEntity, readingList => readingList.blog)
    readingList: ReadingListEntity[];
}