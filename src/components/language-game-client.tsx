"use client";

import { useState, useEffect, useCallback } from 'react';
import { Volume2, Mic, Check, X, RefreshCw, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { plants, tribalLanguages } from '@/lib/data';
import type { Plant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/use-local-storage';
import { Progress } from './ui/progress';

type GameState = 'idle' | 'listening' | 'evaluating' | 'result';

export default function LanguageGameClient() {
  const [selectedPlant, setSelectedPlant] = useState<Plant>(plants[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(selectedPlant.tribalNames[0]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [userTranscript, setUserTranscript] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [progressData, setProgressData] = useLocalStorage('user-progress', { points: 0, languageTests: {} });

  const { toast } = useToast();

  const handleSpeak = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      toast({ variant: 'destructive', title: 'Browser not supported', description: 'Speech synthesis is not supported in your browser.' });
      return;
    }
    const utterance = new SpeechSynthesisUtterance(selectedLanguage.name);
    // You might need to select a specific voice if available
    // utterance.voice = window.speechSynthesis.getVoices().find(v => v.lang === 'hi-IN');
    window.speechSynthesis.speak(utterance);
  }, [selectedLanguage, toast]);

  const handleListen = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
        toast({ variant: 'destructive', title: 'Browser not supported', description: 'Speech recognition is not supported in your browser. Try Chrome.' });
        return;
    }
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US'; // Change language based on what you expect
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setGameState('listening');
    setUserTranscript('');

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserTranscript(transcript);
        evaluate(transcript);
    };

    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast({ variant: 'destructive', title: 'Recognition Error', description: 'Could not understand audio. Please try again.' });
        setGameState('idle');
    };
    
    recognition.onend = () => {
        if(gameState === 'listening') {
          setGameState('idle');
        }
    };

    recognition.start();
  };
  
  const evaluate = (transcript: string) => {
    setGameState('evaluating');
    setTimeout(() => {
        const target = selectedLanguage.name.toLowerCase().trim();
        const spoken = transcript.toLowerCase().trim();
        // Simple similarity check. For better results, use a library like `string-similarity`.
        const similarity = target === spoken;
        setIsCorrect(similarity);
        setGameState('result');

        if(similarity) {
          setScore(prev => prev + 10);
          setProgressData(prev => ({...prev, points: prev.points + 10}));
        }

    }, 1000);
  };

  const resetRound = () => {
    setGameState('idle');
    setUserTranscript('');
    setIsCorrect(null);
  };
  
  const handlePlantChange = (plantId: string) => {
      const plant = plants.find(p => p.id === parseInt(plantId));
      if(plant) {
        setSelectedPlant(plant);
        setSelectedLanguage(plant.tribalNames[0] || {language: '', name: '', pronunciation: ''});
        resetRound();
      }
  }

  const handleLanguageChange = (languageName: string) => {
      const lang = selectedPlant.tribalNames.find(l => l.language === languageName);
      if(lang) {
        setSelectedLanguage(lang);
        resetRound();
      }
  }


  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={handlePlantChange} defaultValue={String(selectedPlant.id)}>
                <SelectTrigger><SelectValue placeholder="Select a Plant" /></SelectTrigger>
                <SelectContent>
                    {plants.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.englishName}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select onValueChange={handleLanguageChange} value={selectedLanguage.language}>
                <SelectTrigger><SelectValue placeholder="Select a Language" /></SelectTrigger>
                <SelectContent>
                    {selectedPlant.tribalNames.map(l => <SelectItem key={l.language} value={l.language}>{l.language}</SelectItem>)}
                </SelectContent>
            </Select>
       </div>

      <Card className="text-center p-8 bg-muted/50">
        <h2 className="text-4xl font-bold font-headline">{selectedLanguage.name}</h2>
        <p className="font-code text-muted-foreground">{selectedLanguage.pronunciation}</p>
        <Button variant="ghost" size="icon" onClick={handleSpeak} className="mt-4">
          <Volume2 className="h-6 w-6" />
        </Button>
      </Card>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Test your pronunciation!</h3>
        <Button size="lg" className="rounded-full w-24 h-24" onClick={handleListen} disabled={gameState !== 'idle'}>
            {gameState === 'idle' && <Mic className="h-8 w-8" />}
            {gameState === 'listening' && <div className="h-8 w-8 bg-red-500 rounded-full animate-pulse" />}
            {gameState === 'evaluating' && <Loader2 className="h-8 w-8 animate-spin" />}
            {gameState === 'result' && (isCorrect ? <Check className="h-8 w-8"/> : <X className="h-8 w-8"/>)}
        </Button>
      </div>

        {gameState === 'result' && (
            <Card className={`p-4 text-center animate-in fade-in ${isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
                <h4 className="font-bold text-lg">{isCorrect ? "Excellent!" : "Not Quite"}</h4>
                <p>You said: <em className="font-semibold">{userTranscript}</em></p>
                {!isCorrect && <p>Correct pronunciation: <strong className="font-headline">{selectedLanguage.name}</strong></p>}
                <Button variant="outline" size="sm" onClick={resetRound} className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2"/>
                    Try Again
                </Button>
            </Card>
        )}

      <Card>
        <CardContent className="p-4">
            <h4 className="font-semibold">Your Score</h4>
            <p className="text-2xl font-bold">{score} Points</p>
            <Progress value={(score % 100)} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}
