import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { Observable } from 'rxjs';
import { ListEntity } from './entities/list.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('list')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  async create(@Body() createListDto: CreateListDto): Promise<ListEntity> {
    return this.listService.create(createListDto);
  }

  @Get()
  async findAll(): Promise<ListEntity[]> {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
  //   return this.listService.update(+id, updateListDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
