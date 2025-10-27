"use client";

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Camera, File, Upload, X, Loader2, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { plants, getPlantById } from '@/lib/data';
import type { Plant } from '@/lib/types';

// Mock TensorFlow.js model loading and prediction
const simulateIdentification = async (file: File): Promise<Plant | null> => {
  console.log('Simulating identification for:', file.name);
  // In a real implementation, you would load your TensorFlow.js model
  // and process the image here.
  // e.g., const model = await mobilenet.load();
  // const predictions = await model.classify(imageElement);
  
  // Simulate network delay and processing time
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // For this mock, we'll randomly pick a plant from our data
  const randomPlant = plants[Math.floor(Math.random() * plants.length)];
  return getPlantById(randomPlant.id);
};

export default function PlantIdentifierClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Plant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      handleFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
  });

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleIdentify = async () => {
    if (!file) return;

    setIsLoading(true);
    setProgress(0);
    setError(null);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 90 ? 90 : prev + 10));
    }, 200);

    try {
      const identificationResult = await simulateIdentification(file);
      clearInterval(interval);
      setProgress(100);
      if (identificationResult) {
        setResult(identificationResult);
      } else {
        throw new Error('Could not identify the plant. Please try another image.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      clearInterval(interval);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setIsLoading(false);
    setProgress(0);
    setError(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="space-y-6">
      {!result && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative">
              <Image src={preview} alt="Preview" width={200} height={200} className="mx-auto rounded-lg shadow-md" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => { e.stopPropagation(); handleReset(); }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                {isDragActive ? 'Drop the image here...' : "Drag 'n' drop an image, or click to select"}
              </p>
              <div className="flex items-center gap-4">
                <Button onClick={(e) => e.stopPropagation()}>
                  <File className="mr-2 h-4 w-4" /> Select File
                </Button>
                <span className="text-muted-foreground">or</span>
                <Button>
                  <Camera className="mr-2 h-4 w-4" /> Use Camera
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {file && !result && (
        <div className="text-center">
          <Button size="lg" onClick={handleIdentify} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {isLoading ? 'Identifying...' : 'Identify Plant'}
          </Button>
        </div>
      )}

      {isLoading && <Progress value={progress} className="w-full" />}
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Identification Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-3xl">{result.englishName}</CardTitle>
                <p className="text-muted-foreground font-code">{result.scientificName}</p>
              </div>
              <Button variant="outline" onClick={handleReset}>
                <Upload className="mr-2 h-4 w-4" /> New Scan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-video">
              <Image src={result.imageUrl} alt={result.englishName} fill className="rounded-lg object-cover shadow-md" data-ai-hint={result.imageHint} />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {result.isMedicinal && <Badge className="bg-green-100 text-green-800 border-green-200">Medicinal</Badge>}
                {result.isEndangered && <Badge variant="destructive">Endangered</Badge>}
                <Badge variant="secondary">{result.family}</Badge>
              </div>
              <p><strong>Hindi Name:</strong> {result.hindiName}</p>
              <div>
                <h4 className="font-semibold">Tribal Names:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {result.tribalNames.map(tn => (
                    <li key={tn.language}><strong>{tn.language}:</strong> {tn.name} <em className="font-code">({tn.pronunciation})</em></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Medicinal Uses</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {result.medicinalUses.map(use => <li key={use}>{use}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Preparation Methods</h4>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {result.preparationMethods.map(method => <li key={method}>{method}</li>)}
                </ul>
              </div>
              <Alert variant="default" className="border-yellow-500/50 text-yellow-700">
                <Info className="h-4 w-4 !text-yellow-700" />
                <AlertTitle>Precautions</AlertTitle>
                <AlertDescription>
                  {result.precautions.join(' ')}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

       <Alert className="mt-8 border-primary/50 text-primary-foreground bg-primary/10">
          <ShieldCheck className="h-4 w-4 !text-primary" />
          <AlertTitle>Privacy First</AlertTitle>
          <AlertDescription>
            Your images are processed 100% in your browser. Nothing is uploaded to a server, ensuring your data remains private.
          </AlertDescription>
        </Alert>
    </div>
  );
}
