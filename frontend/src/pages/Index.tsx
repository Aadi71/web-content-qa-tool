import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import UrlInput from "@/components/UrlInput";
import QuestionInput from "@/components/QuestionInput";
import ChatInterface from "@/components/ChatInterface";
import ChatMessage, { Message } from "@/components/ChatMessage";
import UrlContent from "@/components/UrlContent";
import {
  webContentService,
  WebContent,
  QAResponse,
} from "@/services/WebContentService";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState<string[]>([]);
  const [isProcessingUrls, setIsProcessingUrls] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [processedContents, setProcessedContents] = useState<WebContent[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedUrls, setExpandedUrls] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("chat");

  const handleProcessUrls = async () => {
    if (urls.length === 0) {
      toast({
        title: "No URLs to process",
        description: "Please add at least one URL to process",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingUrls(true);

    try {
      const contents = await webContentService.processUrls(urls);
      setProcessedContents(contents);

      // Initialize expanded state for all URLs
      const expanded: Record<string, boolean> = {};
      contents.forEach((content) => {
        expanded[content.url] = false;
      });
      setExpandedUrls(expanded);

      toast({
        title: "URLs processed successfully",
        description: `Processed ${contents.length} URLs`,
      });

      // Switch to the chat tab
      setActiveTab("chat");
    } catch (error) {
      console.error("Error processing URLs:", error);
      toast({
        title: "Error processing URLs",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessingUrls(false);
    }
  };

  const handleAskQuestion = async (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAnswering(true);

    try {
      const response = await webContentService.getAnswerForQuestion(question);

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting answer:", error);
      toast({
        title: "Error answering question",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnswering(false);
    }
  };

  const handleToggleExpand = (url: string) => {
    setExpandedUrls((prev) => ({
      ...prev,
      [url]: !prev[url],
    }));
  };

  useEffect(() => {
    async function startServer() {
      try {
        const res = await webContentService.startServer();
        console.log(res);
      } catch (error) {
        console.error("Error starting server:", error);
        toast({
          title: "Error starting server",
          description:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          variant: "destructive",
        });
      }
    }
    startServer();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="w-full bg-white shadow-sm py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-brand-700">
            Web Content Q&A Tool
          </h1>
          <p className="text-gray-500">
            Extract information and ask questions about web content
          </p>
        </div>
      </header>

      <main className="flex-grow h-full w-full max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <UrlInput
              urls={urls}
              setUrls={setUrls}
              onSubmit={handleProcessUrls}
              isLoading={isProcessingUrls}
            />

            {isProcessingUrls && (
              <div className="flex items-center justify-center mt-4 space-x-2 text-brand-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing URLs...</span>
              </div>
            )}
          </div>

          {processedContents.length > 0 && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full rounded-none border-b">
                <TabsTrigger
                  value="chat"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-600"
                >
                  Q&A Chat
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-600"
                >
                  Processed URLs ({processedContents.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex flex-col h-full p-4">
                <ChatInterface messages={messages} isLoading={isAnswering} />
                <div className="p-2 border-t">
                  <QuestionInput
                    onAskQuestion={handleAskQuestion}
                    isDisabled={processedContents.length === 0}
                    isLoading={isAnswering}
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="content"
                className="h-[calc(100vh-300px)] overflow-y-auto p-4" // Fixed height and scroll
              >
                <div className="space-y-4">
                  {processedContents.map((content) => (
                    <UrlContent
                      key={content.url}
                      url={content.url}
                      content={content.content}
                      expanded={expandedUrls[content.url] || false}
                      onToggleExpand={() => handleToggleExpand(content.url)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <footer className="w-full bg-white border-t py-4 px-6 text-center text-gray-500 text-sm">
        <div className="max-w-5xl mx-auto">
          <p>Web Content Q&A Tool - Ask questions about web content</p>
          <p className="text-xs">Built with ❤️ </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
