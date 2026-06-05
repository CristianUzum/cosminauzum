
import React from 'react';
import { NavLink, Logo, useLanguage } from '../AppContext';
import { ChevronRight, ArrowRight, Heart, Users, Laptop, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    ro: {
      hero_tag: "Creativitate • Cultură • Cod",
      hero_title_1: "Tehnologie pentru viitor,",
      hero_title_2: "educație pentru oameni.",
      hero_desc: "Suntem Asociația Cod pentru Comunitate. Ajutăm oamenii și instituțiile să folosească tehnologia, în timp ce prețuim educația, limba română și valorile comunității noastre.",
      hero_btn_1: "Susține-ne",
      hero_btn_2: "Află mai multe",
      features_title: "Cum ajutăm comunitatea?",
      f1_title: "Digitalizare pentru toți",
      f1_desc: "Ajutăm primăriile și asociațiile mici să aibă un site modern și să comunice mai ușor cu cetățenii.",
      f2_title: "Educație și Literatură",
      f2_desc: "Folosim internetul pentru a-i face pe tineri să iubească din nou limba română și cărțile bune.",
      f3_title: "Respect și Egalitate",
      f3_desc: "Suntem o asociație care respectă pe toată lumea, susține femeile și luptă împotriva discriminării.",
      promo_badge: "Proiect Gratuit",
      promo_title: "Informatica Interactivă",
      promo_desc: "Am lansat deja primul nostru curs gratuit. Aici, copiii nu doar învață să folosească calculatorul, ci învață să gândească logic și creativ.",
      promo_list: ["Lecții simple și ușor de înțeles", "Jocuri care te învață programare", "Ajutor gratuit de la mentorii noștri"],
      promo_btn: "Vezi Proiectul",
      cta_title: "Împreună suntem mai buni.",
      cta_desc: "Dacă vrei să ne ajuți ca voluntar sau vrei să susții financiar proiectele noastre pentru copii, te așteptăm cu drag în comunitatea noastră.",
      cta_btn_1: "Vreau să ajut",
      cta_btn_2: "Donează acum"
    },
    en: {
      hero_tag: "Creativity • Culture • Code",
      hero_title_1: "Technology for the future,",
      hero_title_2: "education for people.",
      hero_desc: "We are the Code for Community Association. We help people and institutions use technology while valuing education, the Romanian language, and our community values.",
      hero_btn_1: "Support Us",
      hero_btn_2: "Learn More",
      features_title: "How do we help the community?",
      f1_title: "Digitalization for All",
      f1_desc: "We help municipalities and small associations have a modern website and communicate easier with citizens.",
      f2_title: "Education & Literature",
      f2_desc: "We use the internet to make young people love the Romanian language and good books again.",
      f3_title: "Respect & Equality",
      f3_desc: "We are an association that respects everyone, supports women, and fights against discrimination.",
      promo_badge: "Free Project",
      promo_title: "Interactive Informatics",
      promo_desc: "We have already launched our first free course. Here, children don't just learn to use the computer, but learn to think logically and creatively.",
      promo_list: ["Simple and easy-to-understand lessons", "Games that teach you programming", "Free help from our mentors"],
      promo_btn: "View Project",
      cta_title: "Together we are better.",
      cta_desc: "If you want to help as a volunteer or support our projects for children financially, we warmly welcome you to our community.",
      cta_btn_1: "I want to help",
      cta_btn_2: "Donate now"
    }
  };

  const t = content[lang];

  return (
    <div className="space-y-24 pb-20">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-bg hero-home">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,146,30,0.12),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(192,72,34,0.08),transparent)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent font-bold text-xs uppercase tracking-widest mb-8 border border-brand-accent/20 backdrop-blur-sm">
                {t.hero_tag}
              </span>
              <h1 className="text-5xl md:text-8xl font-bold text-brand-primary leading-[1.05] mb-8 font-serif">
                {t.hero_title_1} <br />
                <span className="text-brand-secondary italic">{t.hero_title_2}</span>
              </h1>
              <p className="text-xl text-brand-primary/80 mb-12 leading-relaxed max-w-xl font-medium">
                {t.hero_desc}
              </p>
              <div className="flex flex-wrap gap-5">
                <NavLink to="doneaza" className="bg-brand-secondary text-white px-10 py-5 rounded-full font-bold shadow-2xl shadow-brand-secondary/30 flex items-center gap-2 hover:bg-brand-primary transition-all transform hover:-translate-y-1">
                  {t.hero_btn_1} <Heart className="w-5 h-5 fill-current" />
                </NavLink>
                <NavLink to="despre" className="bg-white text-brand-primary border border-brand-gold/40 px-10 py-5 rounded-full font-bold flex items-center gap-2 hover:bg-brand-warm transition-all shadow-lg">
                  {t.hero_btn_2} <ChevronRight className="w-5 h-5" />
                </NavLink>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="absolute inset-0 bg-brand-gold/10 rounded-full blur-[100px] animate-pulse"></div>
              <Logo className="w-[450px] h-[450px] relative z-10 drop-shadow-[0_20px_40px_rgba(93,58,26,0.15)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-brand-primary font-serif italic">{t.features_title}</h2>
          <div className="h-2 w-32 bg-gradient-to-r from-brand-secondary via-brand-gold to-brand-accent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Laptop className="w-10 h-10 text-brand-accent" />, title: t.f1_title, desc: t.f1_desc, accent: "border-brand-accent" },
            { icon: <BookOpen className="w-10 h-10 text-brand-secondary" />, title: t.f2_title, desc: t.f2_desc, accent: "border-brand-secondary" },
            { icon: <Users className="w-10 h-10 text-brand-gold" />, title: t.f3_title, desc: t.f3_desc, accent: "border-brand-gold" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-white p-12 rounded-[3rem] organic-shadow border-b-8 ${item.accent} hover:-translate-y-2 transition-all`}>
              <div className="mb-8 p-5 bg-brand-light inline-block rounded-3xl">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-6 text-brand-primary font-serif">{item.title}</h3>
              <p className="text-brand-primary/70 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary py-24 border-y-[12px] border-brand-gold/20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden organic-shadow border-4 border-white/10">
              <img src="/imagini/info_17.jpeg" className="w-full h-full object-cover" alt="Course" />
              <div className="absolute bottom-10 left-10"><span className="bg-brand-gold text-brand-primary px-4 py-1.5 rounded-full font-bold text-xs uppercase">{t.promo_badge}</span></div>
            </div>
            <div className="text-brand-warm">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif italic text-white">{t.promo_title}</h2>
              <p className="text-brand-warm/60 text-lg mb-10 leading-relaxed font-medium">{t.promo_desc}</p>
              <ul className="space-y-5 mb-12">
                {t.promo_list.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/90 font-bold"><div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center"><ChevronRight size={14} /></div>{item}</li>
                ))}
              </ul>
              <NavLink to="proiecte" className="bg-brand-gold text-brand-primary px-10 py-5 rounded-full font-bold hover:bg-white transition-all inline-flex items-center gap-3">{t.promo_btn} <ArrowRight size={20} /></NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-brand-warm rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden organic-shadow border border-brand-gold/20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-brand-primary font-serif">{t.cta_title}</h2>
          <p className="text-brand-primary/60 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">{t.cta_desc}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <NavLink to="voluntariat" className="bg-brand-accent text-white px-12 py-5 rounded-full font-bold hover:bg-brand-primary transition-all shadow-xl">{t.cta_btn_1}</NavLink>
            <NavLink to="doneaza" className="bg-brand-secondary text-white px-12 py-5 rounded-full font-bold hover:bg-brand-primary transition-all shadow-xl">{t.cta_btn_2}</NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
