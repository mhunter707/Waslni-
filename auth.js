<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
  import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDkJ4Fn5ZKUdN_R9tY2-dE2tSiWYiYR2xg",
    authDomain: "waslni-app1.firebaseapp.com",
    projectId: "waslni-app1",
    storageBucket: "waslni-app1.firebasestorage.app",
    messagingSenderId: "860519858083",
    appId: "1:860519858083:web:5effa5624b6fe0dbf3a416",
    databaseURL: "https://waslni-app1-default-rtdb.firebaseio.com/"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);

  // 🔐 تحقق من تسجيل الدخول
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      console.log("✅ تسجيل الدخول:", user.displayName);
      showLogoutButton();
      showUserCount();
    }
  });

  // 🚪 زر تسجيل الخروج
  function showLogoutButton() {
    const btn = document.createElement('button');
    btn.innerText = "🚪 تسجيل الخروج";
    btn.style.position = "fixed";
    btn.style.top = "15px";
    btn.style.left = "15px";
    btn.style.background = "#FFD700";
    btn.style.color = "#000";
    btn.style.border = "none";
    btn.style.padding = "10px 15px";
    btn.style.borderRadius = "25px";
    btn.style.fontWeight = "bold";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "1000";
    btn.onclick = () => {
      signOut(auth).then(() => window.location.href = "login.html");
    };
    document.body.appendChild(btn);
  }

  // 🔢 عداد المستخدمين
  async function showUserCount() {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "users"));
      const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

      const counter = document.createElement('div');
      counter.innerHTML = `
        🌟 <b>${count.toLocaleString()}</b> مستخدم مسجل حتى الآن!
        <br><span style="font-size:14px;color:#FFD700;">شارك التطبيق وكن أحد رواده 🚀</span>
      `;
      counter.style.position = "fixed";
      counter.style.bottom = "15px";
      counter.style.right = "0";
      counter.style.left = "0";
      counter.style.margin = "auto";
      counter.style.width = "90%";
      counter.style.textAlign = "center";
      counter.style.background = "rgba(255, 215, 0, 0.1)";
      counter.style.border = "1px solid #FFD700";
      counter.style.color = "#FFD700";
      counter.style.padding = "10px";
      counter.style.borderRadius = "12px";
      counter.style.fontWeight = "bold";
      counter.style.animation = "pulse 2s infinite";
      counter.style.zIndex = "999";

      document.body.appendChild(counter);

      // حركة أنيقة
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    } catch (err) {
      console.error("❌ خطأ في تحميل عدد المستخدمين:", err);
    }
  }
</script>
