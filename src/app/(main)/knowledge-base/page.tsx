import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { KnowledgeChatbot } from '@/components/knowledge-chatbot';
import { plants } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function KnowledgeBasePage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8 p-4 md:p-8 h-full">
      <div className="lg:col-span-2 flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Medicinal Knowledge Chatbot</CardTitle>
            <CardDescription>
              Ask me anything about medicinal plants, their uses, and preparations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <KnowledgeChatbot />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 h-full">
        <h2 className="text-2xl font-bold font-headline">Browse Plants</h2>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {plants.map(plant => (
          <Card key={plant.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
               <Image src={plant.imageUrl} alt={plant.englishName} width={64} height={64} className="rounded-md object-cover w-16 h-16" data-ai-hint={plant.imageHint} />
              <div>
                <CardTitle className="text-lg">{plant.englishName}</CardTitle>
                <CardDescription>{plant.scientificName}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="#">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        </div>
      </div>
    </div>
  );
}
