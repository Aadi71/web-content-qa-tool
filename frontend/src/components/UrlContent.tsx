
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expand, Minimize } from 'lucide-react';

interface UrlContentProps {
  url: string;
  content: string;
  expanded: boolean;
  onToggleExpand: () => void;
}

const UrlContent: React.FC<UrlContentProps> = ({ 
  url, 
  content, 
  expanded,
  onToggleExpand
}) => {
  return (
    <Card className="w-full mb-4 shadow-sm">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium truncate max-w-[85%]">{url}</CardTitle>
        <button 
          onClick={onToggleExpand}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Expand className="h-4 w-4" />
          )}
        </button>
      </CardHeader>
      {expanded && (
        <CardContent className="py-3 px-4 max-h-60 overflow-y-auto bg-gray-50 text-sm">
          <pre className="whitespace-pre-wrap font-sans">{content}</pre>
        </CardContent>
      )}
    </Card>
  );
};

export default UrlContent;
