<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

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

  // التحقق من حالة تسجيل الدخول
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // المستخدم غير مسجل دخول → نعيده إلى صفحة login
      window.location.href = "login.html";
    } else {
      console.log("✅ مستخدم مسجل:", user.displayName);
    }
  });
</script>
