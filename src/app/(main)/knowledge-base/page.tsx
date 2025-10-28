
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KnowledgeChatbot } from '@/components/knowledge-chatbot';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function KnowledgeChatbotFallback() {
  return (
     <div className="flex-1 flex flex-col border rounded-lg shadow-inner min-h-0">
        <div className="p-4 flex-1">
          <Skeleton className="h-16 w-1/2" />
          <div className="flex justify-end mt-4">
             <Skeleton className="h-16 w-1/2" />
          </div>
        </div>
        <div className="p-4 border-t">
          <Skeleton className="h-10 w-full" />
        </div>
    </div>
  )
}

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
            <Suspense fallback={<KnowledgeChatbotFallback />}>
              <KnowledgeChatbot />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
