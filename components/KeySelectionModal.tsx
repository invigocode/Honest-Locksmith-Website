import React from 'react';
import { Button } from './Button';
import { Key } from 'lucide-react';

interface KeySelectionModalProps {
  onSelect: () => void;
  isOpen: boolean;
}

export const KeySelectionModal: React.FC<KeySelectionModalProps> = ({ onSelect, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-brand-green border border-brand-gold rounded-xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center space-y-6 relative overflow-hidden">
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-gold/30 rounded-tl-xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-gold/30 rounded-br-xl"></div>

        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="w-8 h-8 text-brand-gold" />
        </div>

        <h3 className="text-2xl font-serif text-brand-gold">Access Required</h3>
        
        <p className="text-gray-300 leading-relaxed">
          To generate high-definition 4K logos using <span className="text-brand-gold font-bold">Nano Banana Pro</span>, please select your API key.
        </p>

        <div className="bg-black/30 p-4 rounded text-xs text-left text-gray-400 mb-4">
          <p className="mb-2"><strong>Note:</strong> This feature uses the premium Gemini 3 Pro Image Preview model.</p>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-brand-gold underline hover:text-white transition-colors">View Billing Documentation</a>
        </div>

        <Button onClick={onSelect} className="w-full">
          Select API Key
        </Button>
      </div>
    </div>
  );
};