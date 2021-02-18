import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { BlogEntity } from './blog.entity';
import { BlogsService } from './blogs.service';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { UserEntity } from 'src/modules/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService){}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createBlog(
        @Body() blogDto: BlogDto,
        @GetUser() user: UserEntity,
    ): Promise<BlogEntity>{
        return this.blogsService.createBlog(blogDto, user);
    }

    @Get(':id')
    getBlogById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<BlogEntity>{
        return this.blogsService.getBlogById(id);
    }

    @Get()
    getAllBlogs(): Promise<BlogEntity[]>{
        return this.blogsService.getAllBlogs();
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    deleteBlog(
        @Param('id') id: number,
        @GetUser() user: UserEntity
    ): Promise<void>{
        return this.blogsService.deleteBlog(id, user);
    }

    @UseGuards(AuthGuard())
    @Post(':id/save')
    saveToReadingList(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: UserEntity,
    ): Promise<any>{
        // console.log('userId: ' + user.id + ' blogId: ' + id)
        return this.blogsService.saveToReadingList(id, user)
    }
}
