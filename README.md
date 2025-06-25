# 🎡 Diamond Park Ilorin - Booking Website

This is the official booking website for **Diamond Park Ilorin**, designed to help visitors easily book visits, pay online, and generate tickets digitally. The platform is built using **Vanilla HTML, CSS, JavaScript**, and **Firebase**.

---

## 🚀 Features

- 🎫 Online booking form (Individual & Group)
- 💳 Payment integration via Paystack
- ✅ Firebase Firestore for storing bookings
- 📥 Ticket generation & download (as image)
- 📅 Booking date & time selection to reduce queueing
- 🔐 Admin Dashboard with Google login (restricted to specific email)
- 📋 Dashboard: manage bookings, check-in, and notify visitors

---

## 🔧 Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- Firebase Firestore
- Firebase Authentication
- Paystack Payment Gateway
- html2canvas for ticket image generation

---

## 📦 Folder Structure

diamond-park-ilorin/
│
├── index.html # Landing page (optional)
├── booking.html # Booking page
├── admin.html # Admin dashboard
├── styles/ # CSS styles
│ └── main.css
├── js/ # JavaScript logic
│ ├── booking.js
│ └── admin.js
├── assets/ # Images & assets
└── README.md

yaml
Copy
Edit

---

## 🧪 How to Run Locally

> You must use a local server to test Firebase auth & Paystack.

1. **Clone the repository**
   ```bash
   git clone https://github.com/lcc33/diamond-park-ilorin.git
   cd diamond-park-ilorin
Start a live server

You can use VS Code Live Server extension

Or use Python's server:

bash
Copy
Edit
python3 -m http.server
Open booking.html in your browser via localhost

🔑 Firebase Setup
Create a Firebase project at firebase.google.com

Enable:

Firestore Database

Google Authentication

Add your domain (e.g. localhost, 127.0.0.1.xip.io, or your live URL) in Authentication > Authorized Domains

Replace the Firebase config in your JS files:

js
Copy
Edit
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  ...
};
💳 Paystack Setup
Create a Paystack account at paystack.com

Get your Public Key from Dashboard > Settings > API Keys

Replace it in booking.js:

js
Copy
Edit
key: "pk_test_xxxxxxxxxxxxxxxxxxxxx",
🔒 Admin Access
Only a specified Gmail address can access the Admin Dashboard.

Update the adminEmail in admin.js to your desired admin email.

📸 Ticket Example
Tickets are automatically generated after payment and can be downloaded as images.

🛠️ To-Do
 Add email notifications to remind users

 Improve admin dashboard styling

 Mobile responsiveness tweaks

📜 License
This project is open-source and available under the MIT License.

❤️ Built with Love by Kindra