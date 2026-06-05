
import React from 'react';
import { Heart, Building, ExternalLink, Copy, Check, ArrowRight, Laptop, Monitor, RefreshCw, Sparkles, ShieldCheck, Cpu, Keyboard, MousePointer2, Eye, Leaf, Download } from 'lucide-react';
import { NavLink, useLanguage, Logo } from '../AppContext';

const Donate: React.FC = () => {
  const { lang } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  const iban = "RO66BTRLRONCRT0696822801";

  const content = {
    ro: {
      tag: "Fiecare gest contează",
      title: "Susține Viitorul",
      intro: "Fie că este o donație financiară sau echipament IT, contribuția ta clădește o comunitate digitală egală și educată.",
      c1_t: "Redirecționează 3.5%",
      c1_d: "Transformă impozitul pe venit în resurse educaționale fără niciun cost pentru tine.",
      c1_btn_download: "Descarcă Formularul 230",
      c1_preview_alt: "Previzualizare Formular 230",
      c2_t: "Transfer Bancar Direct",
      c2_d: "Cea mai directă metodă de a ne susține. Copiază codul IBAN de mai jos.",
      c3_t: "Sponsorizare Business",
      c3_d: "Companiile pot redirecționa până la 20% din impozitul pe profit.",
      it_title: "Donează Echipament IT",
      it_desc: "Acceptăm echipamente care pot fi recondiționate și oferite copiilor din medii vulnerabile. Orice componentă funcțională contează.",
      it_laptops: "Laptopuri",
      it_monitors: "Monitoare",
      it_pc: "Unități Calculator (PC)",
      it_keyboard: "Tastaturi funcționale",
      it_mouse: "Mouse funcțional",
      it_others: "Cabluri & Alte periferice",
      it_btn: "Stabilim o ridicare",
      it_caption: "Tehnologie care prinde viață nouă",
      tr_title: "Transparență și Sustenabilitate",
      tr_desc: "Suntem o organizație bazată pe încredere. Fiecare resursă primită este gestionată cu responsabilitate maximă pentru un impact real și durabil.",
      tr_card1_t: "Transparență Totală",
      tr_card1_d: "Publicăm rapoarte anuale detaliate. Știi exact unde merge fiecare leu: 100% din donații merg către proiectele educaționale și tehnice.",
      tr_card1_list: ["Rapoarte financiare publice", "Trasabilitatea fondurilor", "Comunicare deschisă"],
      tr_card2_t: "Sustenabilitate pe Termen Lung",
      tr_card2_d: "Nu creăm soluții temporare. Dezvoltăm proiecte bazate pe Free Software, asigurând independență digitală comunităților ajutate.",
      tr_card2_list: ["Proiecte Open-Source", "Mentorat continuu", "Impact comunitar scalabil"],
      tr_footer: "Încrederea ta este motorul schimbării noastre."
    },
    en: {
      tag: "Every gesture counts",
      title: "Support the Future",
      intro: "Whether it's a financial donation or IT equipment, your contribution builds an equal and educated digital community.",
      c1_t: "Redirect 3.5%",
      c1_d: "Turn your income tax into educational resources at no cost to you.",
      c1_btn_download: "Download Form 230",
      c1_preview_alt: "Form 230 Preview",
      c2_t: "Direct Bank Transfer",
      c2_d: "The most direct way to support us. Copy the IBAN code below.",
      c3_t: "Business Sponsorship",
      c3_d: "Companies can redirect up to 20% of their profit tax.",
      it_title: "Donate IT Equipment",
      it_desc: "We accept equipment that can be refurbished and given to children from vulnerable backgrounds. Every functional component matters.",
      it_laptops: "Laptops",
      it_monitors: "Monitors",
      it_pc: "PC Units",
      it_keyboard: "Functional Keyboards",
      it_mouse: "Functional Mice",
      it_others: "Cables & Other Peripherals",
      it_btn: "Schedule a pickup",
      it_caption: "Technology coming back to life",
      tr_title: "Transparency & Sustainability",
      tr_desc: "We are a trust-based organization. Every resource received is managed with maximum responsibility for a real and lasting impact.",
      tr_card1_t: "Total Transparency",
      tr_card1_d: "We publish detailed annual reports. You know exactly where every cent goes: 100% of donations go to educational and technical projects.",
      tr_card1_list: ["Public financial reports", "Fund traceability", "Open communication"],
      tr_card2_t: "Long-term Sustainability",
      tr_card2_d: "We don't create temporary solutions. We develop projects based on Free Software, ensuring digital independence for helped communities.",
      tr_card2_list: ["Open-Source Projects", "Continuous mentorship", "Scalable community impact"],
      tr_footer: "Your trust is the engine of our change."
    }
  };

  const t = content[lang];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-24">
      <section className="relative py-24 md:py-32 mb-16 hero-bg hero-donate overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 text-brand-primary font-bold text-xs uppercase tracking-widest mb-8 border border-brand-gold/20 shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-gold" /> {t.tag}
              </div>
              <h1 className="text-5xl md:text-8xl font-bold mb-8 font-serif italic text-brand-primary leading-[1.1]">
                {lang === 'ro' ? 'Susține' : 'Support'} <br />
                <span className="text-brand-secondary italic">{lang === 'ro' ? 'Viitorul' : 'the Future'}</span>
              </h1>
              <p className="text-xl text-brand-primary/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t.intro}
              </p>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -inset-10 bg-brand-gold/5 rounded-full blur-3xl animate-pulse"></div>
              <img
                src="/imagini/info_18.jpeg"
                alt="Donation Impact"
                className="relative z-10 rounded-[4rem] shadow-2xl border-4 border-white organic-shadow transform rotate-3 hover:rotate-0 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x600/fdfbf7/5d3a1a?text=Impact+Comunitar";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {/* Col 1: Redirecționare 3.5% */}
          <div className="bg-white p-10 rounded-[2.5rem] organic-shadow border border-brand-warm flex flex-col justify-between group">
            <div>
              <div className="bg-brand-secondary/10 text-brand-secondary w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                <Heart />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-primary font-serif italic">{t.c1_t}</h3>
              <p className="text-brand-primary/60 mb-8 font-medium italic text-sm">{t.c1_d}</p>

              <div className="mb-8 overflow-hidden rounded-2xl border border-brand-warm organic-shadow transform group-hover:scale-105 transition-transform duration-300 bg-brand-light">
                <img
                  src="/formular_donatie.png"
                  alt={t.c1_preview_alt}
                  className="w-full h-40 object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x300/fdfbf7/c04822?text=Previzualizare+Formular+230";
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <a href="https://redirectioneaza.ro/asociatia-cod-pentru-comunitate/" target="_blank" className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-brand-secondary shadow-lg">
                Redirectoneaza.ro <ExternalLink size={16} />
              </a>
              <a href="/Formular_230_Asociatia_Cod_Comunitate.pdf" download className="w-full border-2 border-brand-primary text-brand-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-brand-warm">
                <Download size={16} /> {t.c1_btn_download}
              </a>
            </div>
          </div>

          {/* Col 2: Transfer Bancar Direct */}
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-brand-gold/30 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 -rotate-12">
              <Logo className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-brand-primary font-serif italic">{t.c2_t}</h3>
            <p className="text-brand-primary/60 mb-6 font-medium text-sm italic">{t.c2_d}</p>

            <div className="mb-8 rounded-2xl overflow-hidden organic-shadow border border-brand-warm bg-brand-light flex-grow">
              <img
                src="/imagini/info_14.jpeg"
                alt="Solidaritate"
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/400x300/fdfbf7/d9921e?text=Solidaritate";
                }}
              />
            </div>

            <div className="bg-brand-warm/30 p-6 rounded-2xl border border-brand-gold/20 mb-4">
              <label className="text-[10px] uppercase font-bold text-brand-primary/40 block mb-2">IBAN</label>
              <div className="flex items-center justify-between gap-3">
                <code className="text-xs font-mono font-bold text-brand-primary break-all">{iban}</code>
                <button onClick={copyToClipboard} className="p-3 bg-white rounded-xl shadow-sm hover:bg-brand-warm transition-colors flex-shrink-0">
                  {copied ? <Check className="text-brand-accent" size={18} /> : <Copy className="text-brand-primary" size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: Sponsorizare Business */}
          <div className="bg-white p-10 rounded-[2.5rem] organic-shadow border border-brand-warm flex flex-col justify-between">
            <div>
              <div className="bg-brand-accent/10 text-brand-accent w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                <Building />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-primary font-serif italic">{t.c3_t}</h3>
              <p className="text-brand-primary/60 mb-8 font-medium italic text-sm">{t.c3_d}</p>

              {/* Imagine sugestivă pentru business/parteneriat */}
              <div className="mb-8 rounded-2xl overflow-hidden organic-shadow border border-brand-warm bg-brand-light">
                <img
                  src="/imagini/info_8.jpeg"
                  alt="Business Partnership"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x300/fdfbf7/2d5a27?text=Parteneriat";
                  }}
                />
              </div>
            </div>
            <NavLink to="contact" className="w-full border-2 border-brand-primary text-brand-primary py-4 rounded-2xl font-bold text-center hover:bg-brand-warm transition-all shadow-md">
              {lang === 'ro' ? 'Solicită Contract' : 'Request Contract'}
            </NavLink>
          </div>
        </div>

        {/* Secțiunea IT Equipment Donation */}
        <section className="mb-20">
          <div className="bg-brand-accent rounded-[3.5rem] p-10 lg:p-20 text-white relative overflow-hidden organic-shadow border-4 border-white/10">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
              <Laptop size={200} />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
                  <RefreshCw className="w-8 h-8 text-brand-gold" />
                </div>
                <h2 className="text-4xl font-bold mb-6 font-serif italic">{t.it_title}</h2>
                <p className="text-white/80 text-lg mb-10 leading-relaxed font-medium">{t.it_desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: <Laptop size={18} />, label: t.it_laptops },
                    { icon: <Monitor size={18} />, label: t.it_monitors },
                    { icon: <Cpu size={18} />, label: t.it_pc },
                    { icon: <Keyboard size={18} />, label: t.it_keyboard },
                    { icon: <MousePointer2 size={18} />, label: t.it_mouse },
                    { icon: <RefreshCw size={18} />, label: t.it_others }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                      {item.icon}
                      <span className="font-bold text-sm uppercase tracking-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
                <NavLink to="contact" className="bg-brand-gold text-brand-primary px-10 py-5 rounded-2xl font-bold inline-flex items-center gap-3 hover:bg-white transition-all shadow-xl">
                  {t.it_btn} <ArrowRight size={20} />
                </NavLink>
              </div>
              <div className="hidden lg:block relative group">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/imagini/info_11.jpeg"
                    alt="Refurbished Laptop"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x600/2d5a27/ffffff?text=Laptop+Refurbished";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-1">{t.it_caption}</p>
                    <div className="h-1.5 w-16 bg-brand-gold rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secțiunea Transparență */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary font-serif italic mb-6">{t.tr_title}</h2>
            <p className="text-brand-primary/60 max-w-2xl mx-auto font-medium">{t.tr_desc}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-brand-warm/30 p-10 md:p-16 rounded-[3.5rem] border border-brand-gold/10 group hover:bg-white transition-all duration-500 organic-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <Eye size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-brand-primary italic">{t.tr_card1_t}</h3>
              </div>
              <p className="text-brand-primary/70 mb-8 leading-relaxed font-medium">
                {t.tr_card1_d}
              </p>
              <ul className="space-y-4">
                {t.tr_card1_list.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-brand-primary/80">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-accent/5 p-10 md:p-16 rounded-[3.5rem] border border-brand-accent/10 group hover:bg-white transition-all duration-500 organic-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-brand-accent/10 rounded-2xl text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <Leaf size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-brand-primary italic">{t.tr_card2_t}</h3>
              </div>
              <p className="text-brand-primary/70 mb-8 leading-relaxed font-medium">
                {t.tr_card2_d}
              </p>
              <ul className="space-y-4">
                {t.tr_card2_list.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-brand-primary/80">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-primary text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-lg">
              <ShieldCheck className="text-brand-gold" /> {t.tr_footer}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Donate;
