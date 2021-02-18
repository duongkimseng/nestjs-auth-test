import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { ReadingListModule } from './modules/reading-list/reading-list.module';
import { CommentsModule } from './modules/comments/comments.module';
import { WebscraperModule } from './modules/webscraper/webscraper.module';
import { ListModule } from './modules/list/list.module';
import { TypeormConfigModule } from '../config/database/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    TypeormConfigModule,
    ConfigModule.forRoot({
      envFilePath: ['env/dev.env'],
      isGlobal: true,
    }),
    AuthModule,
    BlogsModule,
    ReadingListModule,
    CommentsModule,
    WebscraperModule,
    ListModule,
    UploadModule,
  ],
})
export class AppModule {}
