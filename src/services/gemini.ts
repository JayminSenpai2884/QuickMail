import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBg1z38VdK6ETY89EXhZ-bmzdxqt1dC15Q');

export async function generateEmailContent(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Ensure the response is wrapped in proper HTML
    return `<div class="email-content">${text}</div>`;
  } catch (error) {
    console.error('Error generating email content:', error);
    throw new Error('Failed to generate email content. Please try again.');
  }
}