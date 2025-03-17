import { Injectable } from '@nestjs/common';
import { pipeline } from '@huggingface/transformers';

@Injectable()
export class QaService {
  private qaPipeline: any;

  async initialize() {
    this.qaPipeline = await pipeline('question-answering');
  }

  async answerQuestion(question: string, context: string): Promise<string> {
    if (!this.qaPipeline) {
      await this.initialize();
    }
    const result = await this.qaPipeline(question, context);
    return result.answer;
  }
}
