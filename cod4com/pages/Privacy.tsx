
import React from 'react';
import { useLanguage, NavLink } from '../AppContext';
import { ShieldCheck, Lock, Eye, FileText, UserCheck, Trash2, Mail } from 'lucide-react';

const Privacy: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    ro: {
      title: "Politica de Confidențialitate",
      subtitle: "Protecția datelor tale este prioritatea noastră.",
      intro: "Conform Regulamentului (UE) 2016/679 (GDPR), Asociația Cod pentru Comunitate se angajează să gestioneze datele tale personale în siguranță și doar pentru scopurile specificate.",
      s1_t: "1. Cine suntem?",
      s1_d: "Operatorul de date este Asociația Cod pentru Comunitate, cu sediul în Reșița, România. Ne puteți contacta pentru orice întrebare legată de datele dvs. la codpentrucomunitate@gmail.com.",
      s2_t: "2. Ce date colectăm?",
      s2_d: "Colectăm datele pe care ni le furnizați direct prin formularele de pe site sau prin comunicarea directă: Nume, prenume, adresă de e-mail, număr de telefon și orice detalii incluse în mesajele de motivare sau contact.",
      s3_t: "3. Scopul prelucrării",
      s3_d: "Datele sunt prelucrate exclusiv pentru: gestionarea candidaturilor de voluntariat, răspunsul la solicitările de contact, procesarea donațiilor și transmiterea informațiilor administrative legate de proiectele noastre.",
      s4_t: "4. Temeiul legal",
      s4_d: "Prelucrarea se bazează pe consimțământul dvs. explicit (art. 6 alin. 1 lit. a din GDPR) oferit în momentul trimiterii formularelor, sau pe necesitatea executării unui contract/acord de voluntariat.",
      s5_t: "5. Drepturile dumneavoastră",
      s5_l: [
        "Dreptul de acces la datele stocate.",
        "Dreptul la rectificarea datelor inexacte.",
        "Dreptul la ștergerea datelor („dreptul de a fi uitat”).",
        "Dreptul la restricționarea prelucrării.",
        "Dreptul de a vă retrage consimțământul în orice moment."
      ],
      s6_t: "6. Securitatea datelor",
      s6_d: "Implementăm măsuri tehnice și organizatorice avansate pentru a preveni accesul neautorizat, pierderea sau alterarea datelor dvs. personale.",
      footer_msg: "Pentru exercitarea acestor drepturi, vă rugăm să ne trimiteți o cerere scrisă pe e-mail."
    },
    en: {
      title: "Privacy Policy",
      subtitle: "Your data protection is our priority.",
      intro: "According to Regulation (EU) 2016/679 (GDPR), Code for Community Association is committed to managing your personal data safely and only for specified purposes.",
      s1_t: "1. Who are we?",
      s1_d: "The data controller is the Code for Community Association, based in Reșița, Romania. You can contact us for any data-related questions at codpentrucomunitate@gmail.com.",
      s2_t: "2. What data do we collect?",
      s2_d: "We collect data you provide directly through site forms or direct communication: Name, surname, email address, phone number, and any details included in motivation or contact messages.",
      s3_t: "3. Purpose of processing",
      s3_d: "Data is processed exclusively for: managing volunteer applications, responding to contact requests, processing donations, and sending administrative information related to our projects.",
      s4_t: "4. Legal basis",
      s4_d: "Processing is based on your explicit consent (Art. 6 para. 1 letter a of the GDPR) provided when sending forms, or on the necessity of executing a volunteer contract/agreement.",
      s5_t: "5. Your rights",
      s5_l: [
        "Right of access to stored data.",
        "Right to rectify inaccurate data.",
        "Right to erasure ('right to be forgotten').",
        "Right to restriction of processing.",
        "Right to withdraw consent at any time."
      ],
      s6_t: "6. Data security",
      s6_d: "We implement advanced technical and organizational measures to prevent unauthorized access, loss, or alteration of your personal data.",
      footer_msg: "To exercise these rights, please send us a written request by email."
    }
  };

  const t = content[lang];

  return (
    <div className="pb-24">
      <section className="relative py-24 mb-16 hero-bg hero-legal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest mb-6 border border-brand-gold/20 backdrop-blur-sm">Legal</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif italic text-brand-primary mb-6">{t.title}</h1>
          <p className="text-lg text-brand-primary/60 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] organic-shadow border border-brand-gold/10 space-y-12">
          <p className="text-lg font-bold text-brand-primary italic border-l-4 border-brand-gold pl-6">{t.intro}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><UserCheck className="text-brand-gold" /> {t.s1_t}</h2>
              <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s1_d}</p>
            </section>
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><Eye className="text-brand-gold" /> {t.s2_t}</h2>
              <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s2_d}</p>
            </section>
          </div>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><FileText className="text-brand-secondary" /> {t.s3_t}</h2>
            <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s3_d}</p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-4 font-serif italic"><ShieldCheck className="text-brand-accent" /> {t.s4_t}</h2>
            <p className="text-brand-primary/70 font-medium leading-relaxed">{t.s4_d}</p>
          </section>

          <section className="bg-brand-warm/50 p-8 rounded-[2rem] border border-brand-gold/10">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-brand-primary mb-6 font-serif italic"><Trash2 className="text-brand-secondary" /> {t.s5_t}</h2>
            <ul className="space-y-3">
              {t.s5_l.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-brand-primary/80 font-bold">
                  <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div> {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="pt-10 border-t border-brand-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-brand-primary/5 p-4 rounded-full text-brand-primary"><Mail /></div>
              <p className="text-sm font-bold text-brand-primary/60">{t.footer_msg}</p>
            </div>
            <a href="mailto:codpentrucomunitate@gmail.com" className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold shadow-lg">codpentrucomunitate@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
