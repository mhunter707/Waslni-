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

  // ✅ التحقق من تسجيل الدخول
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      showLogoutButton();
      showUserCount();
    }
  });

  // 🚪 زر تسجيل الخروج
  function showLogoutButton() {
    const btn = document.createElement('button');
    btn.innerText = "🚪 تسجيل الخروج";
    Object.assign(btn.style, {
      position: "fixed",
      top: "15px",
      left: "15px",
      background: "#FFD700",
      color: "#000",
      border: "none",
      padding: "10px 15px",
      borderRadius: "25px",
      fontWeight: "bold",
      cursor: "pointer",
      zIndex: "1000",
      transition: "0.3s"
    });
    btn.onmouseenter = () => (btn.style.transform = "scale(1.1)");
    btn.onmouseleave = () => (btn.style.transform = "scale(1)");
    btn.onclick = () => {
      signOut(auth).then(() => window.location.href = "login.html");
    };
    document.body.appendChild(btn);
  }

  // 🌟 نظام النجوم + عداد المستخدمين
  async function showUserCount() {
    const counter = document.createElement('div');
    counter.id = "userCounter";
    Object.assign(counter.style, {
      position: "fixed",
      bottom: "20px",
      right: "0",
      left: "0",
      margin: "auto",
      width: "90%",
      textAlign: "center",
      padding: "12px",
      borderRadius: "15px",
      fontWeight: "bold",
      fontSize: "17px",
      background: "rgba(0, 0, 0, 0.7)",
      color: "#FFD700",
      border: "2px solid #FFD700",
      boxShadow: "0 0 15px #FFD700",
      transition: "all 0.6s ease",
      animation: "pulse 2s infinite",
      zIndex: "999"
    });
    document.body.appendChild(counter);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 0 10px #FFD700; }
        50% { transform: scale(1.05); box-shadow: 0 0 25px #fff15a; }
        100% { transform: scale(1); box-shadow: 0 0 10px #FFD700; }
      }
      @keyframes glow {
        0% { text-shadow: 0 0 10px #fff, 0 0 20px #FFD700; }
        50% { text-shadow: 0 0 20px #fff, 0 0 40px #FFD700; }
        100% { text-shadow: 0 0 10px #fff, 0 0 20px #FFD700; }
      }
    `;
    document.head.appendChild(style);

    // 🧠 تحديد عدد النجوم بناءً على عدد المستخدمين
    function getStars(count) {
      if (count >= 100000) return { stars: "🌠 نجم أسطوري", color: "#ff66ff" };
      if (count >= 10000) return { stars: "⭐⭐⭐⭐⭐", color: "#00FFFF" };
      if (count >= 1000) return { stars: "⭐⭐⭐⭐", color: "#FFD700" };
      if (count >= 100) return { stars: "⭐⭐⭐", color: "#C0C0C0" };
      if (count >= 10) return { stars: "⭐⭐", color: "#cd7f32" };
      return { stars: "⭐", color: "#fff" };
    }

    // 🔄 تحديث العداد والنجوم
    async function updateCount() {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "users"));
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

        const { stars, color } = getStars(count);

        counter.innerHTML = `
          🌍 <b style="color:${color};font-size:20px;">${count.toLocaleString()}</b> مستخدم
          <br><span style="font-size:24px;animation:glow 2s infinite;color:${color};">${stars}</span>
          <br><span style="font-size:13px;color:#fff;">شارك التطبيق لتصل إلى مستوى نجوم أعلى 🚀</span>
        `;

        counter.style.borderColor = color;
        counter.style.boxShadow = `0 0 20px ${color}`;
        counter.style.color = color;
      } catch (err) {
        counter.innerText = "⚠️ لم يتم تحميل عدد المستخدمين";
        console.error(err);
      }
    }

    await updateCount();
    setInterval(updateCount, 10000);
  }
</script>
