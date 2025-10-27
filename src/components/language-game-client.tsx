
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
import { translatePlantName, type TranslatePlantNameOutput } from '@/ai/flows/translate-plant-name-flow';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';


type GameState = 'idle' | 'listening' | 'evaluating' | 'result' | 'fetching';

export default function LanguageGameClient() {
  const [selectedPlant, setSelectedPlant] = useState<Plant>(plants[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(tribalLanguages[0]);
  const [translation, setTranslation] = useState<TranslatePlantNameOutput | null>(null);
  const [gameState, setGameState] = useState<GameState>('fetching');
  const [userTranscript, setUserTranscript] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [progressData, setProgressData] = useLocalStorage('user-progress', { points: 0, languageTests: {} });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();

  const fetchTranslation = useCallback(async (plantName: string, languageName: string) => {
    setGameState('fetching');
    setTranslation(null);
    try {
      const result = await translatePlantName({ plantName, languageName });
      setTranslation(result);
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        variant: "destructive",
        title: "Translation Failed",
        description: "Could not fetch the translation for the selected language.",
      });
    } finally {
      setGameState('idle');
    }
  }, [toast]);

  useEffect(() => {
    fetchTranslation(selectedPlant.englishName, selectedLanguage.name);
  }, [selectedPlant, selectedLanguage, fetchTranslation]);


  const handleSpeak = useCallback(async () => {
    if (!translation || isSpeaking) return;

    setIsSpeaking(true);
    try {
      const response = await textToSpeech({ text: translation.translatedName });
      const audio = new Audio(response.audioDataUri);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: 'Could not play audio.',
      });
      setIsSpeaking(false);
    }
  }, [translation, isSpeaking, toast]);

  const handleListen = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
        toast({ variant: 'destructive', title: 'Browser not supported', description: 'Speech recognition is not supported in your browser. Try Chrome.' });
        return;
    }
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US'; 
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
    if(!translation) return;

    setGameState('evaluating');
    setTimeout(() => {
        const target = translation.translatedName.toLowerCase().trim();
        const spoken = transcript.toLowerCase().trim();
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
    fetchTranslation(selectedPlant.englishName, selectedLanguage.name);
  };
  
  const handlePlantChange = (plantId: string) => {
      const plant = plants.find(p => p.id === parseInt(plantId));
      if(plant) {
        setSelectedPlant(plant);
        resetRound();
      }
  }

  const handleLanguageChange = (languageName: string) => {
      const lang = tribalLanguages.find(l => l.name === languageName);
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
            <Select onValueChange={handleLanguageChange} value={selectedLanguage.name}>
                <SelectTrigger><SelectValue placeholder="Select a Language" /></SelectTrigger>
                <SelectContent>
                    {tribalLanguages.map(l => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)}
                </SelectContent>
            </Select>
       </div>

      <Card className="text-center p-8 bg-muted/50 min-h-[170px] flex flex-col justify-center">
        {gameState === 'fetching' ? (
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : translation ? (
          <>
            <h2 className="text-4xl font-bold font-headline">{translation.translatedName}</h2>
            <p className="font-code text-muted-foreground">{translation.pronunciation}</p>
            <Button variant="ghost" size="icon" onClick={handleSpeak} className="mt-4 mx-auto" disabled={isSpeaking}>
              {isSpeaking ? <Loader2 className="h-6 w-6 animate-spin" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </>
        ) : (
          <p className="text-muted-foreground">Could not find a translation.</p>
        )}
      </Card>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Test your pronunciation!</h3>
        <Button size="lg" className="rounded-full w-24 h-24" onClick={handleListen} disabled={gameState !== 'idle' || !translation}>
            {gameState === 'idle' && <Mic className="h-8 w-8" />}
            {gameState === 'listening' && <div className="h-8 w-8 bg-red-500 rounded-full animate-pulse" />}
            {(gameState === 'evaluating' || gameState === 'fetching') && <Loader2 className="h-8 w-8 animate-spin" />}
            {gameState === 'result' && (isCorrect ? <Check className="h-8 w-8"/> : <X className="h-8 w-8"/>)}
        </Button>
      </div>

        {gameState === 'result' && translation && (
            <Card className={`p-4 text-center animate-in fade-in ${isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
                <h4 className="font-bold text-lg">{isCorrect ? "Excellent!" : "Not Quite"}</h4>
                <p>You said: <em className="font-semibold">{userTranscript}</em></p>
                {!isCorrect && <p>Correct pronunciation: <strong className="font-headline">{translation.translatedName}</strong></p>}
                <Button variant="outline" size="sm" onClick={resetRound} className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2"/>
                    Try Another
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

