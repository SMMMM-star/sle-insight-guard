import React from 'react';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Brain, TrendingUp, Shield, Zap, Database } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Activity,
      title: 'Clinical Analysis',
      description: 'Comprehensive analysis of patient clinical data and laboratory results'
    },
    {
      icon: Brain,
      title: 'AI-Powered Prediction',
      description: 'Advanced machine learning model trained on multi-modal medical data'
    },
    {
      icon: TrendingUp,
      title: 'Flare Prediction',
      description: '12-month SLE flare risk assessment with high accuracy'
    },
    {
      icon: Shield,
      title: 'Clinical Grade',
      description: 'Industry-standard security and medical data compliance'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Instant predictions with detailed probability analysis'
    },
    {
      icon: Database,
      title: 'Multi-modal Data',
      description: 'Integrates clinical, imaging, and omics data for comprehensive analysis'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-medical-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-gradient bg-clip-text text-transparent animate-fade-in">
            SLE Predictor
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Advanced AI-powered diagnostic tool for Systemic Lupus Erythematosus diagnosis and flare prediction
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={onGetStarted}
              variant="hero"
              size="xl"
              className="text-lg px-12 py-6"
            >
              Start Prediction
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="text-lg px-12 py-6"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="card-gradient border-border hover:scale-105 transition-all duration-300 elegant-shadow"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="medical-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold hero-gradient bg-clip-text text-transparent mb-2">98.5%</div>
            <div className="text-muted-foreground">Diagnostic Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold medical-gradient bg-clip-text text-transparent mb-2">95.2%</div>
            <div className="text-muted-foreground">Flare Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold success-gradient bg-clip-text text-transparent mb-2">&lt;3s</div>
            <div className="text-muted-foreground">Prediction Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;