
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus } from 'lucide-react';

interface UrlInputProps {
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ urls, setUrls, onSubmit, isLoading }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleAddUrl = () => {
    if (!currentUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(currentUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    if (urls.includes(currentUrl)) {
      setError('This URL is already added');
      return;
    }

    setUrls([...urls, currentUrl]);
    setCurrentUrl('');
    setError('');
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls(urls.filter(url => url !== urlToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddUrl();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter a website URL (e.g., https://example.com)"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
          disabled={isLoading}
        />
        <Button 
          onClick={handleAddUrl} 
          variant="outline" 
          size="icon"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {error && <p className="text-destructive text-sm">{error}</p>}
      
      {urls.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {urls.map((url, index) => (
              <div 
                key={index} 
                className="flex items-center px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm"
              >
                <span className="mr-1 max-w-[200px] truncate">{url}</span>
                <button 
                  onClick={() => handleRemoveUrl(url)} 
                  className="ml-1 text-brand-600 hover:text-brand-800"
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={onSubmit} 
            className="w-full bg-brand-600 hover:bg-brand-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Processing URLs...' : 'Process URLs'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UrlInput;
