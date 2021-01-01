import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { BlogEntity } from '../blogs/blog.entity';
import { CreateReadingListDto } from './dto/create-reading-list.dto';
import { UpdateReadingListDto } from './dto/update-reading-list.dto';
import { ReadingListEntity } from './entities/reading-list.entity';

@Injectable()
export class ReadingListService {
  constructor(
    @InjectRepository(ReadingListEntity)
    private readingListRepo: Repository<ReadingListEntity>,
  ){}

  async saveToReadingList(user: UserEntity, blog: BlogEntity): Promise<ReadingListEntity>{

    const exists = await this.readingListRepo.findOne({where: {userId: user.id, blogId: blog.id}})

    if(exists){
      console.log()
      return this.unsaveReadingList(user, blog)
    }

    const readingList = new ReadingListEntity();

    readingList.user = user;
    readingList.blog = blog;

    delete user.blogs;
    return await readingList.save();
  }

  async unsaveReadingList(user: UserEntity, blog: BlogEntity): Promise<ReadingListEntity>{
    const exists = await this.readingListRepo.findOne({where: {userId: user.id, blogId: blog.id}})

    if(!exists){
      
      return this.saveToReadingList(user, blog);
    }

    this.readingListRepo.delete(exists);
  }

  create(createReadingListDto: CreateReadingListDto) {
    return 'This action adds a new readingList';
  }

  findAll() {
    return `This action returns all readingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} readingList`;
  }

  update(id: number, updateReadingListDto: UpdateReadingListDto) {
    return `This action updates a #${id} readingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} readingList`;
  }
}
