
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KnowledgeChatbot } from '@/components/knowledge-chatbot';

export default function KnowledgeBasePage() {

  return (
    <div className="flex flex-col h-full p-4 md:p-8">
      <div className="flex-grow flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Medicinal Knowledge Chatbot</CardTitle>
            <CardDescription>
              Ask me anything about medicinal plants, their uses, and preparations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <KnowledgeChatbot />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
