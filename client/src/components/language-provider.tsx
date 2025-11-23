import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'LabourConnect',
    'app.tagline': 'Find certified local labour and technicians across India',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.dashboard': 'Dashboard',
    'nav.wallet': 'Wallet',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.phone': 'Phone Number',
    'auth.otp': 'Enter OTP',
    'auth.verify': 'Verify',
    'auth.resend': 'Resend OTP',
    'role.customer': 'Customer',
    'role.technician': 'Technician',
    'search.placeholder': 'Enter PIN code or city...',
    'search.category': 'Select Service Category',
    'search.find': 'Find',
    'wallet.balance': 'Wallet Balance',
    'wallet.recharge': 'Recharge',
    'wallet.transactions': 'Transaction History',
    'job.post': 'Post Job',
    'job.title': 'Job Title',
    'job.description': 'Description',
    'job.budget': 'Budget',
    'job.location': 'Location',
    'job.category': 'Category',
    'job.bids': 'Bids',
    'technician.available': 'Available Technicians',
    'technician.rating': 'Rating',
    'technician.experience': 'Experience',
    'technician.skills': 'Skills',
    'technician.location': 'Location',
    'bid.place': 'Place Bid',
    'bid.amount': 'Bid Amount',
    'chat.unlock': 'Unlock Contact',
    'chat.unlockCost': 'Unlock for ₹10',
    'voice.search': 'Voice Search',
  },
  hi: {
    'app.name': 'लेबरकनेक्ट',
    'app.tagline': 'पूरे भारत में प्रमाणित स्थानीय श्रमिक और तकनीशियन खोजें',
    'nav.home': 'होम',
    'nav.services': 'सेवाएँ',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.wallet': 'वॉलेट',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.logout': 'लॉगआउट',
    'auth.phone': 'फोन नंबर',
    'auth.otp': 'OTP दर्ज करें',
    'auth.verify': 'सत्यापित करें',
    'auth.resend': 'OTP फिर से भेजें',
    'role.customer': 'ग्राहक',
    'role.technician': 'तकनीशियन',
    'search.placeholder': 'PIN कोड या शहर दर्ज करें...',
    'search.category': 'सेवा श्रेणी चुनें',
    'search.find': 'खोजें',
    'wallet.balance': 'वॉलेट बैलेंस',
    'wallet.recharge': 'रिचार्ज',
    'wallet.transactions': 'लेनदेन इतिहास',
    'job.post': 'काम पोस्ट करें',
    'job.title': 'काम का शीर्षक',
    'job.description': 'विवरण',
    'job.budget': 'बजट',
    'job.location': 'स्थान',
    'job.category': 'श्रेणी',
    'job.bids': 'बोलियाँ',
    'technician.available': 'उपलब्ध तकनीशियन',
    'technician.rating': 'रेटिंग',
    'technician.experience': 'अनुभव',
    'technician.skills': 'कौशल',
    'technician.location': 'स्थान',
    'bid.place': 'बोली लगाएं',
    'bid.amount': 'बोली राशि',
    'chat.unlock': 'संपर्क अनलॉक करें',
    'chat.unlockCost': '₹10 में अनलॉक करें',
    'voice.search': 'वॉइस सर्च',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
