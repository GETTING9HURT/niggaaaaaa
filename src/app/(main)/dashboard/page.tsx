import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Languages,
  Leaf,
  Users,
  ArrowRight,
  Trophy,
  Info,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: Leaf,
    title: "Plant Identification",
    description: "Upload a photo to instantly identify plants with AI.",
    link: "/identify",
    image: PlaceHolderImages.find(img => img.id === "plant-identification-card"),
  },
  {
    icon: BookOpen,
    title: "Medicinal Knowledge",
    description: "Explore uses, preparations, and precautions.",
    link: "/knowledge-base",
    image: PlaceHolderImages.find(img => img.id === "medicinal-knowledge-card"),
  },
  {
    icon: Languages,
    title: "Tribal Language Hub",
    description: "Learn plant names and test your pronunciation.",
    link: "/language-learning",
    image: PlaceHolderImages.find(img => img.id === "language-learning-card"),
  },
  {
    icon: Users,
    title: "Community Remedies",
    description: "Share and discover folk wisdom from the community.",
    link: "/community-remedies",
    image: PlaceHolderImages.find(img => img.id === "community-remedies-card"),
  },
   {
    icon: Trophy,
    title: "Leaderboard",
    description: "Check your progress and earned badges.",
    link: "/leaderboard",
    image: PlaceHolderImages.find(img => img.id === "leaderboard-card"),
  },
  {
    icon: Info,
    title: "About PharmaVaidya",
    description: "Learn more about our mission and technology.",
    link: "/about",
    image: PlaceHolderImages.find(img => img.id === "about-us-image"),
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 w-full p-4 md:p-8">
      <div className="text-left mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to PharmaVaidya. Explore our features below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {feature.image && (
                <div className="relative h-40 w-full">
                <Image
                    src={feature.image.imageUrl}
                    alt={feature.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={feature.image.imageHint}
                />
                </div>
            )}
            <CardHeader className={!feature.image ? 'pt-6' : ''}>
              <CardTitle className="flex items-center gap-3">
                <feature.icon className="w-7 h-7 text-primary" />
                <span className="font-headline">{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full text-primary border-primary hover:bg-primary/10 hover:text-primary">
                <Link href={feature.link}>
                  Go to {feature.title} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
