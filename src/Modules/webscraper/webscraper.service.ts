import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Forex } from './forex.interface';
let cheerio: any = require ('cheerio');


@Injectable()
export class WebscraperService {
  constructor(
  ) {}
 
  async scrape(): Promise<Forex[]>{
    const url = 'https://www.ababank.com/forex-exchange/'
    const AxiosInstance = axios.create();
    const forex: Forex[] = []

    var arr: string[] = [];

    await AxiosInstance.get(url)
    .then(
        res => {
          const html = res.data;
          const $ = cheerio.load(html)
          const contents = $('#forex > .contenttable > tbody > tr > td')

          contents.each((i, elem) => {
            arr[i] = $(elem).text()
          })
          
          for(let i = 0; i < arr.length; i+=3){
            const currency: string = arr[i];
            const buys: string = arr[i+1] ;
            const sells: string = arr[i+2];

            forex.push({
              currency,
              buys,
              sells
            })
          }

          
        }
      ).catch(console.error)
      return forex;
  }
}

