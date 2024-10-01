exports.getBreastCancerAssessmentResult = (questionnaire) => {
  const highRisk = [];
  const lowRisk = [];

  const questionRiskMapping = {
    age: 'high',
    have_relative: 'high',
    unusual_change: 'high',
    undergone_test: 'low',
    have_lump: 'high',
    early_mens: 'low',
    used_HRT: 'high',
    nipples_discharge: 'high',
    overweight: 'low',
    freq_excercise: 'low',
  };

  const questionsData = Object.entries(questionnaire);

  for (let i = 0; i < questionsData.length; i++) {
    const [question, answer] = questionsData[i];
    const riskLevel = questionRiskMapping[question];

    if (answer === 'yes') {
      if (riskLevel === 'high') {
        highRisk.push(answer);
      } else {
        lowRisk.push(answer);
      }
    } else {
      lowRisk.push(answer);
    }
  }
  // determine resilt
  const totalQuestions = highRisk.length + lowRisk.length;
  const highRiskThreshold = totalQuestions * 0.6;

  let assessmentResult = 'AVERAGE';
  if (highRisk.length >= highRiskThreshold) {
    assessmentResult = 'HIGH';
  } else if (lowRisk.length >= highRiskThreshold) {
    assessmentResult = 'LOW';
  }

  return assessmentResult;
};
