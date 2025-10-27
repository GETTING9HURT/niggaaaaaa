import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Leaf, Cpu, GitBranch, HeartHandshake, Code, User, GraduationCap } from "lucide-react";

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">About PharmaVaidya</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Fusing ancient botanical wisdom with modern artificial intelligence.
        </p>
      </div>

      <Card className="shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline">Our Mission</h2>
            <p>
              PharmaVaidya is born from a desire to preserve and revitalize the rich heritage of traditional medicinal knowledge, particularly from the diverse tribal communities of India. In a world of rapid modernization, this invaluable wisdom is at risk of being lost. Our mission is to build a bridge between this ancient knowledge and modern technology, making it accessible, verifiable, and useful for a new generation.
            </p>
            <p>
              By leveraging AI, we aim to create a platform that not only identifies plants and their uses but also helps in learning and preserving the languages that are intrinsically linked to this knowledge.
            </p>
          </div>
          {aboutImage && (
            <div className="relative min-h-[300px]">
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            </div>
          )}
        </div>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            <span className="font-headline">The Developer</span>
          </CardTitle>
          <CardDescription>This project was brought to life by a passionate student developer.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
           <Image
              src="https://i.ibb.co/6bsZJbY/Whats-App-Image-2024-08-01-at-20-41-45-70335804.jpg"
              alt="Aabid Hasan"
              width={120}
              height={120}
              className="rounded-full border-4 border-primary/20 shadow-lg"
            />
          <div>
            <h3 className="text-xl font-bold">Aabid Hasan</h3>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <GraduationCap className="w-5 h-5"/> 11th Grade Student, Govt. co - ed sarvodaya school New delhi -71
            </p>
            <p className="mt-2">
              Aabid developed PharmaVaidya for the Viksit Bharat Buildathon with the goal of using AI to preserve and share India's rich medicinal heritage for future generations.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Cpu className="w-8 h-8 text-primary" />
            <CardTitle>Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Built with Next.js and Firebase Genkit, this app runs powerful AI models for plant identification and knowledge queries. All processing happens on the client-side or through secure serverless functions, ensuring privacy and speed.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <GitBranch className="w-8 h-8 text-primary" />
            <CardTitle>Open Source</CardTitle>
          </CardHeader>
          <CardContent>
            <p>PharmaVaidya is designed as a hackathon project, emphasizing rapid development and deployment. The code is intended to be open and modular, encouraging collaboration and further development from the community.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <HeartHandshake className="w-8 h-8 text-primary" />
            <CardTitle>Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This project is a tribute to the indigenous communities who have been custodians of this knowledge for centuries. We are committed to ethical data handling and aim to create a platform that benefits these communities.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
