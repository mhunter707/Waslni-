const startBtn = document.getElementById('startBtn');
const clickSound = document.getElementById('clickSound');
const countrySelect = document.getElementById('country');

// تحميل اللغة
const lang = localStorage.getItem('lang') || 'ar';
setLang(lang);

// تحميل الدولة
const savedCountry = localStorage.getItem('country');
if (savedCountry) countrySelect.value = savedCountry;

// حفظ الدولة عند التغيير
countrySelect.addEventListener('change', () => {
  localStorage.setItem('country', countrySelect.value);
});

// زر البدء
startBtn.onclick = () => {
  clickSound.play();
  window.location.href = "role.html";
};

// وضع ليلي تلقائي (اختياري)
const hour = new Date().getHours();
if (hour >= 18 || hour <= 6) {
  document.body.style.background = "linear-gradient(135deg, #000, #1a1a1a, #111)";
}
