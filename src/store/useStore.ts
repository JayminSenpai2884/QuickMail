import { create } from 'zustand';
import { DeviceType, ThemeMode, Template, EmailConfig, EditorElement } from '../types';
import { generateEmailContent } from '../services/gemini';

interface EditorStore {
  elements: EditorElement[];
  selectedElement: string | null;
  devicePreview: DeviceType;
  themeMode: ThemeMode;
  templates: Template[];
  currentTemplate: Template | null;
  emailConfig: EmailConfig;
  isGenerating: boolean;
  error: string | null;
  trialCount: number;
  hasWatchedAd: boolean;
  adsLeft: number;
  incrementTrial: () => void;
  resetTrial: () => void;
  setHasWatchedAd: (watched: boolean) => void;
  decrementAdsLeft: () => void;
  setElements: (elements: EditorElement[]) => void;
  setSelectedElement: (id: string | null) => void;
  setDevicePreview: (device: DeviceType) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setEmailConfig: (config: Partial<EmailConfig>) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  generateTemplate: () => Promise<void>;
}

const defaultEmailConfig: EmailConfig = {
  subject: '',
  senderName: '',
  recipientName: '',
  tone: 'formal',
  length: 'medium',
  message: '',
  industry: 'technology',
  includeSignature: true,
  includeCTA: true,
  ctaText: 'Learn More',
  signature: 'Best regards,\n{senderName}'
};

export const useStore = create<EditorStore>((set, get) => ({
  elements: [],
  selectedElement: null,
  devicePreview: 'desktop',
  themeMode: 'dark',
  templates: [],
  currentTemplate: null,
  emailConfig: defaultEmailConfig,
  isGenerating: false,
  error: null,
  trialCount: 0,
  hasWatchedAd: false,
  adsLeft: 1,

  incrementTrial: () => set((state) => ({ trialCount: state.trialCount + 1 })),
  resetTrial: () => set({ trialCount: 0 }),
  setHasWatchedAd: (watched) => set({ hasWatchedAd: watched }),
  decrementAdsLeft: () => set((state) => ({ adsLeft: state.adsLeft - 1 })),

  setElements: (elements) => set({ elements }),
  setSelectedElement: (id) => set({ selectedElement: id }),
  setDevicePreview: (device) => set({ devicePreview: device }),
  setThemeMode: (mode) => set({ themeMode: mode }),
  setEmailConfig: (config) => set((state) => ({
    emailConfig: { ...state.emailConfig, ...config }
  })),
  setIsGenerating: (isGenerating) => set({ isGenerating }),

  generateTemplate: async () => {
    const { emailConfig } = get();
    set({ isGenerating: true, error: null });

    try {
      const prompt = `Write a professional email with the following specifications:
        - From: ${emailConfig.senderName}
        - To: ${emailConfig.recipientName}
        - Subject: ${emailConfig.subject}
        - Main Message: ${emailConfig.message}
        - Length: ${emailConfig.length}
        - Tone: ${emailConfig.tone}
        ${emailConfig.includeCTA ? `- Include a call to action: ${emailConfig.ctaText}` : ''}
        ${emailConfig.includeSignature ? `- Include a signature: ${emailConfig.signature ? emailConfig.signature.replace('{senderName}', emailConfig.senderName) : ''}` : ''}
        
        Format the email professionally and include appropriate greetings and closings. Make sure the tone matches the specified style (${emailConfig.tone}).`;

      const generatedContent = await generateEmailContent(prompt);

      const emailContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color: #333;">${emailConfig.subject}</h2>
          <p><strong>From:</strong> ${emailConfig.senderName}</p>
          <p><strong>To:</strong> ${emailConfig.recipientName}</p>
          <div style="margin: 20px 0;">
            ${generatedContent.split('\n').map(paragraph => `<p>${paragraph.trim()}</p>`).join('')}
          </div>
          <footer style="margin-top: 20px; font-size: 0.9em; color: #777;">
            ${emailConfig.includeSignature && emailConfig.signature && !generatedContent.includes(emailConfig.signature.replace('{senderName}', emailConfig.senderName)) ? emailConfig.signature.replace('{senderName}', emailConfig.senderName) : ''}
          </footer>
        </div>
      `;

      set((state) => ({
        elements: [...state.elements, {
          id: Date.now().toString(),
          type: 'text',
          content: emailContent,
          styles: {}
        }],
        isGenerating: false,
        error: null
      }));
    } catch (error) {
      set({ 
        isGenerating: false, 
        error: 'Failed to generate email content. Please try again.' 
      });
    }
  }
}));