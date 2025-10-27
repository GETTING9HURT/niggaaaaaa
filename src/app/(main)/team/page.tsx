import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Meet the Team</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          The minds behind PharmaVaidya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Developer</CardTitle>
            <CardDescription>This project was brought to life by a passionate student developer.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 text-center">
             <Image
                src="https://i.ibb.co/6bsZJbY/Whats-App-Image-2024-08-01-at-20-41-45-70335804.jpg"
                alt="Aabid Hasan"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 shadow-lg"
              />
            <div>
              <h3 className="text-xl font-bold">Aabid Hasan</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1">
                <GraduationCap className="w-5 h-5"/> 11th Grade Student, Govt. co - ed sarvodaya school New delhi -71
              </p>
              <p className="mt-2 text-sm">
                Aabid developed PharmaVaidya for the Viksit Bharat Buildathon with the goal of using AI to preserve and share India's rich medicinal heritage for future generations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
