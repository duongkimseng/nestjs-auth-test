import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { BlogEntity } from './blog.entity';
import { BlogsRepository } from './blogs.repository';
import { UserEntity } from 'src/Modules/auth/user.entity';
import { ReadingListService } from '../reading-list/reading-list.service';
import { Observable, from } from 'rxjs';
import { ReadingListEntity } from '../reading-list/entities/reading-list.entity';

@Injectable()
export class BlogsService {
    constructor(
        private readonly blogsRepo: BlogsRepository,

        private readingListService: ReadingListService,
    ){}

    async createBlog(blogDto: BlogDto, user: UserEntity): Promise<BlogEntity>{
        return this.blogsRepo.createBlog(blogDto, user);
    }

    getBlogById(id: number): Promise<BlogEntity>{
        return this.blogsRepo.getBlogById(id);
    }

    getAllBlogs(): Promise<BlogEntity[]>{
        return this.blogsRepo.getAllBlogs();
    }

    deleteBlog(id: number, user: UserEntity): Promise<void>{
        return this.blogsRepo.deleteBlog(id, user);
    }

    async saveToReadingList(id: number,user: UserEntity): Promise<any>{
        const blog = await this.blogsRepo.findOne({id});
        return from(this.readingListService.saveToReadingList(user, blog));
    }
}
