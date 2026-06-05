
import React from 'react';
import { useLanguage } from '../AppContext';
import { Cookie, Settings, ShieldCheck, Database, Info, ExternalLink, AlertTriangle, Monitor, ShieldAlert } from 'lucide-react';

const Cookies: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    ro: {
      title: "Politica de Cookies",
      subtitle: "Cum folosim modulele cookie pentru o experiență mai bună.",
      s1_t: "1. Ce sunt modulele cookie?",
      s1_d: "Modulele cookie sunt fișiere text de mici dimensiuni care sunt stocate pe computerul sau dispozitivul dumneavoastră mobil atunci când accesați un site web. Acestea permit site-ului să vă rețină acțiunile și preferințele pentru o perioadă de timp.",
      s2_t: "2. Cum utilizăm cookie-urile?",
      s2_d: "Asociația folosește module cookie pentru a asigura funcționarea corectă a site-ului, pentru a analiza traficul și pentru a oferi o experiență personalizată (de exemplu, reținerea limbii preferate sau a setărilor de accesibilitate).",
      s3_t: "3. Tipuri de cookie-uri folosite",
      s3_list: [
        { t: "Esențiale", d: "Sunt necesare pentru funcționarea site-ului (sesiune, securitate) și nu pot fi dezactivate." },
        { t: "Preferințe", d: "Rețin setările dvs. de accesibilitate și limba preferată." },
        { t: "Analitice", d: "Ne ajută să înțelegem cum interacționează vizitatorii cu site-ul (Google Analytics)." }
      ],
      s4_t: "4. Cum poți respinge sau dezactiva modulele cookie?",
      s4_d: "Ai dreptul de a decide dacă accepți sau respingi modulele cookie neesențiale. Poți face acest lucru în mai multe moduri:",
      s4_methods: [
        { t: "Bannerul de Consimțământ", d: "Apasă pe butonul 'Doar cele esențiale' din bannerul de la baza paginii pentru a respinge modulele de marketing și analiză." },
        { t: "Setările Browserului", d: "Poți seta browserul să blocheze toate cookie-urile sau să te avertizeze înainte de a le accepta. Accesează meniul 'Setări' sau 'Opțiuni' -> 'Confidențialitate și Securitate'." },
        { t: "Ștergerea periodică", d: "Poți șterge în orice moment cookie-urile deja salvate în dispozitivul tău din istoricul browserului." }
      ],
      browser_links_title: "Instrucțiuni specifice pe browser:",
      warning: "Rețineți că dezactivarea cookie-urilor esențiale poate afecta funcționarea corectă a site-ului nostru."
    },
    en: {
      title: "Cookie Policy",
      subtitle: "How we use cookies for a better experience.",
      s1_t: "1. What are cookies?",
      s1_d: "Cookies are small text files stored on your computer or mobile device when you access a website. They allow the site to remember your actions and preferences over a period of time.",
      s2_t: "2. How do we use cookies?",
      s2_d: "The Association uses cookies to ensure the site works correctly, to analyze traffic, and to provide a personalized experience (e.g., remembering preferred language or accessibility settings).",
      s3_t: "3. Types of cookies used",
      s3_list: [
        { t: "Essential", d: "Necessary for the site to function (session, security) and cannot be deactivated." },
        { t: "Preferences", d: "Remember your accessibility settings and preferred language." },
        { t: "Analytical", d: "Help us understand how visitors interact with the site (Google Analytics)." }
      ],
      s4_t: "4. How can you reject or deactivate cookies?",
      s4_d: "You have the right to decide whether to accept or reject non-essential cookies. You can do this in several ways:",
      s4_methods: [
        { t: "Consent Banner", d: "Click the 'Essential Only' button in the banner at the bottom of the page to reject marketing and analytical cookies." },
        { t: "Browser Settings", d: "You can set your browser to block all cookies or to warn you before accepting them. Access 'Settings' or 'Options' -> 'Privacy and Security'." },
        { t: "Periodic Deletion", d: "You can delete cookies already saved on your device at any time from your browser history." }
      ],
      browser_links_title: "Specific browser instructions:",
      warning: "Note that deactivating essential cookies may affect the correct functioning of our site."
    }
  };

  const t = content[lang];

  const browserLinks = [
    { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
    { name: "Mozilla Firefox", url: "https://support.mozilla.org/ro/kb/cookie-urile" },
    { name: "Safari (Mac)", url: "https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" },
    { name: "Microsoft Edge", url: "https://support.microsoft.com/ro-ro/microsoft-edge/ștergerea-modulelor-cookie-în-microsoft-edge-63491130-59a9-2475-cf6d-35a019451846" }
  ];

  return (
    <div className="pb-24">
      <section className="relative py-24 mb-16 hero-bg hero-legal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest mb-6 border border-brand-gold/20 backdrop-blur-sm">Technology</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif italic text-brand-primary mb-6">{t.title}</h1>
          <p className="text-lg text-brand-primary/60 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] organic-shadow border border-brand-gold/10 space-y-12">

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><Cookie className="text-brand-gold" /> {t.s1_t}</h2>
            <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s1_d}</p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><Settings className="text-brand-accent" /> {t.s2_t}</h2>
            <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s2_d}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.s3_list.map((item, i) => (
              <div key={i} className="bg-brand-warm/30 p-6 rounded-2xl border border-brand-gold/5 flex flex-col">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  {i === 0 ? <ShieldCheck className="text-brand-accent w-5 h-5" /> : i === 1 ? <Database className="text-brand-gold w-5 h-5" /> : <Info className="text-brand-secondary w-5 h-5" />}
                </div>
                <h3 className="font-bold text-brand-primary mb-2 italic font-serif">{item.t}</h3>
                <p className="text-xs text-brand-primary/60 font-medium leading-tight">{item.d}</p>
              </div>
            ))}
          </div>

          <section className="bg-brand-primary text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 font-serif italic"><ShieldAlert className="text-brand-gold" /> {t.s4_t}</h2>
            <p className="text-white/70 font-medium leading-relaxed mb-8">{t.s4_d}</p>
            <div className="grid grid-cols-1 gap-6">
              {t.s4_methods.map((method, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="bg-white/10 p-3 rounded-xl"><Monitor className="w-5 h-5 text-brand-gold" /></div>
                  <div>
                    <h4 className="font-bold mb-1 text-brand-gold">{method.t}</h4>
                    <p className="text-sm text-white/60 font-medium">{method.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <h4 className="font-bold mb-4 text-sm uppercase tracking-widest">{t.browser_links_title}</h4>
              <div className="flex flex-wrap gap-4">
                {browserLinks.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" className="bg-white/5 px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                    {link.name} <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-brand-primary/5 pt-12">
            <div className="bg-brand-secondary/5 p-6 rounded-2xl flex gap-4 items-center">
              <AlertTriangle className="text-brand-secondary flex-shrink-0" />
              <p className="text-sm font-bold text-brand-secondary italic">{t.warning}</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Cookies;
