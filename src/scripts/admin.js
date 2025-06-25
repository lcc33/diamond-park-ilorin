import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCrANLCpGfG77-nqezN5sIUbgHVmffebYA",
  authDomain: "diamondparkilorin-d3300.firebaseapp.com",
  projectId: "diamondparkilorin-d3300",
  storageBucket: "diamondparkilorin-d3300.appspot.com",
  messagingSenderId: "4243647014",
  appId: "1:4243647014:web:50ae42b8d13c2f1ff2d4e7",
  measurementId: "G-5X8QB8XG8F"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Admin Email (only this account can access)
const adminEmail = "bryanedwarding@gmail.com";

// ✅ Handle Google Login
document.getElementById("googleLogin").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    if (result.user.email === adminEmail) {
      document.getElementById("login").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      loadBookings();
    } else {
      alert("Access denied. Admin only.");
      signOut(auth);
    }
  }).catch((error) => {
    console.error("Login error:", error.message);
  });
});

// ✅ Load All Bookings
function loadBookings() {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, orderBy("timestamp", "desc"));

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
        <td>${data.date || "-"} ${data.time || ""}</td>
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

// ✅ Check-in Visitor
window.markEntered = async (id) => {
  const ref = doc(db, "bookings", id);
  await updateDoc(ref, { entered: true });
};

// ✅ Notify Visitor (future integration)
window.notify = (email) => {
  alert("📣 Notification would be sent to: " + email);
  // Future: integrate EmailJS or Firebase Cloud Messaging
};
