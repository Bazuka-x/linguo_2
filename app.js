/**
 * LINGUO - Онлайн школа иностранных языков & Tailwind CSS Практикум
 * Полная адаптация: Vue.js 3 + Tailwind CSS (v3.4+)
 * 
 * Включает:
 * 1. Кастомные выпадающие списки (<custom-select>) во всем проекте
 * 2. Детальная страница курса с информацией о преподавателе и силлабусом
 * 3. Реальный интерактивный чат с ботом-преподавателем
 * 4. Кастомная форма регистрации с валидацией и SHA-256 хэшированием
 * 5. Excel Drag-n-Drop, CRUD, пагинация, Voyager Admin, REST API v1, Diff viewer
 * 6. Guard (защита страниц), локальное хранилище файлов, Google Drive dump
 */

const { createApp, ref, reactive, computed, watch, onMounted } = Vue;

// -------------------------------------------------------------
// НАЧАЛЬНЫЕ ДАННЫЕ (без изменений)
// -------------------------------------------------------------

const INITIAL_COURSES = [
    {
        id: 1,
        title: "Английский язык: Разговорный интенсив",
        language: "Английский",
        level: "B1",
        teacher: "Джеймс Уилсон",
        price: 2500,
        seats: 12,
        seatsLeft: 3,
        status: "Набор открыт",
        description: "Разговорная практика, преодоление языкового барьера и подготовка к зарубежным поездкам и собеседованиям.",
        image: "/images/eng.jpg",
        createdAt: "2026-10-01",
        schedule: "Вт / Чт 19:00 - 20:30",
        duration: "3 месяца (48 акад. часов)",
        syllabus: [
            { title: "Модуль 1: Снятие языкового барьера", desc: "Практика спонтанной речи, преодоление страха ошибок, 300+ идиом повседневного общения." },
            { title: "Модуль 2: Грамматика для беглости", desc: "Сложные времена без зубрежки, инверсия, условные предложения (Conditionals 1-3)." },
            { title: "Модуль 3: Разговорные клубы с носителями", desc: "Дебаты, обсуждение мировых новостей, тренировка британского и американского акцентов." },
            { title: "Модуль 4: Сертификация и экзамен", desc: "Пробный тест формата CEFR B1/B2 и выдача персонального номерного сертификата." }
        ]
    },
    {
        id: 2,
        title: "Испанский язык для начинающих",
        language: "Испанский",
        level: "A1",
        teacher: "Мария Родригес",
        price: 2100,
        seats: 10,
        seatsLeft: 4,
        status: "Набор открыт",
        description: "Погружение в культуру и коммуникативная методика с первого занятия. Быстрый старт с нуля.",
        image: "images/esp.jpg",
        createdAt: "2026-10-02",
        schedule: "Пн / Ср 18:30 - 20:00",
        duration: "2.5 месяца (40 акад. часов)",
        syllabus: [
            { title: "Модуль 1: Фонетика и первые фразы", desc: "Идеальное мадридское произношение, правила чтения, приветствия и знакомство." },
            { title: "Модуль 2: Повседневная жизнь в Испании", desc: "Кафе, рестораны, отели, покупки и навигация в Барселоне и Мадриде." },
            { title: "Модуль 3: Глаголы и времена", desc: "Presente de Indicativo, правильные и отклоняющиеся глаголы, предлоги места." },
            { title: "Модуль 4: Итоговый разговорный проект", desc: "Защита диалога на свободную тему с получением сертификата A1." }
        ]
    },
    {
        id: 3,
        title: "Немецкий язык: Грамматика и практика",
        language: "Немецкий",
        level: "B2",
        teacher: "Ганс Вебер",
        price: 2900,
        seats: 8,
        seatsLeft: 2,
        status: "Идет обучение",
        description: "Грамматическая база и интерактивные сессии для учебы и работы в Германии, Австрии и Швейцарии.",
        image: "images/deu.jpg",
        createdAt: "2026-10-03",
        schedule: "Ср / Пт 19:30 - 21:00",
        duration: "4 месяца (64 акад. часов)",
        syllabus: [
            { title: "Модуль 1: Продвинутый синтаксис", desc: "Пассивные конструкции, глаголы с предлогами, Konjunktiv II." },
            { title: "Модуль 2: Профессиональная коммуникация", desc: "Деловая переписка, резюме (Lebenslauf) и собеседование в немецкую компанию." },
            { title: "Модуль 3: Научные и публицистические статьи", desc: "Анализ текстов уровня B2, аргументация и дискуссии." },
            { title: "Модуль 4: Подготовка к Goethe-Zertifikat B2", desc: "Отработка всех 4 частей экзамена: Lesen, Hören, Schreiben, Sprechen." }
        ]
    },
    {
        id: 4,
        title: "Китайский язык: Иероглифика и HSK",
        language: "Китайский",
        level: "A2",
        teacher: "Ли Вэй",
        price: 3500,
        seats: 6,
        seatsLeft: 1,
        status: "Набор открыт",
        description: "Иероглифика, тональное произношение и качественная подготовка к экзамену HSK 1-3.",
        image: "images/cha.jpg",
        createdAt: "2026-10-05",
        schedule: "Вт / Сб 18:00 - 19:30",
        duration: "3.5 месяца (56 акад. часов)",
        syllabus: [
            { title: "Модуль 1: Пиньинь и тоны", desc: "Четыре тона, фонетическая система, базовые черты и ключи иероглифов." },
            { title: "Модуль 2: Первые 300 иероглифов", desc: "Этимология знаков, правила каллиграфии, порядок черт." },
            { title: "Модуль 3: Разговорный китайский", desc: "Диалоги на рынке, в такси, заказ чая, китайский этикет." },
            { title: "Модуль 4: Стратегия HSK", desc: "Решение типовых тестов HSK с разбором ловушек аудиозаписей." }
        ]
    },
    {
        id: 5,
        title: "Деловой английский (Business English)",
        language: "Английский",
        level: "C1",
        teacher: "Сара Дженкинс",
        price: 3200,
        seats: 15,
        seatsLeft: 5,
        status: "Набор открыт",
        description: "Бизнес-лексика, проведение презентаций, переговоры и деловая переписка с зарубежными партнерами.",
        image: "images/hero_learning_1791364551777.jpg",
        createdAt: "2026-10-08",
        schedule: "Пн / Чт 20:00 - 21:30",
        duration: "3 месяца (48 акад. часов)",
        syllabus: [
            { title: "Модуль 1: Переговоры и питчинг", desc: "Язык дипломатии, убеждение оппонента, тактика ведения торгов." },
            { title: "Модуль 2: Финансовая и IT-лексика", desc: "Отчетность, метрики, инвестиции, agile-терминология." },
            { title: "Модуль 3: Деловая переписка", desc: "Email-этикет, составление договоров и коммерческих предложений." },
            { title: "Модуль 4: Бизнес-кейс проект", desc: "Защита реального бизнес-плана перед носителем языка." }
        ]
    },
    {
        id: 6,
        title: "Французский язык: Романтика Парижа",
        language: "Французский",
        level: "A1",
        teacher: "Жан Дюпон",
        price: 2300,
        seats: 9,
        seatsLeft: 3,
        status: "Набор открыт",
        description: "Основы фонетики, повседневные диалоги и знакомство с богатой культурой Франции.",
        image: "images/spanish_course_1791364574198.jpg",
        createdAt: "2026-10-10",
        schedule: "Вт / Пт 18:30 - 20:00",
        duration: "2.5 месяца (40 акад. часов)",
        syllabus: [
            { title: "Модуль 1: Парижская мелодика", desc: "Носовые гласные, сцепление слов (liaison), алфавит." },
            { title: "Модуль 2: Французский стиль жизни", desc: "Гастрономия, искусство, прогулки по Монмартру." },
            { title: "Модуль 3: Базовая грамматика", desc: "Passé Composé, артикли, местоимения, отрицание." },
            { title: "Модуль 4: Финальный разговор", desc: "Практика интервью в формате DELF A1." }
        ]
    }
];

const INITIAL_TEACHERS = [
    {
        id: 1,
        name: "Джеймс Уилсон",
        language: "Английский",
        country: "Великобритания (Лондон)",
        experience: "8 лет стажа",
        rating: "4.9",
        students: 420,
        avatar: "JW",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        education: "Oxford University (MA Applied Linguistics), Cambridge CELTA & DELTA",
        bio: "Носитель британского английского языка. Специализируется на разговорных интенсивах, снятии психологического барьера и подготовке к международным сертификатам IELTS Academic (средний балл учеников 7.5+)."
    },
    {
        id: 2,
        name: "Мария Родригес",
        language: "Испанский",
        country: "Испания (Мадрид)",
        experience: "6 лет стажа",
        rating: "4.8",
        students: 310,
        avatar: "MR",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
        education: "Universidad Complutense de Madrid, Международный сертификат DELE",
        bio: "Дипломированный преподаватель испанского как иностранного. Применяет авторскую коммуникативную методику, благодаря которой студенты начинают бегло строить диалоги уже на второй неделе занятий."
    },
    {
        id: 3,
        name: "Ганс Вебер",
        language: "Немецкий",
        country: "Германия (Мюнхен)",
        experience: "9 лет стажа",
        rating: "4.9",
        students: 380,
        avatar: "GW",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        education: "Ludwig-Maximilians-Universität München, Сертификат Goethe-Institut",
        bio: "Эксперт по подготовке к Goethe-Zertifikat B1/B2 и TestDaF. Помогает студентам и специалистам успешно подготовиться к переезду, поступлению в европейские вузы и профессиональной карьере."
    },
    {
        id: 4,
        name: "Ли Вэй",
        language: "Китайский",
        country: "Китай (Пекин)",
        experience: "5 лет стажа",
        rating: "4.7",
        students: 220,
        avatar: "LW",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        education: "Beijing Normal University, Сертификат преподавателя CTCSOL",
        bio: "Мастер каллиграфии и эксперт экзаменов HSK 1-5. Учит понимать структуру иероглифов через ассоциации и исторические корни, превращая сложную грамоту в увлекательный процесс."
    }
];

const INITIAL_USERS = [];
const INITIAL_LOGS = [];

const INITIAL_PRODUCTS = [
    { id: 1, name: "Cambridge English Grammar in Use", price: 75, oldPrice: 95, category: "books", rating: 4.9, reviews: 128, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80", tag: "Хит продаж", level: "B1-B2" },
    { id: 2, name: "DELE B2: Полный курс подготовки", price: 120, oldPrice: 150, category: "courses", rating: 4.8, reviews: 84, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80", tag: "Новинка", level: "B2" },
    { id: 3, name: "HSK 3 Standard Course + Workbook", price: 85, oldPrice: 110, category: "books", rating: 4.7, reviews: 62, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80", tag: "Популярно", level: "HSK 3" },
    { id: 4, name: "Беспроводная гарнитура для спикинга", price: 190, oldPrice: 230, category: "accessories", rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", tag: "Рекомендуем", level: "Audio Pro" },
    { id: 5, name: "Набор карточек: 1000 немецких слов", price: 35, oldPrice: 45, category: "accessories", rating: 4.6, reviews: 43, image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80", tag: "Скидка", level: "A1-B1" },
    { id: 6, name: "Индивидуальный разговорный клуб (5 сессий)", price: 210, oldPrice: 260, category: "courses", rating: 5.0, reviews: 95, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", tag: "Премиум", level: "Native C2" }
];

const INITIAL_KANBAN = [
    { id: 'k1', status: 'todo', title: 'Обновить учебный план B2 по немецкому языку', tag: 'Методика', priority: 'Высокий', assignee: 'Ганс Вебер', avatar: 'GW' },
    { id: 'k2', status: 'todo', title: 'Подготовить материалы для онлайн экзамена HSK 3', tag: 'Контент', priority: 'Средний', assignee: 'Ли Вэй', avatar: 'LW' },
    { id: 'k3', status: 'inProgress', title: 'Провести вебинар по бизнес-английскому', tag: 'Вебинар', priority: 'Высокий', assignee: 'Сара Дженкинс', avatar: 'SJ' },
    { id: 'k4', status: 'inProgress', title: 'Интеграция тестов на онлайн платформу', tag: 'Разработка', priority: 'Срочно', assignee: 'Dev Team', avatar: 'DT' },
    { id: 'k5', status: 'done', title: 'Сформировать отчет успеваемости за октябрь', tag: 'Отчетность', priority: 'Низкий', assignee: 'Менеджер', avatar: 'MC' },
    { id: 'k6', status: 'done', title: 'Запустить акцию на бесплатные пробные уроки', tag: 'Маркетинг', priority: 'Средний', assignee: 'Marketing', avatar: 'MK' }
];

const INITIAL_DIALOGUES = [
    { id: 1, name: "Джеймс Уилсон", role: "Преподаватель Английского", avatar: "JW", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", online: true, unread: 1, lastMessage: "See you at the speaking club today!", time: "14:20" },
    { id: 2, name: "Мария Родригес", role: "Преподаватель Испанского", avatar: "MR", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", online: true, unread: 0, lastMessage: "¡Excelente trabajo con los ejercicios!", time: "Вчера" },
    { id: 3, name: "Ганс Вебер", role: "Преподаватель Немецкого", avatar: "GW", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", online: false, unread: 0, lastMessage: "Guten Tag! Ваши домашние задания проверены.", time: "Пн" },
    { id: 4, name: "Учебная часть LINGUO", role: "Служба заботы о студентах", avatar: "HQ", avatarUrl: "", online: true, unread: 0, lastMessage: "Здравствуйте! Ваш сертификат CEFR подготовлен.", time: "11:05" }
];

const INITIAL_MESSAGES = [
    { id: 1, dialogueId: 1, sender: 'them', text: 'Hello! Are you ready for today’s speaking club on Business English?', time: '14:15', status: 'read' },
    { id: 2, dialogueId: 1, sender: 'me', text: 'Hi James! Yes, I have reviewed the vocabulary and case studies.', time: '14:18', status: 'read' },
    { id: 3, dialogueId: 1, sender: 'them', text: 'Great! See you at the speaking club today! Let me know if you need the PDF.', time: '14:20', status: 'read' },
    { id: 4, dialogueId: 2, sender: 'them', text: '¡Hola! ¿Cómo estás con la tarea de los verbos irregulares?', time: 'Вчера 18:00', status: 'read' },
    { id: 5, dialogueId: 4, sender: 'them', text: 'Здравствуйте! Ваш сертификат CEFR подготовлен и доступен для скачивания.', time: '11:05', status: 'read' }
];

// Звуковой синтезатор сообщений
function playNotificationSound(type = 'send') {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'send') {
            osc.frequency.setValueAtTime(580, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } else {
            osc.frequency.setValueAtTime(740, ctx.currentTime);
            osc.frequency.setValueAtTime(980, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
        }
    } catch (e) { }
}

// -------------------------------------------------------------
// VUE 3 APPLICATION
// -------------------------------------------------------------

const app = createApp({
    setup() {
        // --- Навигация ---
        const activePage = ref('home');
        const activeTailwindTab = ref('level1');
        const mobileMenuOpen = ref(false);
        const isLoading = ref(false);

        // --- Тема ---
        const isDark = ref(false);
        const toggleDarkMode = () => {
            isDark.value = !isDark.value;
            applyTheme();
        };
        const applyTheme = () => {
            if (isDark.value) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('linguo_theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('linguo_theme', 'light');
            }
        };

        // --- Базы данных ---
        const courses = ref([]);
        const teachers = ref([...INITIAL_TEACHERS]);
        const users = ref([]);
        const logs = ref([]);
        const localFiles = ref([]); // заменяет пустой files
        const cart = ref([]);
        const currentUser = ref(null);

        // --- Профиль преподавателя / Pricing ---
        const profileFollowers = ref(428);
        const profileFollowed = ref(false);
        const toggleFollow = () => {
            profileFollowed.value = !profileFollowed.value;
            profileFollowers.value += profileFollowed.value ? 1 : -1;
            showToast(profileFollowed.value ? "Вы подписались на Елену Васильеву" : "Вы отписались", "info");
        };
        const billingAnnual = ref(false);

        // --- ДАННЫЕ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (ИНФО-БЛОКИ) ---
        const languageDirections = [
            { name: "Английский", icon: "bi-translate", flag: "🇬🇧", desc: "Разговорный, Business, IT и подготовка к IELTS", levels: "A1 — C1", coursesCount: 3, color: "from-blue-500/10 to-indigo-500/10 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400" },
            { name: "Испанский", icon: "bi-sun-fill", flag: "🇪🇸", desc: "Живой язык Мадрида и Барселоны для жизни и путешествий", levels: "A1 — B2", coursesCount: 2, color: "from-amber-500/10 to-orange-500/10 border-orange-200 dark:border-orange-800 text-amber-600 dark:text-amber-400" },
            { name: "Немецкий", icon: "bi-building", flag: "🇩🇪", desc: "Чёткая грамматика для работы, учебы в Германии и TestDaF", levels: "A1 — B2", coursesCount: 2, color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400" },
            { name: "Китайский", icon: "bi-yin-yang", flag: "🇨🇳", desc: "Иероглифика, тональное произношение и подготовка к HSK", levels: "A1 — A2", coursesCount: 2, color: "from-rose-500/10 to-red-500/10 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400" },
            { name: "Французский", icon: "bi-cup-hot-fill", flag: "🇫🇷", desc: "Изящная мелодика речи, культура, гастрономия и DELF", levels: "A1 — B1", coursesCount: 1, color: "from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400" }
        ];

        const selectLanguageFilter = (lang) => {
            courseLangFilter.value = lang;
            activePage.value = 'courses';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const featuredCourses = computed(() => courses.value.slice(0, 4));

        const activeFaq = ref(0);
        const toggleFaq = (idx) => {
            activeFaq.value = activeFaq.value === idx ? -1 : idx;
        };

        const faqList = [
            {
                question: "С какого уровня можно начинать обучение в LINGUO?",
                answer: "С любого! В нашей школе разработаны программы как для начинающих с абсолютного нуля (уровень A1 Starter), так и для продвинутых студентов (уровни B2 и C1), которым нужна беглость речи, профессиональная лексика или сдача международных экзаменов."
            },
            {
                question: "Как проходят онлайн-занятия?",
                answer: "Обучение проходит в живом формате на интерактивной платформе в мини-группах (до 6 человек) или один на один с преподавателем. 80% времени каждого урока посвящено разговорной практике. Все материалы, домашние задания и видеозаписи уроков бессрочно доступны в вашем личном кабинете."
            },
            {
                question: "Что если я пропущу урок по уважительной причине?",
                answer: "Записи всех пройденных уроков сохраняются в личном кабинете вместе с домашними заданиями и конспектами. Вы всегда можете пересмотреть пропущенный урок, задать вопросы преподавателю в чате или согласовать отработку с методистом школы."
            },
            {
                question: "Выдаётся ли официальный сертификат по окончании курса?",
                answer: "Да! После завершения учебной программы и успешной защиты финального проекта каждый студент получает официальный номерной сертификат международного стандарта CEFR с подтверждением уровня владения языком."
            },
            {
                question: "Можно ли сменить преподавателя или перевестись в другую группу?",
                answer: "Да, абсолютно бесплатно. Если вам не подойдёт расписание или темп группы, методическая служба LINGUO оперативно подберёт другую группу или предложит формат индивидуальных уроков без потери оплаты."
            }
        ];

        const studentReviews = [
            {
                id: 1,
                name: "Алексей Смирнов",
                role: "Senior Frontend Developer",
                language: "Английский B2 → C1",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
                goal: "Оффер в зарубежный финтех",
                text: "За 4 месяца разговорного интенсива с Джеймсом полностью ушёл психологический барьер. Успешно прошёл 4 раунда технических интервью на английском и получил оффер с релокацией в Амстердам!"
            },
            {
                id: 2,
                name: "Екатерина Морозова",
                role: "UX/UI Дизайнер",
                language: "Испанский A1 → A2",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
                goal: "Переезд в Испанию",
                text: "Мария Родригес — потрясающий педагог! Уроки пролетают на одном дыхании, живые диалоги и никакой скучной зубрежки. Уже через два месяца я сама свободно общалась с риелтором и в банке в Валенсии."
            },
            {
                id: 3,
                name: "Дмитрий Ковалёв",
                role: "Студент магистратуры",
                language: "Немецкий B1 → B2",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
                goal: "Goethe-Zertifikat B2",
                text: "Ганс Вебер помог структурировать сложную грамматику и научил писать эссе по немецким академическим стандартам. Результат: 88 баллов на экзамене и зачисление в Мюнхенский технический университет!"
            }
        ];

        // Экспресс-тест на уровень языка
        const placementTestModalVisible = ref(false);
        const testQuestionStep = ref(0);
        const testSelectedAnswers = ref([]);
        const testLanguage = ref('Английский');
        const testResult = ref(null);

        const testQuestions = [
            {
                q: "1. Выберите правильный вариант: I _____ in London for three years before moving to Paris.",
                options: ["had lived", "have lived", "am living", "was live"],
                correct: 0
            },
            {
                q: "2. Выберите верную форму: If I had known about the lesson, I _____ attended it.",
                options: ["will have", "would have", "would", "had"],
                correct: 1
            },
            {
                q: "3. Что означает фразеологизм «Break a leg» в повседневной речи?",
                options: ["Сломать ногу", "Пожелание удачи («Ни пуха, ни пера!»)", "Прекратить спор", "Сдаться"],
                correct: 1
            }
        ];

        const startPlacementTest = (lang = 'Английский') => {
            testLanguage.value = lang;
            testQuestionStep.value = 0;
            testSelectedAnswers.value = [];
            testResult.value = null;
            placementTestModalVisible.value = true;
        };

        const answerTestQuestion = (optionIndex) => {
            testSelectedAnswers.value.push(optionIndex);
            if (testQuestionStep.value < testQuestions.length - 1) {
                testQuestionStep.value++;
            } else {
                let score = 0;
                testQuestions.forEach((q, idx) => {
                    if (testSelectedAnswers.value[idx] === q.correct) score++;
                });
                if (score === 3) {
                    testResult.value = { level: 'B2 / C1 — Upper-Intermediate', text: 'Превосходный результат! У вас крепкая база и отличное понимание идиом. Рекомендуем наш разговорный интенсив или Business English.' };
                } else if (score === 2) {
                    testResult.value = { level: 'B1 — Intermediate', text: 'Уверенный средний уровень! Базовые конструкции усвоены, рекомендуем курс B1 для устранения пауз и беглости речи.' };
                } else {
                    testResult.value = { level: 'A1-A2 — Elementary', text: 'Базовый уровень. Прекрасная возможность выстроить системные знания без пробелов с нашими чуткими педагогами.' };
                }
                testQuestionStep.value = testQuestions.length;
            }
        };

        // --- Студенты для дашборда ---
        const students = ref([
            { id: 1, name: "Александр Волков", course: "Английский: Разговорный интенсив", amount: 2500, date: "Сегодня, 14:30" },
            { id: 2, name: "Ольга Смирнова", course: "Испанский язык для начинающих", amount: 2100, date: "Сегодня, 11:15" },
            { id: 3, name: "Дмитрий Ковалев", course: "Немецкий язык: Грамматика", amount: 2900, date: "Вчера, 18:40" },
            { id: 4, name: "Анастасия Павлова", course: "Китайский язык: Иероглифика", amount: 3500, date: "Вчера, 09:20" }
        ]);

        // --- Степпер ---
        const stepperStep = ref(1);
        const stepperData = reactive({
            firstName: '', lastName: '', email: '', city: '', street: '', paymentMethod: 'card'
        });
        const nextStepperStep = () => {
            if (stepperStep.value < 4) stepperStep.value++;
            else {
                showToast("Заявка на обучение успешно оформлена! Менеджер свяжется с вами.", "success");
                stepperStep.value = 1;
            }
        };
        const prevStepperStep = () => { if (stepperStep.value > 1) stepperStep.value--; };

        // --- Аудит Логи & Diff Viewer ---
        const diffModalVisible = ref(false);
        const selectedLogForDiff = ref(null);
        const filteredLogs = computed(() => logs.value);
        const addAuditLog = (action, entity, summary, before = null, after = null) => {
            const entry = { id: Date.now(), timestamp: new Date().toLocaleString('ru-RU'), user: currentUser.value?.email || 'Гость', role: currentUser.value?.role || 'guest', action, entity, entityId: after?.id ?? before?.id ?? null, summary, before, after };
            logs.value.unshift(entry);
            try { localStorage.setItem('linguo_logs', JSON.stringify(logs.value)); } catch (e) { }
            return entry;
        };
        const openDiffModal = (log) => {
            selectedLogForDiff.value = log;
            diffModalVisible.value = true;
        };
        const computeDiffRows = (before, after) => {
            const rows = [];
            const b = before || {};
            const a = after || {};
            const allKeys = Array.from(new Set([...Object.keys(b), ...Object.keys(a)]));
            allKeys.forEach(k => {
                const bVal = b[k] !== undefined ? JSON.stringify(b[k]) : '—';
                const aVal = a[k] !== undefined ? JSON.stringify(a[k]) : '—';
                let status = 'unchanged';
                if (b[k] === undefined && a[k] !== undefined) status = 'added';
                else if (b[k] !== undefined && a[k] === undefined) status = 'removed';
                else if (JSON.stringify(b[k]) !== JSON.stringify(a[k])) status = 'modified';
                rows.push({ key: k, beforeValue: bVal, afterValue: aVal, status });
            });
            return rows;
        };

        // --- Google Drive dump (реальный JSON-файл) ---
        const emailModalVisible = ref(false);
        const createGoogleDriveDump = () => {
            try {
                const dump = {
                    exportedAt: new Date().toISOString(),
                    courses: courses.value,
                    users: users.value,
                    logs: logs.value,
                    files: localFiles.value
                };
                const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `linguo_dump_${Date.now()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showToast("Дамп linguo_dump.json скачан (имитация выгрузки на Google Drive)", "success", "Google Drive");
            } catch (e) {
                showToast("Ошибка выгрузки дампа: " + e.message, "error");
            }
        };

        // --- Детали курса ---
        const selectedCourse = ref(null);
        const viewCourseDetails = (course) => {
            selectedCourse.value = course;
            activePage.value = 'course-detail';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        const currentCourseTeacher = computed(() => {
            if (!selectedCourse.value) return teachers.value[0];
            const found = teachers.value.find(t => t.name === selectedCourse.value.teacher);
            return found || teachers.value[0];
        });
        const startChatWithTeacher = (teacherName) => {
            const dialogue = dialogues.value.find(d => d.name === teacherName);
            if (dialogue) {
                activeDialogueId.value = dialogue.id;
            } else {
                const newId = Date.now();
                dialogues.value.unshift({ id: newId, name: teacherName, role: "Преподаватель курса", avatar: teacherName.split(' ').map(n => n[0]).join(''), avatarUrl: "", online: true, unread: 0, lastMessage: "Здравствуйте! Чем могу помочь по курсу?", time: "Сейчас" });
                activeDialogueId.value = newId;
            }
            activePage.value = 'chat';
            showToast(`Открыт диалог с преподавателем: ${teacherName}`, 'info');
        };

        // --- Чат ---
        const dialogues = ref([...INITIAL_DIALOGUES]);
        const messages = ref([...INITIAL_MESSAGES]);
        const activeDialogueId = ref(1);
        const newMessageText = ref('');
        const isContactTyping = ref(false);
        const chatSearch = ref('');
        const filteredDialogues = computed(() => {
            if (!chatSearch.value) return dialogues.value;
            const q = chatSearch.value.toLowerCase();
            return dialogues.value.filter(d => d.name.toLowerCase().includes(q) || d.role.toLowerCase().includes(q));
        });
        const currentDialogue = computed(() => dialogues.value.find(d => d.id === activeDialogueId.value) || dialogues.value[0]);
        const currentMessages = computed(() => messages.value.filter(m => m.dialogueId === activeDialogueId.value));
        const quickChatQuestions = [
            "Какая стоимость обучения и есть ли скидки?",
            "Когда ближайшее занятие и какой график?",
            "Хочу записаться на бесплатный пробный урок",
            "Выдается ли сертификат после экзамена?"
        ];
        const sendQuickQuestion = (q) => { newMessageText.value = q; sendChatMessage(); };
        const sendChatMessage = () => {
            const text = newMessageText.value.trim();
            if (!text) return;
            const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messages.value.push({ id: Date.now(), dialogueId: activeDialogueId.value, sender: 'me', text, time: timeNow, status: 'delivered' });
            const d = currentDialogue.value;
            if (d) { d.lastMessage = text; d.time = timeNow; }
            playNotificationSound('send');
            newMessageText.value = '';
            isContactTyping.value = true;
            const responseDelay = 1200 + Math.random() * 800;
            setTimeout(() => {
                isContactTyping.value = false;
                const replyText = generateBotReply(text, currentDialogue.value);
                const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                messages.value.push({ id: Date.now() + 1, dialogueId: activeDialogueId.value, sender: 'them', text: replyText, time: replyTime, status: 'read' });
                if (d) { d.lastMessage = replyText; d.time = replyTime; }
                playNotificationSound('receive');
            }, responseDelay);
        };
        const generateBotReply = (query, contact) => {
            const q = query.toLowerCase();
            const name = contact ? contact.name : "Преподаватель";
            if (q.includes("стоим") || q.includes("цена") || q.includes("сколько") || q.includes("оплат") || q.includes("скидк")) return `Стоимость месячного абонемента составляет от 2 100 до 3 200 BYN в зависимости от языка. При оплате за весь курс действует скидка 15% по промокоду «LINGUO2026».`;
            if (q.includes("пробн") || q.includes("бесплатн") || q.includes("запис") || q.includes("урок") || q.includes("хочу")) return `С удовольствием! Пробный вводный урок длится 30 минут онлайн. Напишите удобный день (например, вторник или четверг)!`;
            if (q.includes("сертифик") || q.includes("диплом") || q.includes("экзамен") || q.includes("cefr")) return `Да, обязательно! По окончании курса каждый студент получает номерной сертификат CEFR (A1-C2) с QR-кодом.`;
            if (q.includes("график") || q.includes("расписан") || q.includes("когда") || q.includes("врем")) return `Занятия проходят 2 раза в неделю в вечернее время (18:30 или 19:30). Все уроки записываются.`;
            if (q.includes("привет") || q.includes("hello") || q.includes("hola") || q.includes("здравств") || q.includes("добрый")) return `Здравствуйте! Рад приветствовать вас в онлайн-школе LINGUO. Я ${name}. Какой язык вы изучаете?`;
            return `Спасибо за сообщение! Готов подробно разобрать все нюансы на ближайшем занятии.`;
        };

        // --- АВТОРИЗАЦИЯ / РЕГИСТРАЦИЯ ---
        const authTab = ref('login');
        const showPassword = ref(false);
        const showPasswordConfirm = ref(false);
        const isAuthSubmitting = ref(false);
        const authForm = reactive({ name: '', email: '', password: '', passwordConfirm: '', rememberMe: true, agreeTerms: true });
        const authErrors = reactive({ name: '', email: '', password: '', passwordConfirm: '', agreeTerms: '' });
        const resetAuthErrors = () => { Object.keys(authErrors).forEach(k => authErrors[k] = ''); };

        const hashPassword = async (email, password) => {
            const raw = `${(email || '').trim().toLowerCase()}:${password}`;
            const data = new TextEncoder().encode(raw);
            const buf = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
        };
        const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim());

        const validateAuthForm = () => {
            resetAuthErrors();
            let ok = true;
            if (authTab.value === 'register') {
                if (!authForm.name || authForm.name.trim().length < 2) { authErrors.name = 'Укажите имя (минимум 2 символа)'; ok = false; }
            }
            if (!authForm.email) { authErrors.email = 'Введите email'; ok = false; }
            else if (!isValidEmail(authForm.email)) { authErrors.email = 'Некорректный формат email'; ok = false; }
            if (!authForm.password) { authErrors.password = 'Введите пароль'; ok = false; }
            else if (authForm.password.length < 8) { authErrors.password = 'Пароль должен быть не менее 8 символов'; ok = false; }
            if (authTab.value === 'register') {
                if (authForm.password !== authForm.passwordConfirm) { authErrors.passwordConfirm = 'Пароли не совпадают'; ok = false; }
                if (!authForm.agreeTerms) { authErrors.agreeTerms = 'Необходимо согласиться с условиями'; ok = false; }
            }
            return ok;
        };

        const passwordStrength = computed(() => {
            const p = authForm.password;
            if (!p) return 0;
            let score = 0;
            if (p.length >= 6) score += 25;
            if (p.length >= 10) score += 25;
            if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score += 25;
            if (/[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) score += 25;
            return score;
        });
        const passwordStrengthText = computed(() => {
            if (passwordStrength.value === 0) return "Введите пароль";
            if (passwordStrength.value <= 25) return "Слабый пароль (добавьте цифры)";
            if (passwordStrength.value <= 50) return "Средний пароль (добавьте заглавные буквы)";
            if (passwordStrength.value <= 75) return "Хороший пароль (добавьте спецсимвол)";
            return "Отличный надежный пароль";
        });

        const handleRegister = async () => {
            if (!validateAuthForm()) return;
            const exists = users.value.some(u => u.email.toLowerCase() === authForm.email.trim().toLowerCase());
            if (exists) { authErrors.email = 'Аккаунт с таким email уже существует'; showToast('Этот email уже зарегистрирован', 'error'); return; }
            isAuthSubmitting.value = true;
            try {
                const passwordHash = await hashPassword(authForm.email, authForm.password);
                const newUser = { id: Date.now(), name: authForm.name.trim(), email: authForm.email.trim().toLowerCase(), passwordHash, role: 'student', createdAt: new Date().toISOString().substring(0, 10), status: 'Активен' };
                users.value.push(newUser);
                currentUser.value = newUser;
                setSession(true);
                addAuditLog('REGISTER', 'Users', `Зарегистрирован пользователь ${newUser.email}`, null, { id: newUser.id, name: newUser.name, email: newUser.email });
                syncToStorage();
                showToast("Регистрация успешна! Добро пожаловать в LINGUO.", "success");
                activePage.value = 'home';
            } catch (e) { showToast('Ошибка регистрации: ' + e.message, 'error'); }
            finally { isAuthSubmitting.value = false; }
        };

        const handleLogin = async () => {
            if (!validateAuthForm()) return;
            isAuthSubmitting.value = true;
            try {
                const passwordHash = await hashPassword(authForm.email, authForm.password);
                const found = users.value.find(u => u.email.toLowerCase() === authForm.email.trim().toLowerCase());
                const match = found && (found.passwordHash === passwordHash || found.password === authForm.password);
                if (!match) { authErrors.password = 'Неверный email или пароль'; showToast('Неверный email или пароль.', 'error'); return; }
                if (found.password && !found.passwordHash) { found.passwordHash = passwordHash; delete found.password; }
                currentUser.value = { ...found };
                setSession(authForm.rememberMe);
                addAuditLog('LOGIN', 'Users', `Вход пользователя ${found.email}`);
                syncToStorage();
                showToast(`Вы успешно вошли как ${found.name}`, 'success');
                activePage.value = found.role === 'admin' ? 'admin' : 'home';
            } catch (e) { showToast('Ошибка входа: ' + e.message, 'error'); }
            finally { isAuthSubmitting.value = false; }
        };

        const SESSION_KEY = 'linguo_session_expires';
        const setSession = (remember) => {
            const days = remember ? 30 : 7;
            const expires = Date.now() + days * 24 * 60 * 60 * 1000;
            try { localStorage.setItem(SESSION_KEY, String(expires)); } catch (e) { }
        };
        const isSessionValid = () => {
            try {
                const v = localStorage.getItem(SESSION_KEY);
                if (!v) return true;
                return Number(v) > Date.now();
            } catch (e) { return true; }
        };

        const quickLoginAs = (role) => {
            const user = users.value.find(u => u.role === role);
            if (!user) { showToast(`Пользователь с ролью ${role} не найден. Перезагрузите страницу.`, 'error'); return; }
            currentUser.value = { ...user };
            setSession(true);
            syncToStorage();
            showToast(`Вход в роли: ${role.toUpperCase()}`, 'success');
            activePage.value = role === 'admin' ? 'admin' : 'home';
        };

        const handleLogout = () => {
            currentUser.value = null;
            try { localStorage.removeItem(SESSION_KEY); } catch (e) { }
            syncToStorage();
            showToast("Вы вышли из учетной записи", 'info');
            activePage.value = 'home';
        };

        // --- Сброс пароля ---
        const resetModalVisible = ref(false);
        const resetStep = ref(1);
        const resetEmail = ref('');
        const resetCode = ref('');
        const resetNewPassword = ref('');
        const resetNewPasswordConfirm = ref('');
        const showResetPassword = ref(false);
        const resetErrors = reactive({ email: '', code: '', newPassword: '', newPasswordConfirm: '' });
        const DEMO_RESET_CODE = '1234';

        const openResetModal = () => {
            resetStep.value = 1;
            resetEmail.value = authForm.email || '';
            resetCode.value = '';
            resetNewPassword.value = '';
            resetNewPasswordConfirm.value = '';
            Object.keys(resetErrors).forEach(k => resetErrors[k] = '');
            resetModalVisible.value = true;
        };
        const submitResetEmail = () => {
            resetErrors.email = '';
            if (!isValidEmail(resetEmail.value)) { resetErrors.email = 'Некорректный email'; return; }
            const found = users.value.find(u => u.email.toLowerCase() === resetEmail.value.trim().toLowerCase());
            if (!found) { resetErrors.email = 'Аккаунт с таким email не найден'; return; }
            resetStep.value = 2;
            showToast(`Код подтверждения отправлен на ${resetEmail.value}. Демо-код: ${DEMO_RESET_CODE}`, 'info', 'Восстановление пароля');
        };
        const submitResetCode = () => {
            resetErrors.code = '';
            if (resetCode.value.trim() !== DEMO_RESET_CODE) { resetErrors.code = 'Неверный код. Используйте 1234 (демо)'; return; }
            resetStep.value = 3;
        };
        const submitNewPassword = async () => {
            resetErrors.newPassword = '';
            resetErrors.newPasswordConfirm = '';
            if (resetNewPassword.value.length < 8) { resetErrors.newPassword = 'Минимум 8 символов'; return; }
            if (resetNewPassword.value !== resetNewPasswordConfirm.value) { resetErrors.newPasswordConfirm = 'Пароли не совпадают'; return; }
            const found = users.value.find(u => u.email.toLowerCase() === resetEmail.value.trim().toLowerCase());
            if (!found) { showToast('Пользователь не найден', 'error'); return; }
            found.passwordHash = await hashPassword(found.email, resetNewPassword.value);
            delete found.password;
            addAuditLog('PASSWORD_RESET', 'Users', `Сброс пароля для ${found.email}`);
            syncToStorage();
            resetModalVisible.value = false;
            showToast('Пароль успешно изменён. Войдите с новым паролем.', 'success');
            authTab.value = 'login';
            authForm.email = found.email;
            authForm.password = '';
        };

        // --- УПРАВЛЕНИЕ КУРСАМИ & ПАГИНАЦИЯ ---
        const courseSearch = ref('');
        const courseLangFilter = ref('Все языки');
        const courseLevelFilter = ref('Все уровни');
        const courseStatusFilter = ref('Все статусы');
        const dateFromFilter = ref('');
        const dateToFilter = ref('');
        const currentPage = ref(1);
        const pageSize = ref(10);
        const lazyLoadedOffset = ref(0);

        const filterLanguageOptions = ['Все языки', 'Английский', 'Испанский', 'Немецкий', 'Китайский', 'Французский', 'Итальянский', 'Японский'];
        const filterLevelOptions = ['Все уровни', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const filterStatusOptions = ['Все статусы', 'Набор открыт', 'Идет обучение', 'Завершен'];

        const filteredCourses = computed(() => {
            return courses.value.filter(c => {
                const s = !courseSearch.value || c.title.toLowerCase().includes(courseSearch.value.toLowerCase()) || c.teacher.toLowerCase().includes(courseSearch.value.toLowerCase());
                const l = courseLangFilter.value === 'Все языки' || c.language === courseLangFilter.value;
                const lv = courseLevelFilter.value === 'Все уровни' || c.level === courseLevelFilter.value;
                const st = courseStatusFilter.value === 'Все статусы' || c.status === courseStatusFilter.value;
                return s && l && lv && st;
            });
        });
        const totalPages = computed(() => Math.ceil(filteredCourses.value.length / pageSize.value) || 1);
        const paginatedCourses = computed(() => {
            const start = (currentPage.value - 1) * pageSize.value;
            const end = start + pageSize.value + lazyLoadedOffset.value;
            return filteredCourses.value.slice(start, end);
        });
        const lazyLoadMore = async () => {
            isLoading.value = true;
            await new Promise(r => setTimeout(r, 350));
            lazyLoadedOffset.value += 5;
            isLoading.value = false;
            showToast(`Ленивая подгрузка: показано ${paginatedCourses.value.length} записей`, 'info');
        };
        const resetFilters = () => {
            courseSearch.value = '';
            courseLangFilter.value = 'Все языки';
            courseLevelFilter.value = 'Все уровни';
            courseStatusFilter.value = 'Все статусы';
            currentPage.value = 1;
            lazyLoadedOffset.value = 0;
        };

        // --- МОДАЛКА КУРСА ---
        const courseModalVisible = ref(false);
        const isEditingCourse = ref(false);
        const courseForm = reactive({ id: null, title: '', language: 'Английский', level: 'B1', teacher: 'Джеймс Уилсон', price: 2500, seats: 10, status: 'Набор открыт', description: '' });
        const openAddCourseModal = () => {
            isEditingCourse.value = false;
            Object.assign(courseForm, { id: null, title: '', language: 'Английский', level: 'B1', teacher: 'Джеймс Уилсон', price: 2500, seats: 10, status: 'Набор открыт', description: '' });
            courseModalVisible.value = true;
        };
        const openEditCourseModal = (c) => {
            isEditingCourse.value = true;
            Object.assign(courseForm, { id: c.id, title: c.title, language: c.language, level: c.level, teacher: c.teacher, price: c.price, seats: c.seats, status: c.status, description: c.description || '' });
            courseModalVisible.value = true;
        };
        const saveCourseAsync = async () => {
            if (!courseForm.title || !courseForm.price) { showToast("Заполните обязательные поля", "error"); return; }
            isLoading.value = true;
            await new Promise(r => setTimeout(r, 250));
            if (isEditingCourse.value) {
                const idx = courses.value.findIndex(c => c.id === courseForm.id);
                if (idx !== -1) {
                    const before = { ...courses.value[idx] };
                    courses.value[idx] = { ...courses.value[idx], ...courseForm, price: Number(courseForm.price), seats: Number(courseForm.seats) };
                    addAuditLog('UPDATE', 'Courses', `Обновлён курс «${courseForm.title}»`, before, { ...courses.value[idx] });
                    showToast(`Курс «${courseForm.title}» обновлен`, 'success');
                }
            } else {
                const newC = { id: Date.now(), ...courseForm, price: Number(courseForm.price), seats: Number(courseForm.seats), image: 'images/hero_learning_1791364551777.jpg', createdAt: new Date().toISOString().substring(0, 10) };
                courses.value.unshift(newC);
                addAuditLog('CREATE', 'Courses', `Создан курс «${newC.title}»`, null, { ...newC });
                showToast(`Курс «${newC.title}» добавлен в каталог`, 'success');
            }
            syncToStorage();
            courseModalVisible.value = false;
            isLoading.value = false;
        };
        const deleteCourseAsync = async (c) => {
            if (!confirm(`Удалить курс «${c.title}»?`)) return;
            courses.value = courses.value.filter(item => item.id !== c.id);
            addAuditLog('DELETE', 'Courses', `Удалён курс «${c.title}»`, { ...c }, null);
            syncToStorage();
            showToast(`Курс «${c.title}» удален`, 'info');
        };

        // --- EXCEL DRAG-N-DROP ---
        const isDragging = ref(false);
        const fileInputRef = ref(null);
        const errorModalVisible = ref(false);
        const invalidFileInfo = reactive({ name: '', type: '', size: '' });

        const isExcelFile = (file) => {
            if (!file) return false;
            const valid = ['.xlsx', '.xls'];
            return valid.some(ext => file.name.toLowerCase().endsWith(ext));
        };
        const handleDragOver = (e) => { e.preventDefault(); isDragging.value = true; };
        const handleDragLeave = (e) => { e.preventDefault(); isDragging.value = false; };
        const handleDrop = (e) => {
            e.preventDefault();
            isDragging.value = false;
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processUploadedFile(e.dataTransfer.files[0]);
        };
        const triggerFileDialog = () => {
            if (fileInputRef.value) { fileInputRef.value.value = null; fileInputRef.value.click(); }
        };
        const handleFileSelect = (e) => {
            if (e.target.files && e.target.files.length > 0) processUploadedFile(e.target.files[0]);
        };
        const processUploadedFile = (file) => {
            if (!isExcelFile(file)) {
                invalidFileInfo.name = file.name;
                invalidFileInfo.type = file.type || 'не определен';
                invalidFileInfo.size = (file.size / 1024).toFixed(1) + ' KB';
                errorModalVisible.value = true;
                return;
            }
            parseAndSaveExcel(file);
        };
        const parseAndSaveExcel = (file) => {
            isLoading.value = true;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    if (typeof XLSX === 'undefined') throw new Error("SheetJS XLSX недоступен");
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
                    if (!rows || rows.length === 0) { showToast("Файл Excel пуст", "error"); isLoading.value = false; return; }
                    let count = 0;
                    rows.forEach((row, idx) => {
                        courses.value.push({
                            id: Date.now() + idx,
                            title: row['Название'] || row['Курс'] || `Импортированный курс ${courses.value.length + 1}`,
                            language: row['Язык'] || 'Английский',
                            level: row['Уровень'] || 'B1',
                            teacher: row['Преподаватель'] || 'Педагог LINGUO',
                            price: Number(row['Стоимость'] || row['Цена']) || 2500,
                            seats: Number(row['Мест']) || 10,
                            status: row['Статус'] || 'Набор открыт',
                            description: 'Курс импортирован из файла ' + file.name,
                            image: 'images/hero_learning_1791364551777.jpg',
                            createdAt: new Date().toISOString().substring(0, 10)
                        });
                        count++;
                    });
                    // Сохраняем файл в локальное хранилище
                    addLocalFile(file.name, file.size, file.type);
                    syncToStorage();
                    showToast(`Импортировано ${count} курсов из ${file.name}`, "success");
                } catch (err) {
                    showToast("Ошибка парсинга Excel: " + err.message, "error");
                } finally { isLoading.value = false; }
            };
            reader.readAsArrayBuffer(file);
        };
        const downloadSampleExcel = () => {
            try {
                if (typeof XLSX === 'undefined') return;
                const data = courses.value.map(c => ({ 'Название': c.title, 'Язык': c.language, 'Уровень': c.level, 'Преподаватель': c.teacher, 'Стоимость': c.price, 'Мест': c.seats, 'Статус': c.status }));
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Курсы");
                XLSX.writeFile(wb, "linguo_courses_template.xlsx");
                showToast("Шаблон Excel успешно скачан", "success");
            } catch (e) { showToast("Ошибка скачивания: " + e.message, "error"); }
        };
        const triggerInvalidFileTest = () => {
            invalidFileInfo.name = 'manual_test_doc.docx';
            invalidFileInfo.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            invalidFileInfo.size = '145.2 KB';
            errorModalVisible.value = true;
        };

        // --- ЛОКАЛЬНЫЕ ФАЙЛЫ ---
        const loadLocalFiles = () => {
            try {
                const raw = localStorage.getItem('linguo_files');
                localFiles.value = raw ? JSON.parse(raw) : [];
            } catch (e) { localFiles.value = []; }
        };
        const saveLocalFiles = () => {
            try { localStorage.setItem('linguo_files', JSON.stringify(localFiles.value)); } catch (e) { }
        };
        const addLocalFile = (name, size, type) => {
            if (!name) return;
            localFiles.value.unshift({
                id: Date.now(),
                name,
                size: size || 0,
                type: type || 'unknown',
                uploadedAt: new Date().toLocaleString('ru-RU'),
                uploadedBy: currentUser.value?.email || 'guest'
            });
            saveLocalFiles();
        };
        const deleteLocalFile = (file) => {
            if (!confirm(`Удалить файл "${file.name}"?`)) return;
            localFiles.value = localFiles.value.filter(f => f.id !== file.id);
            saveLocalFiles();
            addAuditLog('DELETE_FILE', 'Files', `Удалён файл «${file.name}»`, { ...file }, null);
            showToast('Файл удалён', 'info');
        };

        // --- ТОВАРЫ & КАТАЛОГ ---
        const products = ref([...INITIAL_PRODUCTS]);
        const catalogSearch = ref('');
        const catalogCategory = ref('all');
        const catalogMaxPrice = ref(250);
        const catalogSort = ref('featured');
        const isCatalogLoading = ref(false);
        const categoryOptions = [
            { value: 'all', label: 'Все категории' },
            { value: 'books', label: 'Учебники и грамматика' },
            { value: 'courses', label: 'Специальные курсы' },
            { value: 'accessories', label: 'Оборудование и карточки' }
        ];
        const sortOptions = [
            { value: 'featured', label: 'По популярности' },
            { value: 'price-asc', label: 'Сначала недорогие' },
            { value: 'price-desc', label: 'Сначала премиум' },
            { value: 'rating', label: 'По рейтингу' }
        ];
        const filteredProducts = computed(() => {
            return products.value.filter(p => {
                const s = !catalogSearch.value || p.name.toLowerCase().includes(catalogSearch.value.toLowerCase());
                const c = catalogCategory.value === 'all' || p.category === catalogCategory.value;
                const pr = p.price <= catalogMaxPrice.value;
                return s && c && pr;
            }).sort((a, b) => {
                if (catalogSort.value === 'price-asc') return a.price - b.price;
                if (catalogSort.value === 'price-desc') return b.price - a.price;
                if (catalogSort.value === 'rating') return b.rating - a.rating;
                return 0;
            });
        });
        const addToCart = (product) => { cart.value.push(product); showToast(`«${product.name}» добавлен в корзину!`, 'success'); };
        const triggerCatalogRefresh = async () => {
            isCatalogLoading.value = true;
            await new Promise(r => setTimeout(r, 600));
            isCatalogLoading.value = false;
        };

        // --- KANBAN ---
        const kanbanTasks = ref([...INITIAL_KANBAN]);
        const newKanbanTitle = ref('');
        const userKanbanTasks = computed(() => {
            if (!currentUser.value) return [];
            if (currentUser.value.role === 'admin') return kanbanTasks.value;
            return kanbanTasks.value.filter(t => t.assignee === currentUser.value.name || t.ownerEmail === currentUser.value.email);
        });
        const kanbanTodo = computed(() => userKanbanTasks.value.filter(t => t.status === 'todo'));
        const kanbanInProgress = computed(() => userKanbanTasks.value.filter(t => t.status === 'inProgress'));
        const kanbanDone = computed(() => userKanbanTasks.value.filter(t => t.status === 'done'));
        const moveKanbanTask = (task, newStatus) => {
            task.status = newStatus;
            try { localStorage.setItem('linguo_kanban', JSON.stringify(kanbanTasks.value)); } catch (e) { }
            showToast(`Задача перемещена в [${newStatus}]`, 'info');
        };
        const addKanbanTask = () => {
            if (!newKanbanTitle.value.trim()) return;
            kanbanTasks.value.push({ id: 'k-' + Date.now(), status: 'todo', title: newKanbanTitle.value.trim(), tag: 'Задачи', priority: 'Средний', assignee: currentUser.value ? currentUser.value.name : 'Студент', ownerEmail: currentUser.value ? currentUser.value.email : '', avatar: 'ME' });
            newKanbanTitle.value = '';
            try { localStorage.setItem('linguo_kanban', JSON.stringify(kanbanTasks.value)); } catch (e) { }
            showToast("Карточка добавлена в To Do", 'success');
        };

        // --- REST API & VOYAGER ---
        const apiMethod = ref('GET');
        const apiEndpoint = ref('/api/v1/courses');
        const apiMethodsOptions = ['GET', 'POST', 'PUT', 'DELETE'];
        const apiEndpointsOptions = ['/api/v1/courses', '/api/v1/students', '/api/v1/files', '/api/v1/logs'];
        const apiResponse = reactive({ status: 200, statusText: 'OK', timeMs: 42, body: null });
        const roleOptions = [
            { value: 'admin', label: 'Администратор (admin)' },
            { value: 'student', label: 'Студент (student)' }
        ];
        const executeApiRequest = async () => {
            isLoading.value = true;
            await new Promise(r => setTimeout(r, 200));
            isLoading.value = false;
            apiResponse.status = 200;
            apiResponse.statusText = "OK";
            apiResponse.timeMs = Math.round(20 + Math.random() * 40);
            apiResponse.body = {
                endpoint: apiEndpoint.value,
                method: apiMethod.value,
                timestamp: new Date().toISOString(),
                totalCount: courses.value.length,
                data: courses.value.slice(0, 3)
            };
        };
        const changeUserRole = (u, newRole) => {
            if (!u || u.role === newRole) return;
            const before = { ...u };
            u.role = newRole;
            addAuditLog('ROLE_CHANGE', 'Users', `Роль ${u.email} изменена на ${newRole.toUpperCase()}`, before, { ...u });
            syncToStorage();
            showToast(`Роль ${u.email} изменена на ${newRole.toUpperCase()}`, 'success');
        };

        // --- VOYAGER АДМИНКА РАСШИРЕНИЕ ---
        const voyagerTab = ref('dashboard'); // 'dashboard' | 'users' | 'courses' | 'logs'
        const voyagerUserSearch = ref('');
        const voyagerUserRoleFilter = ref('all');
        const voyagerUserRoleOptions = [
            { value: 'all', label: 'Все роли' },
            { value: 'admin', label: 'Администратор' },
            { value: 'student', label: 'Студент' }
        ];

        const filteredUsers = computed(() => {
            const q = (voyagerUserSearch.value || '').trim().toLowerCase();
            return users.value.filter(u => {
                const matchRole = voyagerUserRoleFilter.value === 'all' || u.role === voyagerUserRoleFilter.value;
                const matchSearch = !q ||
                    (u.name && u.name.toLowerCase().includes(q)) ||
                    (u.email && u.email.toLowerCase().includes(q));
                return matchRole && matchSearch;
            });
        });

        const userModalVisible = ref(false);
        const isEditingUser = ref(false);
        const userForm = reactive({
            id: null,
            name: '',
            email: '',
            password: '',
            role: 'student',
            status: 'Активен'
        });

        const openAddUserModal = () => {
            isEditingUser.value = false;
            userForm.id = null;
            userForm.name = '';
            userForm.email = '';
            userForm.password = '';
            userForm.role = 'student';
            userForm.status = 'Активен';
            userModalVisible.value = true;
        };

        const openEditUserModal = (u) => {
            if (!u) return;
            isEditingUser.value = true;
            userForm.id = u.id;
            userForm.name = u.name;
            userForm.email = u.email;
            userForm.password = '';
            userForm.role = u.role;
            userForm.status = u.status || 'Активен';
            userModalVisible.value = true;
        };

        const saveUserAsync = async () => {
            const name = (userForm.name || '').trim();
            const email = (userForm.email || '').trim().toLowerCase();

            if (!name || !email) {
                showToast('Пожалуйста, укажите имя и email', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showToast('Некорректный формат email адреса', 'error');
                return;
            }

            if (isEditingUser.value) {
                const found = users.value.find(u => u.id === userForm.id);
                if (!found) {
                    showToast('Пользователь не найден', 'error');
                    return;
                }
                const before = { ...found };
                found.name = name;
                found.email = email;
                found.role = userForm.role;
                found.status = userForm.status;

                if (userForm.password && userForm.password.trim()) {
                    found.password = userForm.password.trim();
                    found.passwordHash = await hashPassword(email, userForm.password.trim());
                }

                if (currentUser.value && currentUser.value.id === found.id) {
                    currentUser.value.name = name;
                    currentUser.value.email = email;
                    currentUser.value.role = found.role;
                    currentUser.value.status = found.status;
                }

                addAuditLog('USER_UPDATE', 'Users', `Обновлены данные пользователя ${email}`, before, { ...found });
                syncToStorage();
                showToast(`Пользователь ${name} успешно обновлен`, 'success');
            } else {
                const exists = users.value.some(u => u.email.toLowerCase() === email);
                if (exists) {
                    showToast('Пользователь с таким email уже существует', 'error');
                    return;
                }

                const pwd = (userForm.password && userForm.password.trim()) ? userForm.password.trim() : '12345678';
                const passwordHash = await hashPassword(email, pwd);

                const newUser = {
                    id: Date.now(),
                    name,
                    email,
                    password: pwd,
                    passwordHash,
                    role: userForm.role,
                    status: userForm.status,
                    createdAt: new Date().toISOString().substring(0, 10)
                };

                users.value.push(newUser);
                addAuditLog('USER_CREATE', 'Users', `Создан новый аккаунт ${email} (${userForm.role})`, null, { ...newUser });
                syncToStorage();
                showToast(`Пользователь ${name} успешно создан`, 'success');
            }

            userModalVisible.value = false;
        };

        const deleteUserAsync = (u) => {
            if (!u) return;
            if (currentUser.value && currentUser.value.email.toLowerCase() === u.email.toLowerCase()) {
                showToast('Нельзя удалить текущего авторизованного администратора', 'error');
                return;
            }
            if (!confirm(`Вы действительно хотите удалить пользователя ${u.name} (${u.email})?`)) {
                return;
            }
            const before = { ...u };
            users.value = users.value.filter(item => item.id !== u.id);
            addAuditLog('USER_DELETE', 'Users', `Удален пользователь ${u.email}`, before, null);
            syncToStorage();
            showToast(`Пользователь ${u.name} удален`, 'info');
        };

        const toggleUserStatus = (u) => {
            if (!u) return;
            const before = { ...u };
            u.status = (u.status === 'Активен') ? 'Заблокирован' : 'Активен';
            addAuditLog('USER_STATUS', 'Users', `Статус ${u.email} изменен на ${u.status}`, before, { ...u });
            syncToStorage();
            showToast(`Статус ${u.name}: ${u.status}`, 'info');
        };

        const exportUsersExcel = () => {
            try {
                if (typeof XLSX === 'undefined') {
                    showToast('Библиотека XLSX недоступна', 'error');
                    return;
                }
                const data = users.value.map(u => ({
                    'ID': u.id,
                    'Имя': u.name,
                    'Email': u.email,
                    'Роль': u.role === 'admin' ? 'Администратор' : 'Студент',
                    'Статус': u.status || 'Активен',
                    'Дата создания': u.createdAt || ''
                }));
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Пользователи');
                XLSX.writeFile(wb, 'linguo_voyager_users.xlsx');
                showToast('Список пользователей успешно выгружен в Excel', 'success');
            } catch (e) {
                showToast('Ошибка выгрузки: ' + e.message, 'error');
            }
        };

        // Поиск по курсам и логам внутри Voyager
        const voyagerCourseSearch = ref('');
        const filteredVoyagerCourses = computed(() => {
            const q = (voyagerCourseSearch.value || '').trim().toLowerCase();
            if (!q) return courses.value;
            return courses.value.filter(c =>
                (c.title && c.title.toLowerCase().includes(q)) ||
                (c.language && c.language.toLowerCase().includes(q)) ||
                (c.teacher && c.teacher.toLowerCase().includes(q)) ||
                (c.level && c.level.toLowerCase().includes(q))
            );
        });

        const voyagerLogSearch = ref('');
        const filteredVoyagerLogs = computed(() => {
            const q = (voyagerLogSearch.value || '').trim().toLowerCase();
            if (!q) return logs.value;
            return logs.value.filter(l =>
                (l.action && l.action.toLowerCase().includes(q)) ||
                (l.summary && l.summary.toLowerCase().includes(q)) ||
                (l.user && l.user.toLowerCase().includes(q)) ||
                (l.target && l.target.toLowerCase().includes(q))
            );
        });

        const clearVoyagerLogs = () => {
            if (!logs.value.length) {
                showToast('Журнал логов уже пуст', 'info');
                return;
            }
            if (!confirm('Вы уверены, что хотите очистить весь журнал аудита?')) return;
            logs.value = [];
            syncToStorage();
            showToast('Журнал аудита очищен', 'success');
        };

        const exportLogsJson = () => {
            try {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs.value, null, 2));
                const dlAnchorElem = document.createElement('a');
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", `linguo_audit_logs_${new Date().toISOString().substring(0, 10)}.json`);
                dlAnchorElem.click();
                showToast('Логи выгружены в JSON', 'success');
            } catch (e) {
                showToast('Ошибка выгрузки логов: ' + e.message, 'error');
            }
        };

        // --- УВЕДОМЛЕНИЯ ---
        const toasts = ref([]);
        const showToast = (message, type = 'info', title = '') => {
            const id = Date.now() + Math.random();
            toasts.value.push({ id, message, type, title: title || (type === 'success' ? 'Успешно' : type === 'error' ? 'Ошибка' : 'Информация') });
            setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id); }, 3500);
        };

        // --- ХРАНИЛИЩЕ ---
        const initStorage = () => {
            try {
                const sc = localStorage.getItem('linguo_courses');
                courses.value = sc ? JSON.parse(sc) : [...INITIAL_COURSES];
                selectedCourse.value = courses.value[0];

                const su = localStorage.getItem('linguo_users');
                users.value = su ? JSON.parse(su) : [];

                // Сид демо-аккаунтов
                if (users.value.length === 0) {
                    users.value = [
                        { id: 1, name: 'Администратор LINGUO', email: 'admin@linguo.by', password: 'admin123', role: 'admin', createdAt: '2026-01-01', status: 'Активен' },
                        { id: 2, name: 'Иван Студентов', email: 'student@linguo.by', password: 'student123', role: 'student', createdAt: '2026-01-01', status: 'Активен' }
                    ];
                }

                const sl = localStorage.getItem('linguo_logs');
                logs.value = sl ? JSON.parse(sl) : [];
                const sk = localStorage.getItem('linguo_kanban');
                if (sk) kanbanTasks.value = JSON.parse(sk);

                loadLocalFiles();

                const scu = localStorage.getItem('linguo_current_user');
                if (scu && isSessionValid()) {
                    currentUser.value = JSON.parse(scu);
                } else {
                    currentUser.value = null;
                    localStorage.removeItem('linguo_current_user');
                }

                const theme = localStorage.getItem('linguo_theme');
                if (theme === 'dark' || (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    isDark.value = true;
                }
                applyTheme();
            } catch (e) {
                courses.value = [...INITIAL_COURSES];
                selectedCourse.value = courses.value[0];
                users.value = [];
                currentUser.value = null;
            }
        };

        const syncToStorage = () => {
            try {
                localStorage.setItem('linguo_courses', JSON.stringify(courses.value));
                localStorage.setItem('linguo_users', JSON.stringify(users.value));
                localStorage.setItem('linguo_logs', JSON.stringify(logs.value));
                if (currentUser.value) localStorage.setItem('linguo_current_user', JSON.stringify(currentUser.value));
            } catch (e) { }
        };

        onMounted(() => {
            initStorage();
        });

        // --- GUARD: ЗАЩИТА СТРАНИЦ ---
        const PROTECTED_PAGES = ['workspace', 'admin', 'logs', 'api', 'files', 'chat'];
        const ADMIN_ONLY_PAGES = ['admin'];
        watch(activePage, (newPage) => {
            if (!PROTECTED_PAGES.includes(newPage)) return;
            if (!currentUser.value) {
                showToast('Для доступа к этой странице нужно войти', 'error');
                activePage.value = 'auth';
                authTab.value = 'login';
                return;
            }
            if (ADMIN_ONLY_PAGES.includes(newPage) && currentUser.value.role !== 'admin') {
                showToast('Доступ только для администратора', 'error');
                activePage.value = 'home';
            }
        });

        return {
            activePage, activeTailwindTab, mobileMenuOpen, isLoading, isDark, toggleDarkMode, toasts, showToast,

            courses, teachers, logs, filteredLogs, addAuditLog, selectedCourse, currentCourseTeacher, viewCourseDetails, startChatWithTeacher,

            dialogues, filteredDialogues, messages, activeDialogueId, currentDialogue, currentMessages, newMessageText, isContactTyping, chatSearch, quickChatQuestions, sendQuickQuestion, sendChatMessage,

            authTab, authForm, showPassword, showPasswordConfirm, passwordStrength, passwordStrengthText, isAuthSubmitting, handleRegister, handleLogin, quickLoginAs, handleLogout, currentUser, users,
            authErrors, resetAuthErrors, resetModalVisible, resetStep, resetEmail, resetCode, resetNewPassword, resetNewPasswordConfirm, showResetPassword, resetErrors, openResetModal, submitResetEmail, submitResetCode, submitNewPassword,

            courseSearch, courseLangFilter, courseLevelFilter, courseStatusFilter, filterLanguageOptions, filterLevelOptions, filterStatusOptions, currentPage, pageSize, totalPages, filteredCourses, paginatedCourses, lazyLoadMore, resetFilters, courseModalVisible, isEditingCourse, courseForm, openAddCourseModal, openEditCourseModal, saveCourseAsync, deleteCourseAsync,

            isDragging, fileInputRef, errorModalVisible, invalidFileInfo, handleDragOver, handleDragLeave, handleDrop, triggerFileDialog, handleFileSelect, downloadSampleExcel, triggerInvalidFileTest,

            localFiles, addLocalFile, deleteLocalFile, loadLocalFiles,

            products, cart, catalogSearch, catalogCategory, catalogMaxPrice, catalogSort, categoryOptions, sortOptions, isCatalogLoading, filteredProducts, addToCart, triggerCatalogRefresh,

            kanbanTasks, userKanbanTasks, newKanbanTitle, kanbanTodo, kanbanInProgress, kanbanDone, moveKanbanTask, addKanbanTask,

            apiMethod, apiEndpoint, apiMethodsOptions, apiEndpointsOptions, apiResponse, executeApiRequest, roleOptions, changeUserRole,

            // Voyager Admin
            voyagerTab, voyagerUserSearch, voyagerUserRoleFilter, voyagerUserRoleOptions, filteredUsers,
            userModalVisible, isEditingUser, userForm, openAddUserModal, openEditUserModal, saveUserAsync,
            deleteUserAsync, toggleUserStatus, exportUsersExcel,
            voyagerCourseSearch, filteredVoyagerCourses, voyagerLogSearch, filteredVoyagerLogs, clearVoyagerLogs, exportLogsJson,

            profileFollowers, profileFollowed, toggleFollow, billingAnnual,

            students, stepperStep, stepperData, nextStepperStep, prevStepperStep,

            diffModalVisible, selectedLogForDiff, openDiffModal, computeDiffRows,

            // Главная страница: направления, курсы, FAQ, отзывы, экспресс-тест
            languageDirections, selectLanguageFilter, featuredCourses,
            activeFaq, toggleFaq, faqList, studentReviews,
            placementTestModalVisible, testQuestionStep, testSelectedAnswers, testLanguage, testResult, testQuestions, startPlacementTest, answerTestQuestion,

            emailModalVisible, createGoogleDriveDump
        };
    }
});

// -------------------------------------------------------------
// ГЛОБАЛЬНЫЙ КОМПОНЕНТ <custom-select>
// -------------------------------------------------------------
app.component('custom-select', {
    name: 'CustomSelect',
    props: {
        modelValue: [String, Number],
        options: { type: Array, default: () => [] },
        placeholder: { type: String, default: 'Выберите...' },
        icon: { type: String, default: '' },
        size: { type: String, default: 'md' }
    },
    emits: ['update:modelValue', 'change'],
    data() { return { isOpen: false }; },
    computed: {
        normalizedOptions() {
            return this.options.map(opt => {
                if (typeof opt === 'object' && opt !== null) return { value: opt.value, label: opt.label || opt.value, icon: opt.icon || '' };
                return { value: opt, label: String(opt), icon: '' };
            });
        },
        selectedLabel() {
            const found = this.normalizedOptions.find(o => o.value === this.modelValue);
            return found ? found.label : (this.placeholder || 'Выберите...');
        },
        selectedIcon() {
            const found = this.normalizedOptions.find(o => o.value === this.modelValue);
            return found && found.icon ? found.icon : this.icon;
        }
    },
    methods: {
        toggleDropdown(e) { e.stopPropagation(); this.isOpen = !this.isOpen; },
        selectOption(opt) { this.$emit('update:modelValue', opt.value); this.$emit('change', opt.value); this.isOpen = false; }
    },
    mounted() {
        this._clickOutside = () => { this.isOpen = false; };
        window.addEventListener('click', this._clickOutside);
    },
    beforeUnmount() { window.removeEventListener('click', this._clickOutside); },
    template: `
      <div class="relative inline-block text-left select-none w-full" :class="size === 'sm' ? 'text-xs' : 'text-sm'">
        <button type="button" @click="toggleDropdown"
          class="w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          :class="[isOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-300 dark:border-slate-700/80', 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm hover:border-slate-400 dark:hover:border-slate-600']">
          <div class="flex items-center gap-2 truncate">
            <i v-if="selectedIcon" :class="selectedIcon" class="text-indigo-500 shrink-0"></i>
            <span class="truncate font-medium text-slate-800 dark:text-slate-100">{{ selectedLabel }}</span>
          </div>
          <i class="bi bi-chevron-down text-slate-400 transition-transform duration-200 shrink-0 text-xs" :class="{ 'rotate-180': isOpen }"></i>
        </button>
        <transition enter-active-class="transition duration-150 ease-out" enter-from-class="transform scale-95 opacity-0 -translate-y-1" enter-to-class="transform scale-100 opacity-100 translate-y-0" leave-active-class="transition duration-100 ease-in" leave-from-class="transform scale-100 opacity-100 translate-y-0" leave-to-class="transform scale-95 opacity-0 -translate-y-1">
          <div v-if="isOpen" @click.stop class="absolute z-50 mt-1.5 w-full min-w-[200px] max-h-60 overflow-y-auto rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl py-1.5 focus:outline-none custom-scrollbar">
            <div v-for="opt in normalizedOptions" :key="opt.value" @click="selectOption(opt)"
              class="flex items-center justify-between px-3.5 py-2 cursor-pointer transition-colors text-xs sm:text-sm"
              :class="[opt.value === modelValue ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/90']">
              <div class="flex items-center gap-2 truncate">
                <i v-if="opt.icon" :class="opt.icon" class="text-indigo-500"></i>
                <span class="truncate">{{ opt.label }}</span>
              </div>
              <i v-if="opt.value === modelValue" class="bi bi-check2 text-indigo-600 dark:text-indigo-400 font-bold ml-2"></i>
            </div>
          </div>
        </transition>
      </div>
    `
});

// -------------------------------------------------------------
// ГЛОБАЛЬНЫЙ КОМПОНЕНТ <ad-slot>
// -------------------------------------------------------------
app.component('ad-slot', {
    name: 'AdSlot',
    props: {
        format: { type: String, default: 'banner' },
        width: { type: String, default: '' },
        height: { type: String, default: '' },
        label: { type: String, default: 'Рекламный блок' },
        title: { type: String, default: '' },
        slotId: { type: String, default: '' }
    },
    computed: {
        containerClasses() {
            switch (this.format) {
                case 'leaderboard': return 'w-full max-w-4xl min-h-[90px] my-6';
                case 'sidebar': return 'w-full sm:w-[300px] min-h-[250px] my-4';
                case 'card': return 'w-full min-h-[140px] my-3';
                default: return 'w-full min-h-[120px] my-6';
            }
        },
        customStyle() {
            const style = {};
            if (this.width) style.width = this.width;
            if (this.height) style.minHeight = this.height;
            return style;
        },
        dimensionsText() {
            switch (this.format) {
                case 'leaderboard': return 'Формат: Leaderboard (728 × 90 px / адаптивный)';
                case 'sidebar': return 'Формат: Medium Rectangle (300 × 250 px)';
                case 'card': return 'Формат: In-feed Card (нативный блок)';
                default: return 'Формат: Responsive Banner (100% × 120 px)';
            }
        }
    },
    template: `
      <div class="relative overflow-hidden rounded-3xl border border-indigo-100 dark:border-indigo-900 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 p-6 sm:p-8 shadow-sm" :class="containerClasses" :style="customStyle" role="complementary" aria-label="Спонсорский блок">
        <div class="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-2xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 text-left">
          <div class="max-w-2xl">
            <span class="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300"><i class="bi bi-stars"></i> Партнёр LINGUO · Реклама</span>
            <h3 class="mt-3 text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{{ title || 'Полезные инструменты для изучения языков' }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Дополнительные материалы, тренажёры и практика, которые помогут закрепить знания между занятиями.</p>
            <p v-if="slotId" class="mt-3 text-[10px] text-slate-400">Рекламный блок · {{ slotId }}</p>
          </div>
          <div class="shrink-0 flex items-center gap-3">
            <div class="hidden sm:flex w-14 h-14 rounded-2xl bg-indigo-600 text-white items-center justify-center shadow-lg"><i class="bi bi-megaphone-fill text-2xl"></i></div>
            <span class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md">Подробнее <i class="bi bi-arrow-up-right"></i></span>
          </div>
        </div>
      </div>
    `
});

app.mount('#app');