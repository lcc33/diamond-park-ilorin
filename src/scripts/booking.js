import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrANLCpGfG77-nqezN5sIUbgHVmffebYA",
  authDomain: "diamondparkilorin-d3300.firebaseapp.com",
  projectId: "diamondparkilorin-d3300",
  storageBucket: "diamondparkilorin-d3300.appspot.com",
  messagingSenderId: "4243647014",
  appId: "1:4243647014:web:50ae42b8d13c2f1ff2d4e7",
  measurementId: "G-5X8QB8XG8F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("bookingForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const type = document.getElementById("type").value;
      const people = parseInt(document.getElementById("people").value);
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const amount = 500 * people * 100;

      const handler = PaystackPop.setup({
        key: "pk_test_6c6351527c0b5653a2fce604953b766358b8e739", // Replace with live key in production
        email,
        amount,
        currency: "NGN",
        callback: function (response) {
          const ref = response.reference;

          // Show ticket
          const ticketDiv = document.getElementById("ticket");
          ticketDiv.innerHTML = `
          <div id="ticketCard" style="padding: 20px; border: 2px dashed #000; background: #fff; width: 320px; margin: 0 auto; text-align:center; border-radius: 12px;">
            <h3 style="margin-bottom: 10px;">🎟️ Diamond Park Ticket</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>People:</strong> ${people}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Ref:</strong> ${ref}</p>
            <p class="notice">
          ⚠️ Ensure You bring your valid ticket else you would not be allowed to
          gain access to the park.
        </p>
          </div>
          <br>
          <button onclick="downloadTicketImage()">📥 Download Ticket as Image</button>
        `;

          // Automatically download ticket as image
          setTimeout(() => {
            downloadTicketImage();
          }, 500); // slight delay to ensure DOM is updated

          // ✅ Save to Firestore with correct timestamp
          addDoc(collection(db, "bookings"), {
            name,
            email,
            phone,
            type,
            people,
            date,
            time,
            ref,
            entered: false,
            timestamp: serverTimestamp(),
          })
            .then(() => {
              console.log("✅ Booking saved to Firestore.");
            })
            .catch((err) => {
              console.error("❌ Error saving to Firestore:", err);
            });
        },
        onClose: function () {
          alert("Payment popup closed.");
        },
      });

      handler.openIframe();
    });

  // Ticket image download
  window.downloadTicketImage = function () {
    const ticketDiv = document.getElementById("ticketCard");
    html2canvas(ticketDiv).then((canvas) => {
      const link = document.createElement("a");
      link.download = "DiamondPark_Ticket.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };
});
