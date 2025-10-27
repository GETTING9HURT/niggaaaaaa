import { TribalLanguageChatbotClient } from '@/components/tribal-language-chatbot-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LanguageBotPage() {
  return (
    <div className="flex flex-col h-full p-4 md:p-8 gap-8">
      <div className="flex-grow flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Tribal Language AI Bot</CardTitle>
            <CardDescription>
              Ask me anything about the tribal languages of India, their scripts, origins, and cultural significance.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <TribalLanguageChatbotClient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
