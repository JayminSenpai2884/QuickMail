import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ToneType, LengthType } from '../../types';
import { Settings, Wand2, Loader } from 'lucide-react';

const tones: ToneType[] = ['formal', 'casual', 'friendly', 'professional', 'humorous', 'empathetic'];
const lengths: LengthType[] = ['brief', 'medium', 'detailed'];

export const EmailConfig: React.FC = () => {
  const { emailConfig, setEmailConfig, generateTemplate, isGenerating, error } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTemplate = async () => {
    setIsLoading(true);
    await generateTemplate();
    setIsLoading(false);
  };

  return (
    <div className="glass-effect rounded-lg preview-shadow animate-fade">
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Email Configuration
          </h2>
        </div>

        <div className="space-y-4">
          <div className="animate-fade">
            <label className="block text-sm font-medium mb-1">Sender Name</label>
            <input
              type="text"
              value={emailConfig.senderName}
              onChange={(e) => setEmailConfig({ senderName: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all hover:bg-white dark:hover:bg-gray-700"
              placeholder="Your name"
              title="Enter the name of the sender"
            />
          </div>

          <div className="animate-fade">
            <label className="block text-sm font-medium mb-1">Recipient Name</label>
            <input
              type="text"
              value={emailConfig.recipientName}
              onChange={(e) => setEmailConfig({ recipientName: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Recipient's name"
            />
          </div>

          <div className="animate-fade">
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={emailConfig.subject}
              onChange={(e) => setEmailConfig({ subject: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Email subject"
            />
          </div>

          <div className="animate-fade">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={emailConfig.message}
              onChange={(e) => setEmailConfig({ message: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
              rows={3}
              placeholder="Main message or purpose"
            />
          </div>

          <div className="animate-fade">
            <label className="block text-sm font-medium mb-1">Length</label>
            <select
              value={emailConfig.length}
              onChange={(e) => setEmailConfig({ length: e.target.value as LengthType })}
              className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {lengths.map((length) => (
                <option key={length} value={length}>
                  {length.charAt(0).toUpperCase() + length.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="animate-fade">
            <label className="block text-sm font-medium mb-1">Tone</label>
            <select
              value={emailConfig.tone}
              onChange={(e) => setEmailConfig({ tone: e.target.value as ToneType })}
              className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {tones.map((tone) => (
                <option key={tone} value={tone}>
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4 animate-fade">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={emailConfig.includeCTA}
                onChange={(e) => setEmailConfig({ includeCTA: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
              />
              <span className="text-sm">Include CTA</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={emailConfig.includeSignature}
                onChange={(e) => setEmailConfig({ includeSignature: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all"
              />
              <span className="text-sm">Include Signature</span>
            </label>
          </div>

          {emailConfig.includeCTA && (
            <div className="animate-fade">
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={emailConfig.ctaText}
                onChange={(e) => setEmailConfig({ ctaText: e.target.value })}
                className="w-full px-3 py-2 rounded-md bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter CTA text"
              />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm animate-fade">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerateTemplate}
            disabled={isGenerating || isLoading || !emailConfig.senderName || !emailConfig.recipientName || !emailConfig.subject || !emailConfig.message}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md disabled:opacity-50 transition-all duration-300 animate-fade"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            <span>{isGenerating ? 'Generating...' : 'Generate Template'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};