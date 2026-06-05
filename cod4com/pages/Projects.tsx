
import React from 'react';
import { ExternalLink, CheckCircle, Monitor, Building2, BookOpen, ChevronRight, Heart, Users, ShieldCheck, Cpu, Camera } from 'lucide-react';
import { NavLink, useLanguage } from '../AppContext';

const Projects: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    ro: {
      tag: "Impactul nostru",
      title: "Proiectele Noastre",
      intro: "De la educație gratuită la digitalizarea infrastructurii civice, fiecare proiect este o cărămidă la fundația unei comunități mai puternice.",
      main_tag: "Parteneriat Educațional",
      main_title: "Informatica Interactivă",
      main_desc: "În colaborare cu Colegiul Național „Diaconovici-Tietz” din Reșița, organizăm cursuri gratuite pentru elevii din clasele primare.",
      main_list: [
        "Alfabetizare digitală: utilizarea PC-ului",
        "Învățarea programării prin joacă",
        "Integrare multidisciplinară (Engleză/Matematică)",
        "Dezvoltare personală și logică"
      ],
      main_btn: "Află cum poți înscrie copilul",
      card1_t: "Web Design & Development pentru ONG-uri",
      card1_d: "Oferim gratuit servicii de design, dezvoltare web, consultanță și optimizare SEO pentru asociații mici care doresc o prezență online de impact. Ne concentrăm pe integrarea soluțiilor de donații și training pentru autonomie digitală.",
      card1_list: [
        "Design & Development gratuit",
        "Donații online integrate",
        "Optimizare SEO avansată",
        "Training dedicat de utilizare"
      ],
      card2_t: "Digitalizarea Instituțiilor",
      card2_d: "Colaborăm cu instituții publice mici pentru a implementa soluții digitale moderne care să reducă birocrația. Creăm interfețe prietenoase care facilitează accesul cetățenilor la informații esențiale.",
      card2_list: [
        "Securitate date & Performanță",
        "Interfețe accesibile",
        "Suport tehnic dedicat",
        "Consultanță digitalizare"
      ],
      recent_title: "Activități și Impact Recent",
      p1_t: "Siguranță Cibernetică pentru Seniori",
      p1_d: "Primul atelier realizat în parteneriat cu Centrul de Servicii de Asistență Socială pentru Persoane Vârstnice și Direcția de Asistență Socială Reșița.",
      p2_t: "Mentoratul la Centrul ABC",
      p2_d: "Ore de mentorat și ajutor la teme pentru copiii de la Centrul de zi ABC, oferind sprijin educațional și digital.",
      p3_t: "Ziua Jandarmeriei cu LEGO",
      p3_d: "Prezentarea unui proiect creativ din piese LEGO tuturor copiilor prezenți la Ziua Jandarmeriei, stimulând curiozitatea tehnică.",
      p4_t: "Comunitatea în Mișcare (30 Mai)",
      p4_d: "Participăm pe 30 mai pentru a susține cauza „Micii Programatori din Reșița” și a promova educația digitală.",
      recent_btn: "Vezi Galeria Foto"
    },
    en: {
      tag: "Our Impact",
      title: "Our Projects",
      intro: "From free education to civic digitalization, every project is a brick in the foundation of a stronger community.",
      main_tag: "Educational Partnership",
      main_title: "Interactive Informatics",
      main_desc: "In collaboration with the 'Diaconovici-Tietz' National College in Resita, we organize free courses for primary school students.",
      main_list: [
        "Digital literacy: PC usage",
        "Learning coding through play",
        "Multidisciplinary integration (English/Math)",
        "Personal development and logic"
      ],
      main_btn: "Learn how to enroll your child",
      card1_t: "Web Design & Development for NGOs",
      card1_d: "We offer free design, web development, consulting, and SEO optimization for small associations wanting an impactful online presence. We focus on integrating donation solutions and training for digital autonomy.",
      card1_list: [
        "Free Design & Development",
        "Integrated online donations",
        "Advanced SEO optimization",
        "Dedicated usage training"
      ],
      card2_t: "Institutional Digitalization",
      card2_d: "We collaborate with small public institutions to implement modern digital solutions that reduce bureaucracy. We create user-friendly interfaces that facilitate citizen access to essential information.",
      card2_list: [
        "Data Security & Performance",
        "Accessible interfaces",
        "Dedicated technical support",
        "Digitalization consultancy"
      ],
      recent_title: "Recent Activities & Impact",
      p1_t: "Cyber Security for Seniors",
      p1_d: "The first workshop held in partnership with the Social Services Center for the Elderly and the Resita Social Assistance Directorate.",
      p2_t: "Mentorship at ABC Center",
      p2_d: "Mentoring hours and homework help for children at the ABC Day Center, providing educational and digital support.",
      p3_t: "Gendarmerie Day with LEGO",
      p3_d: "Presenting a creative project made of LEGO pieces to all children present at Gendarmerie Day, stimulating technical curiosity.",
      p4_t: "Community in Motion (May 30th)",
      p4_d: "Participating on May 30th to support the 'Tiny Programmers of Resita' cause and promote digital education.",
      recent_btn: "View Photo Gallery"
    }
  };

  const t = content[lang];

  return (
    <div className="pb-24">
      <section className="relative pt-32 pb-24 hero-bg hero-projects overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/10 text-brand-secondary font-bold text-xs uppercase tracking-widest mb-6 border border-brand-secondary/20 backdrop-blur-sm">{t.tag}</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-serif italic text-brand-primary leading-tight">{t.title}</h1>
          <p className="text-xl text-brand-primary/70 max-w-3xl mx-auto leading-relaxed font-medium">{t.intro}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-24 mt-10">
        {/* Proiect Principal: Informatica Interactivă */}
        <div className="bg-white rounded-[3rem] organic-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-brand-gold/10 group">
          <div className="p-12 lg:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-brand-accent font-bold mb-6 uppercase tracking-widest text-sm"><Users className="w-4 h-4" /> {t.main_tag}</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif italic text-brand-primary leading-tight">{t.main_title}</h2>
            <p className="text-lg text-brand-primary/70 mb-8 leading-relaxed font-medium">{t.main_desc}</p>
            <div className="space-y-4 mb-10">
              {t.main_list.map((text, i) => (
                <div key={i} className="flex items-center gap-3"><div className="bg-brand-accent/20 p-1 rounded-full flex-shrink-0"><CheckCircle className="text-brand-accent w-5 h-5" /></div><span className="text-brand-primary/80 font-bold">{text}</span></div>
              ))}
            </div>
            <NavLink to="contact" className="bg-brand-secondary text-white font-bold py-5 px-10 rounded-full hover:bg-brand-primary transition-all flex items-center justify-center gap-3 shadow-xl transform group-hover:-translate-y-1">{t.main_btn} <ChevronRight className="w-5 h-5" /></NavLink>
          </div>
          <div className="bg-brand-warm flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
            <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white z-10"><img src="/imagini/info_17.jpeg" className="w-full h-full object-cover" alt="Course" /></div>
          </div>
        </div>

        {/* Alte arii - Carduri cu înălțime egală */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {/* Card 1: Web Design & Development */}
          <div className="bg-brand-warm p-12 rounded-[3rem] border border-brand-gold/10 organic-shadow group hover:bg-white transition-colors flex flex-col h-full">
            <div className="bg-brand-gold text-white w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-brand-gold/20 group-hover:scale-110 transition-transform flex-shrink-0">
              <Building2 size={36} />
            </div>
            <h3 className="text-3xl font-bold mb-6 font-serif text-brand-primary italic">{t.card1_t}</h3>
            <p className="text-brand-primary/70 mb-8 leading-relaxed font-medium text-lg flex-grow">
              {t.card1_d}
            </p>
            <ul className="space-y-4 font-bold text-brand-primary/80 mt-auto">
              {t.card1_list.map((item, i) => (
                <li key={i} className="flex items-center gap-3"><ChevronRight className="text-brand-gold w-5 h-5" /> {item}</li>
              ))}
            </ul>
          </div>

          {/* Card 2: Instituții Publice */}
          <div className="bg-brand-primary p-12 rounded-[3rem] border border-white/5 organic-shadow group flex flex-col h-full">
            <div className="bg-brand-secondary text-white w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-brand-secondary/40 group-hover:scale-110 transition-transform flex-shrink-0">
              <Monitor size={36} />
            </div>
            <h3 className="text-3xl font-bold mb-6 font-serif text-white italic">{t.card2_t}</h3>
            <p className="text-white/70 mb-8 leading-relaxed font-medium text-lg flex-grow">
              {t.card2_d}
            </p>
            <ul className="space-y-4 font-bold text-white/80 mt-auto">
              {t.card2_list.map((item, i) => (
                <li key={i} className="flex items-center gap-3"><ChevronRight className="text-brand-secondary w-5 h-5" /> {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secțiunea Activități Recente */}
        <section className="pt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-primary font-serif italic mb-6">{t.recent_title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { t: t.p1_t, d: t.p1_d, icon: <ShieldCheck className="text-brand-accent" /> },
              { t: t.p2_t, d: t.p2_d, icon: <BookOpen className="text-brand-secondary" /> },
              { t: t.p3_t, d: t.p3_d, icon: <Cpu className="text-brand-gold" /> },
              { t: t.p4_t, d: t.p4_d, icon: <Heart className="text-red-500" /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] organic-shadow border border-brand-warm flex flex-col gap-4 group hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-brand-warm flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-primary font-serif italic">{item.t}</h3>
                <p className="text-brand-primary/70 text-sm font-medium leading-relaxed italic">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <NavLink to="galerie" className="inline-flex items-center gap-3 bg-brand-uway text-white px-10 py-5 rounded-full font-bold hover:bg-brand-primary transition-all shadow-xl hover:-translate-y-1">
              <Camera className="w-5 h-5" />
              {t.recent_btn}
              <ChevronRight className="w-5 h-5" />
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
