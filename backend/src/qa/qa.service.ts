import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openai/openai.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { ChatCompletionMessage } from 'openai/resources/chat/completions';

@Injectable()
export class QaService {
  constructor(private readonly openaiService: OpenAIService, private readonly geminiService: GeminiService,) { }

  async answerQuestion(question: string, context: string): Promise<string> {
    return this.geminiService.getAnswerFromContext(question, context);
  }
}
