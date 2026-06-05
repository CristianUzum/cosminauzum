
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Heart, Facebook, Instagram, Linkedin, 
  Accessibility, Sun, Type, Link as LinkIcon, RotateCcw, 
  MousePointer2, ImageOff, AlignLeft, Info, 
  ArrowLeftRight, CircleStop, Languages, Globe,
  Mail, Phone, MapPin
} from 'lucide-react';

import { 
  NavigationContext, LanguageContext, PageType, LangType, 
  translations, useLanguage, useNavigation, Logo, NavLink, Brand 
} from './AppContext';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';

const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeWidget, setIsLargeWidget] = useState(false);
  const { lang, setLang, t } = useLanguage();
  
  const [contrastLevel, setContrastLevel] = useState(0);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [cursorSizeLevel, setCursorSizeLevel] = useState(0);
  const [tooltips, setTooltips] = useState(false);
  const [lineHeight, setLineHeight] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    
    // Toggle Classes
    if (contrastLevel > 0) html.classList.add('high-contrast'); else html.classList.remove('high-contrast');
    if (underlineLinks) html.classList.add('underline-links'); else html.classList.remove('underline-links');
    if (letterSpacing) html.classList.add('extra-letter-spacing'); else html.classList.remove('extra-letter-spacing');
    if (stopAnimations) html.classList.add('stop-animations'); else html.classList.remove('stop-animations');
    if (hideImages) html.classList.add('hide-images'); else html.classList.remove('hide-images');
    if (dyslexicFont) html.classList.add('dyslexic-font'); else html.classList.remove('dyslexic-font');
    if (cursorSizeLevel > 0) html.classList.add('large-cursor'); else html.classList.remove('large-cursor');
    if (lineHeight) html.classList.add('extra-line-height'); else html.classList.remove('extra-line-height');
    
    // Font Size Logic
    const fontSizes = ['100%', '115%', '130%'];
    html.style.fontSize = fontSizes[fontSizeLevel];
    
  }, [contrastLevel, underlineLinks, fontSizeLevel, letterSpacing, stopAnimations, hideImages, dyslexicFont, cursorSizeLevel, tooltips, lineHeight]);

  const resetAll = () => {
    setContrastLevel(0);
    setUnderlineLinks(false);
    setFontSizeLevel(0);
    setLetterSpacing(false);
    setStopAnimations(false);
    setHideImages(false);
    setDyslexicFont(false);
    setCursorSizeLevel(0);
    setTooltips(false);
    setLineHeight(false);
    setIsLargeWidget(false);
  };

  // Texte explicative pentru fiecare buton
  const getTooltip = (key: string) => {
    const tooltipsData: Record<string, string> = {
      'a11y.contrast': lang === 'ro' ? 'Inversarea culorilor pentru vizibilitate.' : 'Invert colors for better visibility.',
      'a11y.links': lang === 'ro' ? 'Subliniază toate linkurile din pagină.' : 'Underlines all links on the page.',
      'a11y.textsize': lang === 'ro' ? 'Mărește textul în 3 trepte.' : 'Increases text size in 3 steps.',
      'a11y.spacing': lang === 'ro' ? 'Adaugă spațiu între caractere.' : 'Adds space between characters.',
      'a11y.anim': lang === 'ro' ? 'Oprește toate elementele în mișcare.' : 'Stops all moving elements.',
      'a11y.images': lang === 'ro' ? 'Ascunde pozele pentru a reduce zgomotul vizual.' : 'Hides images to reduce visual noise.',
      'a11y.dyslexia': lang === 'ro' ? 'Font special care ajută la citire.' : 'Special font that helps reading.',
      'a11y.cursor': lang === 'ro' ? 'Face cursorul mouse-ului mult mai mare.' : 'Makes the mouse cursor much larger.',
      'a11y.tooltips': lang === 'ro' ? 'Afișează aceste descrieri de ajutor.' : 'Shows these help descriptions.',
      'a11y.lineheight': lang === 'ro' ? 'Mărește distanța între rândurile de text.' : 'Increases space between lines of text.',
      'a11y.lang': lang === 'ro' ? 'Schimbă limba întregului site.' : 'Changes the entire site language.'
    };
    return tooltipsData[key] || "";
  };

  const Tile: React.FC<{ 
    label: string; 
    icon: React.ReactNode; 
    active: boolean; 
    onClick: () => void; 
    progress?: number; 
    customSub?: string;
    tooltipKey: string;
  }> = ({ label, icon, active, onClick, progress, customSub, tooltipKey }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }} 
      className={`a11y-tile group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${active ? 'a11y-tile-active' : ''} ${isLargeWidget ? 'sm:min-h-[140px]' : 'sm:h-[120px]'}`}
      aria-pressed={active}
    >
      <div className={`mb-2 transition-colors ${active ? 'text-brand-uway' : 'text-slate-600 group-hover:text-brand-uway'}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: isLargeWidget ? 32 : 28 })}
      </div>
      <span className={`font-bold text-slate-800 leading-tight uppercase tracking-tight text-center ${isLargeWidget ? 'text-[12px]' : 'text-[10px]'}`}>
        {label} {customSub && <span className="text-brand-uway ml-1">({customSub})</span>}
      </span>
      
      {/* TEXT EXPLICATIV (Tooltip) */}
      {tooltips && (
        <span className="text-[9px] text-brand-uway/70 font-medium leading-tight mt-1 animate-pulse">
          {getTooltip(tooltipKey)}
        </span>
      )}

      {progress !== undefined && (
        <div className="progress-bar-container flex gap-1 w-full mt-2 px-2">
          {[1, 2, 3].map(step => (
            <div key={step} className={`progress-bar-segment ${progress >= step ? 'progress-bar-active' : ''}`}></div>
          ))}
        </div>
      )}
    </button>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[9999] a11y-exempt">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="a11y-trigger bg-brand-uway text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all border-4 border-white flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16"
        aria-label={t('a11y.title')}
      >
        {isOpen ? <X size={28} /> : <Accessibility size={32} />}
      </button>
      
      {isOpen && (
        <div 
          className={`animate-uway absolute bottom-16 sm:bottom-20 right-0 w-[85vw] ${isLargeWidget ? 'sm:w-[480px]' : 'sm:w-[360px]'} uway-panel rounded-[2.5rem] flex flex-col max-h-[75vh] sm:max-h-[85vh] overflow-hidden shadow-2xl transition-all duration-300`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200">
             <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t('a11y.widgetsize')}</span>
             <button onClick={() => setIsLargeWidget(!isLargeWidget)} className={`w-12 h-6 rounded-full p-1 transition-colors ${isLargeWidget ? 'bg-brand-uway' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform transform ${isLargeWidget ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </button>
          </div>
          
          <div className="p-4 overflow-y-auto space-y-4">
            <div className={`a11y-grid grid grid-cols-2 gap-3`}>
              <Tile 
                label={t('a11y.contrast')} 
                icon={<Sun />} 
                active={contrastLevel > 0} 
                onClick={() => setContrastLevel(contrastLevel === 0 ? 1 : 0)} 
                tooltipKey="a11y.contrast"
              />
              <Tile 
                label={t('a11y.links')} 
                icon={<LinkIcon />} 
                active={underlineLinks} 
                onClick={() => setUnderlineLinks(!underlineLinks)} 
                tooltipKey="a11y.links"
              />
              <Tile 
                label={t('a11y.textsize')} 
                icon={<Type />} 
                active={fontSizeLevel > 0} 
                progress={fontSizeLevel + 1} 
                onClick={() => setFontSizeLevel((prev) => (prev + 1) % 3)} 
                tooltipKey="a11y.textsize"
              />
              <Tile 
                label={t('a11y.spacing')} 
                icon={<ArrowLeftRight />} 
                active={letterSpacing} 
                onClick={() => setLetterSpacing(!letterSpacing)} 
                tooltipKey="a11y.spacing"
              />
              <Tile 
                label={t('a11y.anim')} 
                icon={<CircleStop />} 
                active={stopAnimations} 
                onClick={() => setStopAnimations(!stopAnimations)} 
                tooltipKey="a11y.anim"
              />
              <Tile 
                label={t('a11y.images')} 
                icon={<ImageOff />} 
                active={hideImages} 
                onClick={() => setHideImages(!hideImages)} 
                tooltipKey="a11y.images"
              />
              <Tile 
                label={t('a11y.dyslexia')} 
                icon={<div className="font-black">Df</div>} 
                active={dyslexicFont} 
                onClick={() => setDyslexicFont(!dyslexicFont)} 
                tooltipKey="a11y.dyslexia"
              />
              <Tile 
                label={t('a11y.cursor')} 
                icon={<MousePointer2 />} 
                active={cursorSizeLevel > 0} 
                progress={cursorSizeLevel + 1} 
                onClick={() => setCursorSizeLevel((prev) => (prev + 1) % 2)} 
                tooltipKey="a11y.cursor"
              />
              <Tile 
                label={t('a11y.tooltips')} 
                icon={<Info />} 
                active={tooltips} 
                onClick={() => setTooltips(!tooltips)} 
                tooltipKey="a11y.tooltips"
              />
              <Tile 
                label={t('a11y.lineheight')} 
                icon={<AlignLeft />} 
                active={lineHeight} 
                onClick={() => setLineHeight(!lineHeight)} 
                tooltipKey="a11y.lineheight"
              />
              <Tile 
                label={t('a11y.lang')} 
                icon={<Languages />} 
                active={true} 
                customSub={lang.toUpperCase()} 
                onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')} 
                tooltipKey="a11y.lang"
              />
            </div>
            
            <div className="pt-2">
              <button onClick={resetAll} className="w-full py-4 bg-white text-brand-uway font-black text-xs uppercase rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <RotateCcw size={14} /> {t('a11y.reset')}
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-white border-t border-slate-200 text-center">
             <div className="flex items-center justify-center gap-2 opacity-30 grayscale mb-2">
               <Logo className="w-6 h-6" />
               <span className="text-[10px] font-black uppercase tracking-widest">{t('assoc.name')}</span>
             </div>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{t('a11y.footer.created')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setVisible(true);
  }, []);
  
  const accept = () => { localStorage.setItem('cookie-consent', 'all'); setVisible(false); };
  const reject = () => { localStorage.setItem('cookie-consent', 'essential'); setVisible(false); };

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] p-4 md:p-8 animate-in slide-in-from-bottom duration-500 a11y-exempt">
      <div className="max-w-5xl mx-auto bg-brand-primary text-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2 flex items-center gap-2 font-serif italic"><div className="w-2 h-2 bg-brand-gold rounded-full"></div> {t('cookie.title')}</h4>
          <p className="text-sm text-white/70 leading-relaxed font-medium">{t('cookie.text')} <NavLink to="cookies" className="text-brand-gold underline font-bold">{t('cookie.title')}</NavLink>.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <button onClick={reject} className="flex-1 lg:flex-none border-2 border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-sm whitespace-nowrap">
            {t('cookie.reject')}
          </button>
          <button onClick={accept} className="flex-1 lg:flex-none bg-brand-gold text-brand-primary font-bold px-10 py-4 rounded-full hover:bg-white transition-colors shadow-lg text-sm whitespace-nowrap">
            {t('cookie.btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPage } = useNavigation();
  const { t, lang, setLang } = useLanguage();

  const navLinks: { path: PageType; label: string }[] = [
    { path: 'home', label: t('nav.home') },
    { path: 'despre', label: t('nav.about') },
    { path: 'proiecte', label: t('nav.projects') },
    { path: 'galerie', label: t('nav.gallery') },
    { path: 'voluntariat', label: t('nav.volunteer') },
    { path: 'doneaza', label: t('nav.donate') },
    { path: 'blog', label: t('nav.blog') },
    { path: 'contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="home">
              <Brand />
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={`text-sm font-semibold transition-colors hover:text-brand-secondary ${currentPage === link.path ? 'text-brand-secondary' : 'text-brand-primary/80'}`}>{link.label}</NavLink>
            ))}
            <div className="h-6 w-px bg-brand-primary/20"></div>
            <button onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')} className="flex items-center gap-1.5 text-xs font-black text-brand-primary/80 hover:text-brand-secondary transition-colors uppercase tracking-widest px-3 py-1.5 rounded-lg border border-brand-primary/20 bg-brand-warm/50">
              <Globe size={14} /> {t('nav.lang')}
            </button>
            <NavLink to="doneaza" className="bg-brand-secondary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-primary transition-all transform hover:scale-105 shadow-lg shadow-brand-secondary/20 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-current" /> {t('nav.support')}
            </NavLink>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-primary p-2 focus:outline-none">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass-navbar absolute top-20 left-0 right-0 border-t border-brand-warm py-6 px-4 shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-lg font-bold text-brand-primary px-4 py-2 hover:bg-brand-warm rounded-xl">{link.label}</NavLink>
            ))}
            <button onClick={() => { setLang(lang === 'ro' ? 'en' : 'ro'); setIsOpen(false); }} className="flex items-center justify-center gap-2 py-4 text-brand-primary font-black uppercase tracking-widest border border-brand-primary/10 rounded-xl">
              <Globe size={18} /> {t('nav.lang.mobile')}
            </button>
            <NavLink to="doneaza" onClick={() => setIsOpen(false)} className="bg-brand-secondary text-white text-center py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-current" /> {t('nav.support')}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const yearString = currentYear > 2025 ? `2025 - ${currentYear}` : "2025";
  const { t } = useLanguage();
  return (
    <footer className="bg-brand-primary text-brand-warm/70 pt-20 pb-10 border-t-[12px] border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-white/5 pb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6 text-white">
              <Brand isFooter={true} />
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-80 font-medium italic max-w-sm">{t('footer.mission')}</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-all border border-white/5"><Facebook className="w-5 h-5" /></a>
              <a href="https://instagram.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-all border border-white/5"><Instagram className="w-5 h-5" /></a>
              <a href="https://linkedin.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold transition-all border border-white/5"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-brand-gold font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.quicklinks')}</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><NavLink to="despre" className="hover:text-white transition-colors">{t('nav.about')}</NavLink></li>
              <li><NavLink to="proiecte" className="hover:text-white transition-colors">{t('nav.projects')}</NavLink></li>
              <li><NavLink to="voluntariat" className="hover:text-white transition-colors">{t('nav.volunteer')}</NavLink></li>
              <li><NavLink to="contact" className="hover:text-white transition-colors">{t('nav.contact')}</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.pillars')}</h4>
            <ul className="space-y-4 text-sm font-medium opacity-80">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-gold rounded-full"></div> {t('footer.pillar1')}</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-gold rounded-full"></div> {t('footer.pillar2')}</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-gold rounded-full"></div> {t('footer.pillar3')}</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-gold rounded-full"></div> {t('footer.pillar4')}</li>
            </ul>
          </div>

          <div>
            <div className="mb-10">
              <h4 className="text-brand-gold font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.legal')}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><NavLink to="privacy" className="hover:text-white transition-colors">Privacy (GDPR)</NavLink></li>
                <li><NavLink to="terms" className="hover:text-white transition-colors">Terms & Conditions</NavLink></li>
                <li><NavLink to="cookies" className="hover:text-white transition-colors">Cookie Policy</NavLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-brand-gold font-bold mb-6 uppercase tracking-widest text-xs">{t('footer.contact')}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <a href="mailto:codpentrucomunitate@gmail.com" className="hover:text-white transition-colors break-all">codpentrucomunitate@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <a href="tel:+40733402340" className="hover:text-white transition-colors">+40 733 402 340</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className="opacity-80">{t('footer.address')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 text-center text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold">© {yearString} {t('assoc.name')}.</div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [lang, setLang] = useState<LangType>('ro');
  const [initialBlogPostId, setInitialBlogPostId] = useState<string | null>(null);

  const navigateTo = (page: PageType) => setCurrentPage(page);
  const t = (key: string) => translations[lang][key] || key;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageType;
    const postParam = params.get('post');

    // Suport pentru rute directe din URL (de ex: /donatii, /doneaza, /galerie) dintr-un QR-code
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/|\/$/g, '');
    let pathPage: PageType | null = null;
    if (rawPath === 'donatii' || rawPath === 'doneaza' || rawPath === 'donate') {
      pathPage = 'doneaza';
    } else if (rawPath === 'despre' || rawPath === 'about') {
      pathPage = 'despre';
    } else if (rawPath === 'proiecte' || rawPath === 'projects') {
      pathPage = 'proiecte';
    } else if (rawPath === 'galerie' || rawPath === 'gallery') {
      pathPage = 'galerie';
    } else if (rawPath === 'voluntariat' || rawPath === 'volunteer') {
      pathPage = 'voluntariat';
    } else if (rawPath === 'blog') {
      pathPage = 'blog';
    } else if (rawPath === 'contact') {
      pathPage = 'contact';
    }

    if (pageParam && ['home', 'despre', 'proiecte', 'voluntariat', 'doneaza', 'contact', 'privacy', 'terms', 'cookies', 'blog', 'galerie'].includes(pageParam)) {
      setCurrentPage(pageParam);
      if (pageParam === 'blog' && postParam) {
        setInitialBlogPostId(postParam);
      }
      // Curăță URL-ul de parametri dar păstrează calea curată
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (pathPage) {
      setCurrentPage(pathPage);
      // Rescriem în / pentru a asigura că refresh-ul ulterior nu dă 404 dacă serverul nu e configurat cu redirecționări
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const titles: Record<LangType, Record<PageType, string>> = {
      ro: {
        home: 'Acasă | Cod pentru Comunitate',
        despre: 'Despre Noi | Cod pentru Comunitate',
        proiecte: 'Proiecte | Cod pentru Comunitate',
        voluntariat: 'Alătură-te ca Voluntar | Cod pentru Comunitate',
        doneaza: 'Susține-ne | Cod pentru Comunitate',
        blog: 'Blog | Cod pentru Comunitate',
        contact: 'Contact | Cod pentru Comunitate',
        privacy: 'Confidențialitate | Cod pentru Comunitate',
        terms: 'Termeni | Cod pentru Comunitate',
        cookies: 'Cookies | Cod pentru Comunitate',
        galerie: 'Galerie | Cod pentru Comunitate'
      },
      en: {
        home: 'Home | Code for Community',
        despre: 'About Us | Code for Community',
        proiecte: 'Our Projects | Code for Community',
        voluntariat: 'Join as Volunteer | Code for Community',
        doneaza: 'Support Us | Code for Community',
        blog: 'Blog | Code for Community',
        contact: 'Contact Us | Code for Community',
        privacy: 'Privacy | Code for Community',
        terms: 'Terms | Code for Community',
        cookies: 'Cookies | Code for Community',
        galerie: 'Gallery | Code for Community'
      }
    };
    document.title = titles[lang][currentPage] || titles[lang].home;
  }, [lang, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'despre': return <About />;
      case 'proiecte': return <Projects />;
      case 'voluntariat': return <Volunteer />;
      case 'doneaza': return <Donate />;
      case 'blog': return <Blog initialPostId={initialBlogPostId} />;
      case 'galerie': return <Gallery />;
      case 'contact': return <Contact />;
      case 'privacy': return <Privacy />;
      case 'terms': return <Terms />;
      case 'cookies': return <Cookies />;
      default: return <Home />;
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <NavigationContext.Provider value={{ currentPage, navigateTo }}>
        <div className="flex flex-col min-h-screen selection:bg-brand-gold selection:text-white">
          <Navbar />
          <main className="flex-grow pt-20">{renderPage()}</main>
          <Footer />
          <AccessibilityToolbar />
          <CookieBanner />
        </div>
      </NavigationContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
