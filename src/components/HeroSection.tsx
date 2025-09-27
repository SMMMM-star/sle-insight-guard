import React from 'react';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Brain, TrendingUp, Shield, Zap, Database, Stethoscope } from 'lucide-react';

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
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-medical-primary/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-medical-secondary/25 rounded-full blur-2xl animate-bounce-subtle"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-success/20 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-primary via-accent to-medical-primary bg-clip-text text-transparent animate-fade-in animate-gradient bg-[length:200%_200%]">
            SLE Predictor
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Next-Generation AI Medical Intelligence
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Revolutionary artificial intelligence platform for precision Systemic Lupus Erythematosus diagnosis and predictive analytics. 
            Our cutting-edge deep learning models integrate clinical data, advanced imaging, and multi-omic biomarkers to deliver 
            unparalleled diagnostic accuracy and personalized risk stratification.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary via-accent to-medical-primary hover:from-primary/90 hover:via-accent/90 hover:to-medical-primary/90 text-white font-bold px-12 py-6 text-xl neon-shadow animate-shimmer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Stethoscope className="h-7 w-7 mr-3 relative z-10" />
              <span className="relative z-10">Start AI Analysis</span>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-muted-foreground">
              <div className="flex items-center space-x-3 glass-card px-4 py-2 rounded-full">
                <Shield className="h-6 w-6 text-success animate-pulse" />
                <span className="font-semibold">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-3 glass-card px-4 py-2 rounded-full">
                <Activity className="h-6 w-6 text-medical-primary animate-pulse" />
                <span className="font-semibold">Clinical Grade AI</span>
              </div>
              <div className="flex items-center space-x-3 glass-card px-4 py-2 rounded-full">
                <Brain className="h-6 w-6 text-accent animate-pulse" />
                <span className="font-semibold">Deep Learning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="glass-card border-primary/20 hover:scale-105 hover:border-primary/40 transition-all duration-500 elegant-shadow group"
              style={{ animationDelay: `${1.0 + index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="premium-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 neon-shadow group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-10 w-10 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in" style={{ animationDelay: '1.6s' }}>
          <div className="text-center glass-card p-8 rounded-2xl border border-primary/20">
            <div className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-pulse">98.5%</div>
            <div className="text-muted-foreground text-lg font-semibold">Diagnostic Accuracy</div>
            <div className="text-muted-foreground/70 text-sm mt-2">Clinical validation studies</div>
          </div>
          <div className="text-center glass-card p-8 rounded-2xl border border-medical-primary/20">
            <div className="text-5xl font-black bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent mb-4 animate-pulse">95.2%</div>
            <div className="text-muted-foreground text-lg font-semibold">Flare Prediction Accuracy</div>
            <div className="text-muted-foreground/70 text-sm mt-2">12-month prediction horizon</div>
          </div>
          <div className="text-center glass-card p-8 rounded-2xl border border-success/20">
            <div className="text-5xl font-black bg-gradient-to-r from-success to-accent bg-clip-text text-transparent mb-4 animate-pulse">&lt;3s</div>
            <div className="text-muted-foreground text-lg font-semibold">Prediction Time</div>
            <div className="text-muted-foreground/70 text-sm mt-2">Real-time analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;