/* Shared site scripts */

const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON = 'your-anon-key';
let sb = null;

if (window.supabase) {
  try {
    sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  } catch (e) {
    console.warn('Supabase init failed:', e);
  }
} else {
  console.warn('Supabase library not loaded.');
}

/* CANVAS PARTICLES */
(function(){
  const c = document.getElementById('bgCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [];
  const N = 80;

  function resize(){
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for(let i=0;i<N;i++) pts.push({
    x: Math.random()*2000, y: Math.random()*1200,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
    r: Math.random()*1.5+.5,
    color: Math.random()>.5 ? '#c9a84c' : '#00e5c0'
  });

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y);
        if(d<140){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201,168,76,${(1-d/140)*.12})`;
          ctx.lineWidth = .5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    pts.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = .6;
      ctx.fill();
      ctx.globalAlpha = 1;
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* TRANSLATIONS */
const T = {
  es:{
    nav_about:'Sobre mí', nav_services:'Servicios', nav_media:'Media', nav_contact:'Contacto', nav_cta:'Contratar',
    hero_eyebrow:'Finance · Tech · Operations',
    hero_role:'FENELON',
    hero_desc:'Director Financiero, Líder de Operaciones BPO y Desarrollador Full-Stack. Especialista trilingüe que transforma datos en decisiones y código en soluciones.',
    hero_cta1:'Ver Servicios', hero_cta2:'Contactar',
    stat_years:'Años Exp.', stat_langs:'Idiomas', stat_projects:'Proyectos',
    about_label:'Quién soy',
    about_quote:'"I turn complex systems into elegant solutions — in any language."',
    about_body1:'Profesional con más de una década conectando las finanzas de alto nivel, las operaciones BPO a gran escala y el desarrollo de software moderno. Mi ventaja es única: hablo el idioma de los ejecutivos, los ingenieros y los clientes — literal y figurativamente.',
    about_body2:'Nacido para liderar equipos multiculturales, construir plataformas digitales sólidas y optimizar procesos que impactan resultados reales.',
    exp1_h:'Dirección Financiera', exp1_p:'Planeación, presupuestos, análisis de riesgo y reporting ejecutivo.',
    exp2_h:'BPO & Call Center', exp2_p:'Operaciones, KPIs, calidad y escalabilidad para centros de alto volumen.',
    exp3_h:'Python & IA', exp3_p:'Automatización, ML, APIs y sistemas de inteligencia artificial.',
    exp4_h:'React & Full-Stack', exp4_p:'Aplicaciones web modernas con React, PHP, PostgreSQL y Supabase.',
    stack_label:'Stack Tecnológico', stack_title:'Herramientas & Lenguajes',
    scat_dev:'Desarrollo', scat_ai:'IA & Data', scat_biz:'Negocio & Finanzas',
    srv_label:'Servicios', srv_title:'Lo que puedo hacer por ti', srv_sub:'Soluciones de alto impacto en finanzas, tecnología y operaciones.',
    s1_h:'Consultoría Financiera', s1_p:'Modelado financiero, análisis de rentabilidad, planificación estratégica y reportes ejecutivos para toma de decisiones de alto nivel.',
    s2_h:'Operaciones BPO / Call Center', s2_p:'Diseño, optimización y gestión de operaciones de servicio al cliente, back-office y centros de contacto multicanal.',
    s3_h:'Desarrollo Full-Stack', s3_p:'Aplicaciones web con React + PHP + PostgreSQL y backend potenciado por Supabase.',
    s4_h:'Python & Automatización IA', s4_p:'Scripts de automatización, bots inteligentes, modelos ML y pipelines de inteligencia artificial.',
    s5_h:'Academia & Capacitación', s5_p:'Formación en Python, IA y tecnología financiera. Contenido en español, inglés y francés.',
    s6_h:'Creación de Contenido Tech', s6_p:'Videos, podcasts y materiales educativos sobre programación, IA y finanzas.',
    media_label:'Multimedia', media_title:'Fotos & Videos', media_sub:'Detrás del código y los números, hay historias que contar.',
    tab_photos:'📸 Fotos', tab_videos:'🎬 Videos',
    v1_h:'Python para Finanzas – Ep.1', v1_p:'Automatiza reportes financieros con Python y Pandas.',
    v2_h:'BPO Operations – Masterclass', v2_p:'KPIs, WFM y diseño de centros de contacto escalables.',
    v3_h:'Dashboard con React + Supabase', v3_p:'Construye un panel financiero en tiempo real.',
    v4_h:'El Futuro del Trabajo – Podcast', v4_p:'IA, automatización y el rol humano en el nuevo empleo.',
    yt_all:'Ver canal en YouTube →',
    hl_quote:'"El activo más raro en los negocios es alguien que sabe programar, liderar y comunicarse entre culturas."',
    learning_label:'📚 Espacio de Aprendizaje',
    learning_title:'Cursos & Recursos de Capacitación',
    learning_sub:'Aprende directamente de un experto en Python, IA, desarrollo web y operaciones.',
    course_ai:'AI Vive Coding Classes', course_ai_desc:'Masterclass de automatización y IA aplicada al desarrollo real.',
    course_ai_l1:'AI Automation Level 1', course_ai_l2:'AI Automation Level 2', course_ai_l3:'AI Automation Level 3', course_ai_l4:'AI Automation Level 4',
    course_py:'Python Basics', course_py_desc:'Fundamentos de Python para principiantes. Desde variables hasta funciones avanzadas.',
    course_py_l1:'Nivel 1: Variables & Tipos', course_py_l2:'Nivel 2: Control de Flujo', course_py_l3:'Nivel 3: Funciones & Módulos', course_py_l4:'Nivel 4: Programación OOP',
    course_api:'API Integration', course_api_desc:'Integra Google Cloud, OpenAI y otras APIs profesionales en tus proyectos.',
    course_api_l1:'OpenAI & ChatGPT', course_api_l2:'Google Cloud APIs', course_api_l3:'REST APIs & Auth', course_api_l4:'Webhooks Avanzados',
    course_deploy:'Web Deployment', course_deploy_desc:'Publica tu sitio web en servidores compartidos, VPS y plataformas cloud profesionales.',
    course_deploy_l1:'cPanel & Shared Hosting', course_deploy_l2:'Domain & DNS', course_deploy_l3:'SSL & Seguridad', course_deploy_l4:'CI/CD Pipelines',
    course_english:'English 101', course_english_desc:'Inglés profesional para desarrolladores. Comunicación técnica y entrevistas de trabajo.',
    course_english_l1:'Vocabulario Técnico', course_english_l2:'Presentaciones Profesionales', course_english_l3:'Entrevistas de Trabajo', course_english_l4:'Escritura Técnica',
    course_agent:'Agent Integration', course_agent_desc:'Integra agentes de IA y bots inteligentes directamente en tus páginas web.',
    course_agent_l1:'AI Chatbots', course_agent_l2:'LangChain & Agents', course_agent_l3:'Automatización Avanzada', course_agent_l4:'Multi-Agent Systems',
    btn_more:'Ver Más →',
    sub_label:'Newsletter & Contacto', sub_title:'🎓 Únete a la Academia',
    sub_desc:'Suscríbete y recibe recursos exclusivos sobre Python, Finanzas e IA. O crea una cuenta para acceso completo.',
    tab_sub:'Suscribirse', tab_login:'Iniciar Sesión', tab_register:'Registrarse',
    btn_sub:'🚀 Suscribirme Ahora', btn_login:'🔐 Iniciar Sesión', btn_register:'✅ Crear Cuenta',
    ph_name:'Tu nombre completo', ph_email:'Tu correo electrónico', ph_password:'Contraseña',
    sub_note:'Sin spam. Cancela cuando quieras. Tu privacidad está protegida.',
    social_label:'Redes', social_title:'Sígueme',
    fp_privacy:'Política de Privacidad', fp_terms:'Términos de Uso', fp_about:'Acerca de', fp_contact:'Contacto',
    footer_copy:'© 2025 Johnny Fenelon. Todos los derechos reservados.',
    footer_note:'Sitio original y educativo. Cumple con las políticas de Google AdSense.',
    pill_finance:'Dirección Financiera',
    scroll_hint:'scroll',
  },
  en:{
    nav_about:'About', nav_services:'Services', nav_media:'Media', nav_contact:'Contact', nav_cta:'Hire Me',
    hero_eyebrow:'Finance · Tech · Operations',
    hero_role:'FENELON',
    hero_desc:'Finance Director, BPO Operations Leader, and Full-Stack Developer. Trilingual specialist transforming data into decisions and code into solutions.',
    hero_cta1:'View Services', hero_cta2:'Get in Touch',
    stat_years:'Yrs Exp.', stat_langs:'Languages', stat_projects:'Projects',
    about_label:'About Me',
    about_quote:'"I turn complex systems into elegant solutions — in any language."',
    about_body1:'Professional with over a decade bridging high-level finance, large-scale BPO operations, and modern software development. My edge is rare: I speak the language of executives, engineers, and customers — literally and figuratively.',
    about_body2:'Born to lead multicultural teams, build solid digital platforms, and optimize processes that drive real results.',
    exp1_h:'Financial Direction', exp1_p:'Planning, budgeting, risk analysis and executive reporting.',
    exp2_h:'BPO & Call Center', exp2_p:'Operations, KPIs, quality and scalability for high-volume centers.',
    exp3_h:'Python & AI', exp3_p:'Automation, ML, APIs and artificial intelligence systems.',
    exp4_h:'React & Full-Stack', exp4_p:'Modern web apps with React, PHP, PostgreSQL and Supabase.',
    stack_label:'Tech Stack', stack_title:'Tools & Languages',
    scat_dev:'Development', scat_ai:'AI & Data', scat_biz:'Business & Finance',
    srv_label:'Services', srv_title:'What I can do for you', srv_sub:'High-impact solutions in finance, technology and operations.',
    s1_h:'Financial Consulting', s1_p:'Financial modeling, profitability analysis, strategic planning and executive reports.',
    s2_h:'BPO / Call Center Operations', s2_p:'Design, optimization and management of customer service, back-office and omnichannel contact centers.',
    s3_h:'Full-Stack Development', s3_p:'Web apps with React + PHP + PostgreSQL and Supabase-powered backend.',
    s4_h:'Python & AI Automation', s4_p:'Automation scripts, intelligent bots, ML models and AI pipelines.',
    s5_h:'Academy & Training', s5_p:'Training in Python, AI and financial technology. Content in Spanish, English and French.',
    s6_h:'Tech Content Creation', s6_p:'Videos, podcasts and educational content on programming, AI and finance.',
    media_label:'Multimedia', media_title:'Photos & Videos', media_sub:'Behind the code and numbers, there are stories to tell.',
    tab_photos:'📸 Photos', tab_videos:'🎬 Videos',
    v1_h:'Python for Finance – Ep.1', v1_p:'Automate financial reports with Python and Pandas.',
    v2_h:'BPO Operations – Masterclass', v2_p:'KPIs, WFM and design of scalable contact centers.',
    v3_h:'Dashboard with React + Supabase', v3_p:'Build a real-time financial dashboard.',
    v4_h:'The Future of Work – Podcast', v4_p:'AI, automation and the human role in the new economy.',
    yt_all:'Watch all on YouTube →',
    hl_quote:'"The rarest asset in business is someone who can code, lead, and communicate across cultures."',
    learning_label:'📚 Learning Space',
    learning_title:'Courses & Training Resources',
    learning_sub:'Learn directly from an expert in Python, AI, web development and operations.',
    course_ai:'AI Vive Coding Classes', course_ai_desc:'Masterclass in automation and AI applied to real development.',
    course_ai_l1:'AI Automation Level 1', course_ai_l2:'AI Automation Level 2', course_ai_l3:'AI Automation Level 3', course_ai_l4:'AI Automation Level 4',
    course_py:'Python Basics', course_py_desc:'Python fundamentals for beginners. From variables to advanced functions.',
    course_py_l1:'Level 1: Variables & Types', course_py_l2:'Level 2: Control Flow', course_py_l3:'Level 3: Functions & Modules', course_py_l4:'Level 4: OOP Programming',
    course_api:'API Integration', course_api_desc:'Integrate Google Cloud, OpenAI and other professional APIs into your projects.',
    course_api_l1:'OpenAI & ChatGPT', course_api_l2:'Google Cloud APIs', course_api_l3:'REST APIs & Authentication', course_api_l4:'Advanced Webhooks',
    course_deploy:'Web Deployment', course_deploy_desc:'Publish your website on shared servers, VPS and professional cloud platforms.',
    course_deploy_l1:'cPanel & Shared Hosting', course_deploy_l2:'Domain & DNS', course_deploy_l3:'SSL & Security', course_deploy_l4:'CI/CD Pipelines',
    course_english:'English 101', course_english_desc:'Professional English for developers. Technical communication and job interviews.',
    course_english_l1:'Technical Vocabulary', course_english_l2:'Professional Presentations', course_english_l3:'Job Interviews', course_english_l4:'Technical Writing',
    course_agent:'Agent Integration', course_agent_desc:'Integrate AI agents and intelligent bots directly into your web pages.',
    course_agent_l1:'AI Chatbots', course_agent_l2:'LangChain & Agents', course_agent_l3:'Advanced Automation', course_agent_l4:'Multi-Agent Systems',
    btn_more:'Learn More →',
    sub_label:'Newsletter & Contact', sub_title:'🎓 Join the Academy',
    sub_desc:'Subscribe for free and get exclusive resources on Python, Finance and AI. Or create an account for full access.',
    tab_sub:'Subscribe', tab_login:'Log In', tab_register:'Register',
    btn_sub:'🚀 Subscribe Now', btn_login:'🔐 Log In', btn_register:'✅ Create Account',
    ph_name:'Your full name', ph_email:'Your email', ph_password:'Password',
    sub_note:'No spam. Cancel anytime. Your privacy is protected.',
    social_label:'Social', social_title:'Follow Me',
    fp_privacy:'Privacy Policy', fp_terms:'Terms of Use', fp_about:'About', fp_contact:'Contact',
    footer_copy:'© 2025 Johnny Fenelon. All rights reserved.',
    footer_note:'Original and educational site. Compliant with Google AdSense policies.',
    pill_finance:'Finance Direction',
    scroll_hint:'scroll',
  },
  fr:{
    nav_about:'À propos', nav_services:'Services', nav_media:'Médias', nav_contact:'Contact', nav_cta:'Me recruter',
    hero_eyebrow:'Finance · Tech · Opérations',
    hero_role:'FENELON',
    hero_desc:'Directeur Financier, Leader des Opérations BPO et Développeur Full-Stack. Spécialiste trilingue transformant les données en décisions et le code en solutions.',
    hero_cta1:'Voir les services', hero_cta2:'Me contacter',
    stat_years:'Ans Exp.', stat_langs:'Langues', stat_projects:'Projets',
    about_label:'Qui suis-je',
    about_quote:'"Je transforme les systèmes complexes en solutions élégantes — dans toutes les langues."',
    about_body1:'Professionnel avec plus d\'une décennie à relier la finance de haut niveau, les opérations BPO à grande échelle et le développement logiciel moderne. Mon avantage est rare : je parle la langue des dirigeants, des ingénieurs et des clients.',
    about_body2:'Né pour diriger des équipes multiculturelles, construire des plateformes numériques solides et optimiser les processus.',
    exp1_h:'Direction Financière', exp1_p:'Planification, budgets, analyse des risques et rapports exécutifs.',
    exp2_h:'BPO & Centre d\'appels', exp2_p:'Opérations, KPIs, qualité et scalabilité pour les centres à fort volume.',
    exp3_h:'Python & IA', exp3_p:'Automatisation, ML, APIs et systèmes d\'intelligence artificielle.',
    exp4_h:'React & Full-Stack', exp4_p:'Applications web modernes avec React, PHP, PostgreSQL et Supabase.',
    stack_label:'Stack Tech', stack_title:'Outils & Langages',
    scat_dev:'Développement', scat_ai:'IA & Data', scat_biz:'Business & Finance',
    srv_label:'Services', srv_title:'Ce que je peux faire pour vous', srv_sub:'Solutions à fort impact en finance, technologie et opérations.',
    s1_h:'Conseil Financier', s1_p:'Modélisation financière, analyse de rentabilité, planification stratégique et rapports exécutifs.',
    s2_h:'Opérations BPO / Centre d\'appels', s2_p:'Conception, optimisation et gestion des opérations de service client multicanal.',
    s3_h:'Développement Full-Stack', s3_p:'Applications web avec React + PHP + PostgreSQL et backend Supabase.',
    s4_h:'Python & Automatisation IA', s4_p:'Scripts d\'automatisation, bots intelligents, modèles ML et pipelines IA.',
    s5_h:'Académie & Formation', s5_p:'Formation en Python, IA et technologie financière. Contenu en espagnol, anglais et français.',
    s6_h:'Création de Contenu Tech', s6_p:'Vidéos, podcasts et matériels éducatifs sur la programmation, l\'IA et la finance.',
    media_label:'Multimédia', media_title:'Photos & Vidéos', media_sub:'Derrière le code et les chiffres, il y a des histoires à raconter.',
    tab_photos:'📸 Photos', tab_videos:'🎬 Vidéos',
    v1_h:'Python pour la Finance – Ep.1', v1_p:'Automatisez les rapports financiers avec Python et Pandas.',
    v2_h:'BPO Operations – Masterclass', v2_p:'KPIs, WFM et conception de centres de contact scalables.',
    v3_h:'Dashboard avec React + Supabase', v3_p:'Construisez un tableau de bord financier en temps réel.',
    v4_h:'L\'Avenir du Travail – Podcast', v4_p:'IA, automatisation et rôle humain dans la nouvelle économie.',
    yt_all:'Voir la chaîne YouTube →',
    hl_quote:'"L\'atout le plus rare en entreprise est quelqu\'un qui sait coder, diriger et communiquer entre cultures."',
    learning_label:'📚 Espace d\'Apprentissage',
    learning_title:'Cours & Ressources de Formation',
    learning_sub:'Apprenez directement d\'un expert en Python, IA, développement web et opérations.',
    course_ai:'Classes AI Vive Coding', course_ai_desc:'Masterclass en automatisation et IA appliquée au développement réel.',
    course_ai_l1:'Niveau 1 Automatisation IA', course_ai_l2:'Niveau 2 Automatisation IA', course_ai_l3:'Niveau 3 Automatisation IA', course_ai_l4:'Niveau 4 Automatisation IA',
    course_py:'Bases Python', course_py_desc:'Fondamentaux Python pour débutants. Des variables aux fonctions avancées.',
    course_py_l1:'Niveau 1 : Variables & Types', course_py_l2:'Niveau 2 : Flux de Contrôle', course_py_l3:'Niveau 3 : Fonctions & Modules', course_py_l4:'Niveau 4 : Programmation OOP',
    course_api:'Intégration API', course_api_desc:'Intégrez Google Cloud, OpenAI et autres APIs professionnelles à vos projets.',
    course_api_l1:'OpenAI & ChatGPT', course_api_l2:'Google Cloud APIs', course_api_l3:'APIs REST & Authentification', course_api_l4:'Webhooks Avancés',
    course_deploy:'Déploiement Web', course_deploy_desc:'Publiez votre site sur serveurs partagés, VPS et plateformes cloud professionnelles.',
    course_deploy_l1:'cPanel & Hosting Partagé', course_deploy_l2:'Domaine & DNS', course_deploy_l3:'SSL & Sécurité', course_deploy_l4:'Pipelines CI/CD',
    course_english:'Anglais 101', course_english_desc:'Anglais professionnel pour développeurs. Communication technique et entretiens d\'embauche.',
    course_english_l1:'Vocabulaire Technique', course_english_l2:'Présentations Professionnelles', course_english_l3:'Entretiens d\'Embauche', course_english_l4:'Rédaction Technique',
    course_agent:'Intégration Agents', course_agent_desc:'Intégrez des agents IA et bots intelligents directement dans vos pages web.',
    course_agent_l1:'Chatbots IA', course_agent_l2:'LangChain & Agents', course_agent_l3:'Automatisation Avancée', course_agent_l4:'Systèmes Multi-Agents',
    btn_more:'En savoir plus →',
    sub_label:'Newsletter & Contact', sub_title:'🎓 Rejoindre l\'Académie',
    sub_desc:'Abonnez-vous gratuitement et recevez des ressources exclusives sur Python, l\'IA et la finance.',
    tab_sub:'S\'abonner', tab_login:'Se connecter', tab_register:'S\'inscrire',
    btn_sub:'🚀 M\'abonner maintenant', btn_login:'🔐 Se connecter', btn_register:'✅ Créer un compte',
    ph_name:'Votre nom complet', ph_email:'Votre email', ph_password:'Mot de passe',
    sub_note:'Pas de spam. Annulez quand vous voulez. Votre vie privée est protégée.',
    social_label:'Réseaux', social_title:'Suivez-moi',
    fp_privacy:'Politique de confidentialité', fp_terms:'Conditions d\'utilisation', fp_about:'À propos', fp_contact:'Contact',
    footer_copy:'© 2025 Johnny Fenelon. Tous droits réservés.',
    footer_note:'Site original et éducatif. Conforme aux politiques Google AdSense.',
    pill_finance:'Direction Financière',
    scroll_hint:'défiler',
  }
};

let currentLang = 'es';

function setLang(l){
  currentLang = l;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.lang-btn').forEach(b=>{ if(b.textContent.trim()===l.toUpperCase()) b.classList.add('active'); });
  const t = T[l] || {};
  document.querySelectorAll('.js-t[data-key]').forEach(el=>{
    const k = el.dataset.key;
    if(t[k] !== undefined) el.innerHTML = t[k];
  });
  document.querySelectorAll('.js-t-ph[data-key]').forEach(el=>{
    const k = el.dataset.key;
    if(t[k] !== undefined) el.placeholder = t[k];
  });
  const b2 = document.getElementById('about-body2-el');
  if(b2) b2.textContent = t['about_body2'] || '';
  document.documentElement.lang = l;
}

setLang('es');

document.addEventListener('DOMContentLoaded', ()=>{
  const b2 = document.getElementById('about-body2-el');
  if(b2) b2.textContent = T.es.about_body2;
});

function setAuthMode(mode, btn){
  document.querySelectorAll('.auth-tab').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  ['sub','login','register'].forEach(m=>{
    const el = document.getElementById('form-'+m);
    if(el) el.style.display = m===mode ? '' : 'none';
  });
}

async function handleSubscribe(){
  const name = document.getElementById('sub-name')?.value.trim();
  const email = document.getElementById('sub-email')?.value.trim();
  if(!name || !email || !email.includes('@')){
    alert(currentLang==='en'?'Please fill all fields.':currentLang=='fr'?'Remplissez tous les champs.':'Por favor completa todos los campos.');
    return;
  }
  try {
    const response = await fetch('subscribe.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const data = await response.json();
    if(data.success){
      const formSub = document.getElementById('form-sub');
      if (formSub) formSub.style.display='none';
      const s = document.getElementById('sub-success');
      if(s) {
        s.style.display='block';
        document.getElementById('success-msg-text').textContent = currentLang==='en'? '✅ Subscribed! Talk soon.':currentLang=='fr'? '✅ Abonné(e) ! À bientôt.':' ¡Listo! Pronto recibirás noticias.';
      }
    } else {
      alert(data.msg || 'Error');
    }
  } catch (e) {
    console.error('Error:', e);
    alert('Connection error');
  }
}

function showContactForm(){
  const contactModal = document.getElementById('contact-modal');
  if (contactModal) contactModal.style.display='flex';
}

function closeContactForm(){
  const contactModal = document.getElementById('contact-modal');
  if (contactModal) contactModal.style.display='none';
  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.reset();
  const contactSuccess = document.getElementById('contact-success');
  if (contactSuccess) contactSuccess.style.display='none';
}

async function handleContactSubmit(e){
  e.preventDefault();
  const name = document.getElementById('contact-name')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const message = document.getElementById('contact-message')?.value.trim();
  if (!name || !email || !message) {
    alert('Por favor completa todos los campos.');
    return;
  }
  const submitBtn = document.getElementById('contact-submit') || document.getElementById('submit-btn');
  if (!submitBtn) return;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    formData.append('_next', window.location.href);

    const response = await fetch('https://formsubmit.co/ajax/academia969@johnnyfenelon.com', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      const contactSuccess = document.getElementById('contact-success');
      if (contactSuccess) contactSuccess.style.display = 'block';
      const contactForm = document.getElementById('contact-form');
      if (contactForm) contactForm.reset();
      setTimeout(() => closeContactForm(), 3000);
    } else {
      throw new Error(data.message || data.error || 'Error al enviar. Inténtalo de nuevo.');
    }
  } catch(error) {
    console.error('Error:', error);
    alert(error.message || 'Error al enviar. Inténtalo de nuevo.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

document.getElementById('contact-modal')?.addEventListener('click', function(e){
  if(e.target === this) closeContactForm();
});

async function handleLogin(){
  const email = document.getElementById('login-email')?.value.trim();
  const pass = document.getElementById('login-pass')?.value.trim();
  if(!email||!pass){ alert('Complete todos los campos.'); return; }
  if(!sb){ alert('Supabase no configurado.'); return; }
  const {error} = await sb.auth.signInWithPassword({email,password:pass});
  if(error){ alert('Error: '+error.message); }
  else {
    const formLogin = document.getElementById('form-login');
    if (formLogin) formLogin.style.display='none';
    const s = document.getElementById('sub-success');
    if(s){ s.style.display='block'; document.getElementById('success-msg-text').textContent = '✅ Sesión iniciada.'; }
  }
}

async function handleRegister(){
  const name = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const pass = document.getElementById('reg-pass')?.value.trim();
  if(!name||!email||!pass){ alert('Complete todos los campos.'); return; }
  if(pass.length<6){ alert('Contraseña mínimo 6 caracteres.'); return; }
  if(!sb){ alert('Supabase no configurado. Agrega tu URL y anon key.'); return; }
  const {error} = await sb.auth.signUp({email,password:pass,options:{data:{full_name:name}}});
  if(error){ alert('Error: '+error.message); }
  else {
    const formRegister = document.getElementById('form-register');
    if (formRegister) formRegister.style.display='none';
    const s = document.getElementById('sub-success');
    if(s){ s.style.display='block'; document.getElementById('success-msg-text').textContent = '✅ Cuenta creada. Revisa tu correo para confirmar.'; }
  }
}

function switchTab(tab, btn){
  document.querySelectorAll('.media-tab').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.querySelectorAll('.media-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById('pane-'+tab)?.classList.add('active');
}

function openLB(src){
  const img = document.getElementById('lb-img');
  if(img) {
    img.src = src;
    document.getElementById('lightbox')?.classList.add('open');
  }
}

function closeLB(e){
  if(!e || e.target.id==='lightbox' || e.target.classList.contains('lb-close')){
    document.getElementById('lightbox')?.classList.remove('open');
  }
}

document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLB({target:document.getElementById('lightbox')}); });

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:.12});
document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

const sio = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sk-fill').forEach(f=>f.style.animation='fillBar 1.4s ease forwards');
    }
  });
},{threshold:.2});
document.querySelectorAll('.skill-bars').forEach(el=>sio.observe(el));
