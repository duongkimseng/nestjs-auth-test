import { UserEntity } from "src/Modules/auth/user.entity";
import { BlogEntity } from "src/Modules/blogs/blog.entity";
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReadingListEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => UserEntity, user => user.readingList)
    user: UserEntity;

    @Column()
    userId: number;

    @ManyToOne(type => BlogEntity, blog => blog.readingList)
    blog: BlogEntity;

    @Column()
    blogId: number;

}
