const translations = {
  ar: {
    title: "🚗 وصلني",
    start: "ابدأ",
    selectRole: "اختر دورك",
    driverTitle: "🚛 تسجيل الناقل",
    userTitle: "🚗 البحث عن ناقل",
  },
  en: {
    title: "🚗 Waslni",
    start: "Start",
    selectRole: "Choose your role",
    driverTitle: "🚛 Driver Registration",
    userTitle: "🚗 Find a Driver",
  },
  fr: {
    title: "🚗 Waslni",
    start: "Commencer",
    selectRole: "Choisissez votre rôle",
    driverTitle: "🚛 Inscription du conducteur",
    userTitle: "🚗 Rechercher un conducteur",
  }
};

function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  const t = translations[lang];
  if (document.getElementById('title')) document.getElementById('title').innerText = t.title;
  if (document.getElementById('startBtn')) document.getElementById('startBtn').innerText = t.start;
  if (document.getElementById('selectRole')) document.getElementById('selectRole').innerText = t.selectRole;
  if (document.getElementById('driverTitle')) document.getElementById('driverTitle').innerText = t.driverTitle;
  if (document.getElementById('userTitle')) document.getElementById('userTitle').innerText = t.userTitle;
}
