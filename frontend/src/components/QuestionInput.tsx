import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface QuestionInputProps {
  onAskQuestion: (question: string) => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  onAskQuestion,
  isDisabled,
  isLoading,
}) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isDisabled) {
      onAskQuestion(question);
      setQuestion("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        placeholder={
          isDisabled
            ? "Process URLs to ask questions..."
            : "Ask a question about the web content...(Ex: Karken belongs to which species?)"
        }
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pr-12 min-h-[60px] resize-none"
        disabled={isDisabled || isLoading}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute bottom-2 right-2 text-brand-600 hover:text-brand-800 hover:bg-transparent"
        disabled={isDisabled || isLoading || !question.trim()}
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default QuestionInput;
