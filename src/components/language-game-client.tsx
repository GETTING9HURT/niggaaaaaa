
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Volume2, Mic, Check, X, RefreshCw, Loader2, ChevronsUpDown, CheckCircle, HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { plantNames, tribalLanguages } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/use-local-storage';
import { Progress } from './ui/progress';
import { translatePlantName, type TranslatePlantNameOutput } from '@/ai/flows/translate-plant-name-flow';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { StarBorder } from './ui/star-border';


type GameState = 'idle' | 'listening' | 'evaluating' | 'result' | 'fetching';

export default function LanguageGameClient() {
  const [inputValue, setInputValue] = useState<string>(plantNames[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(tribalLanguages[0]);
  const [translation, setTranslation] = useState<TranslatePlantNameOutput | null>(null);
  const [gameState, setGameState] = useState<GameState>('fetching');
  const [userTranscript, setUserTranscript] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [progressData, setProgressData] = useLocalStorage('user-progress', { points: 0, languageTests: {} });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { toast } = useToast();

  const fetchTranslation = useCallback(async (pName: string, languageName: string) => {
    if (!pName || !pName.trim()) return;
    setGameState('fetching');
    setTranslation(null);
    try {
      const result = await translatePlantName({ plantName: pName, languageName });
      setTranslation(result);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslation({ translatedName: 'Not Available', pronunciation: '' });
    } finally {
      setGameState('idle');
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
        if (inputValue) {
            fetchTranslation(inputValue, selectedLanguage.name);
        }
    }, 500); // Debounce API calls

    return () => {
        clearTimeout(handler);
    };
  }, [inputValue, selectedLanguage, fetchTranslation]);


  const handleSpeak = useCallback(async () => {
    if (!translation || !translation.translatedName || translation.translatedName === 'Not Available' || isSpeaking) return;

    setIsSpeaking(true);
    try {
      const response = await textToSpeech({ text: translation.translatedName });
      const audio = new Audio(response.audioDataUri);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
    }
  }, [translation, isSpeaking]);

  const handleListen = () => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
        toast({ title: 'Browser not supported', description: 'Speech recognition is not supported in your browser. Try Chrome.' });
        return;
    }
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = selectedLanguage.name.startsWith('en') ? 'en-US' : 'hi-IN';
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
    const newPlant = plantNames[Math.floor(Math.random() * plantNames.length)];
    const newLang = tribalLanguages[Math.floor(Math.random() * tribalLanguages.length)];
    setInputValue(newPlant);
    setSelectedLanguage(newLang);
    // The useEffect will trigger the fetchTranslation
  };
  
  const handleLanguageChange = (languageName: string) => {
      const lang = tribalLanguages.find(l => l.name === languageName);
      if(lang) {
        setSelectedLanguage(lang);
      }
  }


  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={popoverOpen}
                  className="w-full justify-between"
                >
                  {inputValue || "Select or type a plant..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search or type plant name..."
                    value={inputValue}
                    onValueChange={setInputValue}
                   />
                  <CommandList>
                    <CommandEmpty>No plant found. Type any name to translate.</CommandEmpty>
                    <CommandGroup>
                      {plantNames.map((plantName) => (
                        <CommandItem
                          key={plantName}
                          value={plantName}
                          onSelect={(currentValue) => {
                            setInputValue(currentValue === inputValue ? "" : currentValue);
                            setPopoverOpen(false);
                          }}
                        >
                          <CheckCircle
                            className={cn(
                              "mr-2 h-4 w-4",
                              inputValue.toLowerCase() === plantName.toLowerCase() ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {plantName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Select onValueChange={handleLanguageChange} value={selectedLanguage.name}>
                <SelectTrigger><SelectValue placeholder="Select a Language" /></SelectTrigger>
                <SelectContent>
                    {tribalLanguages.map(l => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)}
                </SelectContent>
            </Select>
       </div>

      <Card className="text-center p-8 bg-muted/50 min-h-[170px] flex flex-col justify-center items-center">
        {gameState === 'fetching' ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-muted-foreground">Translating...</p>
          </div>
        ) : translation && translation.translatedName !== 'Not Available' ? (
          <>
            <h2 className="text-4xl font-bold font-headline">{translation.translatedName}</h2>
            <p className="font-code text-muted-foreground">{translation.pronunciation}</p>
            <Button variant="ghost" size="icon" onClick={handleSpeak} className="mt-4 mx-auto" disabled={isSpeaking}>
              {isSpeaking ? <Loader2 className="h-6 w-6 animate-spin" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </>
        ) : (
          <p className="text-muted-foreground">Could not find a translation for this combination.</p>
        )}
      </Card>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Test your pronunciation!</h3>
        <Button size="lg" className="rounded-full w-24 h-24" onClick={handleListen} disabled={gameState !== 'idle' || !translation || translation.translatedName === 'Not Available'}>
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

      <Link href="/language-bot" className="block">
        <StarBorder as="div">
          <HelpCircle className="mr-2 h-4 w-4" /> Ask AI about Languages
        </StarBorder>
      </Link>
    </div>
  );
}

    