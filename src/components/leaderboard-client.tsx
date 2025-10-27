"use client";

import { Award, BookOpen, Leaf, Users } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge as BadgeType, UserProgress } from '@/lib/types';

const initialProgress: UserProgress = {
  points: 0,
  identifiedPlants: [],
  remediesContributed: 0,
  languageTests: {},
};

export default function LeaderboardClient() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('user-progress', initialProgress);

  const allBadges: Omit<BadgeType, 'unlocked'>[] = [
    { id: 'first_plant', name: 'Plant Novice', description: 'Identify your first plant.', icon: Leaf },
    { id: 'five_plants', name: 'Budding Botanist', description: 'Identify 5 different plants.', icon: Leaf },
    { id: 'first_remedy', name: 'Community Scribe', description: 'Contribute your first remedy.', icon: Users },
    { id: 'first_word', name: 'Language Learner', description: 'Pass your first language test.', icon: BookOpen },
    { id: '100_points', name: 'Point Collector', description: 'Earn 100 points.', icon: Award },
  ];
  
  const unlockedBadges: BadgeType[] = allBadges.map(badge => {
    let unlocked = false;
    if (badge.id === 'first_plant' && progress.identifiedPlants.length >= 1) unlocked = true;
    if (badge.id === 'five_plants' && progress.identifiedPlants.length >= 5) unlocked = true;
    if (badge.id === 'first_remedy' && progress.remediesContributed >= 1) unlocked = true;
    if (badge.id === 'first_word' && Object.keys(progress.languageTests).length > 0) unlocked = true;
    if (badge.id === '100_points' && progress.points >= 100) unlocked = true;
    return { ...badge, unlocked };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Your Progress</h1>
        <p className="text-muted-foreground">See your contributions and achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-primary" /> Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">{progress.points}</p>
            <Progress value={progress.points % 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="text-primary" /> Plants Identified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">{progress.identifiedPlants.length}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" /> Remedies Shared
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">{progress.remediesContributed}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Unlock achievements as you explore and contribute.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {unlockedBadges.map(badge => (
              <div key={badge.id} className={`text-center p-4 rounded-lg border-2 ${badge.unlocked ? 'border-amber-400 bg-amber-50' : 'border-dashed bg-muted/50'}`}>
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-amber-400' : 'bg-muted'}`}>
                  <badge.icon className={`h-8 w-8 ${badge.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <h4 className="font-semibold mt-2">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
