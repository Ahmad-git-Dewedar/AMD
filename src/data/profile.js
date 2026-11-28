/** Skills, as Ahmad lists them, grouped for the skills section. Brand names stay as written; the rest are translated */
export const skillGroups = [
  {
    id: 'core',
    title: { en: 'Core', ar: 'الأساسيات' },
    note: { en: 'The base of every build', ar: 'أساس كل مشروع' },
    items: [{ id: 'HTML', ar: 'HTML' }, { id: 'CSS', ar: 'CSS' }, { id: 'JavaScript', ar: 'JavaScript' }, { id: 'Python', ar: 'Python' }, { id: 'Java', ar: 'Java' }]
  },
  {
    id: 'frameworks',
    title: { en: 'Frameworks and AI', ar: 'أطر العمل والذكاء الاصطناعي' },
    note: { en: 'Modern tools that keep projects quick and easy to maintain', ar: 'أدوات حديثة تجعل المشاريع سريعة وسهلة الصيانة' },
    items: [{ id: 'React', ar: 'React' }, { id: 'Tailwind', ar: 'Tailwind' }, { id: 'Vite', ar: 'Vite' }, { id: 'AI', ar: 'الذكاء الاصطناعي' }]
  },
  {
    id: 'tools',
    title: { en: 'Tools and workflow', ar: 'الأدوات وسير العمل' },
    note: { en: 'Version control, packages, servers and automation', ar: 'إدارة الإصدارات والحزم والخوادم والأتمتة' },
    items: [{ id: 'Git', ar: 'Git' }, { id: 'npm', ar: 'npm' }, { id: 'Node.js', ar: 'Node.js' }, { id: 'n8n', ar: 'n8n' }]
  },
  {
    id: 'motion',
    title: { en: 'Motion', ar: 'الحركة' },
    note: { en: 'Movement that supports the story', ar: 'حركة تخدم القصة' },
    items: [{ id: 'CSS Animation', ar: 'حركات CSS' }, { id: 'Scroll-driven Animations', ar: 'الحركة مع التمرير' }]
  },
  {
    id: 'craft',
    title: { en: 'Interface craft', ar: 'صنعة الواجهات' },
    note: { en: 'The details people feel', ar: 'تفاصيل يشعر بها الناس' },
    items: [{ id: 'Responsive Design', ar: 'التصميم المتجاوب' }, { id: 'Arabic (RTL)', ar: 'دعم العربية' }, { id: 'Accessibility', ar: 'سهولة الوصول' }, { id: 'Light/Dark Mode', ar: 'الوضع الفاتح والداكن' }]
  }
];

/** Every skill in one list, for the moving band */
export const allSkills = skillGroups.flatMap((g) => g.items);

/** A skill's name in the current language. id is the English name and keys the icon */
export const skillName = (skill, lang) => (lang === 'ar' ? skill.ar : skill.id);

/** What Ahmad builds, each tied to the projects in this portfolio that show it */
export const services = [
  {
    id: 'bilingual',
    title: { en: 'Bilingual websites', ar: 'مواقع ثنائية اللغة' },
    body: {
      en: 'Arabic and English from one codebase, with right to left planned from the start so both versions feel native',
      ar: 'العربية والإنجليزية من كود واحد، مع تخطيط اتجاه اليمين إلى اليسار من البداية لتبدو النسختان طبيعيتين'
    },
    file: 'bilingual.jsx',
    delivers: {
      en: ['Arabic and English from one codebase', 'Layouts that mirror cleanly for right to left', 'The chosen language remembered between visits'],
      ar: ['العربية والإنجليزية من كود واحد', 'تخطيط ينعكس بسلاسة من اليمين إلى اليسار', 'تذكر اللغة المختارة بين الزيارات']
    },
    projects: ['mizan', 'veltrix']
  },
  {
    id: 'stories',
    title: { en: 'Story-driven sites', ar: 'مواقع تحكي قصة' },
    body: {
      en: 'Scene by scene sites where video, imagery and motion carry the story forward',
      ar: 'مواقع تتنقل من مشهد إلى مشهد، يحمل فيها الفيديو والصور والحركة القصة إلى الأمام'
    },
    file: 'stories.jsx',
    delivers: {
      en: ['Scenes built around video and imagery', 'Motion that carries the story forward', 'Arabic first, with an English version where it is needed'],
      ar: ['مشاهد مبنية على الفيديو والصور', 'حركة تدفع القصة إلى الأمام', 'العربية أولا، مع نسخة إنجليزية عند الحاجة']
    },
    projects: ['fatih', 'malik', 'osman', 'saladin']
  },
  {
    id: 'products',
    title: { en: 'Landing pages and stores', ar: 'صفحات هبوط ومتاجر' },
    body: {
      en: 'Product pages and shops with a clear structure, interactions that work and content people can trust',
      ar: 'صفحات منتجات ومتاجر ببنية واضحة، وتفاعلات تعمل، ومحتوى يثق به الناس'
    },
    file: 'stores.jsx',
    delivers: {
      en: ['A clear path from the first screen to the last', 'Interactions that work, from calculators to a cart', 'Content and prices shown honestly'],
      ar: ['مسار واضح من أول شاشة إلى آخرها', 'تفاعلات تعمل، من الحاسبات إلى سلة الشراء', 'محتوى وأسعار معروضة بصدق']
    },
    projects: ['mizan', 'veltrix']
  },
  {
    id: 'learning',
    title: { en: 'Learning platforms', ar: 'منصات تعليمية' },
    body: {
      en: 'Long content arranged as a journey, with progress, search and reading settings that keep it comfortable',
      ar: 'محتوى طويل مرتب كرحلة، مع تتبع التقدم والبحث وإعدادات قراءة تجعله مريحا'
    },
    file: 'learning.jsx',
    delivers: {
      en: ['Content arranged as stations or chapters', 'Progress saved along the way', 'Search and settings that keep long reading comfortable'],
      ar: ['محتوى مرتب كمحطات أو فصول', 'حفظ التقدم أثناء الرحلة', 'بحث وإعدادات تجعل القراءة الطويلة مريحة']
    },
    projects: ['yaqeen']
  }
];

/** Contact links, exactly as given */
export const links = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    labelAr: 'لينكدإن',
    handle: 'Ahmad Dewedar',
    url: 'https://www.linkedin.com/in/ahmad-dewedar-706a4339b/',
    note: { en: 'Professional profile', ar: 'الملف المهني' }
  },
  {
    id: 'github',
    label: 'GitHub',
    labelAr: 'جيت هب',
    handle: 'Ahmad-git-Dewedar',
    url: 'https://github.com/Ahmad-git-Dewedar',
    note: { en: 'Code and repositories', ar: 'الأكواد والمستودعات' }
  },
  {
    id: 'youtube',
    label: 'YouTube',
    labelAr: 'يوتيوب',
    handle: '@AhmadDewedar',
    url: 'https://www.youtube.com/@AhmadDewedar',
    note: { en: 'My channel', ar: 'قناتي' }
  }
];
