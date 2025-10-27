import LanguageGameClient from '@/components/language-game-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LanguageLearningPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Tribal Language Hub</CardTitle>
          <CardDescription>
            Learn to pronounce plant names in various tribal languages. Listen, practice, and test your knowledge!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LanguageGameClient />
        </CardContent>
      </Card>
    </div>
  );
}
