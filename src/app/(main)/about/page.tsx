import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Leaf, Cpu, GitBranch, HeartHandshake, Book, Users } from "lucide-react";

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

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
          <div className="p-8 space-y-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold font-headline">Our Mission</h2>
            <p>
              PharmaVaidya is born from a desire to preserve and revitalize the rich heritage of traditional medicinal knowledge, particularly from the diverse tribal communities of India. In a world of rapid modernization, this invaluable wisdom is at risk of being lost.
            </p>
            <p>
              Our mission is to build a bridge between this ancient knowledge and modern technology, making it accessible, verifiable, and useful for a new generation. By leveraging AI, we aim to create a platform that not only identifies plants but also helps in learning and preserving the languages intrinsically linked to this knowledge.
            </p>
          </div>
          {heroImage && (
            <div className="relative min-h-[300px] lg:min-h-[400px]">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Cpu className="w-8 h-8 text-primary" />
            <CardTitle>Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Powered by advanced, privacy-focused AI, our app runs powerful models for plant identification and knowledge queries, ensuring a fast and secure experience through modern serverless functions.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Book className="w-8 h-8 text-primary" />
            <CardTitle>Indian Heritage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our platform is deeply rooted in the traditional knowledge of India (Bharat), including Ayurveda and folk medicine. We strive to honor and digitize this ancient wisdom for all.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Users className="w-8 h-8 text-primary" />
            <CardTitle>Community Focused</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We believe in the power of collective wisdom. Our app allows users to contribute their own remedies, creating a living, breathing database of community knowledge.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <GitBranch className="w-8 h-8 text-primary" />
            <CardTitle>Open Source</CardTitle>
          </CardHeader>
          <CardContent>
            <p>PharmaVaidya is designed as a hackathon project, emphasizing rapid development. The code is intended to be open, encouraging collaboration and further development.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <HeartHandshake className="w-8 h-8 text-primary" />
            <CardTitle>Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This project is a tribute to the indigenous communities who have been custodians of this knowledge for centuries. We are committed to ethical data handling and community benefit.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
