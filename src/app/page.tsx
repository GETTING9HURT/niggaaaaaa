

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Languages,
  Leaf,
  Sprout,
  Users,
  Feather,
  UploadCloud,
  Heart,
  Search,
  Info,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/icons/logo";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { Globe } from "@/components/ui/globe";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Logo className="size-10" />
            <span className="text-xl">PharmaVaidya</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/team" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Team
            </Link>
            <Button asChild>
              <Link href="/dashboard">
                Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
          <Button asChild className="md:hidden">
              <Link href="/dashboard">
                Enter App
              </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
          <div className="absolute inset-0">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                quality={100}
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-white p-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-headline">
              Preserve Medicinal Plants & Tribal Languages
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
              PharmaVaidya is your AI-powered guide to the world of medicinal plants, bridging ancient wisdom with modern technology.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Enter App <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white bg-black/20 backdrop-blur-md hover:bg-white/20">
                <Link href="#problem">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Problem Section */}
        <section id="problem" className="w-full bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-headline">A Race Against Time</h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                Over 10% of India's medicinal plants are endangered, and more than 400 tribal languages are on the verge of extinction. We are losing a vast repository of traditional knowledge.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Vanishing Flora</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">The silent disappearance of our natural pharmacy.</h3>
                  <p className="mt-2 text-muted-foreground">
                    Climate change, deforestation, and over-harvesting threaten countless plant species that have been central to traditional medicine for centuries. Each extinction is a potential cure lost forever.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Feather className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Fading Voices</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">The erosion of priceless indigenous wisdom.</h3>
                  <p className="mt-2 text-muted-foreground">
                    With each tribal language that fades, we lose unique knowledge about local ecosystems and medicinal practices. PharmaVaidya aims to document and revitalize this heritage.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section id="features" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Core Features</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                An integrated platform for knowledge, language, and community.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="flex flex-col text-center items-center p-6">
                <Leaf className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold font-headline">Plant Identification</h3>
                <p className="mt-2 text-muted-foreground flex-grow">Upload a plant photo and our AI will identify it, providing details on its medicinal uses.</p>
                <Button variant="link" asChild className="mt-4">
                  <Link href="/identify">Explore <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </Card>
              <Card className="flex flex-col text-center items-center p-6">
                <Languages className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold font-headline">Tribal Language Hub</h3>
                <p className="mt-2 text-muted-foreground flex-grow">Learn plant names in 400+ tribal languages, preserving cultural heritage through gamified learning.</p>
                <Button variant="link" asChild className="mt-4">
                  <Link href="/language-learning">Explore <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </Card>
              <Card className="flex flex-col text-center items-center p-6">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold font-headline">Community Knowledge</h3>
                <p className="mt-2 text-muted-foreground flex-grow">Share and discover traditional remedies, building a collective wisdom database verified by the community.</p>
                <Button variant="link" asChild className="mt-4">
                  <Link href="/community-remedies">Explore <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full bg-muted py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold font-headline">Simple, Powerful, Instant</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Get started in three easy steps.</p>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <UploadCloud className="h-8 w-8"/>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">Step 1: Upload a Photo</h3>
                        <p className="mt-1 text-muted-foreground">Take or upload a photo of a plant you want to identify.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Search className="h-8 w-8"/>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">Step 2: Get Instant Results</h3>
                        <p className="mt-1 text-muted-foreground">Our AI provides medicinal uses, preparations, and precautions.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                           <BookOpen className="h-8 w-8"/>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">Step 3: Learn & Contribute</h3>
                        <p className="mt-1 text-muted-foreground">Explore tribal names and share your own remedies with the community.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Velocity Scroll Section */}
        <section className="w-full py-16 md:py-24">
            <VelocityScroll
              text="Preserve • Revitalize • Empower"
              default_velocity={2}
              className="font-headline text-center text-4xl font-bold tracking-[-0.02em] text-foreground/80 md:text-6xl"
            />
        </section>

        {/* Globe Section */}
        <section className="w-full py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                  <h2 className="text-3xl font-bold font-headline">A Global Heritage</h2>
                  <p className="mt-2 text-muted-foreground">
                    The knowledge of medicinal plants is a treasure shared by indigenous communities across the world. Our mission is to connect and preserve this wisdom on a global scale.
                  </p>
              </div>
              <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-lg border bg-background/50 md:w-1/2 md:shadow-xl">
                <Globe className="top-8" />
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="bg-primary/5 border-t">
        <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
                <div>
                  <Link href="/" className="flex items-center justify-center md:justify-start gap-2">
                      <Logo className="size-10" />
                      <span className="text-xl font-bold">PharmaVaidya</span>
                  </Link>
                    <p className="mt-2 max-w-xs mx-auto md:mx-0 text-muted-foreground">Preserving traditional medicinal knowledge and tribal languages through AI.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        <div>
                            <h3 className="font-semibold tracking-wider">Explore</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link href="/identify" className="text-muted-foreground hover:text-foreground">Plant Identifier</Link></li>
                                <li><Link href="/language-learning" className="text-muted-foreground hover:text-foreground">Language Hub</Link></li>
                                <li><Link href="/community-remedies" className="text-muted-foreground hover:text-foreground">Community</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold tracking-wider">About Us</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">Our Mission</Link></li>
                                <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                                <li><Link href="/team" className="text-muted-foreground hover:text-foreground">Team</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                <p>&copy; 2025 PharmaVaidya. All rights reserved.</p>
                <p className="mt-1 inline-flex items-center gap-1">Made with <Heart className="h-4 w-4 text-red-500" /> for a Viksit Bharat.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
    

    

    

