
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowDown, ArrowUp, CheckCircle, Clock, File, Image as ImageIcon, Loader2, PlusCircle, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { plants, tribalLanguages } from '@/lib/data';
import type { CommunityRemedy } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/use-local-storage';
import { verifyRemedy } from '@/ai/flows/community-remedy-verification';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const remedySchema = z.object({
  plantName: z.string().min(1, 'Plant name is required'),
  remedyDescription: z.string().min(10, 'Description must be at least 10 characters'),
  language: z.string().min(1, 'Language is required'),
  effectivenessRating: z.coerce.number().min(1).max(5),
  photo: z.any().optional(),
});

// A new client component to handle the time display
const TimeAgo = ({ date }: { date: string }) => {
    const [timeAgo, setTimeAgo] = useState('...');
  
    useEffect(() => {
      setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));
    }, [date]);
  
    return (
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {timeAgo}
      </div>
    );
};


export default function CommunityRemediesClient() {
  const [remedies, setRemedies] = useLocalStorage<CommunityRemedy[]>('community-remedies', []);
  const [showForm, setShowForm] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sortOrder, setSortOrder] = useState<'rating' | 'recency'>('recency');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof remedySchema>>({
    resolver: zodResolver(remedySchema),
    defaultValues: {
      plantName: '',
      remedyDescription: '',
      language: 'English',
      effectivenessRating: 3,
    },
  });

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof remedySchema>) {
    setIsVerifying(true);
    let photoDataUri: string | undefined;
    if (values.photo && values.photo.length > 0) {
      photoDataUri = await fileToDataUri(values.photo[0]);
    } else {
        // Fallback for verification if no image is provided
        photoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }

    try {
        const verificationResult = await verifyRemedy({
            ...values,
            photoDataUri,
        });

        const newRemedy: CommunityRemedy = {
            id: new Date().toISOString(),
            ...values,
            photoDataUri,
            submittedAt: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
            isPlausible: verificationResult.isPlausible,
            verificationNotes: verificationResult.verificationNotes,
        };

        setRemedies([newRemedy, ...remedies]);
        toast({
            title: 'Remedy Submitted!',
            description: 'Thank you for sharing your knowledge with the community.',
        });
        form.reset();
        setShowForm(false);
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Could not verify or save the remedy. Please try again.',
        });
    } finally {
        setIsVerifying(false);
    }
  }

  const handleVote = (id: string, type: 'up' | 'down') => {
    setRemedies(remedies.map(r => {
      if (r.id === id) {
        return type === 'up' ? { ...r, upvotes: r.upvotes + 1 } : { ...r, downvotes: r.downvotes + 1 };
      }
      return r;
    }));
  };

  const sortedRemedies = [...remedies].sort((a, b) => {
    if (sortOrder === 'rating') {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    }
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Community Remedies</h1>
          <p className="text-muted-foreground">Discover and share traditional plant-based remedies.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {showForm ? 'Cancel' : 'Submit a New Remedy'}
        </Button>
      </div>

      {showForm && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Share Your Knowledge</CardTitle>
            <CardDescription>Fill out the form to submit a new remedy.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="plantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plant Name</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {plants.map(plant => (
                            <SelectItem key={plant.id} value={plant.englishName}>{plant.englishName} ({plant.hindiName})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remedyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remedy Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the remedy, its preparation, and usage..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language of Description</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                          {tribalLanguages.map(lang => (
                            <SelectItem key={lang.id} value={lang.name}>{lang.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="effectivenessRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effectiveness Rating (1-5)</FormLabel>
                      <FormControl>
                        <Input type="range" min="1" max="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo of Plant/Remedy</FormLabel>
                      <FormControl>
                         <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isVerifying}>
                  {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isVerifying ? 'Verifying & Submitting...' : 'Submit Remedy'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex justify-end gap-2">
            <Button variant={sortOrder === 'recency' ? 'default' : 'outline'} onClick={() => setSortOrder('recency')}>Most Recent</Button>
            <Button variant={sortOrder === 'rating' ? 'default' : 'outline'} onClick={() => setSortOrder('rating')}>Top Rated</Button>
        </div>
        {sortedRemedies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRemedies.map(remedy => (
              <Card key={remedy.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{remedy.plantName}</CardTitle>
                   {remedy.photoDataUri && remedy.photoDataUri.startsWith('data:image/') && (
                      <div className="relative aspect-video mt-2">
                          <img src={remedy.photoDataUri} alt={`Remedy for ${remedy.plantName}`} className="rounded-md object-cover w-full h-full" />
                      </div>
                    )}
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground">{remedy.remedyDescription}</p>
                   {remedy.isPlausible !== undefined && (
                    <Alert variant={remedy.isPlausible ? 'default' : 'destructive'}>
                      {remedy.isPlausible ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      <AlertTitle>AI Verification</AlertTitle>
                      <AlertDescription>{remedy.verificationNotes}</AlertDescription>
                    </Alert>
                  )}
                  <div className="text-xs text-muted-foreground flex items-center justify-between">
                    <span>Language: {remedy.language}</span>
                    <TimeAgo date={remedy.submittedAt} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleVote(remedy.id, 'up')}>
                      <ThumbsUp className="h-4 w-4 mr-2" /> {remedy.upvotes}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleVote(remedy.id, 'down')}>
                      <ThumbsDown className="h-4 w-4 mr-2" /> {remedy.downvotes}
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < remedy.effectivenessRating ? 'text-amber-500' : 'text-muted-foreground'}>★</span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold">No Remedies Yet</h3>
              <p className="text-muted-foreground mt-2">Be the first to share your knowledge with the community!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
