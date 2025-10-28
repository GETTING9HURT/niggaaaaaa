
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowDown, ArrowUp, CheckCircle, Clock, File, Image as ImageIcon, Loader2, PlusCircle, Sparkles, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { plants, tribalLanguages } from '@/lib/data';
import type { CommunityRemedy } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { verifyRemedy, VerifyRemedyOutput } from '@/ai/flows/community-remedy-verification';
import { suggestRemedyFromImage } from '@/ai/flows/remedy-suggestion-flow';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Skeleton } from './ui/skeleton';
import { initialRemedies } from '@/lib/initial-remedies';
import useLocalStorage from '@/hooks/use-local-storage';
import { TimeAgo } from './time-ago';

const remedySchema = z.object({
  plantName: z.string().min(1, 'Plant name is required'),
  remedyDescription: z.string().min(10, 'Description must be at least 10 characters'),
  language: z.string().min(1, 'Language is required'),
  effectivenessRating: z.coerce.number().min(1).max(5),
  photo: z.any().optional(),
});


export default function CommunityRemediesClient() {
  const [storedRemedies, setStoredRemedies] = useLocalStorage<CommunityRemedy[]>('community-remedies', []);
  const [remedies, setRemedies] = useState<CommunityRemedy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
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

   useEffect(() => {
    setIsLoading(true);
    const allRemedies = [...initialRemedies.map((r, i) => ({ ...r, id: `initial-${i}`})), ...storedRemedies];
    setRemedies(allRemedies);
    setIsLoading(false);
  }, [storedRemedies]);

  useEffect(() => {
    const sortedRemedies = [...remedies].sort((a, b) => {
        if (sortOrder === 'recency') {
            const dateA = new Date(a.submittedAt);
            const dateB = new Date(b.submittedAt);
            return dateB.getTime() - dateA.getTime();
        } else { // rating
            return b.upvotes - a.upvotes;
        }
    });
    setRemedies(sortedRemedies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);


  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAiScan = async () => {
    const photoFile = form.getValues('photo')?.[0];
    const plantName = form.getValues('plantName');

    if (!plantName) {
      toast({
        variant: "default",
        title: 'Plant Not Selected',
        description: 'Please select a plant name before using the AI scanner.',
      });
      return;
    }
    
    if (!photoFile) {
      toast({
        variant: "default",
        title: 'No Photo Uploaded',
        description: 'Please upload a photo of the plant first.',
      });
      return;
    }

    setIsScanning(true);
    try {
      const dataUri = await fileToDataUri(photoFile);
      const result = await suggestRemedyFromImage({
        photoDataUri: dataUri,
        plantName: plantName,
      });

      form.setValue('remedyDescription', result.suggestedDescription);
      form.setValue('effectivenessRating', result.suggestedEffectiveness);

      toast({
        title: 'AI Suggestion Complete!',
        description: 'The remedy details have been filled in for you. Please review and submit.',
      });
    } catch (error) {
      console.error('AI Scan failed:', error);
      toast({
        variant: "default",
        title: 'AI Scan Failed',
        description: 'Could not generate AI suggestions at this time. Please try again.',
      });
    } finally {
      setIsScanning(false);
    }
  };


  async function onSubmit(values: z.infer<typeof remedySchema>) {
    setIsSubmitting(true);
    
    const photoFile = values.photo?.[0];
    if (!photoFile) {
      toast({
        variant: "default",
        title: 'Photo Required',
        description: 'Please upload a photo to submit a remedy.',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const photoUrl = await fileToDataUri(photoFile);
      
      const verificationInput = {
        plantName: values.plantName,
        remedyDescription: values.remedyDescription,
        language: values.language,
        effectivenessRating: values.effectivenessRating,
        photoDataUri: photoUrl,
      };

      const verificationResult = await verifyRemedy(verificationInput);

      if (!verificationResult.isPlausible) {
        toast({
          variant: "default",
          title: 'Submission Rejected by AI',
          description: `Reason: ${verificationResult.verificationNotes}`,
        });
        setIsSubmitting(false);
        return;
      }
      
      const newRemedy: CommunityRemedy = {
        id: uuidv4(),
        plantName: values.plantName,
        remedyDescription: values.remedyDescription,
        language: values.language,
        effectivenessRating: values.effectivenessRating,
        photoUrl,
        submittedAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        isPlausible: verificationResult.isPlausible,
        verificationNotes: verificationResult.verificationNotes,
      };

      setStoredRemedies(prev => [...prev, newRemedy]);
      
      toast({
        title: 'Remedy Submitted!',
        description: 'Thank you for sharing your knowledge. Your remedy has been approved and saved.',
      });
      
      form.reset();
      setShowForm(false);

    } catch (error) {
      console.error("Could not submit remedy:", error);
      toast({
        variant: "default",
        title: 'Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const handleVote = async (id: string, type: 'up' | 'down') => {
    if (id.startsWith('initial-')) {
        toast({
            title: "Can't Vote",
            description: 'This is a pre-built remedy and cannot be voted on.',
        });
        return;
    }
    
    const updatedRemedies = storedRemedies.map(r => {
      if (r.id === id) {
        return type === 'up' ? { ...r, upvotes: r.upvotes + 1 } : { ...r, downvotes: r.downvotes + 1 };
      }
      return r;
    });
    setStoredRemedies(updatedRemedies);
  };


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
            <CardDescription>Fill out the form below, or use our AI to scan a photo and suggest a remedy for you.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                 <FormField
                  control={form.control}
                  name="photo"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Photo of Plant/Remedy</FormLabel>
                      <FormControl>
                         <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                      </FormControl>
                      <FormDescription>
                        Upload a photo and let our AI suggest the remedy details for you!
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                
                <div className="text-center my-4">
                  <Button type="button" variant="outline" onClick={handleAiScan} disabled={isScanning}>
                    {isScanning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isScanning ? 'Scanning...' : 'Scan with AI to Suggest Remedy'}
                  </Button>
                </div>

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
                      <FormLabel>Effectiveness Rating (Current: {field.value})</FormLabel>
                      <FormControl>
                        <Input type="range" min="1" max="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Remedy'}
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
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/2" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        ) : remedies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remedies.map(remedy => (
              <Card key={remedy.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{remedy.plantName}</CardTitle>
                   {remedy.photoUrl && (
                      <div className="relative aspect-video mt-2">
                          <img src={remedy.photoUrl} alt={`Remedy for ${remedy.plantName}`} className="rounded-md object-cover w-full h-full" />
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
                    <Button variant="outline" size="sm" onClick={() => handleVote(remedy.id, 'up')} disabled={remedy.id.startsWith('initial-')}>
                      <ThumbsUp className="h-4 w-4 mr-2" /> {remedy.upvotes}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleVote(remedy.id, 'down')} disabled={remedy.id.startsWith('initial-')}>
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
