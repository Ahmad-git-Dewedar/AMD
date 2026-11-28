/**
 * The projects. Every detail here comes from the project's own README or source
 *
 * live: set to the published URL when a project goes online and the
 * "Visit live site" button appears on its page automatically
 *
 * name: each project's name in Arabic and English. Each version of the site shows only
 * its own language
 *
 * logo: every project's own logo. art: a full square artwork (the five history and
 * learning projects), shown edge to edge. Otherwise a mark on a panel of colour bg
 * at size percent. wordmark: the logo already spells the name. small: for the switcher
 *
 * display: the calligraphic face used for the four historical titles
 * (see .title-art--<display> in styles/projects.css); null uses plain type
 */

export const projects = [
  {
    slug: 'fatih',
    name: { ar: 'محمد الفاتح', en: 'Muhammad al-Fatih' },
    display: 'ruqaa',
    kind: 'historical',
    live: 'https://mehmed-ll.ahmaddewedar2016.workers.dev/',
    logo: { src: '/logos/fatih.webp', small: '/logos/fatih-sm.webp', bg: '#0c0c0d', art: true },
    accent: '#c49a6c',
    type: { en: 'Illustrated history story', ar: 'سيرة مصورة' },
    summary: {
      en: 'An Arabic-first illustrated story of Sultan Mehmed II, told through seven framed video scenes, a final portrait and a visual history section, with an English version one click away',
      ar: 'سيرة مصورة للسلطان محمد الثاني بالعربية أولًا، تُروى عبر سبعة مشاهد فيديو داخل إطارات، ثم صورة ختامية وقسم تاريخي بصري، مع نسخة إنجليزية بضغطة واحدة'
    },
    overview: {
      en: 'The page scrolls naturally with nothing pinned. Depth comes from CSS scroll-driven animations, so pictures drift behind their frames while the text stays still and readable. The history section turns each topic into its own visual form instead of long paragraphs',
      ar: 'الصفحة تُمرَّر بشكل طبيعي دون أي تثبيت. العمق يأتي من حركات CSS المرتبطة بالتمرير، فتنساب الصور خلف إطاراتها بينما يبقى النص ثابتًا وواضحًا. القسم التاريخي يحوّل كل موضوع إلى شكل بصري خاص به بدل الفقرات الطويلة'
    },
    features: {
      en: [
        'Opening title card that unfolds along its fold, with the sultan’s tughra in gold behind the name',
        'Seven framed video scenes with key dates and deeper text that opens on demand',
        'Interactive campaign map with real coastlines and 14 campaigns marked by outcome',
        'Family tree, four pillars of government and an architecture diptych',
        'Parallax depth on native scrolling, with videos that play only while visible',
        'Light and dark appearance plus Arabic and English, both applied before first paint',
        '61 end-to-end checks in headless Chrome'
      ],
      ar: [
        'بطاقة افتتاحية تنفتح على طيّتها، وطغراء السلطان بالذهبي خلف الاسم',
        'سبعة مشاهد فيديو داخل إطارات مع تواريخ رئيسية ونص أعمق يُفتح عند الطلب',
        'خريطة حملات تفاعلية بسواحل حقيقية و14 حملة مصنفة حسب نتيجتها',
        'شجرة العائلة، وأركان الحكم الأربعة، ولوحة مزدوجة للعمارة',
        'عمق بصري مع التمرير الطبيعي، وفيديوهات لا تعمل إلا وهي ظاهرة',
        'وضع فاتح وداكن وعربي وإنجليزي، يُطبَّقان قبل أول رسم للصفحة',
        '61 اختبارًا شاملًا في متصفح Chrome دون واجهة'
      ]
    },
    tech: ['TypeScript', 'Vite', 'CSS scroll-driven animations', 'Natural Earth map data', 'ffmpeg', 'Playwright'],
  },
  {
    slug: 'malik',
    name: { ar: 'الإمام مالك', en: 'Imam Malik' },
    display: 'naskh',
    kind: 'historical',
    live: 'https://emam-malek.ahmaddewedar2016.workers.dev/',
    logo: { src: '/logos/malik.webp', small: '/logos/malik-sm.webp', bg: '#001336', art: true },
    accent: '#f5c518',
    type: { en: 'Cinematic story in eight scenes', ar: 'قصة سينمائية في ثمانية مشاهد' },
    summary: {
      en: 'The story of Imam Malik ibn Anas in eight scenes from Medina. Every clip plays inside an eye that blinks to move between scenes',
      ar: 'قصة الإمام مالك بن أنس في ثمانية مشاهد من المدينة. كل مقطع يُعرض داخل عين ترمش للانتقال بين المشاهد'
    },
    overview: {
      en: 'There is no page scrolling here. Each scene fills the screen and the story moves one scene at a time, by wheel, swipe, keyboard or the dock. A reading panel turns every scene into a short lesson with context and key terms',
      ar: 'لا يوجد تمرير للصفحة هنا. كل مشهد يملأ الشاشة والقصة تتقدم مشهدًا مشهدًا، بعجلة الفأرة أو السحب أو لوحة المفاتيح أو شريط التحكم. لوحة القراءة تحول كل مشهد إلى درس قصير بسياقه ومصطلحاته'
    },
    features: {
      en: [
        'Sand opening drawn on a canvas: grains settle into the title, then blow away along the reading direction',
        'Eight scenes framed by an eye shape, with a blink that closes, changes the scene and opens again',
        'A reading panel per scene with historical context, two key terms in both languages and one reported detail',
        'Wheel, swipe, keyboard and dock navigation, plus a contact sheet of all eight scenes',
        'Clips that loop without a cut, in 480p or 720p depending on screen size and Save-Data',
        'Arabic by default with English as a second language'
      ],
      ar: [
        'افتتاحية رملية مرسومة على canvas: تستقر الحبيبات في العنوان ثم تطير مع اتجاه القراءة',
        'ثمانية مشاهد داخل إطار على شكل عين، مع رمشة تغلق وتغير المشهد ثم تفتح',
        'لوحة قراءة لكل مشهد فيها السياق التاريخي ومصطلحان باللغتين ومعلومة منقولة',
        'تنقل بالعجلة والسحب ولوحة المفاتيح وشريط التحكم، مع لوحة تعرض المشاهد الثمانية',
        'مقاطع تتكرر دون انقطاع بدقة 480p أو 720p حسب الشاشة ووضع توفير البيانات',
        'العربية أولًا والإنجليزية لغة ثانية'
      ]
    },
    tech: ['React', 'TypeScript', 'Vite', 'Canvas 2D', 'ffmpeg'],
  },
  {
    slug: 'osman',
    name: { ar: 'عثمان الأول', en: 'Osman I' },
    display: 'nastaliq',
    kind: 'historical',
    live: 'https://osman.ahmaddewedar2016.workers.dev/',
    logo: { src: '/logos/osman.webp', small: '/logos/osman-sm.webp', bg: '#04142a', art: true },
    accent: '#d6ad5c',
    type: { en: 'Cinematic story with ambient sound', ar: 'قصة سينمائية بأصوات المكان' },
    summary: {
      en: 'The story of Osman I, founder of the Ottoman state, in eight scenes inside a turning gold ring. No music, only the sound of each place',
      ar: 'قصة عثمان الأول مؤسس الدولة العثمانية في ثمانية مشاهد داخل حلقة ذهبية تدور. بلا موسيقى، فقط أصوات كل مكان'
    },
    overview: {
      en: 'Each scene plays its clip’s own recorded ambience: wind over the camp, hooves on the climb, the smith’s hammer in the market. The sound runs through the Web Audio API and is pulled back into sync whenever it drifts from the picture, so a hammer blow lands when you see it',
      ar: 'كل مشهد يشغّل الأصوات المسجلة في مقطعه: الريح فوق المخيم، ووقع الحوافر في الصعود، ومطرقة الحداد في السوق. الصوت يعمل عبر Web Audio API ويُعاد ضبطه مع الصورة كلما ابتعد عنها، فتُسمع الضربة لحظة رؤيتها'
    },
    features: {
      en: [
        'Gold dust opening that gathers into the name and streams into the first circle',
        'Iris transition: the circle closes to a point of light and opens on the next scene',
        'Ambient sound synced to the video, with a sound toggle that is remembered',
        'Historical notes that keep disputed points and picture details apart from the main account',
        'Follows the device’s light or dark setting, with a manual toggle',
        '89 end-to-end checks at ten screen sizes in both languages'
      ],
      ar: [
        'افتتاحية من غبار ذهبي يتجمع في الاسم ثم يتدفق إلى الدائرة الأولى',
        'انتقال القزحية: تنغلق الدائرة إلى نقطة ضوء ثم تنفتح على المشهد التالي',
        'أصوات المكان متزامنة مع الفيديو، مع زر للصوت يتذكر اختيارك',
        'ملاحظات تاريخية تفصل المسائل الخلافية وتفاصيل الصور عن السرد الأساسي',
        'يتبع الوضع الفاتح أو الداكن للجهاز مع زر يدوي للتبديل',
        '89 اختبارًا شاملًا على عشرة مقاسات شاشة باللغتين'
      ]
    },
    tech: ['React', 'TypeScript', 'Vite', 'Canvas 2D', 'Web Audio API', 'ffmpeg', 'Playwright'],
  },
  {
    slug: 'saladin',
    name: { ar: 'صلاح الدين الأيوبي', en: 'Salah El-Din' },
    display: 'kufi',
    kind: 'historical',
    live: 'https://al-ayoubi.ahmaddewedar2016.workers.dev/',
    logo: { src: '/logos/saladin.webp', small: '/logos/saladin-sm.webp', bg: '#112828', art: true },
    accent: '#d3b06a',
    type: { en: 'Journey in eight chapters', ar: 'رحلة في ثمانية فصول' },
    summary: {
      en: 'Eight chapters from the life of Saladin, from his birth in Tikrit in 1137 to his death in Damascus in 1193, with scenes that move on by themselves',
      ar: 'ثمانية فصول من سيرة صلاح الدين، من مولده في تكريت سنة 1137 إلى وفاته في دمشق سنة 1193، بمشاهد تتوالى وحدها'
    },
    overview: {
      en: 'The journey runs like a film you can control. Each chapter has its own scene, and a countdown in the dock moves the story along. You can pause it, change how long each scene stays, or jump straight to any chapter',
      ar: 'الرحلة تعمل كفيلم تتحكم فيه. لكل فصل مشهده الخاص، وعداد في شريط التحكم يدفع القصة للأمام. يمكنك إيقافه أو تغيير مدة كل مشهد أو الانتقال مباشرة إلى أي فصل'
    },
    features: {
      en: [
        'Eight full-screen chapters, from Tikrit to Hattin, Jerusalem and Damascus',
        'Scenes advance on a countdown you can pause or set between 10 and 30 seconds',
        'A segmented chapter strip and a chapter menu to jump anywhere',
        'Route maps drawn in SVG with places, rivers and shorelines',
        'Crossfades between chapters and an end card that never loops on its own',
        'Videos stay still with reduced motion or Save-Data until you choose to play them'
      ],
      ar: [
        'ثمانية فصول بملء الشاشة، من تكريت إلى حطين والقدس ودمشق',
        'المشاهد تتقدم بعداد يمكن إيقافه أو ضبطه بين 10 و30 ثانية',
        'شريط فصول مقسم وقائمة للانتقال إلى أي فصل',
        'خرائط مسارات مرسومة بـ SVG فيها الأماكن والأنهار والسواحل',
        'انتقالات متلاشية بين الفصول وبطاقة ختامية لا تعيد القصة وحدها',
        'الفيديوهات لا تعمل تلقائيًا مع تقليل الحركة أو توفير البيانات حتى تختار تشغيلها'
      ]
    },
    tech: ['React', 'TypeScript', 'Vite', 'SVG', 'CSS animations'],
  },
  {
    slug: 'yaqeen',
    name: { ar: 'يقين', en: 'YAQEEN' },
    display: null,
    kind: 'product',
    live: 'https://yaqeen-peach.vercel.app/',
    logo: { src: '/logos/yaqeen.webp', small: '/logos/yaqeen-sm.webp', bg: '#021815', art: true },
    accent: '#c9a25a',
    type: { en: 'Aqeedah learning platform', ar: 'منصة لتعلم العقيدة' },
    summary: {
      en: 'An Arabic educational website on Islamic Aqeedah, laid out as nine stations with an optional quiz at the end',
      ar: 'موقع تعليمي عربي في العقيدة الإسلامية، مقسم إلى تسع محطات مع اختبار اختياري في النهاية'
    },
    overview: {
      en: 'Yaqeen reads like an editorial journey: cream pages and ink type, with dark painted bands between sections. Visitors can follow their progress through the stations, and adjust theme, text size and how much motion they want',
      ar: 'يقين يُقرأ كرحلة تحريرية: صفحات بلون الكريم وخط بلون الحبر، مع لوحات داكنة بين الأقسام. يتابع الزائر تقدمه عبر المحطات، ويضبط المظهر وحجم الخط ومقدار الحركة'
    },
    features: {
      en: [
        'Nine learning stations and an optional ten-question quiz with explanations that link back',
        'An opening sequence and a hero that waits until the visitor starts the journey',
        'Headings that rise word by word, paintings revealed by a gold wipe and a marquee that reacts to scroll speed',
        'Progress saved per station and search with Arabic text normalisation',
        'Settings for theme, text size, font weight and motion: full, reduced or none',
        'Quran quotations checked against the Tanzil text and hadith checked on sunnah.com'
      ],
      ar: [
        'تسع محطات تعليمية واختبار اختياري من عشرة أسئلة بشرح يعيدك للمحطة المناسبة',
        'افتتاحية متحركة وواجهة تنتظر حتى يبدأ الزائر الرحلة',
        'عناوين تظهر كلمة كلمة، ولوحات تنكشف بمسحة ذهبية، وشريط كلمات يتفاعل مع سرعة التمرير',
        'حفظ التقدم لكل محطة وبحث يراعي اختلاف كتابة الحروف العربية',
        'إعدادات للمظهر وحجم الخط ووزنه والحركة: كاملة أو مخففة أو بدون',
        'الآيات مطابقة لنص Tanzil والأحاديث مراجعة على sunnah.com'
      ]
    },
    tech: ['React', 'Vite', 'Framer Motion', 'Lenis', 'CSS design tokens'],
  },
  {
    slug: 'mizan',
    name: { ar: 'ميزان', en: 'Mizan' },
    display: null,
    kind: 'product',
    live: 'https://mizan-project.netlify.app/',
    logo: { src: '/logos/mizan.webp', small: '/logos/mizan.webp', bg: '#eef3ef', size: 52, wordmark: true, light: true },
    accent: '#3ddc97',
    type: { en: 'Fintech landing page', ar: 'صفحة هبوط مالية' },
    summary: {
      en: 'A bilingual fintech landing page in Arabic and English, with a live income and expenses calculator and a layout that fully mirrors for right to left',
      ar: 'صفحة هبوط مالية بالعربية والإنجليزية، فيها حاسبة حية للدخل والمصروفات وتخطيط ينعكس بالكامل من اليمين إلى اليسار'
    },
    overview: {
      en: 'Both languages come from one codebase and one content file. Directional spacing uses logical CSS properties, so the Arabic layout comes from the direction itself rather than separate styles, and charts mirror so they still read forward',
      ar: 'اللغتان من نفس الكود ونفس ملف المحتوى. المسافات الاتجاهية تستخدم خصائص CSS المنطقية، فيأتي التخطيط العربي من الاتجاه نفسه لا من أنماط منفصلة، والرسوم البيانية تنعكس لتُقرأ للأمام'
    },
    features: {
      en: [
        'Arabic and English from one codebase, with the choice remembered',
        'Live income and expenses calculator',
        'Track, Budget, Save and Insights tabs and monthly or yearly pricing, all driven by state',
        'Responsive SVG and CSS charts that mirror in Arabic',
        'Latin numbers isolated inside Arabic text so mixed amounts never reorder',
        'A single-file standalone build that opens without a server'
      ],
      ar: [
        'العربية والإنجليزية من كود واحد، مع حفظ اختيار اللغة',
        'حاسبة حية للدخل والمصروفات',
        'تبويبات التتبع والميزانية والادخار والتحليلات، وأسعار شهرية أو سنوية، كلها تعمل بالحالة',
        'رسوم بيانية متجاوبة بـ SVG وCSS تنعكس في العربية',
        'الأرقام اللاتينية معزولة داخل النص العربي فلا تنقلب المبالغ المختلطة',
        'نسخة في ملف واحد تعمل دون خادم'
      ]
    },
    tech: ['React', 'Vite', 'JavaScript', 'CSS logical properties', 'SVG', 'Lucide icons'],
  },
  {
    slug: 'veltrix',
    name: { ar: 'فيلتريكس', en: 'VELTRIX' },
    display: null,
    kind: 'product',
    live: 'https://veltrix.ahmaddewedar2016.workers.dev/',
    logo: { src: '/logos/veltrix.webp', small: '/logos/veltrix.webp', bg: '#000000', size: 60, wordmark: true },
    accent: '#b9bec7',
    type: { en: 'Electronics store', ar: 'متجر إلكترونيات' },
    summary: {
      en: 'A bilingual multi-brand electronics store in English and Arabic, with 42 products from 22 brands and a full path from search to checkout',
      ar: 'متجر إلكترونيات متعدد العلامات بالعربية والإنجليزية، فيه 42 منتجًا من 22 علامة ومسار كامل من البحث حتى إتمام الطلب'
    },
    overview: {
      en: 'Every price says what it is and where it was confirmed, and products without a confirmed price can be saved but not bought. There are no invented discounts, reviews or stock levels. Checkout is honest too: it saves an order request in the browser and says plainly that nothing was charged',
      ar: 'كل سعر يوضح نوعه ومصدر التحقق منه، والمنتج الذي لم يتأكد سعره يمكن حفظه دون شرائه. لا خصومات ولا تقييمات ولا كميات مخترعة. وإتمام الطلب صريح كذلك: يحفظ طلبًا في المتصفح ويقول بوضوح إنه لم يتم خصم أي مبلغ'
    },
    features: {
      en: [
        '42 products in 14 categories from 22 brands, each with a price and its source',
        'Shop, category, brand and search pages with filters and sorting kept in the URL',
        'Search across English and Arabic that ignores diacritics and common spelling variants',
        'Product pages with a gallery, variants, quantity, wishlist, specifications and related products',
        'Cart and a validated two-step checkout that saves an order request',
        'Full Arabic RTL from logical CSS properties, with language and theme applied before first paint'
      ],
      ar: [
        '42 منتجًا في 14 فئة من 22 علامة، لكل منها سعر ومصدره',
        'صفحات للمتجر والفئات والعلامات والبحث، بفلاتر وترتيب محفوظ في الرابط',
        'بحث بالعربية والإنجليزية يتجاهل التشكيل واختلافات الكتابة الشائعة',
        'صفحات منتجات فيها معرض صور وخيارات وكمية وقائمة أمنيات ومواصفات ومنتجات مشابهة',
        'سلة وإتمام طلب على خطوتين مع التحقق من البيانات وحفظ الطلب',
        'اتجاه عربي كامل من خصائص CSS المنطقية، مع تطبيق اللغة والمظهر قبل أول عرض'
      ]
    },
    tech: ['React', 'TypeScript', 'React Router', 'Vite', 'CSS Modules', 'CSS design tokens'],
  }
];

/** The name in the requested language, or the Arabic one when there is no translation */
export const nameOf = (project, lang) => project.name[lang];

/** Technology labels: brand names stay as written, descriptive ones are translated */
const TECH_AR = {
  'CSS scroll-driven animations': 'حركة CSS مع التمرير',
  'Natural Earth map data': 'بيانات خرائط Natural Earth',
  'Canvas 2D': 'رسم ثنائي الأبعاد على Canvas',
  'CSS animations': 'حركات CSS',
  'CSS design tokens': 'متغيرات تصميم CSS',
  'CSS logical properties': 'خصائص CSS المنطقية',
  'Lucide icons': 'أيقونات Lucide'
};
export const techLabel = (tech, lang) => (lang === 'ar' && TECH_AR[tech]) || tech;

export const findProject = (slug) => projects.find((p) => p.slug === slug);
