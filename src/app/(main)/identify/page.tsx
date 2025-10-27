import PlantIdentifierClient from '@/components/plant-identifier-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

export default function PlantIdentifierPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-3xl">Plant Identification</CardTitle>
              <SidebarTrigger className="md:hidden">
                <PanelLeft />
              </SidebarTrigger>
          </div>
          <CardDescription>
            Upload a photo, use your camera, or drag and drop an image to identify a plant using AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlantIdentifierClient />
        </CardContent>
      </Card>
    </div>
  );
}
