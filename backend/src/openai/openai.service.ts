import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat/completions';

@Injectable()
export class OpenAIService {
  private openai = new OpenAI({
    apiKey: ""
  });
  constructor() { }

  async getAnswerFromContext(question: string, context: string): Promise<ChatCompletionMessage> {
    try {
      const prompt = `You are a helpful assistant. Answer the following question based only on the provided context. If the context does not contain enough information to answer the question, say "I don't know."

Context: ${context}

Question: ${question}

Answer:`;

      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-4o-mini',
      });

      return completion.choices[0].message
    } catch (error) {
      throw new Error(`Failed to get answer from OpenAI: ${error.message}`);
    }
  }
}
