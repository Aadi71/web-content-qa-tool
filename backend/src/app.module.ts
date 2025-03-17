import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingService } from './scraping/scraping.service';
import { QaService } from './qa/qa.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ScrapingService, QaService],
})
export class AppModule {}
