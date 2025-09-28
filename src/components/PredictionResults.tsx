import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Stethoscope, AlertCircle, Heart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionResult {
  sle_diagnosis: number;
  sle_probability: number;
  flare_12m: number;
  flare_probability: number;
  timestamp: string;
  patient_name: string;
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

  const getTreatmentRecommendation = (sleRisk: ReturnType<typeof getRiskLevel>, flareRisk: ReturnType<typeof getRiskLevel>) => {
    const overallRisk = Math.max(result.sle_probability, result.flare_probability);
    
    if (overallRisk >= 0.7) {
      return {
        level: 'High Risk - Immediate Intervention',
        treatments: [
          'Corticosteroids (Prednisone 10-40mg daily)',
          'Immunosuppressive therapy (Methotrexate/Azathioprine)',
          'Antimalarial drugs (Hydroxychloroquine)',
          'Regular specialist monitoring (monthly visits)',
          'Lifestyle modifications and stress management'
        ],
        urgency: 'high'
      };
    } else if (overallRisk >= 0.4) {
      return {
        level: 'Moderate Risk - Active Monitoring',
        treatments: [
          'Antimalarial drugs (Hydroxychloroquine)',
          'Low-dose corticosteroids if needed',
          'NSAIDs for joint symptoms',
          'Regular monitoring (bi-monthly visits)',
          'Lifestyle counseling and sun protection'
        ],
        urgency: 'medium'
      };
    } else {
      return {
        level: 'Low Risk - Preventive Care',
        treatments: [
          'Regular health checkups (quarterly)',
          'Lifestyle modifications and exercise',
          'Sun protection and stress management',
          'Monitoring for early symptoms',
          'Patient education and support'
        ],
        urgency: 'low'
      };
    }
  };

  const TreatmentRecommendations = ({ sleRisk, flareRisk }: { 
    sleRisk: ReturnType<typeof getRiskLevel>; 
    flareRisk: ReturnType<typeof getRiskLevel>; 
  }) => {
    const treatment = getTreatmentRecommendation(sleRisk, flareRisk);
    
    return (
      <Card className="glass-card border-medical-primary/30 treatment-shadow hover:premium-shadow transition-all duration-500 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-transparent to-medical-secondary/5 group-hover:from-medical-primary/10 group-hover:to-medical-secondary/10 transition-all duration-500"></div>
        <div className="absolute inset-0 treatment-gradient opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
            <div className="relative">
              <Stethoscope className="h-8 w-8 text-medical-primary animate-pulse-slow" />
              <div className="absolute inset-0 h-8 w-8 text-medical-secondary/50 animate-pulse-slow" style={{ animationDelay: '1s' }}>
                <Stethoscope className="h-8 w-8" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              Primary Treatment Recommendations
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-medical-primary/10 to-medical-secondary/10 border border-medical-primary/20">
            <div className={cn(
              "p-2 rounded-full",
              treatment.urgency === 'high' && "bg-destructive/20",
              treatment.urgency === 'medium' && "bg-warning/20", 
              treatment.urgency === 'low' && "bg-success/20"
            )}>
              {treatment.urgency === 'high' && <AlertCircle className="h-6 w-6 text-destructive" />}
              {treatment.urgency === 'medium' && <Shield className="h-6 w-6 text-warning" />}
              {treatment.urgency === 'low' && <Heart className="h-6 w-6 text-success" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{treatment.level}</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-medical-primary flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recommended Treatment Protocol:
            </h4>
            <ul className="space-y-2">
              {treatment.treatments.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-medical-primary mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-warning">Medical Disclaimer</p>
                <p className="text-sm text-muted-foreground">
                  ⚠️ This tool is for educational and clinical decision support purposes only. 
                  Always consult with a licensed healthcare professional for final diagnosis 
                  and treatment decisions. This AI-generated recommendation should not replace 
                  professional medical judgment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

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
    <Card className="glass-card treatment-shadow hover:premium-shadow transition-all duration-500 hover:scale-[1.02] border border-primary/20 relative overflow-hidden group">
      <CardHeader className="pb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-t-lg group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500"></div>
        <div className="absolute inset-0 aurora-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-t-lg"></div>
        <CardTitle className="relative flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{title}</span>
          <risk.icon className={cn(
            "h-7 w-7 animate-pulse-slow",
            risk.color === 'destructive' && "text-destructive drop-shadow-lg",
            risk.color === 'warning' && "text-warning drop-shadow-lg",
            risk.color === 'success' && "text-success drop-shadow-lg"
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
    <div className="space-y-8 animate-fade-in-up">
      <Card className="hero-gradient border-primary/30 premium-shadow animate-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="absolute inset-0 aurora-gradient opacity-20 animate-gradient"></div>
        <CardHeader className="text-center text-white relative z-10 py-8">
          <CardTitle className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="h-10 w-10 animate-bounce-subtle" />
            Prediction Analysis Complete
          </CardTitle>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-white">
              Patient: {result.patient_name}
            </p>
            <p className="text-white/90 text-lg">
              Analysis completed on {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
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

      {/* Treatment Recommendations Section */}
      <TreatmentRecommendations sleRisk={sleRisk} flareRisk={flareRisk} />

      <Card className="glass-card border-primary/20 treatment-shadow hover:floating-shadow transition-all duration-500">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/10 via-transparent to-medical-secondary/10 rounded-t-lg"></div>
          <CardTitle className="relative text-2xl font-bold bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">Clinical Summary & Recommendations</CardTitle>
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