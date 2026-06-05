
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Calendar,
    User,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    ArrowRight,
    BookOpen,
    Cpu,
    Globe
} from 'lucide-react';
import { useLanguage } from '../AppContext';

interface BlogPost {
    id: string;
    title: { ro: string; en: string };
    excerpt: { ro: string; en: string };
    content: { ro: string; en: string };
    date: string;
    author: string;
    category: { ro: string; en: string };
    icon: React.ReactNode;
    image: string;
    videoUrl?: string;
}

const blogPosts: BlogPost[] = [
    {
        id: 'informatica-prin-joaca',
        title: {
            ro: 'De la dependență la control: Cum informatica prin joacă îi pregătește pe copii pentru viitor, nu pentru ecrane',
            en: 'From addiction to control: How informatics through play prepares children for the future, not for screens'
        },
        excerpt: {
            ro: 'Secretul nu stă în a interzice tehnologia, ci în a schimba modul în care copilul interacționează cu ea.',
            en: 'The secret is not in banning technology, but in changing the way the child interacts with it.'
        },
        content: {
            ro: `Pentru mulți părinți, ideea de a aduce și mai multă tehnologie în viața copilului trezește o teamă perfect justificată: **„Nu va deveni dependent de calculator?”**. Într-o eră în care ecranele ne înconjoară la fiecare pas, îngrijorarea legată de timpul petrecut în mediul digital este pe deplin de înțeles.

Totuși, introducerea informaticii în viața copiilor prin jocuri educative nu este doar un trend, ci o necesitate adaptată secolului XXI. Secretul nu stă în a interzice tehnologia, ci în a schimba modul în care copilul interacționează cu ea.

### Consum pasiv vs. Creație activă: De ce informatica nu creează dependență

Frica de ecrane vine din observarea consumului pasiv (derularea nesfârșită pe rețele sociale, vizionarea continuă de videoclipuri). Aceste activități sunt concepute pentru a capta atenția ore în șir.

Informatica prin joacă, în schimb, înseamnă **creație activă**. Un avantaj major al acestui tip de educație este că demistifică tehnologia; copilul nu mai vede tableta sau calculatorul ca pe o "cutie magică" din care curge divertisment, ci ca pe un instrument pe care el îl controlează. Atunci când creierul este implicat în rezolvarea de probleme, obosește natural, ceea ce înseamnă că activitatea se auto-reglează. Copilul nu va programa la nesfârșit, ci se va opri când a terminat proiectul sau când a obosit intelectual.

### Cum îi ajută pe copii în viața de zi cu zi?

Înțelegerea modului în care funcționează tehnologia devine o formă esențială de alfabetizare. Avantajele nu se opresc doar la ecran:

* **Structurarea gândirii**: Atunci când un copil "programează" un robot de jucărie să parcurgă un traseu, el învață secvențialitatea și logica. Platforme precum [Scratch](https://scratch.mit.edu) sau [Code.org](https://code.org) sunt excelente pentru acest început.
* **Rezolvarea problemelor (Debugging)**: Învață că greșelile nu sunt eșecuri, ci pași (bug-uri) care trebuie corectați. Aceste abilități se transferă în viața de zi cu zi, ajutându-i pe cei mici să abordeze problemele complexe prin descompunerea lor în pași simpli.
* **Siguranța online**: Înțelegând cum se construiesc platformele și jocurile, copiii devin utilizatori critici. Vor ști mai bine cum să reacționeze în viitor în fața pericolelor digitale, pentru că înțeleg mecanismele din spate.
* **Dezvoltare multidisciplinară**: Prin proiectele noastre, copiii nu învață doar cod, ci și **matematică**, **limba engleză** (limbajul universal al tehnologiei) și principii de **design**. Totul se întâmplă natural, prin joacă, stimulând direct **creativitatea** și capacitatea de a aduce ideile la viață.

### Cât timp stăm la ecrane? Ghidul echilibrului

Echilibrul este cheia. Expunerea timpurie trebuie să fie ghidată și limitată temporal pentru a nu afecta dezvoltarea socială și fizică a copilului. Recomandările [UNICEF privind timpul la ecrane](https://www.unicef.org/parenting/child-development/babies-screen-time-how-much-is-too-much) subliniază importanța calității conținutului.

* **Nu înlocuim joaca de afară**: Tehnologia trebuie să fie o unealtă creativă suplimentară, nu un substitut pentru mișcare sau interacțiune fizică.
* **Limitați timpul, dar creșteți calitatea**: 40 de minute de programare vizuală sau construire de roboței aduc infinit mai multă valoare decât 2 ore de desene animate neîntrerupte.
* **Fiți alături de ei**: Transformați timpul la calculator într-o activitate de familie. Puneți-le întrebări: „Cum ai făcut personajul să sară?”, „Ce se întâmplă dacă schimbăm comanda asta?”.

### Misiunea Asociației Cod pentru Comunitate

La Asociația Cod pentru Comunitate, credem că alfabetizarea digitală începe cu înțelegerea conceptelor, nu doar cu utilizarea dispozitivelor. Prin joacă, informatica devine un limbaj al posibilităților, pregătind viitoarea generație pentru o lume în continuă schimbare.

Programele noastre pun accent pe colaborare. Aici, copiii nu stau izolați în fața unui monitor, ci lucrează împreună pentru a rezolva puzzle-uri logice, învățând astfel și abilități sociale prețioase. Vrem să creștem o generație de creatori tehnologici responsabili, nu doar consumatori captivi.`,
            en: `For many parents, the idea of bringing even more technology into a child's life awakens a perfectly justified fear: **"Won't they become computer addicted?"**. In an era where screens surround us at every step, concern about time spent in the digital environment is fully understandable.

However, introducing informatics into children's lives through educational games is not just a trend, but a necessity adapted to the 21st century. The secret is not in banning technology, but in changing the way the child interacts with it.

### Passive Consumption vs. Active Creation: Why informatics doesn't create addiction

Fear of screens comes from observing passive consumption (endless scrolling on social networks, continuous video watching). These activities are designed to capture attention for hours on end.

Informatics through play, on the other hand, means **active creation**. A major advantage of this type of education is that demystifies technology; the child no longer sees the tablet or computer as a "magic box" from which entertainment flows, but as a tool they control. When the brain is involved in problem solving, it tires naturally, which means the activity self-regulates. The child will not program indefinitely, but will stop when they have finished the project or when they are intellectually tired.

### How does it help children in daily life?

Understanding how technology works becomes an essential form of literacy. The benefits don't stop at the screen:

* **Structuring thought**: When a child "programs" a toy robot to navigate a path, they learn sequencing and logic. Platforms like [Scratch](https://scratch.mit.edu) or [Code.org](https://code.org) are excellent for this start.
* **Problem solving (Debugging)**: They learn that mistakes are not failures, but steps (bugs) that must be corrected. These skills transfer to daily life, helping little ones approach complex problems by breaking them down into simple steps.
* **Online safety**: By understanding how platforms and games are built, children become critical users. They will know better how to react in the future to digital dangers because they understand the mechanisms behind them.
* **Multidisciplinary development**: Through our projects, children don't just learn code, but also **mathematics**, **English** (the universal language of technology), and **design** principles. Everything happens naturally through play, directly stimulating **creativity** and the ability to bring ideas to life.

### How much screen time? The balance guide

Balance is key. Early exposure must be guided and time-limited so as not to affect the child's social and physical development. [UNICEF guidelines on screen time](https://www.unicef.org/parenting/child-development/babies-screen-time-how-much-is-too-much) emphasize the importance of content quality.

* **We don't replace outdoor play**: Technology should be an additional creative tool, not a substitute for movement or physical interaction.
* **Limit time, but increase quality**: 40 minutes of visual programming or building little robots bring infinitely more value than 2 hours of uninterrupted cartoons.
* **Be with them**: Turn computer time into a family activity. Ask them questions: "How did you make the character jump?", "What happens if we change this command?".

### Mission of the Code for Community Association

At the Code for Community Association, we believe that digital literacy begins with understanding concepts, not just using devices. Through play, informatics becomes a language of possibilities, preparing the next generation for a constantly changing world.

Our programs emphasize collaboration. Here, children don't sit isolated in front of a monitor, but work together to solve logical puzzles, thus learning precious social skills. We want to raise a generation of responsible technological creators, not just captive consumers.`
        },
        date: '2026-03-15',
        author: 'Cosmina Uzum',
        category: { ro: 'Educație', en: 'Education' },
        icon: <Cpu className="w-6 h-6" />,
        image: '../imagini/informatica_art.png',
        videoUrl: '/video/info_art.mp4'
    },
    {
        id: 'digitalizarea-avantaj-comunitate',
        title: {
            ro: 'Digitalizarea pe înțelesul tuturor: Cum ne facem viața mai ușoară și navigăm în siguranță pe internet',
            en: 'Digitalization for everyone: How we make our lives easier and navigate the internet safely'
        },
        excerpt: {
            ro: 'Cum ne facem viața mai ușoară și navigăm în siguranță pe internet.',
            en: 'How we make our lives easier and navigate the internet safely.'
        },
        content: {
            ro: `Digitalizarea serviciilor publice și a interacțiunilor comunitare aduce eficiență, transparență și accesibilitate. Reducerea birocrației și posibilitatea de a accesa informații vitale de oriunde sunt avantaje incontestabile care ne ajută să economisim cea mai prețioasă resursă: **timpul**. Într-o societate modernă, interacțiunea cu instituțiile și serviciile ar trebui să ne simplifice viața, nu să o complice.

### Avantaje concrete pentru zilele aglomerate

Când ai o mie de lucruri de rezolvat într-o singură zi, tehnologia devine cel mai bun aliat. Digitalizarea înseamnă soluții practice, imediate:

* **Plata rapidă a facturilor**: Fără drumuri la poștă și fără stat la cozi interminabile. Totul se poate rezolva în câteva minute, direct de pe telefon sau calculator.
* **Programări medicale fără efort**: Nu mai este nevoie să te deplasezi la cabinetul doctorului doar pentru a stabili o consultație. O programare online sau prin aplicație îți eliberează programul instant.
* **Acces instant la informații**: Găsești detalii despre programul de funcționare al oricărei instituții și numere de telefon cu o simplă căutare, evitând drumurile făcute degeaba.

### O administrație în serviciul cetățeanului

Imaginați-vă, la o scară mai largă, o comunitate în care cererile către primărie se depun online, unde transparența bugetară este la un click distanță și unde feedback-ul cetățenilor este colectat în timp real. Aceasta este promisiunea digitalizării: o administrație care lucrează pentru oameni, nu invers. În plus, permite o mai bună gestionare a resurselor locale, de la iluminatul public inteligent până la optimizarea colectării deșeurilor.

### Educația adecvată: Scutul împotriva pericolelor online

În ciuda acestor beneficii uriașe, trecerea la mediul online vine adesea cu temeri firești. Mulți utilizatori se feresc să folosească serviciile digitale din cauza fricii de fraude, cum ar fi **phishing-ul** (mesaje false care încearcă să fure date personale sau bancare).

Aceste frici sunt valide, însă pot fi depășite. Cu o educație digitală adecvată, poți evita cu ușurință aceste capcane. Învățând câteva reguli simple de siguranță – cum să verifici sursa unui email, cum să recunoști un link suspect sau cum să folosești parole sigure – internetul devine un spațiu sigur și util. Tehnologia nu trebuie să ne sperie, ci trebuie înțeleasă.

### Misiunea noastră: Incluziune și competențe pentru toți

Provocarea majoră rămâne însă **incluziunea digitală**. Asigurarea că persoanele în vârstă sau cele din medii defavorizate nu sunt lăsate în urmă este esențială. Digitalizarea nu trebuie să creeze noi bariere, ci să le dărâme pe cele vechi. Există riscul ca "decalajul digital" să se adâncească dacă nu investim în educație și infrastructură accesibilă tuturor. O comunitate digitalizată cu succes este una în care tehnologia este invizibilă, dar omniprezentă în beneficiile sale.

De aceea, la Asociația Cod pentru Comunitate, proiectele noastre se concentrează nu doar pe implementarea de soluții tehnice, ci și pe educarea utilizatorilor. Un sistem digital este util doar dacă toți membrii comunității știu și pot să îl folosească în siguranță. Organizăm ateliere de competențe digitale pentru toate vârstele, demonstrând practic că tehnologia poate fi un aliat de nădejde, sigur și eficient în viața de zi cu zi.`,
            en: `Digitalization of public services and community interactions brings efficiency, transparency, and accessibility. Reducing bureaucracy and the ability to access vital information from anywhere are undeniable advantages that help us save our most precious resource: **time**. In a modern society, interaction with institutions and services should simplify our lives, not complicate them.

### Concrete advantages for busy days

When you have a thousand things to solve in a single day, technology becomes your best ally. Digitalization means practical, immediate solutions:

* **Fast bill payment**: No trips to the post office and no standing in endless queues. Everything can be solved in a few minutes, directly from your phone or computer.
* **Effortless medical appointments**: You no longer need to travel to the doctor's office just to set up a consultation. An online or app appointment frees up your schedule instantly.
* **Instant access to information**: Find details about the opening hours of any institution and phone numbers with a simple search, avoiding useless trips.

### An administration at the service of the citizen

Imagine, on a larger scale, a community where requests to the town hall are submitted online, where budget transparency is just a click away, and where citizen feedback is collected in real-time. This is the promise of digitalization: an administration that works for people, not the other way around. In addition, it allows for better management of local resources, from smart public lighting to optimizing waste collection.

### Proper education: The shield against online dangers

Despite these huge benefits, moving to the online environment often comes with natural fears. Many users avoid using digital services due to fear of fraud, such as **phishing** (fake messages that try to steal personal or banking data).

These fears are valid, but they can be overcome. With proper digital education, you can easily avoid these traps. By learning a few simple safety rules – how to check the source of an email, how to recognize a suspicious link, or how to use secure passwords – the internet becomes a safe and useful space. Technology should not scare us, but must be understood.

### Our mission: Inclusion and skills for all

The major challenge remains **digital inclusion**. Ensuring that the elderly or those from disadvantaged backgrounds are not left behind is essential. Digitalization should not create new barriers, but tear down old ones. There is a risk that the "digital divide" will deepen if we do not invest in education and infrastructure accessible to all. A successfully digitalized community is one where technology is invisible but omnipresent in its benefits.

That is why at the Code for Community Association, our projects focus not only on implementing technical solutions but also on educating users. A digital system is only useful if all community members know and can safely use it. We organize digital skills workshops for all ages, demonstrating practically that technology can be a reliable, safe, and efficient ally in everyday life.`
        },
        date: '2026-03-10',
        author: 'Cosmina Uzum',
        category: { ro: 'Digitalizare', en: 'Digitalization' },
        icon: <Globe className="w-6 h-6" />,
        image: '../imagini/digitalizare.png'
    },
    {
        id: 'importanta-radacinilor-native',
        title: {
            ro: 'Rădăcinile noastre în era digitală: Tehnologia ca punte spre identitate și diversitate culturală',
            en: 'Our Roots in the Digital Age: Technology as a Bridge to Identity and Cultural Diversity'
        },
        excerpt: {
            ro: 'Cum tehnologia și digitalizarea pot ajuta la păstrarea identității culturale și a moștenirii într-o lume globalizată.',
            en: 'How technology and digitalization can help preserve cultural identity and heritage in a globalized world.'
        },
        content: {
            ro: `Indiferent de naționalitate sau etnie, rădăcinile noastre reprezintă ancora identitară. Cunoașterea istoriei personale, a limbii materne și a tradițiilor oferă un sentiment de apartenență și stabilitate emoțională care ne ajută să navigăm prin complexitatea vieții moderne. Într-o epocă a vitezei și a schimbărilor constante, a ști cine ești și de unde vii îți oferă o busolă morală și culturală extrem de puternică.

### Identitate și reziliență într-o lume globalizată

Într-o lume globalizată, păstrarea acestor rădăcini nu înseamnă izolare sau respingerea modernității. Dimpotrivă, o identitate culturală solidă ne oferă încrederea de a explora și respecta alte culturi, fără teama de a ne pierde pe noi înșine.

Pentru minorități, și în mod special pentru persoanele de etnie romă, această asumare a identității este cu atât mai importantă. Cunoașterea profundă a propriei culturi și istorii funcționează ca un scut esențial împotriva prejudecăților. Este fundația care le oferă tinerilor reziliența necesară pentru a face față și a demonta atitudini toxice, cum ar fi antigipsismul, pe care le pot întâlni în societate sau în mediul online.

### Digitalizarea de folos: Accesul la limba și cultura maternă

Limba și literatura sunt vehicule ale memoriei colective. Astăzi, digitalizarea ne oferă instrumentele extraordinare pentru a proteja și promova acest patrimoniu. Tinerii de etnie romă au acum la dispoziție o multitudine de resurse online prin care își pot explora moștenirea:

* **Învățarea limbii**: Prin intermediul platformelor digitale și al aplicațiilor, tinerii au șansa de a învăța corect limba romani și de a se familiariza cu alfabetul specific, chiar dacă nu au avut această oportunitate în școala tradițională.
* **Accesul la istorie și cultură**: Există site-uri dedicate, arhive digitale și muzee virtuale care celebrează contribuțiile reale ale culturii rome, oferind o alternativă educată și documentată la narativele false.
* **Combaterea dezinformării**: Învățând să navigheze critic pe internet, tinerii pot identifica și raporta postările sau site-urile care propagă antigipsismul, devenind astfel apărători activi ai comunității lor.

### O fundație comună pentru viitor

Diversitatea culturală este bogăția umanității, iar fiecare dintre noi contribuie la acest mozaic prin unicitatea moștenirii sale. Rădăcinile ne spun de unde venim, dar nu ne limitează unde putem ajunge. Ele sunt fundația pe care construim viitorul.

O plantă fără rădăcini se usucă la prima furtună; un om fără rădăcini este vulnerabil în fața curentelor trecătoare. La Asociația Cod pentru Comunitate, cultivăm acest respect pentru trecut și încurajăm folosirea tehnologiei și a digitalizării ca instrumente de cunoaștere. Credem că educația digitală trebuie să ajute fiecare tânăr – indiferent de etnie – să își găsească vocea, să își protejeze cultura și să contribuie la o societate mai dreaptă.`,
            en: `Regardless of nationality or ethnicity, our roots represent our identity anchor. Knowing personal history, mother tongue, and traditions provides a sense of belonging and emotional stability that helps us navigate the complexity of modern life. In an era of speed and constant change, knowing who you are and where you come from gives you an extremely powerful moral and cultural compass.

### Identity and Resilience in a Globalized World

In a globalized world, preserving these roots does not mean isolation or rejecting modernity. On the contrary, a solid cultural identity gives us the confidence to explore and respect other cultures without the fear of losing ourselves.

For minorities, and especially for Roma people, this assumption of identity is all the more important. Deep knowledge of one's own culture and history works as an essential shield against prejudice. It is the foundation that gives young people the resilience needed to face and dismantle toxic attitudes, such as anti-Gypsyism, which they may encounter in society or online.

### Useful Digitalization: Access to Mother Tongue and Culture

Language and literature are vehicles of collective memory. Today, digitalization offers us extraordinary tools to protect and promote this heritage. Roma youth now have at their disposal a multitude of online resources through which they can explore their heritage:

* **Language learning**: Through digital platforms and apps, young people have the chance to learn the Romani language correctly and familiarize themselves with the specific alphabet, even if they didn't have this opportunity in traditional school.
* **Access to history and culture**: There are dedicated websites, digital archives, and virtual museums that celebrate the real contributions of Roma culture, offering an educated and documented alternative to false narratives.
* **Combating misinformation**: By learning to navigate the internet critically, young people can identify and report posts or sites that propagate anti-Gypsyism, thus becoming active defenders of their community.

### A Common Foundation for the Future

Cultural diversity is the wealth of humanity, and each of us contributes to this mosaic through the uniqueness of our heritage. Roots tell us where we come from, but they do not limit where we can go. They are the foundation on which we build the future.

A plant without roots withers at the first storm; a person without roots is vulnerable to passing currents. At the Code for Community Association, we cultivate this respect for the past and encourage the use of technology and digitalization as tools of knowledge. We believe that digital education must help every young person – regardless of ethnicity – to find their voice, protect their culture, and contribute to a fairer society.`
        },
        date: '2026-03-05',
        author: 'Cosmina Uzum',
        category: { ro: 'Cultură', en: 'Culture' },
        icon: <BookOpen className="w-6 h-6" />,
        image: '../imagini/radacini.png'
    }
];

