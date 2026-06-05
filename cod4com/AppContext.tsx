
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PageType = 'home' | 'despre' | 'proiecte' | 'voluntariat' | 'doneaza' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'blog' | 'galerie';
export type LangType = 'ro' | 'en';

interface NavigationContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
}

interface LanguageContextType {
  lang: LangType;
  setLang: (l: LangType) => void;
  t: (key: string) => string;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigation must be used within a NavigationProvider");
  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

export const translations: Record<LangType, Record<string, string>> = {
  ro: {
    'nav.home': 'Acasă',
    'nav.about': 'Despre',
    'nav.projects': 'Proiecte',
    'nav.gallery': 'Galerie',
    'nav.volunteer': 'Voluntariat',
    'nav.donate': 'Donează',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.support': 'Susține-ne',
    'nav.lang': 'EN',
    'nav.lang.mobile': 'English Language',
    'footer.mission': 'Susținem comunitatea prin educație digitală, promovarea limbii române și sprijinirea grupurilor vulnerabile prin tehnologie.',
    'footer.quicklinks': 'Navigare Rapidă',
    'footer.pillars': 'Piloni Principali',
    'footer.pillar1': 'Digitalizare ONG & Sector Public',
    'footer.pillar2': 'Cursuri Educaționale: Limba & Literatura Română',
    'footer.pillar3': 'Antirasism & Egalitate de Gen',
    'footer.pillar4': 'Software Gratuit pentru Comunitate',
    'footer.legal': 'Informații Juridice',
    'footer.contact': 'Date de Contact',
    'footer.address': 'Blocul Fetelor, Etajul 2, Biroul 37, Reșița',
    'a11y.title': 'Accesibilitate',
    'a11y.reset': 'Resetează Toate Setările',
    'a11y.lang': 'Limba site-ului',
    'a11y.widgetsize': 'Mărire widget',
    'a11y.contrast': 'Contrast +',
    'a11y.links': 'Evidențiere link-uri',
    'a11y.textsize': 'Text mai mare',
    'a11y.spacing': 'Spațiere între litere',
    'a11y.anim': 'Oprire animații',
    'a11y.images': 'Ascundere Imagini',
    'a11y.dyslexia': 'Font pentru dislexie',
    'a11y.cursor': 'Dimensiune cursor',
    'a11y.tooltips': 'Texte explicative',
    'a11y.lineheight': 'Spațiere între rânduri',
    'a11y.footer.created': 'Accesibilitate creată de Asociația Cod pentru Comunitate',
    'cookie.title': 'Politica de Cookies',
    'cookie.text': 'Folosim cookies pentru a vă îmbunătăți experiența pe site. Continuând navigarea, sunteți de acord cu utilizarea acestora.',
    'cookie.btn': 'Acceptă Cookies',
    'cookie.reject': 'Doar cele esențiale',
    'assoc.name': 'Asociația Cod pentru Comunitate'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.gallery': 'Gallery',
    'nav.volunteer': 'Volunteer',
    'nav.donate': 'Donate',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'nav.support': 'Support Us',
    'nav.lang': 'RO',
    'nav.lang.mobile': 'Limba Română',
    'footer.mission': 'Empowering the community through digital education, Romanian language promotion, and supporting vulnerable groups through tech.',
    'footer.quicklinks': 'Quick Links',
    'footer.pillars': 'Main Pillars',
    'footer.pillar1': 'NGO & Public Sector Digitalization',
    'footer.pillar2': 'Educational Courses: Romanian Language & Literature',
    'footer.pillar3': 'Anti-racism & Gender Equality',
    'footer.pillar4': 'Free Software for the Community',
    'footer.legal': 'Legal Information',
    'footer.contact': 'Contact Details',
    'footer.address': 'Blocul Fetelor, 2nd Floor, Office 37, Reșița',
    'a11y.title': 'Accessibility',
    'a11y.reset': 'Reset All Settings',
    'a11y.lang': 'Site Language',
    'a11y.widgetsize': 'Widget Size',
    'a11y.contrast': 'Contrast +',
    'a11y.links': 'Highlight Links',
    'a11y.textsize': 'Bigger Text',
    'a11y.spacing': 'Letter Spacing',
    'a11y.anim': 'Stop Animations',
    'a11y.images': 'Hide Images',
    'a11y.dyslexia': 'Dyslexia Font',
    'a11y.cursor': 'Cursor Size',
    'a11y.tooltips': 'Explainers',
    'a11y.lineheight': 'Line Spacing',
    'a11y.footer.created': 'Accessibility created by Code for Community Association',
    'cookie.title': 'Cookie Policy',
    'cookie.text': 'We use cookies to improve your experience. By continuing to browse, you agree to our use of cookies.',
    'cookie.btn': 'Accept Cookies',
    'cookie.reject': 'Essential Only',
    'assoc.name': 'Code for Community Association'
  }
};

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}>
    <img
      src="/logo.png"
      alt="Asociația Cod pentru Comunitate Logo"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.src = "https://placehold.co/400x400/fdfbf7/5d3a1a?text=Cod+Comunitate";
      }}
    />
  </div>
);

export const Brand: React.FC<{ className?: string; isFooter?: boolean }> = ({ className, isFooter }) => {
  const { lang } = useLanguage();
  const textColorClass = isFooter ? 'text-white' : 'text-brand-primary';
  const subColorClass = isFooter ? 'text-white/60' : 'text-brand-primary/60';

  return (
    <div className={`flex items-center group a11y-exempt ${className}`}>
      <Logo className="w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-105" />
      <div className={`ml-3 flex flex-col justify-center border-l border-current/10 pl-3 ${textColorClass}`}>
        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 opacity-70`}>
          {lang === 'ro' ? 'Asociația' : 'Association'}
        </span>
        <span className="text-xs md:text-sm font-bold leading-none font-serif italic mb-0.5">
          {lang === 'ro' ? 'Cod pentru' : 'Code for'}
        </span>
        <span className={`text-base md:text-lg font-bold ${isFooter ? 'text-brand-gold' : 'text-brand-secondary'} font-serif italic leading-none`}>
          {lang === 'ro' ? 'Comunitate' : 'Community'}
        </span>
      </div>
    </div>
  );
};

export const NavLink: React.FC<{ to: PageType; children: ReactNode; className?: string; onClick?: () => void }> = ({ to, children, className, onClick }) => {
  const { navigateTo, currentPage } = useNavigation();
  const isActive = currentPage === to;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to);
    if (onClick) onClick();
    window.scrollTo(0, 0);
  };
  return (
    <a href="javascript:void(0)" onClick={handleClick} className={`${className} ${isActive ? 'font-bold' : ''}`}>
      {children}
    </a>
  );
};
