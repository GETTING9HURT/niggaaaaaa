
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowDown, ArrowUp, CheckCircle, Clock, File, Image as ImageIcon, Loader2, PlusCircle, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, increment } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { plants, tribalLanguages } from '@/lib/data';
import type { CommunityRemedy } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { verifyRemedy } from '@/ai/flows/community-remedy-verification';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { db, storage } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';
import { initialRemedies } from '@/lib/initial-remedies';


const remedySchema = z.object({
  plantName: z.string().min(1, 'Plant name is required'),
  remedyDescription: z.string().min(10, 'Description must be at least 10 characters'),
  language: z.string().min(1, 'Language is required'),
  effectivenessRating: z.coerce.number().min(1).max(5),
  photo: z.any().optional(),
});

// A new client component to handle the time display
const TimeAgo = ({ date }: { date: any }) => {
    const [timeAgo, setTimeAgo] = useState('...');
  
    useEffect(() => {
        if (date && typeof date.toDate === 'function') {
            setTimeAgo(formatDistanceToNow(date.toDate(), { addSuffix: true }));
        } else if (typeof date === 'string') {
            setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));
        }
    }, [date]);
  
    return (
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {timeAgo}
      </div>
    );
};


export default function CommunityRemediesClient() {
  const [remedies, setRemedies] = useState<CommunityRemedy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const fetchRemedies = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "remedies"), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const firestoreRemedies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityRemedy));

        const allRemedies = [...initialRemedies.map((r, i) => ({ ...r, id: `initial-${i}`})), ...firestoreRemedies];
        
        setRemedies(allRemedies);

      } catch (error) {
        console.error("Error fetching remedies: ", error);
        setRemedies(initialRemedies.map((r, i) => ({...r, id: `initial-${i}`})));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemedies();
  }, []);

  useEffect(() => {
    const sortedRemedies = [...remedies].sort((a, b) => {
        if (sortOrder === 'recency') {
            const dateA = a.submittedAt.toDate ? a.submittedAt.toDate() : new Date(a.submittedAt);
            const dateB = b.submittedAt.toDate ? b.submittedAt.toDate() : new Date(b.submittedAt);
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

  async function onSubmit(values: z.infer<typeof remedySchema>) {
    setIsSubmitting(true);
    let photoUrl = '';
    
    const photoFile = values.photo?.[0];

    try {
        if (photoFile) {
            const storageRef = ref(storage, `remedy-photos/${Date.now()}_${photoFile.name}`);
            const snapshot = await uploadBytes(storageRef, photoFile);
            photoUrl = await getDownloadURL(snapshot.ref);
        }

        // Temporarily bypass AI verification
        const newRemedy: Omit<CommunityRemedy, 'id'> = {
            ...values,
            photoUrl,
            submittedAt: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
            isPlausible: true, // Default to plausible
            verificationNotes: "AI verification temporarily bypassed.", // Add a note
        };
        
        const docRef = await addDoc(collection(db, "remedies"), {
            ...newRemedy,
            submittedAt: new Date(),
        });
        
        setRemedies(prev => [{...newRemedy, id: docRef.id}, ...prev]);

        toast({
            title: 'Remedy Submitted!',
            description: 'Thank you for sharing your knowledge with the community.',
        });
        form.reset();
        setShowForm(false);
    } catch (error) {
        console.error("Could not submit remedy:", error);
        toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: 'Could not save the remedy. Please try again later.',
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

    const remedyRef = doc(db, 'remedies', id);
    try {
        await updateDoc(remedyRef, {
            [type === 'up' ? 'upvotes' : 'downvotes']: increment(1)
        });
        setRemedies(remedies.map(r => {
          if (r.id === id) {
            return type === 'up' ? { ...r, upvotes: r.upvotes + 1 } : { ...r, downvotes: r.downvotes + 1 };
          }
          return r;
        }));
    } catch (error) {
        console.error("Error voting:", error);
    }
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
