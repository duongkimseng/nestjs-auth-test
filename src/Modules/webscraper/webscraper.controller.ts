import { Controller, Get, Post, Body, Put, Param, Delete, Res, Req, } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forex } from './forex.interface';
import { WebscraperService } from './webscraper.service';


@Controller('webscraper')
export class WebscraperController {
  constructor(private readonly webscraperService: WebscraperService) {}

  @Get()
  async scrape(): Promise<Forex[]>{

    return this.webscraperService.scrape();
  }
}
