import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Modules/auth/auth.module';
import { BlogsModule } from './Modules/blogs/blogs.module';
import { ReadingListModule } from './Modules/reading-list/reading-list.module';
import { CommentsModule } from './Modules/comments/comments.module';
import { WebscraperModule } from './modules/webscraper/webscraper.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'nestjs-auth-test',
    password: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    entities: ["dist/**/*.entity{.ts, .js}"],
  }),
    
    AuthModule,
    BlogsModule,
    ReadingListModule,
    CommentsModule,
    WebscraperModule, 
    
  ],
})
export class AppModule {}
