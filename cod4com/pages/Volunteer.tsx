
import React, { useState } from 'react';
import { Heart, Users, Check, MessageSquare, ChevronRight, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage, NavLink } from '../AppContext';

const Volunteer: React.FC = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: lang === 'ro' ? 'Programare / Web Design' : 'Coding / Web Design',
    motivation: '',
    consent: false
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const content = {
    ro: {
      tag: "Alătură-te Echipei",
      title: "Fii o frunză în copacul nostru",
      intro: "Ești pasionat de tehnologie, literatură sau pur și simplu vrei să ajuți comunitatea?",
      why_title: "De ce să vii cu noi?",
      b1_t: "Impact Direct",
      b1_d: "Vei lucra la proiecte care ajută oameni reali – elevi sau ONG-uri.",
      b2_t: "Creștere Profesională",
      b2_d: "Vei înveți de la seniori în programare, design și management.",
      b3_t: "Comunitate Valoroasă",
      b3_d: "Vei face parte dintr-un grup de oameni pasionați.",
      q_title: "Ai întrebări?",
      q_desc: "Echipa noastră îți stă la dispoziție pentru orice detaliu.",
      form_title: "Formular de Înscriere",
      form_name: "Nume complet",
      form_email: "Email",
      form_domain: "Domeniu de interes",
      form_msg: "De ce vrei să te alături?",
      form_consent: "Sunt de acord ca datele mele să fie prelucrate conform politicilor GDPR pentru procesarea candidaturii.",
      form_btn: "Trimite prin WhatsApp",
      form_sending: "Se trimite...",
      form_success: "Candidatură Trimisă!",
      legal_link: "Vezi Politica de Confidențialitate"
    },
    en: {
      tag: "Join the Team",
      title: "Be a leaf on our tree",
      intro: "Are you passionate about technology, literature, or simply want to help the community?",
      why_title: "Why join us?",
      b1_t: "Direct Impact",
      b1_d: "You will work on projects that help real people – students or NGOs.",
      b2_t: "Professional Growth",
      b2_d: "You will learn from seniors in coding, design, and management.",
      b3_t: "Valuable Community",
      b3_d: "You will be part of a passionate group of people.",
      q_title: "Any questions?",
      q_desc: "Our team is here to help you with any details.",
      form_title: "Application Form",
      form_name: "Full Name",
      form_email: "Email",
      form_domain: "Field of interest",
      form_msg: "Why do you want to join?",
      form_consent: "I agree to my data being processed according to GDPR policies for application processing.",
      form_btn: "Send via WhatsApp",
      form_sending: "Sending...",
      form_success: "Application Sent!",
      legal_link: "View Privacy Policy"
    }
  };

  const t = content[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert(lang === 'ro' ? "Vă rugăm să acceptați condițiile GDPR." : "Please accept the GDPR terms.");
      return;
    }
    setIsSending(true);
    const phoneNumber = "40733402340";
    const msg = `Bună! Vreau să fiu voluntar.\n\n*Nume:* ${formData.name}\n*Interes:* ${formData.interest}\n*Motivație:* ${formData.motivation}\n*GDPR:* Consimțământ acordat.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsSending(false); setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="pb-24">
      <section className="relative py-24 mb-20 hero-bg hero-volunteer border-b border-brand-accent/10">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent font-bold text-xs uppercase tracking-widest mb-6 border border-brand-accent/20">{t.tag}</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif italic text-brand-primary">{t.title}</h1>
          <p className="text-xl text-brand-primary/70 max-w-3xl mx-auto leading-relaxed font-medium">{t.intro}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-bold mb-10 text-brand-primary font-serif italic">{t.why_title}</h2>
          <div className="space-y-10">
            {[
              { title: t.b1_t, desc: t.b1_d, iconBg: "bg-brand-accent/10", iconColor: "text-brand-accent" },
              { title: t.b2_t, desc: t.b2_d, iconBg: "bg-brand-secondary/10", iconColor: "text-brand-secondary" },
              { title: t.b3_t, desc: t.b3_d, iconBg: "bg-brand-gold/10", iconColor: "text-brand-gold" }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-6 group">
                <div className={`mt-1 ${benefit.iconBg} p-4 rounded-2xl ${benefit.iconColor} h-fit`}><Check className="w-6 h-6" /></div>
                <div><h4 className="font-bold text-2xl mb-3 text-brand-primary font-serif">{benefit.title}</h4><p className="text-brand-primary/70 leading-relaxed font-medium text-lg">{benefit.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-brand-warm p-10 rounded-[3rem] border border-brand-gold/10">
            <h4 className="font-bold text-2xl text-brand-primary font-serif mb-4">{t.q_title}</h4>
            <p className="text-brand-primary/70 mb-6 font-medium text-lg leading-relaxed">{t.q_desc}</p>
            <a href="mailto:codpentrucomunitate@gmail.com" className="text-brand-secondary font-bold text-lg hover:gap-4 transition-all">codpentrucomunitate@gmail.com <ChevronRight className="w-5 h-5 inline" /></a>
          </div>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-brand-gold/5 organic-shadow">
          <h3 className="text-3xl font-bold mb-10 text-brand-primary font-serif italic">{t.form_title}</h3>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div><label className="block text-sm font-bold text-brand-primary/60 uppercase mb-3">{t.form_name}</label><input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 outline-none" placeholder="Name" /></div>
              <div><label className="block text-sm font-bold text-brand-primary/60 uppercase mb-3">{t.form_email}</label><input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 outline-none" placeholder="Email" /></div>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-primary/60 uppercase mb-3">{t.form_domain}</label>
              <select name="interest" value={formData.interest} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 outline-none appearance-none">
                <option>{lang === 'ro' ? 'Programare / Web Design' : 'Coding / Web Design'}</option>
                <option>{lang === 'ro' ? 'Educație / Mentorat' : 'Education / Mentoring'}</option>
                <option>{lang === 'ro' ? 'Limba Română & Literatură' : 'Romanian Language & Literature'}</option>
              </select>
            </div>
            <div><label className="block text-sm font-bold text-brand-primary/60 uppercase mb-3">{t.form_msg}</label><textarea name="motivation" required value={formData.motivation} onChange={handleChange} rows={4} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 outline-none" placeholder="Motivation..."></textarea></div>

            <div className="flex items-start gap-3">
              <input type="checkbox" name="consent" id="consent" required checked={formData.consent} onChange={handleChange} className="mt-1 w-5 h-5 rounded border-brand-gold text-brand-accent focus:ring-brand-accent" />
              <label htmlFor="consent" className="text-xs font-bold text-brand-primary/60 leading-tight">
                {t.form_consent} <NavLink to="privacy" className="text-brand-secondary underline">{t.legal_link}</NavLink>
              </label>
            </div>

            <button type="submit" disabled={isSending} className={`w-full ${isSent ? 'bg-brand-gold' : 'bg-brand-accent'} text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3`}>
              {isSending ? t.form_sending : isSent ? t.form_success : <>{t.form_btn} <Heart className="w-6 h-6 fill-current" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
