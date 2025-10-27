
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { plants } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle } from 'lucide-react';

export default function PlantGalleryPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Plant Gallery</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our collection of medicinal plants and ask the AI for more information.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plants.map(plant => (
          <Card key={plant.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="relative h-48 w-full">
              <Image src={plant.imageUrl} alt={plant.englishName} fill className="object-cover" data-ai-hint={plant.imageHint} />
            </div>
            <CardHeader className="flex-grow">
                <CardTitle className="text-lg">{plant.englishName}</CardTitle>
                <CardDescription>{plant.scientificName}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/knowledge-base?query=Tell me everything about ${plant.englishName}`}>
                  Ask AI <HelpCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
