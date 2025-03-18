import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    // Initialize the Gemini API
    this.genAI = new GoogleGenerativeAI(this.configService.get<string>('GEMINI_API_KEY') || ""); // Store your API key in an environment variable
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async getAnswerFromContext(question: string, context: string): Promise<string> {
    try {
      const prompt = `You are a helpful assistant. Answer the following question based only on the provided context. If the context does not contain enough information to answer the question, say "I don't know."

Context: ${context}

Question: ${question}

Answer:`;

      // Generate content using the Gemini model
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Failed to get answer from Gemini: ${error.message}`);
    }
  }

  async getRelevantContent(context: string): Promise<string> {
    try {
      const prompt = `I will be giving you the scraped content from website, however, it contains redundant information or html tags as well. Please summarize the content for me, so that I can send relevant content for question and answers based on that content as a prompt to AI model."

Context: ${context}`;

      // Generate content using the Gemini model
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Failed to get answer from Gemini: ${error.message}`);
    }
  }
}
