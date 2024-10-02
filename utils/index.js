exports.riskAssessmentResultAlgorithsm = (questionnaire, questionRiskMapping) => {
  const highRisk = [];
  const lowRisk = [];

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
  // console.log(assessmentResult);
  return assessmentResult;
};
