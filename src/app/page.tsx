import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Languages,
  Leaf,
  Users,
  ArrowRight,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/icons/logo";

const features = [
  {
    icon: Leaf,
    title: "Plant Identification",
    description: "Upload a photo to instantly identify plants with AI. 100% in-browser for total privacy.",
    link: "/identify",
    image: PlaceHolderImages.find(img => img.id === "plant-identification-card"),
  },
  {
    icon: BookOpen,
    title: "Medicinal Knowledge",
    description: "Explore uses, preparations, and precautions. Chat with our AI for fact-checked answers.",
    link: "/knowledge-base",
    image: PlaceHolderImages.find(img => img.id === "medicinal-knowledge-card"),
  },
  {
    icon: Languages,
    title: "Tribal Language Hub",
    description: "Learn plant names in 400+ tribal languages. Test your knowledge and climb the leaderboard.",
    link: "/language-learning",
    image: PlaceHolderImages.find(img => img.id === "language-learning-card"),
  },
  {
    icon: Users,
    title: "Community Remedies",
    description: "Share and discover folk wisdom. Submit your remedies and get them verified by our AI.",
    link: "/community-remedies",
    image: PlaceHolderImages.find(img => img.id === "community-remedies-card"),
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">PharmaVaidya</span>
          </Link>
          <Button asChild>
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[70vh]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg font-headline">
                PharmaVaidya
              </h1>
              <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-md">
                Bridging Traditional Wisdom with Modern Technology.
              </p>
              <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Core Features</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                An AI-powered platform for plant identification, medicinal knowledge, and preserving collective folk wisdom.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  {feature.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={feature.image.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <feature.icon className="w-8 h-8 text-primary" />
                      <span className="font-headline">{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                     <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary w-full">
                        <Link href={feature.link}>
                          Explore Feature <ArrowRight className="ml-2" />
                        </Link>
                      </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-muted/40">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PharmaVaidya. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
