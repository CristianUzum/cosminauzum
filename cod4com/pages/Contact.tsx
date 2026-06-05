
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Building, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage, NavLink } from '../AppContext';

const Contact: React.FC = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: lang === 'ro' ? 'Informații generale' : 'General Information',
    message: '',
    consent: false
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const phoneNumber = "40733402340";

  const content = {
    ro: {
      tag: "Suntem aici pentru tine",
      title: "Contactează-ne",
      desc: "Fie că ești părinte, viitor voluntar sau partener, scrie-ne și hai să construim împreună.",
      info_title: "Informații Directe",
      write_to: "Scrie-ne la:",
      response_time: "Răspundem în 24h",
      call_to: "Sună-ne la:",
      working_hours: "L - V: 09:00 - 18:00",
      visit_us: "Ne găsiți la:",
      address_details: "Etajul 2, Biroul 37, Reșița",
      form_title: "Trimite-ne un mesaj detaliat",
      form_consent: "Confirm că am citit și sunt de acord cu politica de prelucrare a datelor cu caracter personal.",
      form_placeholder_name: "Numele tău",
      form_placeholder_msg: "Cum te putem ajuta?",
      form_sending: "Se procesează...",
      form_sent: "Mesaj Trimis prin WhatsApp!",
      form_btn: "Trimite pe WhatsApp",
      legal_link: "Politica GDPR",
      map_tag: "Locație exactă",
      map_title: "Blocul Fetelor"
    },
    en: {
      tag: "We're here for you",
      title: "Contact Us",
      desc: "Whether you're a parent, a future volunteer, or a partner, write to us and let's build together.",
      info_title: "Direct Information",
      write_to: "Email us at:",
      response_time: "We reply in 24h",
      call_to: "Call us at:",
      working_hours: "Mon - Fri: 09:00 - 18:00",
      visit_us: "Visit us at:",
      address_details: "2nd Floor, Office 37, Reșița",
      form_title: "Send us a detailed message",
      form_consent: "I confirm that I have read and agree to the personal data processing policy.",
      form_placeholder_name: "Your name",
      form_placeholder_msg: "How can we help you?",
      form_sending: "Processing...",
      form_sent: "Message Sent via WhatsApp!",
      form_btn: "Send on WhatsApp",
      legal_link: "GDPR Policy",
      map_tag: "Exact location",
      map_title: "Blocul Fetelor"
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

    const text = `Bună! Mă numesc *${formData.name}*.\n\n*Subiect:* ${formData.subject}\n*Mesaj:* ${formData.message}\n\n*Email:* ${formData.email}\n*GDPR:* Acceptat.`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 800);
  };

  return (
    <div className="pb-24">
      <section className="relative py-24 mb-20 hero-bg hero-contact border-b border-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6 border border-brand-primary/20">
            {t.tag}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif italic text-brand-primary">{t.title}</h1>
          <p className="text-xl text-brand-primary/70 max-w-2xl mx-auto leading-relaxed font-medium">
            {t.desc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 space-y-10">
           <h2 className="text-4xl font-bold mb-10 text-brand-primary font-serif italic">{t.info_title}</h2>
           
           <div className="flex gap-6 items-start group">
              <div className="bg-brand-secondary/10 p-5 rounded-2xl text-brand-secondary group-hover:scale-110 transition-transform shadow-sm">
                 <Mail className="w-7 h-7" />
              </div>
              <div>
                 <h4 className="font-bold text-xl text-brand-primary font-serif mb-1">{t.write_to}</h4>
                 <p className="text-brand-primary/70 font-medium">codpentrucomunitate@gmail.com</p>
                 <p className="text-brand-secondary text-sm font-bold uppercase tracking-wider mt-1 italic">{t.response_time}</p>
              </div>
           </div>

           <div className="flex gap-6 items-start group">
              <div className="bg-brand-accent/10 p-5 rounded-2xl text-brand-accent group-hover:scale-110 transition-transform shadow-sm">
                 <Phone className="w-7 h-7" />
              </div>
              <div>
                 <h4 className="font-bold text-xl text-brand-primary font-serif mb-1">{t.call_to}</h4>
                 <p className="text-brand-primary/70 font-medium">+40 733 402 340</p>
                 <p className="text-brand-accent text-sm font-bold uppercase tracking-wider mt-1 italic">{t.working_hours}</p>
              </div>
           </div>

           <div className="flex gap-6 items-start group">
              <div className="bg-brand-gold/10 p-5 rounded-2xl text-brand-gold group-hover:scale-110 transition-transform shadow-sm">
                 <MapPin className="w-7 h-7" />
              </div>
              <div>
                 <h4 className="font-bold text-xl text-brand-primary font-serif mb-1">{t.visit_us}</h4>
                 <p className="text-brand-primary font-bold">Blocul Fetelor</p>
                 <p className="text-brand-primary/70 font-medium italic">{t.address_details}</p>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2">
           <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-brand-gold/5 organic-shadow">
              <h3 className="text-3xl font-bold mb-10 text-brand-primary font-serif italic">{t.form_title}</h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="block text-sm font-bold text-brand-primary/60 uppercase tracking-widest mb-3">Nume</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 focus:ring-2 focus:ring-brand-secondary outline-none font-medium" placeholder={t.form_placeholder_name} />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-brand-primary/60 uppercase tracking-widest mb-3">Email</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 focus:ring-2 focus:ring-brand-secondary outline-none font-medium" placeholder="email@address.com" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-brand-primary/60 uppercase tracking-widest mb-3">Mesaj</label>
                   <textarea name="message" required value={formData.message} onChange={handleChange} rows={6} className="w-full px-6 py-4 rounded-2xl bg-brand-warm/50 border border-brand-gold/10 focus:ring-2 focus:ring-brand-secondary outline-none font-medium" placeholder={t.form_placeholder_msg}></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" name="consent" id="consent_contact" required checked={formData.consent} onChange={handleChange} className="mt-1 w-5 h-5 rounded border-brand-gold text-brand-secondary focus:ring-brand-secondary" />
                  <label htmlFor="consent_contact" className="text-xs font-bold text-brand-primary/60 leading-tight">
                    {t.form_consent} <NavLink to="privacy" className="text-brand-accent underline">{t.legal_link}</NavLink>
                  </label>
                </div>

                <button type="submit" disabled={isSending} className={`w-full ${isSent ? 'bg-brand-accent' : 'bg-brand-secondary'} text-white py-5 rounded-2xl font-bold text-xl hover:bg-brand-primary transition-all shadow-xl flex items-center justify-center gap-4 group disabled:opacity-70`}>
                   {isSending ? t.form_sending : isSent ? <>{t.form_sent} <CheckCircle2 className="w-6 h-6" /></> : <>{t.form_btn} <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>}
                </button>
              </form>
           </div>
        </div>
      </div>

      {/* Interactive Google Map Section */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
         <div className="relative group">
            {/* Soft decorative glow behind the map */}
            <div className="absolute -inset-4 bg-brand-gold/10 rounded-[5rem] blur-2xl group-hover:bg-brand-gold/20 transition-all opacity-50"></div>
            
            <div className="w-full h-[600px] bg-brand-warm rounded-[4rem] overflow-hidden relative shadow-2xl border-8 border-white organic-shadow z-10 group-hover:border-brand-light transition-all">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.6776585726584!2d21.87780487736416!3d45.29473504472822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47502b84610ac93d%3A0xe53d39656561afaa!2sAsocia%C5%A3ia%20Cod%20pentru%20Comunitate!5e0!3m2!1sro!2sro!4v1770981608473!5m2!1sro!2sro" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Locație Asociația Cod pentru Comunitate"
                className="grayscale-[0.1] contrast-[1.05]"
               ></iframe>

               {/* Location Card Overlay */}
               <div className="absolute bottom-8 left-8 right-8 md:right-auto bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-brand-gold/20 flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-10 duration-1000">
                  <div className="bg-brand-primary text-white p-4 rounded-3xl shadow-lg shadow-brand-primary/20">
                     <Building size={32} />
                  </div>
                  <div>
                     <p className="font-bold text-brand-gold text-xs uppercase tracking-[0.2em] mb-1">{t.map_tag}</p>
                     <h4 className="text-brand-primary font-serif font-bold text-2xl mb-1 italic">{t.map_title}</h4>
                     <p className="text-brand-primary/70 font-medium text-lg leading-tight">{t.address_details}</p>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-brand-gold/20 mx-2"></div>
                  <a 
                    href="https://maps.app.goo.gl/AsociațiaCodComunitate" 
                    target="_blank" 
                    className="bg-brand-secondary/10 text-brand-secondary p-4 rounded-2xl hover:bg-brand-secondary hover:text-white transition-all group/btn"
                  >
                     <ExternalLink size={24} className="group-hover/btn:scale-110 transition-transform" />
                  </a>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
