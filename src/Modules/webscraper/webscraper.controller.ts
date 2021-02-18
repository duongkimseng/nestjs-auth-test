import { Controller, Get, Post, Body, Put, Param, Delete, Res, Req, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Forex } from './forex.interface';
import { WebscraperService } from './webscraper.service';

@ApiTags('webscrapper')
@Controller('webscraper')
export class WebscraperController {
  constructor(private readonly webscraperService: WebscraperService) {}

  @Get()
  async scrape(): Promise<Forex[]>{

    return this.webscraperService.scrape();
  }
}
