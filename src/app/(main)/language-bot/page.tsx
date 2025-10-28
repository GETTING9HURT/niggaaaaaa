
import { TribalLanguageChatbotClient } from '@/components/tribal-language-chatbot-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function LanguageBotFallback() {
  return (
    <div className="h-full flex flex-col border rounded-lg shadow-inner">
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


export default function LanguageBotPage() {
  return (
    <div className="flex flex-col h-full p-4 md:p-8">
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Tribal Language AI Bot</CardTitle>
            <CardDescription>
              Ask me anything about the tribal languages of India, their scripts, origins, and cultural significance.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <Suspense fallback={<LanguageBotFallback />}>
              <TribalLanguageChatbotClient />
            </Suspense>
          </CardContent>
        </Card>
    </div>
  );
}
