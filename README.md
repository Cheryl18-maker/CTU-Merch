# Cebu Technological University (CTU) Merch Mobile Kiosk

An interactive, self-service merchandise kiosk web application designed with mobile/phone dimensions for **Cebu Technological University**.

Built using **React (Vite)**, **Tailwind CSS**, and **Python (FastAPI)** based on the official Figma kiosk designs.

---

## 👥 Members
- **Cheryl Jane P. Geoman**
- **Rona Mae Gesim**
- **Dominic Magalso**
- **Kharen Revillas**
- **Vexze Semilla**

---

## 📱 Features

- **Phone Dimensions Kiosk Frame:** Authentic smartphone/kiosk terminal casing with dynamic island, status bar (CTU-5G, battery, clock, live store status), and an option to toggle between **Phone View** and **Full Kiosk View**.
- **Welcome & Hero Screen:** University branding, announcements, operational hours, student identity card, and quick service shortcuts.
- **Merchandise Catalog:** Searchable and categorized campus gear (Apparel, Accessories, Drinkware) with real-time stock indicators, tags, and quick-add buttons.
- **Product Personalization Modal:** Multi-image gallery, interactive size selector (S, M, L, XL, XXL), color swatch switcher, quantity stepper, and live subtotal calculations.
- **Shopping Bag & Cart Management:** Quantity adjusters, item removal, clear cart, order totals, and live item counts.
- **Campus Checkout & Pickup:** Campus pickup location (Student Center Counter A), estimated preparation time, and multiple payment methods:
  - **Campus Student Wallet** (with PIN authorization & biometric simulation)
  - **Cash at Counter** (pay upon pickup)
  - **GCash / QRPh** (instant digital payment)
- **PIN Verification & Insufficient Balance Modal:** Handles balance verification, shortfall calculations, top-up shortcuts, and PIN entry.
- **Order Success & Digital Pickup Pass:** Generates simulated QR pass, pickup order ID, and points earned.
- **Official Kiosk Receipt Modal:** Printable, formatted itemized receipt (supports `window.print()`).
- **Student Wallet & Top-Up Modal:** Instant wallet balance top-up (₱100, ₱200, ₱500, ₱1,000).
- **Balance & Rewards Redemption:** Earn 1 reward point per ₱10 spent; redeem university vouchers, sticker packs, lanyards, and totes.
- **Order History:** Complete log of past orders with status tracking and receipt reprinting.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3, Lucide Icons
- **Backend:** Python 3.11, FastAPI, Pydantic, Uvicorn
- **Assets:** High-resolution university merchandise imagery and screen mocks exported directly from Figma into local static assets.

---

## 🚀 Getting Started

### 1. One-Click Launch (Windows)
Double-click:
```bat
start_kiosk.bat
```
This automatically launches both the FastAPI backend (port `8000`) and Vite frontend (port `5173`), and opens your browser.

---

### 2. Manual Launch

#### Backend (FastAPI)
```powershell
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
API Documentation will be available at: `http://127.0.0.1:8000/docs`

#### Frontend (React + Vite)
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```
CTU_merchKiosk/
├── backend/
│   └── main.py                     # FastAPI REST API & mock data store
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       ├── products/           # Exported product photos & thumbnails
│   │       └── screens/            # Figma screen references & CTU branding
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartScreen.jsx
│   │   │   ├── CatalogScreen.jsx
│   │   │   ├── CheckoutScreen.jsx
│   │   │   ├── ConfirmWalletModal.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── InsufficientBalanceModal.jsx
│   │   │   ├── OrderHistoryScreen.jsx
│   │   │   ├── OrderSuccessScreen.jsx
│   │   │   ├── ProductDetailModal.jsx
│   │   │   ├── ReceiptModal.jsx
│   │   │   ├── RewardsScreen.jsx
│   │   │   ├── TopUpModal.jsx
│   │   │   └── WelcomeScreen.jsx
│   │   ├── App.jsx                 # Kiosk container & state manager
│   │   ├── index.css               # Tailwind & custom kiosk animations
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── start_kiosk.bat                 # One-click launcher
├── start_backend.bat
├── start_frontend.bat
└── README.md
```
