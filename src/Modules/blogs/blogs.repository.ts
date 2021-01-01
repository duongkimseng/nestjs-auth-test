import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository, TreeRepository } from "typeorm";
import { BlogDto } from "./dto/blog.dto";
import { BlogEntity } from "./blog.entity";
import { UserEntity } from "src/Modules/auth/user.entity";

@EntityRepository(BlogEntity)
export class BlogsRepository extends Repository<BlogEntity>{
    
    async createBlog(blogDto: BlogDto, user: UserEntity): Promise<BlogEntity>{
        try{
            const {title, content} = blogDto;
            const blog = new BlogEntity();
    
            blog.title = title;
            blog.content = content;
            blog.user = user;
    
            await blog.save();
            delete blog.user;

            return blog;
        }catch(err){
            console.log(err);
        }
        
    }

    async getBlogById(
        id: number,
        
    ): Promise<BlogEntity>{
        const found = await this.findOne({where:{id}});

        if(!found){
            throw new NotFoundException(`Blog with ID: ${id} is not found`);
        }

        return found;
    }

    async getAllBlogs(): Promise<BlogEntity[]>{
        return await this.find();
    }

    async deleteBlog(id: number, user: UserEntity): Promise<void>{
        const result = await this.delete({id, user: user});
        if(result.affected === 0){
            throw new NotFoundException(`Blog with ID "${id}" is not found`);
        }
    }
}