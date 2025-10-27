
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPlantById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronLeft, HelpCircle, Leaf, BookOpen, AlertTriangle } from 'lucide-react';
import { StarBorder } from '@/components/ui/star-border';

export default function PlantDetailPage() {
  const params = useParams();
  const plantId = params.plantId ? parseInt(params.plantId as string, 10) : NaN;
  const plant = !isNaN(plantId) ? getPlantById(plantId) : undefined;

  if (!plant) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Plant not found</h1>
        <p className="text-muted-foreground">The plant you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/knowledge-base">
            <ChevronLeft className="mr-2" /> Back to Knowledge Base
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-3xl">{plant.englishName}</CardTitle>
              <CardDescription className="font-code">{plant.scientificName} ({plant.family})</CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href="/knowledge-base">
                <ChevronLeft className="mr-2" /> Back
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-video">
              <Image src={plant.imageUrl} alt={plant.englishName} fill className="rounded-lg object-cover shadow-md" data-ai-hint={plant.imageHint} />
            </div>
             <div className="flex flex-wrap gap-2">
                {plant.isMedicinal && <Badge className="bg-green-100 text-green-800 border-green-200">Medicinal</Badge>}
                {plant.isEndangered && <Badge variant="destructive">Endangered</Badge>}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2"><Leaf /> Medicinal Uses</h3>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                {plant.medicinalUses.map((use, index) => <li key={index}>{use}</li>)}
              </ul>
            </div>
             <div>
              <h3 className="font-semibold text-lg flex items-center gap-2"><BookOpen /> Preparation Methods</h3>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                {plant.preparationMethods.map((method, index) => <li key={index}>{method}</li>)}
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
             <Alert variant="default" className="border-yellow-500/50 text-yellow-700">
                <AlertTriangle className="h-4 w-4 !text-yellow-700" />
                <AlertTitle>Precautions</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc list-inside">
                     {plant.precautions.map((precaution, index) => <li key={index}>{precaution}</li>)}
                    </ul>
                </AlertDescription>
            </Alert>
            
            <Link href={`/knowledge-base?query=Tell me more about ${plant.englishName}`} className="block">
              <StarBorder as="div">
                <HelpCircle className="mr-2 h-4 w-4" /> Ask AI about this plant
              </StarBorder>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
