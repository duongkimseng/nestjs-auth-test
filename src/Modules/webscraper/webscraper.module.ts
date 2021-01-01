import { Module } from '@nestjs/common';
import { WebscraperService } from './webscraper.service';
import { WebscraperController } from './webscraper.controller';
import cheerioModule from 'cheerio';

@Module({
  imports: [
  ],
  controllers: [WebscraperController],
  providers: [WebscraperService]
})
export class WebscraperModule {}
