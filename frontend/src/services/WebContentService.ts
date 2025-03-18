export interface WebContent {
  url: string;
  content: string;
}

export interface QAResponse {
  answer: string;
  sourcesUsed: string[];
}

class WebContentService {
  private urlContents: WebContent[] = [];
  private baseUrl = import.meta.env.VITE_BACKEND_API_URL;

  async startServer(): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/start-api`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return response.text();
    } catch (error) {
      console.error('Error starting API:', error);
      throw error;
    }
  }

  // Real API integration to fetch URL content
  async fetchUrlContents(urls: string[]): Promise<WebContent[]> {
    console.log(`Fetching content for URLs: ${urls}`);

    try {
      const response = await fetch(`${this.baseUrl}/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const contents = data?.contents || [];

      // Assuming the API returns an array of objects with url and content fields
      // If the API response format is different, adjust the mapping accordingly
      return contents.map((item: any) => ({
        url: item.url,
        content: item.content,
      }));
    } catch (error) {
      console.error('Error fetching URL contents:', error);
      throw error;
    }
  }

  async processUrls(urls: string[]): Promise<WebContent[]> {
    try {
      // Use the real API to fetch content
      this.urlContents = await this.fetchUrlContents(urls);
      return this.urlContents;
    } catch (error) {
      console.error('Error processing URLs:', error);
      // Create error messages for each URL
      this.urlContents = urls.map(url => ({
        url,
        content: `Error processing URL: ${error instanceof Error ? error.message : String(error)}`
      }));
      throw error;
    }
  }

  async getAnswerForQuestion(question: string): Promise<QAResponse> {
    console.log(`Answering question: ${question}`);

    if (this.urlContents.length === 0) {
      throw new Error("No content has been processed yet. Please add and process URLs first.");
    }

    try {
      // Prepare context from all URL contents
      const context = this.urlContents
        .map(item => `URL: ${item.url}\nContent: ${item.content}`)
        .join('\n\n');

      // Call the ask API
      const response = await fetch(`${this.baseUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Adjust this mapping according to the actual response structure
      return {
        answer: data.answer || "No answer found.",
        sourcesUsed: data.sourcesUsed || this.urlContents.map(content => content.url)
      };
    } catch (error) {
      console.error('Error getting answer:', error);
      throw error;
    }
  }

  getProcessedContents(): WebContent[] {
    return this.urlContents;
  }
}

// Singleton instance
export const webContentService = new WebContentService();
