
import React from 'react';
import ChatMessage, { Message } from '@/components/ChatMessage';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  return (
    <div className="w-full flex-grow overflow-y-auto px-2 py-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isLoading && messages.length > 0 && (
        <ChatMessage 
          message={{ 
            id: 'loading', 
            role: 'assistant', 
            content: '' 
          }} 
          isLoading={true} 
        />
      )}
      
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-center max-w-md">
            Add URLs and process them to start asking questions about their content.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
