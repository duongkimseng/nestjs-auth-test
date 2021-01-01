import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';
import { CreateReadingListDto } from './dto/create-reading-list.dto';
import { UpdateReadingListDto } from './dto/update-reading-list.dto';

@Controller('reading-list')
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService) {}

  @Post()
  create(@Body() createReadingListDto: CreateReadingListDto) {
    return this.readingListService.create(createReadingListDto);
  }

  @Get()
  findAll() {
    return this.readingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingListService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateReadingListDto: UpdateReadingListDto) {
    return this.readingListService.update(+id, updateReadingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingListService.remove(+id);
  }
}
