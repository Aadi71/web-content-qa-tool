import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expand, Minimize } from "lucide-react";

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
  onToggleExpand,
}) => {
  return (
    <Card
      className="w-full mb-4 shadow-sm hover:bg-gray-100 hover:cursor-pointer"
      onClick={onToggleExpand}
    >
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium truncate max-w-[85%]">
          {url}
        </CardTitle>
        {expanded ? (
          <Minimize className="h-4 w-4" />
        ) : (
          <Expand className="h-4 w-4" />
        )}
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
