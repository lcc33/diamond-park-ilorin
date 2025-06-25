// ✅ admin.js — handles admin login and dashboard
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrANLCpGfG77-nqezN5sIUbgHVmffebYA",
  authDomain: "diamondparkilorin-d3300.firebaseapp.com",
  projectId: "diamondparkilorin-d3300",
  storageBucket: "diamondparkilorin-d3300.appspot.com",
  messagingSenderId: "4243647014",
  appId: "1:4243647014:web:50ae42b8d13c2f1ff2d4e7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const adminEmail = "bryanedwarding@gmail.com";

const loginSection = document.getElementById("login");
const dashboardSection = document.getElementById("dashboard");

// Handle sign-in
const loginBtn = document.getElementById("googleLogin");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      if (result.user.email === adminEmail) {
        showDashboard();
      } else {
        alert("Access denied. Admin only.");
        signOut(auth);
      }
    }).catch((err) => {
      console.error("Login failed:", err.message);
    });
  });
}

// Handle sign-out
const signOutBtn = document.getElementById("signOut");
if (signOutBtn) {
  signOutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      loginSection.style.display = "block";
      dashboardSection.style.display = "none";
    });
  });
}

// Maintain login state
onAuthStateChanged(auth, (user) => {
  if (user && user.email === adminEmail) {
    showDashboard();
  } else {
    loginSection.style.display = "block";
    dashboardSection.style.display = "none";
  }
});

function showDashboard() {
  loginSection.style.display = "none";
  dashboardSection.style.display = "block";
  loadBookings();
}

function loadBookings() {
  const q = query(collection(db, "bookings"), orderBy("timestamp", "desc"));
  onSnapshot(q, (snapshot) => {
    const tbody = document.querySelector("#bookingTable tbody");
    tbody.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.type}</td>
        <td>${data.people}</td>
        <td>${data.date || ""} ${data.time || ""}</td>
        <td>${data.entered ? "✅" : "❌"}</td>
        <td>
          <button class="btn" onclick="markEntered('${docSnap.id}')">Check In</button>
          <button class="btn btn-danger" onclick="notify('${data.email}')">Notify</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });
}

window.markEntered = async function (id) {
  const ref = doc(db, "bookings", id);
  await updateDoc(ref, { entered: true });
};

window.notify = function (email) {
  alert("📣 Notification would be sent to: " + email);
  // integrate notification system later
};
