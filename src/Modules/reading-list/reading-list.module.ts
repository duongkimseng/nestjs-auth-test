import { Module, forwardRef } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';
import { ReadingListController } from './reading-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingListEntity } from './entities/reading-list.entity';

@Module({
  imports: [
    // forwardRef(() => BlogsModule),
    TypeOrmModule.forFeature([ReadingListEntity]),
  ],
  controllers: [ReadingListController],
  providers: [ReadingListService],
  exports: [ReadingListService],
})
export class ReadingListModule {}