interface BlogProps {
    initialPostId?: string | null;
}

const Blog: React.FC<BlogProps> = ({ initialPostId }) => {
    const { lang, t } = useLanguage();
    const [selectedPostId, setSelectedPostId] = React.useState<string | null>(initialPostId || null);

    const selectedPost = blogPosts.find(p => p.id === selectedPostId);

    const handleShare = (platform: string, post: BlogPost) => {
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrlWithParams = `${baseUrl}?page=blog&post=${post.id}`;
        const title = post.title[lang];
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrlWithParams)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrlWithParams)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrlWithParams)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-brand-light pb-20">
                {/* Article Hero */}
                <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <img
                        src={selectedPost.image}
                        alt={selectedPost.title[lang]}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                        <div className="max-w-4xl mx-auto">
                            <button
                                onClick={() => setSelectedPostId(null)}
                                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest transition-colors group"
                            >
                                <ArrowRight size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                                {lang === 'ro' ? 'Înapoi la Blog' : 'Back to Blog'}
                            </button>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-brand-secondary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                    {selectedPost.category[lang]}
                                </span>
                                <div className="flex items-center gap-4 text-xs font-bold text-white/70 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-brand-gold" />
                                        {selectedPost.date}
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif italic text-white leading-tight">
                                {selectedPost.title[lang]}
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16 px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-12 py-6 border-y border-brand-primary/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary font-bold">
                                    {selectedPost.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-brand-primary/40 mb-1">
                                        {lang === 'ro' ? 'Autor' : 'Author'}
                                    </p>
                                    <p className="text-sm font-bold text-brand-primary">{selectedPost.author}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-xs font-black uppercase tracking-widest text-brand-primary/40 mr-2 hidden sm:block">
                                    {lang === 'ro' ? 'Distribuie' : 'Share'}
                                </p>
                                <button
                                    onClick={() => handleShare('facebook', selectedPost)}
                                    className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all shadow-sm"
                                >
                                    <Facebook size={18} />
                                </button>
                                <button
                                    onClick={() => handleShare('twitter', selectedPost)}
                                    className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all shadow-sm"
                                >
                                    <Twitter size={18} />
                                </button>
                                <button
                                    onClick={() => handleShare('linkedin', selectedPost)}
                                    className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all shadow-sm"
                                >
                                    <Linkedin size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="markdown-body text-brand-primary/80 font-medium leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {selectedPost.content[lang]}
                            </ReactMarkdown>

                            {selectedPost.videoUrl && (
                                <div className="my-12 aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-black">
                                    {selectedPost.videoUrl.includes('youtube.com') || selectedPost.videoUrl.includes('youtu.be') ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={selectedPost.videoUrl}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video
                                            className="w-full h-full object-contain"
                                            controls
                                            preload="metadata"
                                        >
                                            <source src={selectedPost.videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-16 pt-12 border-t border-brand-primary/10 text-center">
                            <button
                                onClick={() => {
                                    setSelectedPostId(null);
                                    window.scrollTo(0, 0);
                                }}
                                className="inline-flex items-center gap-3 bg-brand-primary text-white px-10 py-4 rounded-full font-bold hover:bg-brand-secondary transition-all shadow-xl"
                            >
                                <ArrowRight size={18} className="rotate-180" />
                                {lang === 'ro' ? 'Înapoi la toate articolele' : 'Back to all articles'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-light">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden hero-bg hero-home">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold font-serif italic text-brand-primary mb-6">
                            {lang === 'ro' ? 'Blog & Articole' : 'Blog & Articles'}
                        </h1>
                        <p className="text-lg text-brand-primary/70 font-medium leading-relaxed">
                            {lang === 'ro'
                                ? 'Gânduri, idei și noutăți despre digitalizare, educație și comunitate.'
                                : 'Thoughts, ideas, and news about digitalization, education, and community.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-primary/5 border border-brand-primary/5 flex flex-col h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedPostId(post.id)}>
                                    <img
                                        src={post.image}
                                        alt={post.title[lang]}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg text-brand-secondary">
                                            {post.icon}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 left-6">
                                        <span className="bg-brand-secondary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                            {post.category[lang]}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-bold text-brand-primary/50 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-brand-gold" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User size={14} className="text-brand-gold" />
                                            {post.author}
                                        </div>
                                    </div>

                                    <h2
                                        className="text-2xl font-bold font-serif italic text-brand-primary mb-4 leading-tight group-hover:text-brand-secondary transition-colors cursor-pointer"
                                        onClick={() => setSelectedPostId(post.id)}
                                    >
                                        {post.title[lang]}
                                    </h2>

                                    <p className="text-brand-primary/70 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                        {post.excerpt[lang]}
                                    </p>

                                    <div className="mt-auto pt-8 border-t border-brand-primary/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleShare('facebook', post)}
                                                className="w-8 h-8 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"
                                                title="Share on Facebook"
                                            >
                                                <Facebook size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter', post)}
                                                className="w-8 h-8 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"
                                                title="Share on Twitter"
                                            >
                                                <Twitter size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin', post)}
                                                className="w-8 h-8 rounded-full bg-brand-warm flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white transition-all"
                                                title="Share on LinkedIn"
                                            >
                                                <Linkedin size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setSelectedPostId(post.id)}
                                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors group/btn"
                                        >
                                            {lang === 'ro' ? 'Citește mai mult' : 'Read more'}
                                            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Blog;
