
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, User, Megaphone, Code } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Meet the Team</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          The minds and support behind PharmaVaidya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Developer</CardTitle>
            <CardDescription>This project was brought to life by a passionate student developer.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 text-center">
             <Image
                src="https://i.ibb.co/B56hF0gD/shadcn.jpg"
                alt="Aabid Hasan"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 shadow-lg"
              />
            <div>
              <h3 className="text-xl font-bold">Aabid Hasan</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1">
                <Code className="w-5 h-5"/> Developer
              </p>
              <p className="mt-2 text-sm">
                Aabid developed PharmaVaidya for the Viksit Bharat Buildathon with the goal of using AI to preserve and share India's rich medicinal heritage for future generations.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Feedback &amp; Suggestions</CardTitle>
            <CardDescription>Valuable insights that helped shape the project.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 text-center">
            <Image
                src="https://i.ibb.co/Jw7QR9wr/Screenshot-2025-10-27-163028.png"
                alt="Shayank Yadav"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 shadow-lg"
                data-ai-hint="male portrait"
              />
            <div>
              <h3 className="text-xl font-bold">Shayank Yadav</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1">
                <Megaphone className="w-5 h-5"/> Contributor
              </p>
              <p className="mt-2 text-sm">
                Shayank provided crucial feedback and suggestions during the development process, helping to refine the application's features and direction.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Team Member</CardTitle>
            <CardDescription>Part of the project team.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 text-center">
             <Image
                src="https://picsum.photos/seed/samir/120/120"
                alt="Samir Ansari"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 shadow-lg"
                data-ai-hint="male portrait"
              />
            <div>
              <h3 className="text-xl font-bold">Samir Ansari</h3>
               <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1">
                <User className="w-5 h-5"/> Team Member
              </p>
              <p className="mt-2 text-sm">
                Samir was a member of the project team for the Viksit Bharat Buildathon.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Team Member</CardTitle>
            <CardDescription>Part of the project team.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 text-center">
             <Image
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxpbGx1c3RyYXRpb258ZW58MHx8fHwxNzYxNTc1MzA1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Aniruddh Singh"
                width={120}
                height={120}
                className="rounded-full border-4 border-primary/20 shadow-lg"
                data-ai-hint="abstract illustration"
              />
            <div>
              <h3 className="text-xl font-bold">Aniruddh Singh</h3>
               <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1">
                <User className="w-5 h-5"/> Team Member
              </p>
              <p className="mt-2 text-sm">
                Aniruddh was a member of the project team for the Viksit Bharat Buildathon.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="text-center text-muted-foreground pt-8">
        <p className="flex items-center justify-center gap-2">
            <GraduationCap className="w-5 h-5"/>
            All team members are from 11th Grade, Govt. co - ed sarvodaya school New delhi - 75
        </p>
      </div>

    </div>
  );
}
