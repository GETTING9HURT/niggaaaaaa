
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { KnowledgeChatbot } from '@/components/knowledge-chatbot';
import { plants } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 10;

export default function KnowledgeBasePage() {
  const [displayedCount, setDisplayedCount] = useState(INITIAL_DISPLAY_COUNT);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedCount(prevCount => prevCount + LOAD_MORE_COUNT);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const displayedPlants = plants.slice(0, displayedCount);

  return (
    <div className="flex flex-col h-full p-4 md:p-8 gap-8">
      <div className="flex-grow flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Medicinal Knowledge Chatbot</CardTitle>
            <CardDescription>
              Ask me anything about medicinal plants, their uses, and preparations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col h-[75vh]">
            <KnowledgeChatbot />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-headline">Browse Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPlants.map(plant => (
          <Card key={plant.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 w-full">
              <Image src={plant.imageUrl} alt={plant.englishName} fill className="object-cover" data-ai-hint={plant.imageHint} />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{plant.englishName}</CardTitle>
                <CardDescription>{plant.scientificName}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href={`/knowledge-base/${plant.id}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        </div>
        {displayedCount < plants.length && (
          <div className="text-center mt-4">
            <Button onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Plants'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
