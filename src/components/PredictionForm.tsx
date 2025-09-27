import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Activity, Brain, Microscope, Dna } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  PatientName: string;
  [key: string]: number | string;
}

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({ PatientName: '' });
  const [openSections, setOpenSections] = useState({
    patient: true,
    clinical: true,
    us: false,
    cxr: false,
    omic: false
  });

  const clinicalFields = [
    { name: 'Age', type: 'number', min: 0, max: 120 },
    { name: 'Sex', type: 'select', options: [{ value: 0, label: 'Female' }, { value: 1, label: 'Male' }] },
    { name: 'Ethnicity', type: 'select', options: [
      { value: 0, label: 'Caucasian' },
      { value: 1, label: 'African American' },
      { value: 2, label: 'Hispanic' },
      { value: 3, label: 'Asian' },
      { value: 4, label: 'Other' }
    ]},
    { name: 'Fatigue', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    { name: 'Malar_Rash', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    { name: 'Arthritis', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    { name: 'Renal_Disorder', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    { name: 'Fever', type: 'select', options: [{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }] },
    { name: 'ANA_Positive', type: 'select', options: [{ value: 0, label: 'Negative' }, { value: 1, label: 'Positive' }] },
    { name: 'Anti_dsDNA', type: 'number', min: 0, step: 0.1 },
    { name: 'Complement_C3', type: 'number', min: 0, step: 0.1 },
    { name: 'Complement_C4', type: 'number', min: 0, step: 0.1 },
    { name: 'Creatinine', type: 'number', min: 0, step: 0.01 },
    { name: 'Fatigue_Score', type: 'number', min: 0, max: 10, step: 0.1 },
    { name: 'QoL', type: 'number', min: 0, max: 100, step: 0.1 },
    { name: 'Pain_Score', type: 'number', min: 0, max: 10, step: 0.1 }
  ];

  const generateEmbeddingFields = (prefix: string, count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      name: `${prefix}_${i}`,
      type: 'number',
      step: 0.0001
    }));
  };

  const usEmbeddings = generateEmbeddingFields('US_emb', 64);
  const cxrEmbeddings = generateEmbeddingFields('CXR_emb', 64);
  const omicData = generateEmbeddingFields('Omic', 50);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: any) => {
    if (field.type === 'select') {
      return (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
            {field.name.replace('_', ' ')}
          </Label>
          <Select onValueChange={(value) => handleInputChange(field.name, value)}>
            <SelectTrigger className="bg-muted/50 border-border">
              <SelectValue placeholder={`Select ${field.name.replace('_', ' ')}`} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {field.options.map((option: any) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
          {field.name.replace('_', ' ')}
        </Label>
        <Input
          id={field.name}
          type="number"
          min={field.min}
          max={field.max}
          step={field.step || 1}
          value={formData[field.name] || ''}
          onChange={(e) => handleInputChange(field.name, parseFloat(e.target.value) || 0)}
          className="bg-muted/50 border-border focus:border-primary"
        />
      </div>
    );
  };

  const SectionHeader = ({ 
    title, 
    description, 
    icon: Icon, 
    isOpen, 
    onClick, 
    gradient 
  }: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    isOpen: boolean;
    onClick: () => void;
    gradient: string;
  }) => (
    <CollapsibleTrigger
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between p-6 rounded-lg transition-all hover:scale-[1.02]",
        gradient,
        "text-white shadow-lg"
      )}
    >
      <div className="flex items-center space-x-4">
        <Icon className="h-6 w-6" />
        <div className="text-left">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </div>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </CollapsibleTrigger>
  );

  return (
    <Card className="glass-card neon-shadow animate-fade-in">
      <CardHeader className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-medical-primary/10 rounded-t-lg"></div>
        <CardTitle className="relative text-4xl font-bold bg-gradient-to-r from-primary via-accent to-medical-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
          SLE AI Prediction Platform
        </CardTitle>
        <CardDescription className="relative text-xl text-muted-foreground mt-4">
          Advanced machine learning analysis for precision medical diagnosis
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Patient Information Section */}
          <Collapsible open={openSections.patient} onOpenChange={() => toggleSection('patient')}>
            <SectionHeader
              title="Patient Information"
              description="Basic patient identification and demographics"
              icon={Activity}
              isOpen={openSections.patient}
              onClick={() => toggleSection('patient')}
              gradient="bg-gradient-to-r from-primary to-accent"
            />
            <CollapsibleContent className="pt-6">
              <div className="glass-card p-6 border border-primary/20">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="PatientName" className="text-foreground font-semibold text-lg">
                      Patient Full Name *
                    </Label>
                    <Input
                      id="PatientName"
                      type="text"
                      value={formData.PatientName || ''}
                      onChange={(e) => handleInputChange('PatientName', e.target.value)}
                      placeholder="Enter patient's complete name"
                      className="mt-2 bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 text-lg py-3"
                      required
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Clinical Data Section */}
          <Collapsible open={openSections.clinical} onOpenChange={() => toggleSection('clinical')}>
            <SectionHeader
              title="Clinical Features"
              description="Comprehensive clinical assessment and laboratory findings"
              icon={Activity}
              isOpen={openSections.clinical}
              onClick={() => toggleSection('clinical')}
              gradient="bg-gradient-to-r from-medical-primary to-medical-secondary"
            />
            <CollapsibleContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicalFields.map(renderField)}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* US Embeddings Section */}
          <Collapsible open={openSections.us} onOpenChange={() => toggleSection('us')}>
            <SectionHeader
              title="Ultrasound AI Embeddings"
              description="64-dimensional deep learning ultrasound feature vectors"
              icon={Brain}
              isOpen={openSections.us}
              onClick={() => toggleSection('us')}
              gradient="bg-gradient-to-r from-accent to-medical-secondary"
            />
            <CollapsibleContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {usEmbeddings.map(renderField)}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* CXR Embeddings Section */}
          <Collapsible open={openSections.cxr} onOpenChange={() => toggleSection('cxr')}>
            <SectionHeader
              title="Chest X-Ray AI Embeddings"
              description="64-dimensional radiological deep learning feature analysis"
              icon={Microscope}
              isOpen={openSections.cxr}
              onClick={() => toggleSection('cxr')}
              gradient="bg-gradient-to-r from-medical-accent to-primary"
            />
            <CollapsibleContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {cxrEmbeddings.map(renderField)}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Omic Data Section */}
          <Collapsible open={openSections.omic} onOpenChange={() => toggleSection('omic')}>
            <SectionHeader
              title="Multi-Omic Data Analysis"
              description="50-dimensional genomic and proteomic biomarker signatures"
              icon={Dna}
              isOpen={openSections.omic}
              onClick={() => toggleSection('omic')}
              gradient="bg-gradient-to-r from-success to-medical-primary"
            />
            <CollapsibleContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {omicData.map(renderField)}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="pt-12">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary via-accent to-medical-primary hover:from-primary/90 hover:via-accent/90 hover:to-medical-primary/90 text-white font-bold py-6 px-8 text-xl neon-shadow animate-shimmer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3 relative z-10"></div>
                  <span className="relative z-10">Processing AI Analysis...</span>
                </>
              ) : (
                <>
                  <Brain className="h-6 w-6 mr-3 relative z-10" />
                  <span className="relative z-10">Generate AI Prediction</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;