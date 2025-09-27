// SLE Predictor Constants and Field Definitions

export const CLINICAL_FIELDS = [
  { 
    name: 'Age', 
    type: 'number', 
    min: 0, 
    max: 120, 
    label: 'Age (years)',
    description: 'Patient age in years',
    required: true
  },
  { 
    name: 'Sex', 
    type: 'select', 
    options: [
      { value: 0, label: 'Female' }, 
      { value: 1, label: 'Male' }
    ],
    label: 'Biological Sex',
    description: 'Patient biological sex',
    required: true
  },
  { 
    name: 'Ethnicity', 
    type: 'select', 
    options: [
      { value: 0, label: 'Caucasian' },
      { value: 1, label: 'African American' },
      { value: 2, label: 'Hispanic/Latino' },
      { value: 3, label: 'Asian' },
      { value: 4, label: 'Native American' },
      { value: 5, label: 'Other/Mixed' }
    ],
    label: 'Ethnicity',
    description: 'Patient ethnic background',
    required: true
  },
  { 
    name: 'Fatigue', 
    type: 'select', 
    options: [
      { value: 0, label: 'No' }, 
      { value: 1, label: 'Yes' }
    ],
    label: 'Fatigue',
    description: 'Presence of persistent fatigue',
    required: true
  },
  { 
    name: 'Malar_Rash', 
    type: 'select', 
    options: [
      { value: 0, label: 'No' }, 
      { value: 1, label: 'Yes' }
    ],
    label: 'Malar Rash',
    description: 'Butterfly rash across cheeks and nose bridge',
    required: true
  },
  { 
    name: 'Arthritis', 
    type: 'select', 
    options: [
      { value: 0, label: 'No' }, 
      { value: 1, label: 'Yes' }
    ],
    label: 'Arthritis',
    description: 'Joint inflammation and pain',
    required: true
  },
  { 
    name: 'Renal_Disorder', 
    type: 'select', 
    options: [
      { value: 0, label: 'No' }, 
      { value: 1, label: 'Yes' }
    ],
    label: 'Renal Disorder',
    description: 'Kidney involvement or dysfunction',
    required: true
  },
  { 
    name: 'Fever', 
    type: 'select', 
    options: [
      { value: 0, label: 'No' }, 
      { value: 1, label: 'Yes' }
    ],
    label: 'Fever',
    description: 'Presence of fever episodes',
    required: true
  },
  { 
    name: 'ANA_Positive', 
    type: 'select', 
    options: [
      { value: 0, label: 'Negative' }, 
      { value: 1, label: 'Positive' }
    ],
    label: 'ANA Test',
    description: 'Antinuclear antibody test result',
    required: true
  },
  { 
    name: 'Anti_dsDNA', 
    type: 'number', 
    min: 0, 
    step: 0.1,
    label: 'Anti-dsDNA (IU/mL)',
    description: 'Anti-double stranded DNA antibody level',
    required: true
  },
  { 
    name: 'Complement_C3', 
    type: 'number', 
    min: 0, 
    step: 0.1,
    label: 'Complement C3 (mg/dL)',
    description: 'Complement component 3 level',
    required: true
  },
  { 
    name: 'Complement_C4', 
    type: 'number', 
    min: 0, 
    step: 0.1,
    label: 'Complement C4 (mg/dL)',
    description: 'Complement component 4 level',
    required: true
  },
  { 
    name: 'Creatinine', 
    type: 'number', 
    min: 0, 
    step: 0.01,
    label: 'Creatinine (mg/dL)',
    description: 'Serum creatinine level',
    required: true
  },
  { 
    name: 'Fatigue_Score', 
    type: 'number', 
    min: 0, 
    max: 10, 
    step: 0.1,
    label: 'Fatigue Score (0-10)',
    description: 'Patient-reported fatigue severity',
    required: true
  },
  { 
    name: 'QoL', 
    type: 'number', 
    min: 0, 
    max: 100, 
    step: 0.1,
    label: 'Quality of Life Score (0-100)',
    description: 'Patient-reported quality of life',
    required: true
  },
  { 
    name: 'Pain_Score', 
    type: 'number', 
    min: 0, 
    max: 10, 
    step: 0.1,
    label: 'Pain Score (0-10)',
    description: 'Patient-reported pain level',
    required: true
  }
] as const;

export const EMBEDDING_SECTIONS = {
  US_EMBEDDINGS: {
    prefix: 'US_emb',
    count: 64,
    title: 'Ultrasound Embeddings',
    description: '64-dimensional ultrasound feature embeddings from deep learning analysis',
    icon: 'Brain'
  },
  CXR_EMBEDDINGS: {
    prefix: 'CXR_emb',
    count: 64,
    title: 'Chest X-Ray Embeddings',
    description: '64-dimensional chest X-ray feature embeddings from radiological analysis',
    icon: 'Microscope'
  },
  OMIC_DATA: {
    prefix: 'Omic',
    count: 50,
    title: 'Omic Data',
    description: '50-dimensional omics feature data including genomic and proteomic markers',
    icon: 'Dna'
  }
} as const;

export const PREDICTION_THRESHOLDS = {
  SLE_DIAGNOSIS: 0.5,
  FLARE_RISK: 0.4,
  HIGH_RISK: 0.7,
  MODERATE_RISK: 0.4
} as const;

export const RISK_LEVELS = {
  LOW: {
    label: 'Low Risk',
    color: 'success',
    description: 'Low probability based on current clinical indicators'
  },
  MODERATE: {
    label: 'Moderate Risk',
    color: 'warning',
    description: 'Moderate probability requiring monitoring'
  },
  HIGH: {
    label: 'High Risk',
    color: 'destructive',
    description: 'High probability requiring immediate attention'
  }
} as const;

export const MODEL_INFO = {
  VERSION: '1.0.0',
  ACCURACY: {
    SLE_DIAGNOSIS: 98.5,
    FLARE_PREDICTION: 95.2
  },
  FEATURES_COUNT: 196,
  TRAINING_DATA_SIZE: '10,000+ patients',
  LAST_UPDATED: '2024-01-15'
} as const;

export const VALIDATION_RULES = {
  AGE: { min: 0, max: 120 },
  SCORES: { min: 0, max: 10 },
  QUALITY_OF_LIFE: { min: 0, max: 100 },
  LAB_VALUES: { min: 0 },
  EMBEDDINGS: { min: -10, max: 10 }
} as const;