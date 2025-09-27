import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionResult {
  sle_diagnosis: number;
  sle_probability: number;
  flare_12m: number;
  flare_probability: number;
  timestamp: string;
  input_data: any;
}

interface PredictionResultsProps {
  result: PredictionResult;
  onDownload: () => void;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result, onDownload }) => {
  const formatProbability = (prob: number) => `${(prob * 100).toFixed(1)}%`;
  
  const getRiskLevel = (probability: number) => {
    if (probability >= 0.7) return { level: 'High', color: 'destructive', icon: AlertTriangle };
    if (probability >= 0.4) return { level: 'Moderate', color: 'warning', icon: TrendingUp };
    return { level: 'Low', color: 'success', icon: CheckCircle };
  };

  const sleRisk = getRiskLevel(result.sle_probability);
  const flareRisk = getRiskLevel(result.flare_probability);

  const ResultCard = ({ 
    title, 
    prediction, 
    probability, 
    risk, 
    description 
  }: {
    title: string;
    prediction: number;
    probability: number;
    risk: ReturnType<typeof getRiskLevel>;
    description: string;
  }) => (
    <Card className="card-gradient border-border elegant-shadow hover:scale-[1.02] transition-transform">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-semibold">{title}</span>
          <risk.icon className={cn(
            "h-6 w-6",
            risk.color === 'destructive' && "text-destructive",
            risk.color === 'warning' && "text-warning",
            risk.color === 'success' && "text-success"
          )} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Prediction:</span>
          <Badge variant={prediction === 1 ? "destructive" : "secondary"} className="font-semibold">
            {prediction === 1 ? 'Positive' : 'Negative'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <span className="font-semibold">{formatProbability(probability)}</span>
          </div>
          <Progress 
            value={probability * 100} 
            className={cn(
              "h-3",
              risk.color === 'destructive' && "progress-destructive",
              risk.color === 'warning' && "progress-warning",
              risk.color === 'success' && "progress-success"
            )}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Risk Level:</span>
          <Badge 
            variant={risk.color === 'destructive' ? 'destructive' : 'secondary'}
            className={cn(
              risk.color === 'warning' && "bg-warning text-warning-foreground",
              risk.color === 'success' && "bg-success text-success-foreground"
            )}
          >
            {risk.level}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="hero-gradient border-border elegant-shadow">
        <CardHeader className="text-center text-white">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Prediction Complete
          </CardTitle>
          <p className="text-white/80">
            Analysis completed on {new Date(result.timestamp).toLocaleString()}
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResultCard
          title="SLE Diagnosis"
          prediction={result.sle_diagnosis}
          probability={result.sle_probability}
          risk={sleRisk}
          description="Systematic Lupus Erythematosus diagnosis prediction based on clinical and laboratory findings."
        />
        
        <ResultCard
          title="12-Month Flare Risk"
          prediction={result.flare_12m}
          probability={result.flare_probability}
          risk={flareRisk}
          description="Probability of experiencing an SLE flare within the next 12 months."
        />
      </div>

      <Card className="card-gradient border-border elegant-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Clinical Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-medical-primary">SLE Diagnosis Analysis</h4>
              <p className="text-sm text-muted-foreground">
                The model predicts a {sleRisk.level.toLowerCase()} likelihood of SLE diagnosis 
                with {formatProbability(result.sle_probability)} confidence. 
                {result.sle_diagnosis === 1 
                  ? ' This suggests the presence of SLE markers warranting further clinical evaluation.'
                  : ' This indicates a lower probability of SLE based on current clinical indicators.'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-medical-secondary">Flare Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">
                The 12-month flare prediction shows {flareRisk.level.toLowerCase()} risk 
                with {formatProbability(result.flare_probability)} confidence.
                {result.flare_12m === 1
                  ? ' Close monitoring and preventive measures are recommended.'
                  : ' Current indicators suggest stable disease management.'}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <Button
              onClick={onDownload}
              variant="medical"
              size="lg"
              className="w-full md:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResults;