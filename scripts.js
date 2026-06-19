/* scripts.js - Interactive portfolio dashboard logic and Gemini AI chatbot */

// Trilingual Translations Dictionary
const T = {
  es: {
    search_label: '✨ Resultados de Búsqueda',
    nav_about: 'Sobre mí',
    tab_projects_nav: 'Proyectos',
    nav_services: 'Servicios',
    nav_learning: 'Cursos',
    nav_media: 'Media',
    nav_contact: 'Contacto',
    hero_eyebrow: 'Finance · Tech · Operations',
    hero_desc: 'Director Financiero, Líder de Operaciones BPO y Desarrollador Full-Stack. Especialista trilingüe que transforma datos en decisiones y código en soluciones.',
    about_quote: '"Transformo sistemas complejos en soluciones elegantes — en cualquier idioma."',
    about_body1: 'Profesional con más de una década conectando las finanzas de alto nivel, las operaciones BPO a gran escala y el desarrollo de software moderno. Mi ventaja es única: hablo el idioma de los ejecutivos, los ingenieros y los clientes — literal y figurativamente.',
    about_body2: 'Nacido para liderar equipos multiculturales, construir plataformas digitales sólidas y optimizar procesos que impactan resultados reales.',
    lang_es_label: 'Español Nativo',
    lang_en_label: 'Inglés Fluido',
    lang_fr_label: 'Francés Fluido',
    stack_title: 'Herramientas & Lenguajes',
    scat_dev: 'Desarrollo',
    scat_ai: 'IA & Data',
    scat_biz: 'Negocio & Finanzas',
    proj_title: 'Proyectos Destacados',
    proj_subtitle: 'Una selección de las aplicaciones y sistemas más relevantes de mi carrera.',
    proj1_desc: 'Plataforma inteligente de modelado financiero predictivo, análisis de rentabilidad y simulación de escenarios de riesgo corporativo mediante Machine Learning.',
    proj2_desc: 'Dashboard de control de operaciones en tiempo real y tracker automatizado de SLAs, diseñado para optimizar el rendimiento y la adherencia en call centers.',
    proj3_desc: 'Sistema de gestión de aprendizaje (LMS) trilingüe enfocado en capacitación técnica de Python, APIs e integración de Inteligencia Artificial para profesionales.',
    proj4_desc: 'Herramienta corporativa basada en RAG para escanear contratos, extraer variables clave de riesgo financiero y chatear directamente con bases documentales complejas.',
    proj5_desc: 'Orquestador de flujos de trabajo BPO que automatiza el registro en CRMs e implementa enrutamiento predictivo inteligente de leads basado en el perfil del agente.',
    proj6_desc: 'Asistente conversacional de finanzas personales que permite importar hojas de cálculo de Excel/CSV para categorizar gastos de forma automática y dar consejos.',
    srv_title: 'Lo que puedo hacer por ti',
    srv_sub: 'Soluciones de alto impacto en finanzas, tecnología y operaciones.',
    s1_h: 'Consultoría Financiera',
    s1_p: 'Modelado financiero, análisis de rentabilidad, planificación estratégica y reportes ejecutivos para toma de decisiones de alto nivel.',
    s2_h: 'Operaciones BPO / Call Center',
    s2_p: 'Diseño, optimización y gestión de operaciones de servicio al cliente, back-office y centros de contacto multicanal.',
    s3_h: 'Desarrollo Full-Stack',
    s3_p: 'Aplicaciones web con React + PHP + PostgreSQL y backend potenciado por Supabase. Desde MVPs hasta sistemas empresariales.',
    s4_h: 'Python & Automatización IA',
    s4_p: 'Scripts de automatización, bots inteligentes, modelos ML, análisis de datos y pipelines de inteligencia artificial para tu empresa.',
    s5_h: 'Academia & Capacitación',
    s5_p: 'Formación en Python, IA y tecnología financiera para equipos y profesionales. Contenido disponible en español, inglés y francés.',
    s6_h: 'Creación de Contenido Tech',
    s6_p: 'Videos, podcasts y materiales educativos sobre programación, IA, finanzas y productividad. Producción multimedia profesional.',
    learning_title: 'Cursos & Recursos de Capacitación',
    learning_sub: 'Aprende directamente de un experto en Python, IA, desarrollo web y operaciones.',
    course_ai: 'AI Vive Coding Classes',
    course_ai_desc: 'Masterclass de automatización y IA aplicada al desarrollo real.',
    course_ai_l1: '📌 AI Automation Nivel 1',
    course_ai_l2: '📌 AI Automation Nivel 2',
    course_ai_l3: '📌 AI Automation Nivel 3',
    course_ai_l4: '📌 AI Automation Nivel 4',
    course_py: 'Python Básico',
    course_py_desc: 'Fundamentos de Python para principiantes. Desde variables hasta POO.',
    course_py_l1: '📌 Nivel 1: Variables & Tipos',
    course_py_l2: '📌 Nivel 2: Control de Flujo',
    course_py_l3: '📌 Nivel 3: Funciones & Módulos',
    course_py_l4: '📌 Nivel 4: Programación OOP',
    course_api: 'Integración de APIs',
    course_api_desc: 'Integra APIs de OpenAI, Google Cloud y servicios REST profesionales.',
    course_api_l1: '📌 OpenAI & ChatGPT',
    course_api_l2: '📌 Google Cloud APIs',
    course_api_l3: '📌 REST APIs & Auth',
    course_api_l4: '📌 Webhooks Avanzados',
    course_deploy: 'Despliegue Web',
    course_deploy_desc: 'Publica tus proyectos en hosting, VPS y nubes profesionales.',
    course_deploy_l1: '📌 cPanel & Hosting',
    course_deploy_l2: '📌 Dominios & DNS',
    course_deploy_l3: '📌 SSL & Seguridad',
    course_deploy_l4: '📌 Pipelines CI/CD',
    course_english: 'Inglés 101',
    course_english_desc: 'Inglés profesional y técnico para desarrolladores de software.',
    course_english_l1: '📌 Vocabulario Técnico',
    course_english_l2: '📌 Presentaciones',
    course_english_l3: '📌 Entrevistas Laborales',
    course_english_l4: '📌 Escritura Técnica',
    course_agent: 'Integración de Agentes',
    course_agent_desc: 'Diseña y conecta agentes de IA autónomos en tus páginas.',
    course_agent_l1: '📌 AI Chatbots',
    course_agent_l2: '📌 LangChain & Agents',
    course_agent_l3: '📌 Automatización',
    course_agent_l4: '📌 Sistemas Multi-Agente',
    btn_more: 'Ver Más →',
    tab_photos: '📸 Fotos',
    tab_videos: '🎬 Videos',
    v1_h: 'Python para Finanzas – Ep.1',
    v1_p: 'Automatiza reportes financieros con Python y Pandas.',
    v2_h: 'BPO Operations – Masterclass',
    v2_p: 'KPIs, WFM y diseño de centros de contacto escalables.',
    v3_h: 'Dashboard con React + Supabase',
    v3_p: 'Construye un panel financiero en tiempo real.',
    v4_h: 'El Futuro del Trabajo – Podcast',
    v4_p: 'IA, automatización y el rol humano en el nuevo empleo.',
    yt_all: 'Ver canal en YouTube →',
    sub_title: '🎓 Únete a la Academia',
    ph_name: 'Tu nombre completo',
    ph_email: 'Tu correo electrónico',
    btn_sub: '🚀 Suscribirme Ahora',
    sub_note: 'Sin spam. Cancela cuando quieras. Tu privacidad está protegida.',
    contact_form_title: 'Hablemos de tu proyecto',
    hero_cta2: 'Enviar mensaje',
    direct_or: 'O escríbeme directamente a:',
    stat_years: 'Años Exp.',
    stat_langs: 'Idiomas',
    stat_projects: 'Proyectos',
    bot_welcome: '¡Hola! Soy el gemini AI digital twin de Johnny Fenelon. Pregúntame sobre mis habilidades en Finanzas, Tecnología, BPO o Inteligencia Artificial, y te responderé.',
    direct_or: 'O escríbeme directamente a:',
    stat_years: 'Años Exp.',
    stat_langs: 'Idiomas',
    stat_projects: 'Proyectos'
  },
  en: {
    search_label: '✨ Search Results',
    nav_about: 'About Me',
    tab_projects_nav: 'Projects',
    nav_services: 'Services',
    nav_learning: 'Courses',
    nav_media: 'Media',
    nav_contact: 'Contact',
    hero_eyebrow: 'Finance · Tech · Operations',
    hero_desc: 'Finance Director, BPO Operations Leader, and Full-Stack Developer. Trilingual specialist transforming data into decisions and code into solutions.',
    about_quote: '"I turn complex systems into elegant solutions — in any language."',
    about_body1: 'Professional with over a decade bridging high-level finance, large-scale BPO operations, and modern software development. My edge is rare: I speak the language of executives, engineers, and customers — literally and figuratively.',
    about_body2: 'Born to lead multicultural teams, build solid digital platforms, and optimize processes that drive real results.',
    lang_es_label: 'Native Spanish',
    lang_en_label: 'Fluent English',
    lang_fr_label: 'Fluent French',
    stack_title: 'Tools & Languages',
    scat_dev: 'Development',
    scat_ai: 'AI & Data',
    scat_biz: 'Business & Finance',
    proj_title: 'Featured Projects',
    proj_subtitle: 'A selection of the most relevant applications and systems of my career.',
    proj1_desc: 'Predictive financial modeling platform, profitability analysis, and risk scenarios simulation utilizing Machine Learning.',
    proj2_desc: 'Real-time operations dashboard and automated SLA tracker designed to optimize agent adherence and KPIs in call centers.',
    proj3_desc: 'Trilingual Learning Management System (LMS) focused on technical training for Python, APIs, and AI integrations.',
    proj4_desc: 'Corporate RAG document parser to extract key financial parameters and chat directly with large corpus contracts.',
    proj5_desc: 'BPO workflow orchestrator that automates CRM entry and implements predictive lead/agent routing logic.',
    proj6_desc: 'Conversational personal finance assistant supporting Excel/CSV sheet imports to automatically categorize expenses.',
    srv_title: 'What I can do for you',
    srv_sub: 'High-impact solutions in finance, technology and operations.',
    s1_h: 'Financial Consulting',
    s1_p: 'Financial modeling, profitability analysis, strategic planning and executive reports for high-level decision making.',
    s2_h: 'BPO / Call Center Operations',
    s2_p: 'Design, optimization, and management of customer service, back-office and omnichannel contact centers.',
    s3_h: 'Full-Stack Development',
    s3_p: 'Web applications with React + PHP + PostgreSQL and backend powered by Supabase. From MVPs to enterprise systems.',
    s4_h: 'Python & AI Automation',
    s4_p: 'Automation scripts, intelligent bots, ML models, data analysis, and artificial intelligence pipelines for your business.',
    s5_h: 'Academy & Training',
    s5_p: 'Training in Python, AI, and financial technology for teams and professionals. Available in Spanish, English, and French.',
    s6_h: 'Tech Content Creation',
    s6_p: 'Videos, podcasts, and educational materials about programming, AI, finance, and productivity. Professional multimedia production.',
    learning_title: 'Courses & Training Resources',
    learning_sub: 'Learn directly from an expert in Python, AI, web development and operations.',
    course_ai: 'AI Vive Coding Classes',
    course_ai_desc: 'Masterclass in automation and AI applied to real-world development.',
    course_ai_l1: '📌 AI Automation Level 1',
    course_ai_l2: '📌 AI Automation Level 2',
    course_ai_l3: '📌 AI Automation Level 3',
    course_ai_l4: '📌 AI Automation Level 4',
    course_py: 'Python Basics',
    course_py_desc: 'Python fundamentals for beginners. From variables to OOP.',
    course_py_l1: '📌 Level 1: Variables & Types',
    course_py_l2: '📌 Level 2: Flow Control',
    course_py_l3: '📌 Level 3: Functions & Modules',
    course_py_l4: '📌 Level 4: OOP Programming',
    course_api: 'API Integration',
    course_api_desc: 'Integrate professional APIs like OpenAI, Google Cloud, and REST services.',
    course_api_l1: '📌 OpenAI & ChatGPT',
    course_api_l2: '📌 Google Cloud APIs',
    course_api_l3: '📌 REST APIs & Auth',
    course_api_l4: '📌 Advanced Webhooks',
    course_deploy: 'Web Deployment',
    course_deploy_desc: 'Publish your websites on hosting, VPS, and cloud platforms.',
    course_deploy_l1: '📌 cPanel & Hosting',
    course_deploy_l2: '📌 Domain & DNS',
    course_deploy_l3: '📌 SSL & Security',
    course_deploy_l4: '📌 CI/CD Pipelines',
    course_english: 'English 101',
    course_english_desc: 'Professional and technical English for software developers.',
    course_english_l1: '📌 Technical Vocabulary',
    course_english_l2: '📌 Presentations',
    course_english_l3: '📌 Job Interviews',
    course_english_l4: '📌 Technical Writing',
    course_agent: 'Agent Integration',
    course_agent_desc: 'Integrate intelligent autonomous AI agents directly into web pages.',
    course_agent_l1: '📌 AI Chatbots',
    course_agent_l2: '📌 LangChain & Agents',
    course_agent_l3: '📌 Advanced Automation',
    course_agent_l4: '📌 Multi-Agent Systems',
    btn_more: 'Learn More →',
    tab_photos: '📸 Photos',
    tab_videos: '🎬 Videos',
    v1_h: 'Python for Finance – Ep.1',
    v1_p: 'Automate financial reports with Python and Pandas.',
    v2_h: 'BPO Operations – Masterclass',
    v2_p: 'KPIs, WFM and design of scalable contact centers.',
    v3_h: 'Dashboard with React + Supabase',
    v3_p: 'Build a real-time financial dashboard.',
    v4_h: 'The Future of Work – Podcast',
    v4_p: 'AI, automation and the human role in the new economy.',
    yt_all: 'Watch on YouTube →',
    sub_title: '🎓 Join the Academy',
    ph_name: 'Your full name',
    ph_email: 'Your email address',
    btn_sub: '🚀 Subscribe Now',
    sub_note: 'No spam. Cancel anytime. Your privacy is protected.',
    contact_form_title: 'Let\'s talk about your project',
    hero_cta2: 'Send Message',
    direct_or: 'Or write me directly at:',
    stat_years: 'Yrs Exp.',
    stat_langs: 'Languages',
    stat_projects: 'Projects',
    bot_welcome: 'Hello! I am Johnny Fenelon\'s AI Digital Twin. Ask me anything about my expertise in Finance, Tech, BPO, or AI, and I will reply to you!'
  },
  fr: {
    search_label: '✨ Résultats de Recherche',
    nav_about: 'À Propos',
    tab_projects_nav: 'Projets',
    nav_services: 'Services',
    nav_learning: 'Cours',
    nav_media: 'Médias',
    nav_contact: 'Contact',
    hero_eyebrow: 'Finance · Tech · Opérations',
    hero_desc: 'Directeur Financier, Leader des Opérations BPO et Développeur Full-Stack. Spécialiste trilingue transformant les données en décisions et le code en solutions.',
    about_quote: '"Je transforme les systèmes complexes en solutions élégantes — dans n\'importe quelle langue."',
    about_body1: 'Professionnel avec plus d\'une décennie à relier la finance de haut niveau, les opérations BPO à grande échelle et le développement logiciel moderne. Mon avantage est rare : je parle la langue des dirigeants, des ingénieurs et des clients — littéralement et figurativement.',
    about_body2: 'Né pour diriger des équipes multiculturelles, construire des plateformes numériques solides et optimiser les processus.',
    lang_es_label: 'Espagnol Natif',
    lang_en_label: 'Anglais Courant',
    lang_fr_label: 'Français Courant',
    stack_title: 'Outils & Langages',
    scat_dev: 'Développement',
    scat_ai: 'IA & Data',
    scat_biz: 'Business & Finance',
    proj_title: 'Projets Principaux',
    proj_subtitle: 'Une sélection des applications et systèmes les plus pertinents de ma carrière.',
    proj1_desc: 'Plateforme de modélisation financière prédictive, analyse de rentabilité et simulation de scénarios de risques utilisant le Machine Learning.',
    proj2_desc: 'Tableau de bord opérationnel en temps réel et suivi automatisé des SLAs dans les centres de contact.',
    proj3_desc: 'Plateforme LMS trilingue axée sur la formation technique en Python, APIs et intégration de l\'Intelligence Artificielle.',
    proj4_desc: 'Outil d\'analyse de documents d\'entreprise basé sur le RAG pour extraire les clauses de risque et chater avec des bases documentaires.',
    proj5_desc: 'Orchestrateur de flux BPO qui automatise la saisie CRM et intègre un routage prédictif intelligent des leads.',
    proj6_desc: 'Assistant conversationnel de finance personnelle acceptant l\'importation de fichiers Excel/CSV pour catégoriser les dépenses.',
    srv_title: 'Ce que je peux faire pour vous',
    srv_sub: 'Solutions à fort impact en finance, technologie et opérations.',
    s1_h: 'Conseil Financier',
    s1_p: 'Modélisation financière, analyse de rentabilité, planification stratégique et rapports exécutifs pour la prise de décision.',
    s2_h: 'Opérations BPO / Centre d\'appels',
    s2_p: 'Conception, optimisation et gestion des opérations de service client multicanal, back-office et centres de contact.',
    s3_h: 'Développement Full-Stack',
    s3_p: 'Applications web avec React + PHP + PostgreSQL et backend Supabase. Du MVP aux systèmes d\'entreprise.',
    s4_h: 'Python & Automatisation IA',
    s4_p: 'Scripts d\'automatisation, bots intelligents, modèles ML et pipelines d\'intelligence artificielle pour votre entreprise.',
    s5_h: 'Académie & Formation',
    s5_p: 'Formation en Python, IA et finance technologique pour équipes et professionnels. Contenu en espagnol, anglais et français.',
    s6_h: 'Création de Contenu Tech',
    s6_p: 'Vidéos, podcasts et matériels éducatifs sur la programmation, l\'IA et la finance. Production multimédia professionnelle.',
    learning_title: 'Cours & Ressources de Formation',
    learning_sub: 'Apprenez directement d\'un expert en Python, IA, développement web et opérations.',
    course_ai: 'AI Vive Coding Classes',
    course_ai_desc: 'Masterclass en automatisation et IA appliquée au développement réel.',
    course_ai_l1: '📌 AI Automation Niveau 1',
    course_ai_l2: '📌 AI Automation Niveau 2',
    course_ai_l3: '📌 AI Automation Niveau 3',
    course_ai_l4: '📌 AI Automation Niveau 4',
    course_py: 'Bases Python',
    course_py_desc: 'Fondations Python pour débutants. Des variables à la POO.',
    course_py_l1: '📌 Niveau 1 : Variables & Types',
    course_py_l2: '📌 Niveau 2 : Flux de Contrôle',
    course_py_l3: '📌 Niveau 3 : Fonctions & Modules',
    course_py_l4: '📌 Niveau 4 : Programmation POO',
    course_api: 'Intégration d\'API',
    course_api_desc: 'Intégrez Google Cloud, OpenAI et autres APIs professionnelles à vos projets.',
    course_api_l1: '📌 OpenAI & ChatGPT',
    course_api_l2: '📌 Google Cloud APIs',
    course_api_l3: '📌 APIs REST & Auth',
    course_api_l4: '📌 Webhooks Avancés',
    course_deploy: 'Déploiement Web',
    course_deploy_desc: 'Publiez votre site sur des serveurs partagés, VPS et plateformes cloud.',
    course_deploy_l1: '📌 cPanel & Hosting',
    course_deploy_l2: '📌 Domaine & DNS',
    course_deploy_l3: '📌 SSL & Sécurité',
    course_deploy_l4: '📌 Pipelines CI/CD',
    course_english: 'Anglais 101',
    course_english_desc: 'Anglais professionnel pour développeurs. Communication et entretiens.',
    course_english_l1: '📌 Vocabulaire Technique',
    course_english_l2: '📌 Présentations',
    course_english_l3: '📌 Entretiens d\'Embauche',
    course_english_l4: '📌 Rédaction Technique',
    course_agent: 'Intégration d\'Agents',
    course_agent_desc: 'Intégrez des agents IA autonomes directement dans vos pages web.',
    course_agent_l1: '📌 AI Chatbots',
    course_agent_l2: '📌 LangChain & Agents',
    course_agent_l3: '📌 Automatisation Avancée',
    course_agent_l4: '📌 Systèmes Multi-Agents',
    btn_more: 'En Savoir Plus →',
    tab_photos: '📸 Photos',
    tab_videos: '🎬 Vidéos',
    v1_h: 'Python pour la Finance – Ep.1',
    v1_p: 'Automatisez les rapports financiers avec Python et Pandas.',
    v2_h: 'BPO Operations – Masterclass',
    v2_p: 'KPIs, WFM et conception de centres de contact scalables.',
    v3_h: 'Dashboard avec React + Supabase',
    v3_p: 'Construisez un tableau de bord financier en temps réel.',
    v4_h: 'L\'Avenir du Travail – Podcast',
    v4_p: 'IA, automatisation et rôle humain dans la nouvelle économie.',
    yt_all: 'Voir la chaîne YouTube →',
    sub_title: '🎓 Rejoindre l\'Académie',
    ph_name: 'Votre nom complet',
    ph_email: 'Votre adresse e-mail',
    btn_sub: '🚀 M\'abonner Maintenant',
    sub_note: 'Pas de spam. Annulez quand vous voulez. Vie privée protégée.',
    contact_form_title: 'Parlons de votre projet',
    hero_cta2: 'Envoyer Message',
    direct_or: 'Ou écrivez-moi directement à:',
    stat_years: 'Ans Exp.',
    stat_langs: 'Langues',
    stat_projects: 'Projets',
    bot_welcome: 'Bonjour! Je suis le jumeau numérique IA de Johnny Fenelon. Posez-moi des questions sur mes compétences en finance, technologie, BPO ou IA. Je vais vous répondre !'
  }
};

let currentLang = 'es';

// Initialize language and hash navigation on startup
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('portfolio_lang');
  if (savedLang && T[savedLang]) {
    setLang(savedLang);
  } else {
    setLang('es');
  }
  
  // Cache-busting for background video to force the latest video to play
  const video = document.getElementById('bg-video');
  if (video) {
    const source = video.querySelector('source');
    if (source) {
      source.src = 'video_1.mp4?v=' + Date.now();
      video.load();
    }
  }
  
  // Make sure correct tab is open on load (based on hash or default to about)
  const hash = window.location.hash;
  let defaultTabId = 'about';
  if (hash) {
    const tabName = hash.replace('#', '');
    const tabBtn = document.getElementById(`tab-${tabName}`);
    if (tabBtn) {
      defaultTabId = tabName;
      // Set active tab button
      document.querySelectorAll('.card-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
      tabBtn.classList.add('active');
    }
  }
  
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`sect-${defaultTabId}`)?.classList.add('active');
});

// Handle hash changes (back/forward or clicks)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash) {
    const tabName = hash.replace('#', '');
    const tabBtn = document.getElementById(`tab-${tabName}`);
    if (tabBtn) {
      switchMainTab(tabName, tabBtn);
    }
  }
});

// Trilingual Switcher Function
function setLang(l) {
  currentLang = l;
  localStorage.setItem('portfolio_lang', l);

  // Update button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`lang-${l}`)?.classList.add('active');

  const translations = T[l] || {};
  
  // Set all translated text
  document.querySelectorAll('.js-t[data-key]').forEach(el => {
    const k = el.dataset.key;
    if (translations[k] !== undefined) {
      el.innerHTML = translations[k];
    }
  });

  // Set input placeholders
  document.querySelectorAll('.js-t-ph[data-key]').forEach(el => {
    const k = el.dataset.key;
    if (translations[k] !== undefined) {
      el.placeholder = translations[k];
    }
  });

  // Handle document root lang setting
  document.documentElement.lang = l;
}

