import jsPDF from 'jspdf';

interface PredictionResult {
  sle_diagnosis: number;
  sle_probability: number;
  flare_12m: number;
  flare_probability: number;
  timestamp: string;
  patient_name: string;
  input_data: any;
  doctor_notes?: string;
}

export const generatePredictionReport = (result: PredictionResult) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  
  // Header
  pdf.setFillColor(67, 56, 202); // Primary color
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SLE Prediction Report', pageWidth / 2, 25, { align: 'center' });
  
  // Patient Information
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Patient Information', 20, 60);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Patient Name: ${result.patient_name}`, 20, 75);
  pdf.text(`Report Generated: ${new Date(result.timestamp).toLocaleString()}`, 20, 85);
  
  // Prediction Results Section
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Prediction Results', 20, 110);
  
  // SLE Diagnosis
  pdf.setFillColor(240, 240, 240);
  pdf.rect(15, 120, pageWidth - 30, 30, 'F');
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SLE Diagnosis Prediction', 20, 135);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const sleResult = result.sle_diagnosis === 1 ? 'Positive' : 'Negative';
  const sleConfidence = (result.sle_probability * 100).toFixed(1);
  pdf.text(`Result: ${sleResult}`, 20, 145);
  pdf.text(`Confidence: ${sleConfidence}%`, 120, 145);
  
  // Risk Assessment
  const sleRiskLevel = result.sle_probability >= 0.7 ? 'High' : 
                       result.sle_probability >= 0.4 ? 'Moderate' : 'Low';
  pdf.text(`Risk Level: ${sleRiskLevel}`, 20, 155);
  
  // 12-Month Flare Prediction
  pdf.setFillColor(250, 250, 250);
  pdf.rect(15, 165, pageWidth - 30, 30, 'F');
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('12-Month Flare Risk Prediction', 20, 180);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const flareResult = result.flare_12m === 1 ? 'High Risk' : 'Low Risk';
  const flareConfidence = (result.flare_probability * 100).toFixed(1);
  pdf.text(`Result: ${flareResult}`, 20, 190);
  pdf.text(`Confidence: ${flareConfidence}%`, 120, 190);
  
  const flareRiskLevel = result.flare_probability >= 0.7 ? 'High' : 
                         result.flare_probability >= 0.4 ? 'Moderate' : 'Low';
  pdf.text(`Risk Level: ${flareRiskLevel}`, 20, 200);
  
  // Clinical Interpretation
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Clinical Interpretation', 20, 225);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  let yPosition = 240;
  
  // SLE Diagnosis Interpretation
  const sleInterpretation = result.sle_diagnosis === 1 
    ? `The AI model predicts a positive SLE diagnosis with ${sleConfidence}% confidence. This suggests the presence of SLE markers warranting further clinical evaluation and confirmation through additional diagnostic procedures.`
    : `The AI model predicts a negative SLE diagnosis with ${sleConfidence}% confidence. This indicates a lower probability of SLE based on current clinical indicators, though clinical correlation is advised.`;
  
  const sleLines = pdf.splitTextToSize(sleInterpretation, pageWidth - 40);
  pdf.text(sleLines, 20, yPosition);
  yPosition += sleLines.length * 5 + 10;
  
  // Flare Risk Interpretation
  const flareInterpretation = result.flare_12m === 1
    ? `The model indicates a high risk of SLE flare within the next 12 months with ${flareConfidence}% confidence. Close monitoring and preventive measures are strongly recommended.`
    : `The model suggests a lower risk of SLE flare in the next 12 months with ${flareConfidence}% confidence. Current indicators suggest stable disease management.`;
  
  const flareLines = pdf.splitTextToSize(flareInterpretation, pageWidth - 40);
  pdf.text(flareLines, 20, yPosition);
  yPosition += flareLines.length * 5 + 15;
  
  // Treatment Recommendations
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Primary Treatment Recommendations', 20, yPosition);
  yPosition += 15;
  
  // Determine treatment based on risk levels
  const overallRisk = Math.max(result.sle_probability, result.flare_probability);
  let treatmentLevel = '';
  let treatments: string[] = [];
  
  if (overallRisk >= 0.7) {
    treatmentLevel = 'High Risk - Immediate Intervention Required';
    treatments = [
      '• Corticosteroids (Prednisone 10-40mg daily)',
      '• Immunosuppressive therapy (Methotrexate/Azathioprine)',
      '• Antimalarial drugs (Hydroxychloroquine 200-400mg daily)',
      '• Regular specialist monitoring (monthly visits)',
      '• Lifestyle modifications and stress management'
    ];
  } else if (overallRisk >= 0.4) {
    treatmentLevel = 'Moderate Risk - Active Monitoring Protocol';
    treatments = [
      '• Antimalarial drugs (Hydroxychloroquine 200mg daily)',
      '• Low-dose corticosteroids if symptoms worsen',
      '• NSAIDs for joint symptoms (as needed)',
      '• Regular monitoring (bi-monthly specialist visits)',
      '• Lifestyle counseling and sun protection measures'
    ];
  } else {
    treatmentLevel = 'Low Risk - Preventive Care Approach';
    treatments = [
      '• Regular health checkups (quarterly visits)',
      '• Lifestyle modifications and regular exercise',
      '• Sun protection and stress management techniques',
      '• Monitoring for early symptom development',
      '• Patient education and support group referrals'
    ];
  }
  
  pdf.setFillColor(245, 245, 245);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 15, 'F');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(treatmentLevel, 20, yPosition + 5);
  yPosition += 20;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  treatments.forEach(treatment => {
    pdf.text(treatment, 20, yPosition);
    yPosition += 8;
  });
  
  yPosition += 10;
  
  // Additional Clinical Recommendations
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Additional Clinical Considerations', 20, yPosition);
  yPosition += 12;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const clinicalRecs = [
    '• Correlation with clinical findings and additional laboratory tests is essential',
    '• Consider rheumatologist consultation for definitive diagnosis confirmation',
    '• Monitor for drug interactions and adverse effects during treatment',
    '• Regular assessment of disease activity using validated scoring systems',
    '• Coordinate care with other specialists as needed (nephrology, cardiology)'
  ];
  
  clinicalRecs.forEach(rec => {
    pdf.text(rec, 20, yPosition);
    yPosition += 8;
  });
  
  // Footer
  pdf.setFillColor(67, 56, 202);
  pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('SLE Predictor - Advanced AI for Medical Diagnosis and Prediction', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Doctor Notes Section (if provided)
  if (result.doctor_notes) {
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Clinical Notes', 20, yPosition);
    yPosition += 12;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const notesLines = pdf.splitTextToSize(result.doctor_notes, pageWidth - 40);
    pdf.text(notesLines, 20, yPosition);
    yPosition += notesLines.length * 5 + 15;
  }

  // Disclaimer
  if (yPosition > pageHeight - 80) {
    pdf.addPage();
    yPosition = 30;
  }
  
  yPosition += 10;
  pdf.setTextColor(128, 128, 128);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'italic');
  const disclaimer = 'DISCLAIMER: This AI-generated report is for educational and clinical decision support purposes only. It should not replace professional medical judgment or definitive diagnostic procedures. Always consult with qualified healthcare professionals for final diagnosis and treatment decisions. Treatment recommendations are based on AI analysis and should be validated by licensed medical professionals.';
  const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 40);
  pdf.text(disclaimerLines, 20, yPosition);
  
  return pdf;
};