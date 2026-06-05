
import React from 'react';
import { Shield, Book, Laptop, Users, Calendar, Award, Globe, HeartHandshake } from 'lucide-react';
import { Logo, useLanguage } from '../AppContext';

const About: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    ro: {
      tag: "Povestea Noastră",
      title: "Misiunea Noastră",
      intro: "Cod pentru Comunitate s-a născut din dorința de a oferi resurse digitale egale pentru toți, împletind rigoarea tehnică cu frumusețea culturii clasice românești și respectul pentru diversitate.",
      established: "Înființată în Decembrie 2025",
      story_title: "O poveste despre tech și spirit comunitar",
      story_p1: "Asociația noastră a fost creată într-un context în care digitalizarea era o necesitate, nu o opțiune. Totuși, am observat că mulți pierd contactul cu rădăcinile culturale și valorile umane fundamentale în acest proces rapid.",
      story_p2: "Ne-am asumed un dublu rol: arhitecți ai lumii digitale pentru instituții și ONG-uri mici, dar și gardieni ai limbii române și ai literaturii clasice prin resurse educaționale inovatoare.",
      values_title: "Valorile Care Ne Ghidează",
      v1_t: "Diversitate și Incluziune",
      v1_d: "Suntem o punte între culturi. Susținem minoritățile din România – de la comunitățile de sârbi, croați și germani, până la integrarea comunității rome.",
      v2_t: "Antirasism și Egalitate",
      v2_d: "Luptăm activ împotriva discriminării. Credem într-un viitor în care originea etnică nu limitează accesul la tehnologie sau educație.",
      v3_t: "Susținerea Femeilor",
      v3_d: "Încurajăm fetele și femeile să intre în domeniul STEM, oferindu-le mentorat și acces la cursuri gratuite.",
      v4_t: "Digitalizare Etică",
      v4_d: "Nu doar construim site-uri, ci oferim soluții care să reziste în timp și să servească interesul public.",
      v5_t: "Tezaur Cultural",
      v5_d: "Promovăm literatura clasică română și folosirea corectă a limbii române ca element de unitate.",
      v6_t: "Excelență Academică",
      v6_d: "Oferim standarde de învățare ridicate prin proiecte ca Informatica Interactivă, făcând performanța accesibilă."
    },
    en: {
      tag: "Our Story",
      title: "Our Mission",
      intro: "Code for Community was born from the desire to provide equal digital resources for all, blending technical rigor with the beauty of Romanian culture and respect for diversity.",
      established: "Established in December 2025",
      story_title: "A story about tech and community spirit",
      story_p1: "Our association was created in a context where digitalization was a necessity, not an option. However, we noticed that many lose contact with cultural roots and fundamental values.",
      story_p2: "We took on a double role: architects of the digital world for small NGOs and institutions, but also guardians of the Romanian language and classical literature through tech.",
      values_title: "Values That Guide Us",
      v1_t: "Diversity & Inclusion",
      v1_d: "We are a bridge between cultures. We support minorities in Romania – from Serbian and German communities to the integration of Roma groups.",
      v2_t: "Anti-racism & Equality",
      v2_d: "We actively fight against discrimination. We believe in a future where ethnic origin doesn't limit access to technology or education.",
      v3_t: "Empowering Women",
      v3_d: "We encourage girls and women to enter STEM fields, offering them mentorship and access to free courses.",
      v4_t: "Ethical Digitalization",
      v4_d: "We don't just build websites; we provide solutions that last and serve the public interest.",
      v5_t: "Cultural Heritage",
      v5_d: "We promote classical Romanian literature and the correct use of the language as an element of unity.",
      v6_t: "Academic Excellence",
      v6_d: "We provide high learning standards through projects like Interactive Informatics, making performance accessible."
    }
  };

  const t = content[lang];

  return (
    <div className="pb-24">
      <section className="relative pt-32 pb-24 hero-bg hero-about overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest mb-6 border border-brand-gold/20 backdrop-blur-sm">{t.tag}</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-serif italic text-brand-primary leading-tight">{t.title}</h1>
          <p className="text-xl text-brand-primary/70 max-w-3xl mx-auto leading-relaxed font-medium">{t.intro}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-32 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-brand-secondary font-bold uppercase tracking-widest text-sm"><Calendar className="w-5 h-5" /> {t.established}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary font-serif leading-tight">{t.story_title}</h2>
            <p className="text-lg text-brand-primary/70 leading-relaxed font-medium">{t.story_p1}</p>
            <p className="text-lg text-brand-primary/70 leading-relaxed font-medium">{t.story_p2}</p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-yellow-100/50 rounded-[3rem] blur-2xl group-hover:bg-brand-secondary/10 transition-colors"></div>
            <img src="../imagini/info_9.png" className="rounded-[3rem] shadow-2xl relative z-10 border-4 border-white" alt="Team" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-light p-4 rounded-full z-20 shadow-xl border border-brand-gold/20 flex items-center justify-center animate-bounce-slow"><Logo className="w-full h-full" /></div>
          </div>
        </div>

        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-serif italic text-brand-primary">{t.values_title}</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-brand-secondary via-brand-gold to-brand-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Globe />, title: t.v1_t, desc: t.v1_d, accent: "border-brand-gold/20 hover:border-brand-gold" },
              { icon: <HeartHandshake />, title: t.v2_t, desc: t.v2_d, accent: "border-brand-accent/20 hover:border-brand-accent" },
              { icon: <Users />, title: t.v3_t, desc: t.v3_d, accent: "border-brand-secondary/20 hover:border-brand-secondary" },
              { icon: <Laptop />, title: t.v4_t, desc: t.v4_d, accent: "border-brand-accent/20 hover:border-brand-accent" },
              { icon: <Book />, title: t.v5_t, desc: t.v5_d, accent: "border-brand-secondary/20 hover:border-brand-secondary" },
              { icon: <Award />, title: t.v6_t, desc: t.v6_d, accent: "border-brand-gold/20 hover:border-brand-gold" }
            ].map((value, idx) => (
              <div key={idx} className={`p-10 rounded-[2.5rem] bg-white border ${value.accent} organic-shadow transition-all group hover:shadow-2xl`}>
                <div className="text-brand-secondary mb-8 p-4 bg-brand-light inline-block rounded-2xl group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 font-serif text-brand-primary">{value.title}</h3>
                <p className="text-brand-primary/70 leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
