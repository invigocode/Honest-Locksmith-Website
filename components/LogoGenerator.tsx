import React, { useState, useCallback } from 'react';
import { generateLogo } from '../services/geminiService';
import { Button } from './Button';
import { ImageResolution, GeneratedImage } from '../types';
import { Download, Sparkles, AlertCircle, Wand2 } from 'lucide-react';

interface LogoGeneratorProps {
  onRequireKey: () => void;
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({ onRequireKey }) => {
  const [prompt, setPrompt] = useState('Minimalist high-end locksmith logo, golden key symbol, deep emerald green background, elegant serif typography, luxury branding, photorealistic 8k render, cinematic lighting');
  const [resolution, setResolution] = useState<ImageResolution>('1K');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const imageData = await generateLogo(prompt, resolution);
      setGeneratedImage(imageData);
    } catch (err: any) {
      if (err.message && (err.message.includes("API Key") || err.message.includes("403"))) {
        onRequireKey();
      } else {
        setError("Failed to generate logo. Please try again. " + (err.message || ''));
      }
    } finally {
      setLoading(false);
    }
  }, [prompt, resolution, onRequireKey]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-brand-dark/50 border border-brand-gold/20 rounded-xl backdrop-blur-sm relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8 border-b border-brand-gold/20 pb-4">
          <Wand2 className="w-6 h-6 text-brand-gold" />
          <h2 className="text-2xl font-serif text-brand-gold tracking-wider">Logo Invigoration Studio</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-brand-gold text-sm uppercase tracking-widest font-bold">Concept Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-brand-green border border-brand-gold/30 rounded-lg p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all resize-none font-sans"
                placeholder="Describe your logo vision..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-brand-gold text-sm uppercase tracking-widest font-bold">Resolution</label>
              <div className="grid grid-cols-3 gap-3">
                {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`py-3 px-4 border rounded-lg transition-all duration-300 font-serif ${
                      resolution === res
                        ? 'bg-brand-gold text-brand-green border-brand-gold font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                        : 'bg-transparent text-gray-400 border-brand-gold/30 hover:border-brand-gold hover:text-brand-gold'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleGenerate} isLoading={loading} className="w-full text-lg">
                <Sparkles className="w-5 h-5" />
                Generate Design
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="flex flex-col h-full min-h-[400px]">
            <label className="block text-brand-gold text-sm uppercase tracking-widest font-bold mb-2">Visual Output</label>
            <div className="flex-1 bg-black/40 border border-brand-gold/30 rounded-lg flex items-center justify-center relative group overflow-hidden">
              {generatedImage ? (
                <>
                  <img src={generatedImage} alt="Generated Logo" className="max-w-full max-h-full object-contain p-4 shadow-2xl" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a 
                      href={generatedImage} 
                      download={`honest-locksmiths-logo-${Date.now()}.png`}
                      className="px-6 py-3 bg-brand-gold text-brand-green font-bold uppercase tracking-wider rounded hover:bg-white transition-colors flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 p-8">
                  <div className="w-20 h-20 border-2 border-dashed border-brand-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-brand-gold/20" />
                  </div>
                  <p className="font-serif italic">Your high-fidelity design will appear here.</p>
                </div>
              )}
            </div>
            {generatedImage && (
              <p className="text-center text-xs text-brand-gold/60 mt-2 font-mono uppercase">
                Generated with Gemini 3 Pro • {resolution}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};