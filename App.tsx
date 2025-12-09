import React, { useState, useEffect } from 'react';
import { LogoGenerator } from './components/LogoGenerator';
import { KeySelectionModal } from './components/KeySelectionModal';
import { checkApiKey, selectApiKey } from './services/geminiService';
import { Shield, Key, Menu, X } from 'lucide-react';

// Declaration for window.aistudio
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<boolean>;
    };
  }
}

const App: React.FC = () => {
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial check
    checkApiKey().then((hasKey) => {
      setApiKeyReady(hasKey);
    });
  }, []);

  const handleKeySelection = async () => {
    const success = await selectApiKey();
    if (success) {
      setApiKeyReady(true);
      setShowKeyModal(false);
    }
  };

  const requireKey = () => {
    setShowKeyModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-green to-brand-dark text-gray-100 flex flex-col">
      <header className="border-b border-brand-gold/20 bg-brand-green/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-brand-gold flex items-center justify-center transform rotate-45">
                 <Key className="w-5 h-5 text-brand-gold transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] text-brand-gold font-bold">HONEST</span>
                <span className="font-sans text-[0.6rem] tracking-[0.4em] text-brand-gold/70 uppercase">Locksmiths</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-12">
              <a href="#" className="text-sm uppercase tracking-widest text-brand-gold hover:text-white transition-colors">Services</a>
              <a href="#" className="text-sm uppercase tracking-widest text-brand-gold hover:text-white transition-colors">About</a>
              <a href="#" className="text-sm uppercase tracking-widest text-brand-gold hover:text-white transition-colors">Security</a>
              <a href="#" className="text-sm uppercase tracking-widest text-brand-gold font-bold border-b border-brand-gold pb-1">Design Studio</a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-gold p-2">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-green border-b border-brand-gold/20">
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-base font-medium text-brand-gold hover:bg-brand-gold/10 rounded">Services</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-brand-gold hover:bg-brand-gold/10 rounded">Design Studio</a>
             </div>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center relative">
         {/* Background pattern */}
         <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', 
                backgroundSize: '30px 30px'
              }}>
         </div>

        <section className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
             <h1 className="text-4xl md:text-6xl font-serif text-white font-light">
               The Standard of <span className="text-brand-gold font-normal">Excellence</span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg text-gray-300 font-light tracking-wide">
               Redefining security with aesthetics. Experience the fusion of uncompromising safety and luxurious design.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12 mb-16">
            <div className="bg-brand-dark/50 p-6 border border-brand-gold/10 rounded-lg hover:border-brand-gold/40 transition-colors">
              <Shield className="w-8 h-8 text-brand-gold mx-auto mb-4" />
              <h3 className="font-serif text-lg text-brand-gold mb-2">Premium Security</h3>
              <p className="text-sm text-gray-400">State-of-the-art protection for high-value assets.</p>
            </div>
            <div className="bg-brand-dark/50 p-6 border border-brand-gold/10 rounded-lg hover:border-brand-gold/40 transition-colors">
              <Key className="w-8 h-8 text-brand-gold mx-auto mb-4" />
              <h3 className="font-serif text-lg text-brand-gold mb-2">Master Keying</h3>
              <p className="text-sm text-gray-400">Custom tailored access control hierarchies.</p>
            </div>
             <div className="bg-brand-dark/50 p-6 border border-brand-gold/10 rounded-lg hover:border-brand-gold/40 transition-colors">
              <Sparkles className="w-8 h-8 text-brand-gold mx-auto mb-4" />
              <h3 className="font-serif text-lg text-brand-gold mb-2">Brand Identity</h3>
              <p className="text-sm text-gray-400">Bespoke logo generation for franchise partners.</p>
            </div>
          </div>

          <div id="generator" className="w-full">
            <LogoGenerator onRequireKey={requireKey} />
          </div>
        </section>
      </main>

      <footer className="bg-brand-dark border-t border-brand-gold/10 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-gold/40 text-sm font-serif">© 2024 Honest Locksmiths. All rights reserved.</p>
        </div>
      </footer>

      <KeySelectionModal isOpen={showKeyModal} onSelect={handleKeySelection} />
    </div>
  );
};

export default App;