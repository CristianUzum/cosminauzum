
import React from 'react';
import { useLanguage } from '../AppContext';
import { Gavel, Copyright, AlertTriangle, Scale, RefreshCw, HelpCircle } from 'lucide-react';

const Terms: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    ro: {
      title: "Termeni și Condiții",
      subtitle: "Reguli de utilizare a platformei noastre.",
      s1_t: "1. Condiții Generale",
      s1_d: "Prin accesarea site-ului codpentrucomunitate.org, sunteți de acord să respectați acești termeni și toate legile și reglementările aplicabile în România. Dacă nu sunteți de acord cu acești termeni, vă este interzis să utilizați acest site.",
      s2_t: "2. Drepturi de Proprietate Intelectuală",
      s2_d: "Toate materialele conținute pe acest site (texte, imagini, logo-uri, cursuri) sunt protejate de legile privind drepturile de autor și mărcile comerciale. Utilizarea lor fără acordul nostru scris este strict interzisă.",
      s3_t: "3. Limitarea Răspunderii",
      s3_d: "Materialele de pe site-ul Asociației sunt furnizate „așa cum sunt”. Nu oferim nicio garanție, exprimată sau implicită, și prin prezenta declinăm și negăm toate celelalte garanții.",
      s4_t: "4. Utilizarea Serviciilor",
      s4_d: "Serviciile noastre gratuite (cursuri, web design) sunt oferite în limita resurselor disponibile și pot fi modificate sau suspendate în orice moment fără notificare prealabilă.",
      s5_t: "5. Modificări",
      s5_d: "Asociația poate revizui acești termeni și condiții în orice moment. Prin utilizarea acestui site, sunteți de acord să respectați versiunea actuală a acestor termeni.",
      s6_t: "6. Legea Aplicabilă",
      s6_d: "Orice revendicare referitoare la site-ul Asociației Cod pentru Comunitate va fi guvernată de legile statului român, fără a ține cont de conflictele sale de prevederi legale."
    },
    en: {
      title: "Terms and Conditions",
      subtitle: "Rules for using our platform.",
      s1_t: "1. General Conditions",
      s1_d: "By accessing codpentrucomunitate.org, you agree to comply with these terms and all applicable laws and regulations in Romania. If you do not agree with these terms, you are prohibited from using this site.",
      s2_t: "2. Intellectual Property Rights",
      s2_d: "All materials contained on this site (texts, images, logos, courses) are protected by copyright and trademark laws. Their use without our written consent is strictly prohibited.",
      s3_t: "3. Limitation of Liability",
      s3_d: "The materials on the Association's website are provided 'as is'. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.",
      s4_t: "4. Use of Services",
      s4_d: "Our free services (courses, web design) are offered within the limit of available resources and can be modified or suspended at any time without prior notice.",
      s5_t: "5. Modifications",
      s5_d: "The Association may revise these terms and conditions at any time. By using this site, you agree to comply with the current version of these terms.",
      s6_t: "6. Governing Law",
      s6_d: "Any claim relating to the Code for Community Association website will be governed by the laws of the Romanian state, without regard to its conflicts of legal provisions."
    }
  };

  const t = content[lang];

  return (
    <div className="pb-24">
      <section className="relative py-24 mb-16 hero-bg hero-legal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest mb-6 border border-brand-gold/20 backdrop-blur-sm">Agreement</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif italic text-brand-primary mb-6">{t.title}</h1>
          <p className="text-lg text-brand-primary/60 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] organic-shadow border border-brand-gold/10 space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="p-6 bg-brand-warm/30 rounded-2xl border border-brand-gold/5">
              <h2 className="flex items-center gap-3 text-xl font-bold text-brand-primary mb-4 font-serif italic"><Gavel className="text-brand-gold" /> {t.s1_t}</h2>
              <p className="text-brand-primary/70 font-medium leading-relaxed text-sm">{t.s1_d}</p>
            </section>
            <section className="p-6 bg-brand-warm/30 rounded-2xl border border-brand-gold/5">
              <h2 className="flex items-center gap-3 text-xl font-bold text-brand-primary mb-4 font-serif italic"><Copyright className="text-brand-secondary" /> {t.s2_t}</h2>
              <p className="text-brand-primary/70 font-medium leading-relaxed text-sm">{t.s2_d}</p>
            </section>
          </div>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><AlertTriangle className="text-brand-secondary" /> {t.s3_t}</h2>
            <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s3_d}</p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><HelpCircle className="text-brand-accent" /> {t.s4_t}</h2>
            <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s4_d}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h2 className="flex items-center gap-3 text-xl font-bold text-brand-primary mb-4 font-serif italic"><RefreshCw className="text-brand-gold" /> {t.s5_t}</h2>
              <p className="text-brand-primary/70 font-medium leading-relaxed text-sm">{t.s5_d}</p>
            </section>
            <section>
              <h2 className="flex items-center gap-3 text-xl font-bold text-brand-primary mb-4 font-serif italic"><Scale className="text-brand-accent" /> {t.s6_t}</h2>
              <p className="text-brand-primary/70 font-medium leading-relaxed text-sm">{t.s6_d}</p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;
