import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { ListEntity } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
  ) {}

  async create(createListDto: CreateListDto): Promise<ListEntity> {
    return await this.listRepository.save(
      this.listRepository.create(createListDto),
    );
  }

  async findAll(): Promise<ListEntity[]> {
    return await this.listRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  // update(id: number, updateListDto: UpdateListDto) {
  //   return `This action updates a #${id} list`;
  // }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
