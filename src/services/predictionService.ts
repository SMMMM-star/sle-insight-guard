// SLE Prediction Service
// This service handles the integration with the ML model and database

export interface PredictionData {
  [key: string]: number | string;
}

export interface PredictionResult {
  sle_diagnosis: number;
  sle_probability: number;
  flare_12m: number;
  flare_probability: number;
  timestamp: string;
  input_data: PredictionData;
}

export class PredictionService {
  private static instance: PredictionService;
  private modelLoaded = false;

  public static getInstance(): PredictionService {
    if (!PredictionService.instance) {
      PredictionService.instance = new PredictionService();
    }
    return PredictionService.instance;
  }

  /**
   * Load the PKL model (placeholder for actual implementation)
   * In production, this would load the actual trained model
   */
  async loadModel(): Promise<void> {
    try {
      // Placeholder for model loading
      // In production, you would load the actual PKL model here
      console.log('Loading SLE prediction model...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.modelLoaded = true;
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load prediction model');
    }
  }

  /**
   * Make prediction using the loaded model
   */
  async predict(inputData: PredictionData): Promise<PredictionResult> {
    if (!this.modelLoaded) {
      await this.loadModel();
    }

    try {
      // Validate input data
      this.validateInput(inputData);

      // Simulate model prediction
      // In production, this would call your actual ML model
      const prediction = await this.runModelInference(inputData);

      // Save to database (placeholder)
      await this.savePrediction(prediction);

      return prediction;
    } catch (error) {
      console.error('Error making prediction:', error);
      throw new Error('Failed to generate prediction');
    }
  }

  /**
   * Validate input data format and completeness
   */
  private validateInput(data: PredictionData): void {
    const requiredFields = [
      'Age', 'Sex', 'Ethnicity', 'Fatigue', 'Malar_Rash', 
      'Arthritis', 'Renal_Disorder', 'Fever', 'ANA_Positive',
      'Anti_dsDNA', 'Complement_C3', 'Complement_C4', 'Creatinine',
      'Fatigue_Score', 'QoL', 'Pain_Score'
    ];

    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate numeric ranges
    if (data.Age && (Number(data.Age) < 0 || Number(data.Age) > 120)) {
      throw new Error('Age must be between 0 and 120');
    }

    if (data.Sex && ![0, 1, '0', '1'].includes(data.Sex)) {
      throw new Error('Sex must be 0 (Female) or 1 (Male)');
    }
  }

  /**
   * Run the actual model inference
   * This is a mock implementation - replace with actual model calling code
   */
  private async runModelInference(inputData: PredictionData): Promise<PredictionResult> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock prediction logic based on input patterns
    // In production, this would be replaced with actual model inference
    const age = Number(inputData.Age) || 30;
    const hasSymptoms = [
      inputData.Fatigue, inputData.Malar_Rash, inputData.Arthritis, 
      inputData.Renal_Disorder, inputData.Fever
    ].filter(x => x === 1 || x === '1').length;

    const anaPositive = inputData.ANA_Positive === 1 || inputData.ANA_Positive === '1';
    const creatinine = Number(inputData.Creatinine) || 1.0;

    // Simple mock prediction logic
    let sleScore = 0.1;
    sleScore += hasSymptoms * 0.15;
    sleScore += anaPositive ? 0.3 : 0;
    sleScore += creatinine > 1.5 ? 0.2 : 0;
    sleScore += age > 40 ? 0.1 : 0;

    let flareScore = sleScore * 0.7;
    flareScore += Math.random() * 0.3;

    // Ensure probabilities are in valid range
    const sleProbability = Math.min(Math.max(sleScore + Math.random() * 0.2 - 0.1, 0), 1);
    const flareProbability = Math.min(Math.max(flareScore + Math.random() * 0.2 - 0.1, 0), 1);

    return {
      sle_diagnosis: sleProbability > 0.5 ? 1 : 0,
      sle_probability: sleProbability,
      flare_12m: flareProbability > 0.4 ? 1 : 0,
      flare_probability: flareProbability,
      timestamp: new Date().toISOString(),
      input_data: inputData
    };
  }

  /**
   * Save prediction to database
   * Placeholder for MongoDB integration
   */
  private async savePrediction(prediction: PredictionResult): Promise<void> {
    try {
      // Placeholder for MongoDB save operation
      console.log('Saving prediction to database:', {
        id: Date.now(),
        timestamp: prediction.timestamp,
        sle_diagnosis: prediction.sle_diagnosis,
        sle_probability: prediction.sle_probability,
        flare_12m: prediction.flare_12m,
        flare_probability: prediction.flare_probability
      });

      // In production, implement actual MongoDB save:
      // await db.collection('predictions').insertOne(prediction);
    } catch (error) {
      console.error('Error saving prediction:', error);
      // Don't throw error for database save failures in demo
    }
  }

  /**
   * Get prediction history (placeholder)
   */
  async getPredictionHistory(limit = 10): Promise<PredictionResult[]> {
    // Placeholder for fetching prediction history from database
    console.log(`Fetching last ${limit} predictions from database`);
    return [];
  }

  /**
   * Export prediction data as CSV
   */
  exportPredictionToCSV(prediction: PredictionResult): string {
    const headers = [
      'Timestamp', 'SLE_Diagnosis', 'SLE_Probability', 
      'Flare_12m', 'Flare_Probability', 'Patient_Age', 
      'Patient_Sex', 'ANA_Positive', 'Symptom_Count'
    ];

    const symptomCount = [
      prediction.input_data.Fatigue,
      prediction.input_data.Malar_Rash,
      prediction.input_data.Arthritis,
      prediction.input_data.Renal_Disorder,
      prediction.input_data.Fever
    ].filter(x => x === 1 || x === '1').length;

    const data = [
      prediction.timestamp,
      prediction.sle_diagnosis,
      prediction.sle_probability.toFixed(4),
      prediction.flare_12m,
      prediction.flare_probability.toFixed(4),
      prediction.input_data.Age,
      prediction.input_data.Sex,
      prediction.input_data.ANA_Positive,
      symptomCount
    ];

    return [headers.join(','), data.join(',')].join('\n');
  }
}

export default PredictionService.getInstance();