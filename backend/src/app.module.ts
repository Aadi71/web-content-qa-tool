import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingService } from './scraping/scraping.service';
import { QaService } from './qa/qa.service';
import { OpenAIService } from './openai/openai.service';
import { GeminiService } from './gemini/gemini.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ScrapingService, QaService, OpenAIService, GeminiService],
})
export class AppModule {}
