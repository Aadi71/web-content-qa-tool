import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize the Gemini API
    this.genAI = new GoogleGenerativeAI("AIzaSyAMxabbDVMuHqQPCkiHmNBzLr63L1JIK8M"); // Store your API key in an environment variable
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
}
