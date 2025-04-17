
import React from 'react';
import { Card } from '@/components/ui/card';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MotivationalQuoteProps {
  quote: string;
  author: string;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ quote, author }) => {
  return (
    <Card className="p-6 border border-fitflex-purple/20 shadow-sm overflow-hidden relative bg-gradient-to-br from-white to-fitflex-light-purple/10">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-fitflex-purple to-fitflex-orange"></div>
      
      <div className="flex flex-col">
        <blockquote className="text-lg md:text-xl italic mb-4 pl-4">
          "{quote}"
        </blockquote>
        <div className="flex justify-between items-center">
          <cite className="pl-4 text-muted-foreground not-italic">— {author}</cite>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-fitflex-purple">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MotivationalQuote;
