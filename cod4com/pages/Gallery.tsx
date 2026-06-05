
import React, { useState, useEffect } from 'react';
import { Camera, Calendar, MapPin, ExternalLink, Filter, Search, Info, Image as ImageIcon, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../AppContext';

interface GalleryItem {
  id: string;
  title: Record<'ro' | 'en', string>;
  description: Record<'ro' | 'en', string>;
  category: Record<'ro' | 'en', string>;
  date: string;
  location: string;
  imageUrl: string;
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: {
      ro: "Siguranță Cibernetică pentru Seniori",
      en: "Cyber Security for Seniors"
    },
    description: {
      ro: "Atelier practic realizat în parteneriat cu Centrul de Servicii de Asistență Socială pentru Persoane Vârstnice din Reșița.",
      en: "Practical workshop held in partnership with the Social Services Center for the Elderly in Reșița."
    },
    category: { ro: "Educație", en: "Education" },
    date: "Aprilie 2026",
    location: "Reșița, Centrul de Servicii Sociale",
    imageUrl: "./imagini/securitate_cibernetica_seniori.jpg"
  },
  {
    id: '2',
    title: {
      ro: "Mentoratul la Centrul ABC",
      en: "Mentorship at ABC Center"
    },
    description: {
      ro: "Ședințe de ajutor la teme și inițiere în lumea digitală pentru copiii din medii defavorizate.",
      en: "Homework help sessions and digital world initiation for children from disadvantaged backgrounds."
    },
    category: { ro: "Social", en: "Social" },
    date: "Iunie 2026",
    location: "Reșița, Centrul de zi ABC",
    imageUrl: "./imagini/centru_abc.jpeg"
  },
  {
    id: '3',
    title: {
      ro: "Ziua Jandarmeriei cu LEGO",
      en: "Gendarmerie Day with LEGO"
    },
    description: {
      ro: "Demonstrații interactive de robotică și construcții creative pentru micuții vizitatori.",
      en: "Interactive robotics demonstrations and creative constructions for little visitors."
    },
    category: { ro: "Evenimente", en: "Events" },
    date: "Mai 2026",
    location: "Centru Multifunctional, Reșița",
    imageUrl: "./imagini/ziua_jandarmeriei.jpg"
  },
  {
    id: '4',
    title: {
      ro: "Comunitatea în Mișcare",
      en: "Community in Motion"
    },
    description: {
      ro: "Participarea noastră la eveniment pentru a susține cauza „Micii Programatori din Reșița”.",
      en: "Our participation in the event to support the 'Tiny Programmers of Reșița' cause."
    },
    category: { ro: "Comunitate", en: "Community" },
    date: "Mai 2026",
    location: "Reșița",
    imageUrl: "./imagini/comunitate_in_miscare.jpg"
  }
];

const Gallery: React.FC = () => {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...new Set(galleryData.map(item => item.category[lang]))];

  const filteredData = filter === 'All'
    ? galleryData
    : galleryData.filter(item => item.category[lang] === filter);

  const t = {
    title: lang === 'ro' ? 'Galeria Noastră' : 'Our Gallery',
    subtitle: lang === 'ro' ? 'Momente surprinse din misiunea noastră de a transforma comunitatea.' : 'Captured moments from our mission to transform the community.',
    filter: lang === 'ro' ? 'Filtrează după categorie' : 'Filter by category',
    viewDetails: lang === 'ro' ? 'Vezi Detalii' : 'View Details',
    close: lang === 'ro' ? 'Închide' : 'Close',
    noResults: lang === 'ro' ? 'Niciun moment găsit în această categorie.' : 'No moments found in this category.',
    location: lang === 'ro' ? 'Locație' : 'Location',
    date: lang === 'ro' ? 'Data' : 'Date'
  };

  return (
    <div className="min-h-screen bg-brand-light pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Camera size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-warm px-4 py-2 rounded-full text-brand-uway text-sm font-bold uppercase tracking-widest mb-6">
            <ImageIcon size={16} />
            {lang === 'ro' ? 'Impact Vizual' : 'Visual Impact'}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-brand-primary mb-6 font-serif italic">
            {t.title}
          </h1>
          <p className="text-xl text-brand-primary/70 max-w-2xl mx-auto font-medium italic">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${filter === cat
                ? 'bg-brand-uway text-white shadow-xl scale-105'
                : 'bg-white text-brand-primary/60 hover:text-brand-uway border border-brand-warm'
                }`}
            >
              {cat === 'All' ? (lang === 'ro' ? 'Toate' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden organic-shadow border border-brand-warm cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay details on hover */}
                <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block text-brand-gold">
                      {item.category[lang]}
                    </span>
                    <h3 className="text-2xl font-bold font-serif italic mb-2 leading-tight">
                      {item.title[lang]}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-medium opacity-80 mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:hidden">
                  <h3 className="text-xl font-bold text-brand-primary mb-1">{item.title[lang]}</h3>
                  <span className="text-xs text-brand-uway font-bold uppercase tracking-widest">{item.category[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3.5rem] border-2 border-dashed border-brand-warm">
            <Search size={48} className="mx-auto text-brand-warm mb-4" />
            <p className="text-brand-primary/50 font-bold italic">{t.noResults}</p>
          </div>
        )}
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-primary/95 backdrop-blur-sm" onClick={() => setSelectedImage(null)}></div>

          <div className="relative bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden animate-in zoom-in-95 duration-300 organic-shadow">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-white p-3 rounded-2xl text-brand-primary transition-all hover:scale-105"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              <div className="lg:w-2/3 h-[40vh] lg:h-[70vh]">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title[lang]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-block bg-brand-uway/10 text-brand-uway text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg mb-6">
                  {selectedImage.category[lang]}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-primary mb-6 font-serif italic leading-tight">
                  {selectedImage.title[lang]}
                </h2>
                <p className="text-brand-primary/70 font-medium italic leading-relaxed mb-8">
                  {selectedImage.description[lang]}
                </p>

                <div className="space-y-4 border-t border-brand-warm pt-8">
                  <div className="flex items-center gap-3 text-brand-primary">
                    <div className="w-8 h-8 rounded-lg bg-brand-warm flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-brand-primary/40 leading-none mb-1">{t.date}</p>
                      <p className="font-bold italic">{selectedImage.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-brand-primary">
                    <div className="w-8 h-8 rounded-lg bg-brand-warm flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-brand-primary/40 leading-none mb-1">{t.location}</p>
                      <p className="font-bold italic">{selectedImage.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
