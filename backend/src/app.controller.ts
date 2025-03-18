import { Controller, Post, Body, Get } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';
import { QaService } from './qa/qa.service';

@Controller()
export class AppController {
  constructor(
    private readonly scrapingService: ScrapingService,
    private readonly qaService: QaService,
  ) { }

  @Get('/')
  home() {
    return {
      message: 'Welcome to the backend of Web Content QnA.',
      frontendUrl: 'https://web-content-qa-tool.vercel.app'
    };
  }

  @Post('ingest')
  async ingestContent(@Body('urls') urls: string[]) {
    try {
      // Scrape content for each URL and return an array of objects
      const contents = await Promise.all(
        urls.map(async (url) => {
          const content = await this.scrapingService.scrapeContent(url);
          return content; // Return an object with URL and content
        }),
      );

      return { contents }; // Return the array of objects
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('ask')
  async askQuestion(@Body('question') question: string, @Body('context') context: string) {
    const answer = await this.qaService.answerQuestion(question, context);
    return { answer };
  }

  @Get('start-api')
  startApi() {
    return 'API is running!';
  }
}
