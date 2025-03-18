import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScrapingService {
  async scrapeContent(url: string): Promise<{ url: string; content: string; error?: string }> {
    try {
      const { data } = await axios.get(url, {
        timeout: 10000, // Set a timeout to avoid hanging on slow responses
      });

      const $ = cheerio.load(data);
      const content = $('body').text().replace(/\s+/g, ' ').trim();

      if (!content) {
        return { url, content: 'No content found', error: 'No content found' };
      }

      return { url, content };
    } catch (error) {
      return { url, content: `Failed to scrape content: ${error.message}`, error: `Failed to scrape content: ${error.message}` };
    }
  }
}