// Tab Switching logic for Main Dashboard Card
function switchMainTab(tabName, button) {
  // Update tab buttons active class
  document.querySelectorAll('.card-tabs .tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  // Update sections active class
  document.querySelectorAll('.tab-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(`sect-${tabName}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Sync URL hash
  if (window.location.hash !== '#' + tabName) {
    history.pushState(null, null, '#' + tabName);
  }

  // Scroll main card into view on mobile
  if (window.innerWidth < 768) {
    const cardElement = document.querySelector('.main-card');
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Media Pane Switching (Photos vs Videos tabs)
function switchMediaPane(paneId, button) {
  document.querySelectorAll('.media-tabs .m-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  document.querySelectorAll('#sect-multimedia .media-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  document.getElementById(`pane-${paneId}`)?.classList.add('active');
}

// Lightbox modal functionality
function openLB(src) {
  const img = document.getElementById('lb-img');
  if (img) {
    img.src = src;
    document.getElementById('lightbox')?.classList.add('open');
  }
}

function closeLB(e) {
  if (!e || e.target.id === 'lightbox' || e.target.classList.contains('lb-close')) {
    document.getElementById('lightbox')?.classList.remove('open');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLB({ target: document.getElementById('lightbox') });
  }
});

/* ════════════════════════════════════
   AI CHATBOT FUNCTIONS
   ════════════════════════════════════ */

function toggleChatConsole() {
  const consoleBox = document.getElementById('chat-console');
  if (!consoleBox) return;
  
  if (consoleBox.style.display === 'flex') {
    consoleBox.style.display = 'none';
  } else {
    consoleBox.style.display = 'flex';
    // Scroll messages to bottom on open
    const msgs = document.getElementById('chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }
}

function handleInputKeydown(event) {
  if (event.key === 'Enter') {
    sendChat();
  }
}

async function sendChat() {
  const inputEl = document.getElementById('chat-input');
  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text) return;

  // Make sure chat console is open
  const consoleBox = document.getElementById('chat-console');
  if (consoleBox && consoleBox.style.display !== 'flex') {
    consoleBox.style.display = 'flex';
  }

  // Clear input field
  inputEl.value = '';

  // Append user message
  appendMessage('user', text);

  // Show typing loader placeholder in messages
  const loadingId = appendMessage('bot', '<span class="sparkle">✨</span> Pensando...');

  try {
    const response = await fetch('chat.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    
    // Remove loading placeholder
    const loaderEl = document.getElementById(loadingId);
    if (loaderEl) loaderEl.remove();

    if (data.success) {
      appendMessage('bot', data.reply);
    } else {
      appendMessage('bot', data.error || 'Connection failed.');
    }
  } catch (error) {
    console.error('Chat error:', error);
    const loaderEl = document.getElementById(loadingId);
    if (loaderEl) loaderEl.remove();
    appendMessage('bot', 'Error communicating with Digital Twin. Please try again.');
  }
}

function appendMessage(sender, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msgId = 'msg-' + Date.now() + Math.random().toString(36).substr(2, 5);
  const div = document.createElement('div');
  div.id = msgId;
  div.className = `chat-msg ${sender}-msg`;
  div.innerHTML = `<p>${text}</p>`;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;

  return msgId;
}

function clearChat() {
  const container = document.getElementById('chat-messages');
  if (container) {
    container.innerHTML = `
      <div class="chat-msg bot-msg">
        <p>${T[currentLang].bot_welcome}</p>
      </div>
    `;
  }
}

/* ════════════════════════════════════
   CONTACT & NEWSLETTER FORMS
   ════════════════════════════════════ */

async function handleSubscribe() {
  const name = document.getElementById('sub-name')?.value.trim();
  const email = document.getElementById('sub-email')?.value.trim();
  if (!name || !email) return;

  const btn = document.querySelector('#form-sub button');
  const originalText = btn.textContent;
  btn.textContent = '...';
  btn.disabled = true;

  try {
    const response = await fetch('subscribe.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    
    const data = await response.json();
    if (data.success) {
      document.getElementById('form-sub').style.display = 'none';
      const succ = document.getElementById('sub-success');
      succ.style.display = 'block';
      succ.textContent = currentLang === 'en' ? '✅ Subscribed successfully!' : currentLang === 'fr' ? '✅ Inscription réussie !' : '✅ ¡Suscrito con éxito!';
    } else {
      alert(data.msg || 'Error');
    }
  } catch (error) {
    console.error('Subscription error:', error);
    alert('Connection error');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const message = document.getElementById('contact-message')?.value.trim();

  if (!name || !email || !message) return;

  const btn = document.getElementById('contact-submit');
  const originalText = btn.textContent;
  btn.textContent = currentLang === 'en' ? 'Sending...' : currentLang === 'fr' ? 'Envoi...' : 'Enviando...';
  btn.disabled = true;

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    // First try FormSubmit AJAX integration
    const response = await fetch('https://formsubmit.co/ajax/academia969@johnnyfenelon.com', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      document.getElementById('contact-form').reset();
      const succ = document.getElementById('contact-success');
      succ.style.display = 'block';
      setTimeout(() => succ.style.display = 'none', 5000);
    } else {
      throw new Error(data.message || 'FormSubmit failed');
    }
  } catch (err) {
    console.warn('FormSubmit AJAX failed, falling back to local php...', err);
    // Local PHP contact handler fallback
    try {
      const response = await fetch('contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json();
      if (data.success) {
        document.getElementById('contact-form').reset();
        const succ = document.getElementById('contact-success');
        succ.style.display = 'block';
        setTimeout(() => succ.style.display = 'none', 5000);
      } else {
        alert(data.msg || 'Failed to send message.');
      }
    } catch (phpErr) {
      console.error('All contact submit methods failed:', phpErr);
      alert('Failed to send message. Please write directly to academia969@johnnyfenelon.com');
    }
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}
