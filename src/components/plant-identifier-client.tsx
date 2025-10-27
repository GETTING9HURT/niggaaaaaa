"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, File, Upload, X, Loader2, Sparkles, ShieldCheck, Info, Leaf, BookOpen } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { identifyPlant, type IdentifyPlantOutput } from '@/ai/flows/plant-identification-flow';
import useLocalStorage from '@/hooks/use-local-storage';
import { UserProgress } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

export default function PlantIdentifierClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<IdentifyPlantOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [progressData, setProgressData] = useLocalStorage<UserProgress>('user-progress', {
    points: 0,
    identifiedPlants: [],
    remediesContributed: 0,
    languageTests: {},
  });


  useEffect(() => {
    if (showCamera) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
          setShowCamera(false);
        }
      };

      getCameraPermission();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [showCamera, toast]);


  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

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
    setShowCamera(false);
  };
  
  const handleIdentify = async (dataUri?: string) => {
    let imageDataUri = dataUri;

    if (!imageDataUri) {
      if (!file) return;
      imageDataUri = await fileToDataUri(file);
    }
    
    setIsLoading(true);
    setProgress(0);
    setError(null);

    const interval = setInterval(() => {
      setProgress(prev => (prev >= 90 ? 90 : prev + 10));
    }, 500);

    try {
      const identificationResult = await identifyPlant({ photoDataUri: imageDataUri });
      clearInterval(interval);
      setProgress(100);

      if (identificationResult && identificationResult.isPlant) {
        setResult(identificationResult);
        
        // This is a mock ID for progress tracking. In a real app, you'd use a stable ID.
        const plantId = identificationResult.commonName.length; 
        
        if (!progressData.identifiedPlants.includes(plantId)) {
          setProgressData(prev => ({
            ...prev,
            points: prev.points + 25,
            identifiedPlants: [...prev.identifiedPlants, plantId],
          }));
          toast({
            title: "New Plant Identified!",
            description: "+25 points for discovering a new plant!",
          });
        }

      } else {
        throw new Error('This does not appear to be a plant. Please try another image.');
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
    setShowCamera(false);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if(context){
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setPreview(dataUri);
        handleIdentify(dataUri);
        setShowCamera(false);
      }
    }
  };


  if (result) {
    return (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="font-headline text-3xl">{result.commonName}</CardTitle>
                <p className="text-muted-foreground font-code">{result.scientificName}</p>
              </div>
              <Button variant="outline" onClick={handleReset}>
                <Upload className="mr-2 h-4 w-4" /> New Scan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-video">
               {preview && <Image src={preview} alt={result.commonName} fill className="rounded-lg object-cover shadow-md" />}
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {result.isMedicinal && <Badge className="bg-green-100 text-green-800 border-green-200">Medicinal</Badge>}
                {result.isPoisonous && <Badge variant="destructive">Poisonous</Badge>}
                <Badge variant="secondary">{result.family}</Badge>
              </div>
              <p><strong>Also Known As:</strong> {result.otherNames.join(', ')}</p>
               <div>
                <h4 className="font-semibold flex items-center gap-2"><Leaf /> Plant Description</h4>
                <p className="text-sm mt-1">{result.description}</p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2"><BookOpen /> Medicinal Uses</h4>
                <p className="mt-2 text-sm">{result.medicinalUses}</p>
              </div>
             
              <Alert variant="default" className="border-yellow-500/50 text-yellow-700">
                <Info className="h-4 w-4 !text-yellow-700" />
                <AlertTitle>Precautions & Warnings</AlertTitle>
                <AlertDescription>
                  {result.warnings}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
           <CardFooter>
             <Alert className="w-full text-xs">
              <Sparkles className="h-4 w-4" />
              <AlertTitle>AI-Generated Information</AlertTitle>
              <AlertDescription>
                This information is generated by AI and has not been verified by a medical professional. Always consult with a qualified expert before using any plant for medicinal purposes.
              </AlertDescription>
            </Alert>
           </CardFooter>
        </Card>
    );
  }

  return (
    <div className="space-y-6">
      {!preview && !showCamera && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                {isDragActive ? 'Drop the image here...' : "Drag 'n' drop an image, or click to select"}
              </p>
              <div className="flex items-center gap-4">
                <Button onClick={(e) => { e.stopPropagation(); document.querySelector('input[type="file"]')?.click(); }}>
                  <File className="mr-2 h-4 w-4" /> Select File
                </Button>
                <span className="text-muted-foreground">or</span>
                <Button onClick={(e) => { e.stopPropagation(); setShowCamera(true); }}>
                  <Camera className="mr-2 h-4 w-4" /> Use Camera
                </Button>
              </div>
            </div>
        </div>
      )}

      {preview && !isLoading && (
        <div className="text-center space-y-4">
          <div className="relative inline-block">
              <Image src={preview} alt="Preview" width={300} height={300} className="mx-auto rounded-lg shadow-md" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => { e.stopPropagation(); handleReset(); }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          <div>
            <Button size="lg" onClick={() => handleIdentify()} disabled={isLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              Identify Plant
            </Button>
          </div>
        </div>
      )}

      {showCamera && (
        <div className="space-y-4">
            <div className="relative">
                <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />

                {hasCameraPermission === false && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                        Please allow camera access in your browser to use this feature.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <div className="flex justify-center gap-4">
                 <Button size="lg" onClick={handleCapture} disabled={hasCameraPermission === false}>
                    <Camera className="mr-2" /> Capture
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowCamera(false)}>
                    Cancel
                </Button>
            </div>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="font-semibold">AI is analyzing your image...</p>
            <Progress value={progress} className="w-full max-w-sm" />
        </div>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Identification Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

       <Alert className="mt-8 border-primary/50 text-primary-foreground bg-primary/10">
          <ShieldCheck className="h-4 w-4 !text-primary" />
          <AlertTitle>Privacy First</AlertTitle>
          <AlertDescription>
            Your images are processed by our AI and are not stored. Your data remains private.
          </AlertDescription>
        </Alert>
    </div>
  );
}
