import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScrapingService {
  async scrapeContent(url: string): Promise<string> {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      return $('body').text().replace(/\s+/g, ' ').trim();
    } catch (error) {
      throw new Error(`Failed to scrape content: ${error.message}`);
    }
  }
}
