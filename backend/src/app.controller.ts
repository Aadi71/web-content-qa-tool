import { Controller, Post, Body } from '@nestjs/common';
import { ScrapingService } from './scraping/scraping.service';
import { QaService } from './qa/qa.service';

@Controller()
export class AppController {
  constructor(
    private readonly scrapingService: ScrapingService,
    private readonly qaService: QaService,
  ) {}

  @Post('ingest')
  async ingestContent(@Body('urls') urls: string[]) {
    const contents = await Promise.all(
      urls.map((url) => this.scrapingService.scrapeContent(url)),
    );
    return { contents };
  }

  @Post('ask')
  async askQuestion(@Body('question') question: string, @Body('context') context: string) {
    const answer = await this.qaService.answerQuestion(question, context);
    return { answer };
  }
}
