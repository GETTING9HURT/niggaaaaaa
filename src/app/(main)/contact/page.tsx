
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Instagram, Linkedin, X } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
          <CardDescription>
            We'd love to hear from you. Reach out with any questions, feedback, or collaboration ideas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <a href="mailto:aabidnot@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                aabidnot@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Instagram className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <a href="https://www.instagram.com/aabid.9_" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                @aabid.9_
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Linkedin className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">LinkedIn</h3>
              <a href="https://www.linkedin.com/in/aabid-hasan-076a32364/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Aabid Hasan
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <X className="w-8 h-8 text-primary fill-current" />
            <div>
              <h3 className="font-semibold">X (Twitter)</h3>
              <a href="https://x.com/Aab1d_hasan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                @Aab1d_hasan
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
