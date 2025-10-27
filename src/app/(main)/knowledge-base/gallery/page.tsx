
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { plantNames } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

export default function PlantGalleryPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Plant Gallery</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our collection of plants and ask the AI for more information.
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {plantNames.map(plantName => (
              <li key={plantName}>
                <Button variant="link" asChild className="p-0 h-auto justify-start">
                  <Link href={`/knowledge-base?query=Tell me everything about ${plantName}`}>
                    {plantName}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
