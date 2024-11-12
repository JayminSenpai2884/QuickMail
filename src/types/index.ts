export type Template = {
  id: string;
  name: string;
  category: TemplateCategory;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TemplateCategory = 'newsletter' | 'promotional' | 'event' | 'transactional';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'light' | 'dark';

export type ToneType = 'formal' | 'casual' | 'friendly' | 'professional' | 'humorous' | 'empathetic';
export type LengthType = 'brief' | 'medium' | 'detailed';
export type IndustryType = 'technology' | 'retail' | 'healthcare' | 'education' | 'finance' | 'other';

export type EmailConfig = {
  subject: string;
  senderName: string;
  recipientName: string;
  tone: ToneType;
  length: LengthType;
  message: string;
  industry: IndustryType;
  includeSignature: boolean;
  includeCTA: boolean;
  ctaText?: string;
  signature?: string;
};

export type EditorElement = {
  id: string;
  type: 'text' | 'image' | 'button' | 'spacer' | 'divider';
  content: string;
  styles: Record<string, string>;
};