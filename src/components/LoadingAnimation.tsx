import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Brain, Microscope, Dna } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const steps = [
    { icon: Activity, label: 'Processing Clinical Data', delay: '0s' },
    { icon: Brain, label: 'Analyzing US Embeddings', delay: '0.5s' },
    { icon: Microscope, label: 'Processing CXR Features', delay: '1s' },
    { icon: Dna, label: 'Evaluating Omic Data', delay: '1.5s' },
  ];

  return (
    <Card className="card-gradient border-border elegant-shadow max-w-md mx-auto">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-medical-primary/50"></div>
            <div className="absolute inset-2 rounded-full border-2 border-medical-primary border-t-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-xl font-semibold mb-2 hero-gradient bg-clip-text text-transparent">
            AI Prediction in Progress
          </h3>
          <p className="text-muted-foreground text-sm">
            Our advanced model is analyzing your data...
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.label}
              className="flex items-center space-x-3 opacity-0 animate-fade-in"
              style={{ animationDelay: step.delay, animationFillMode: 'forwards' }}
            >
              <div className="medical-gradient w-8 h-8 rounded-full flex items-center justify-center">
                <step.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">{step.label}</span>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden ml-auto">
                <div 
                  className="h-full medical-gradient animate-pulse"
                  style={{ 
                    width: '100%',
                    animation: `pulse 2s infinite ${step.delay}`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Processing 196 clinical features through our trained neural network...
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingAnimation;