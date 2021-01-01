import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Modules/auth/auth.module';
import { ReadingListModule } from '../reading-list/reading-list.module';
import { BlogsController } from './blogs.controller';
import { BlogsRepository } from './blogs.repository';
import { BlogsService } from './blogs.service';

@Module({
  imports: [
    // forwardRef(()=> ReadingListModule),
    ReadingListModule,
    TypeOrmModule.forFeature([BlogsRepository]),
    AuthModule
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
