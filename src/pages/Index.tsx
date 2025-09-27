import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/HeroSection';
import PredictionForm from '@/components/PredictionForm';
import PredictionResults from '@/components/PredictionResults';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Button } from '@/components/ui/enhanced-button';
import { ArrowLeft, Menu, X } from 'lucide-react';

interface PredictionResult {
  sle_diagnosis: number;
  sle_probability: number;
  flare_12m: number;
  flare_probability: number;
  timestamp: string;
  input_data: any;
}

type AppView = 'hero' | 'form' | 'loading' | 'results';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('hero');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = async (formData: any) => {
    setCurrentView('loading');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock prediction result - In production, this would call your ML API
      const mockResult: PredictionResult = {
        sle_diagnosis: Math.random() > 0.5 ? 1 : 0,
        sle_probability: Math.random(),
        flare_12m: Math.random() > 0.6 ? 1 : 0,
        flare_probability: Math.random(),
        timestamp: new Date().toISOString(),
        input_data: formData
      };
      
      setPredictionResult(mockResult);
      setCurrentView('results');
      
      toast({
        title: "Prediction Complete",
        description: "Your SLE prediction analysis has been generated successfully.",
      });
      
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: "There was an error processing your prediction. Please try again.",
        variant: "destructive",
      });
      setCurrentView('form');
    }
  };

  const handleDownload = () => {
    if (!predictionResult) return;
    
    const csvContent = [
      ['Field', 'Value'],
      ['SLE Diagnosis', predictionResult.sle_diagnosis],
      ['SLE Probability', (predictionResult.sle_probability * 100).toFixed(2) + '%'],
      ['12-Month Flare Risk', predictionResult.flare_12m],
      ['Flare Probability', (predictionResult.flare_probability * 100).toFixed(2) + '%'],
      ['Analysis Date', new Date(predictionResult.timestamp).toLocaleString()],
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sle_prediction_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "Your prediction report has been downloaded successfully.",
    });
  };

  const handleBackToHome = () => {
    setCurrentView('hero');
    setPredictionResult(null);
  };

  const handleNewPrediction = () => {
    setCurrentView('form');
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      {currentView !== 'hero' && (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>SLE Predictor</span>
              </Button>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {currentView === 'results' && (
                <Button
                  variant="medical"
                  size="sm"
                  onClick={handleNewPrediction}
                >
                  New Prediction
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background p-4">
              {currentView === 'results' && (
                <Button
                  variant="medical"
                  size="sm"
                  onClick={handleNewPrediction}
                  className="w-full"
                >
                  New Prediction
                </Button>
              )}
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'hero' && (
          <HeroSection onGetStarted={handleGetStarted} />
        )}

        {currentView === 'form' && (
          <div className="max-w-6xl mx-auto">
            <PredictionForm
              onSubmit={handleFormSubmit}
              isLoading={false}
            />
          </div>
        )}

        {currentView === 'loading' && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingAnimation />
          </div>
        )}

        {currentView === 'results' && predictionResult && (
          <div className="max-w-6xl mx-auto">
            <PredictionResults
              result={predictionResult}
              onDownload={handleDownload}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 SLE Predictor. Advanced AI for medical diagnosis and prediction.</p>
            <p className="mt-2">For research and clinical decision support purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;