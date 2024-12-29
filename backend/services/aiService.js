const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

const genAI = new GoogleGenerativeAI(config.googleApiKey);

const generateMCQs = async (text, numQuestions) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
  
  const prompt = `Generate ${numQuestions} multiple choice questions from the following text. Format each question as follows:
  Question: [question text]
  A) [option]
  B) [option]
  C) [option]
  D) [option]
  Correct Answer: [letter]
  
  Text: ${text},
  The questions should use the same language as the text,
  no "Here are # multiple-choice questions based on the provided text:"
  no "**Question #:**"
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text());
  return response.text();
};

module.exports = {
  generateMCQs
};