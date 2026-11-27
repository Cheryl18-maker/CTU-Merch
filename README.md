# Cebu Technological University (CTU) Merchandise Self-Ordering Kiosk

A full-page, vertical self-service merchandise ordering kiosk web application designed in the style of commercial touchscreen terminals (such as a McDonald's ordering kiosk).

Built with **React (Vite)**, **Tailwind CSS**, **FastAPI (Python)**, and integrated with **Supabase Database** (`aograbohxutnakmcnrgm`).

---

## 👥 Members
- **Cheryl Jane P. Geoman**
- **Rona Mae Gesim**
- **Dominic Magalso**
- **Kharen Revillas**
- **Vexze Semilla**

---

## 🖥️ Kiosk Interface Architecture (McDonald's Style)

- **Full-Page, Tall & Vertical Form Factor:**
  - Designed as a full-screen vertical kiosk column (`max-w-2xl` tall aspect ratio) filling 100% of the viewport height.
  - No simulated phone frames, mockups, or phone bezels — it functions as a true kiosk touchscreen station.
- **Attract & Welcome Screen:**
  - Large university banner ("Wear Your Campus Pride") with animated "TOUCH TO ORDER" trigger.
  - Student identity card reader simulation (Dominic Magalso) showing real-time wallet balance and campus points.
- **Merchandise Catalog:**
  - Large touch tabs for categories (Apparel, Accessories, Drinkware).
  - High-resolution product imagery exported directly from Figma.
  - Customization modal with touch size selectors, color swatches, and quantity steppers.
- **Persistent Bottom Order Tray (Signature Kiosk Footer):**
  - Always-visible bottom bar showing running items count, order subtotal, cancel/start over button, and a large **"CHECKOUT & PAY ➔"** action button.
- **Campus Pickup & Payment System:**
  - Campus Student Wallet with PIN pad authorization and biometric simulation.
  - Cash at Counter (Ground Floor Pickup Counter A).
  - GCash / QRPh digital payment.
  - Printable official kiosk receipt modal (`window.print()`).
  - Campus Rewards points balance & redemption.

---

## 🗄️ Supabase Database (`aograbohxutnakmcnrgm`)

The kiosk is wired to project **`aograbohxutnakmcnrgm`** (`https://aograbohxutnakmcnrgm.supabase.co`).

### Tables Included in `supabase_schema.sql`:
1. **`products`**: Merch catalog items, price, images, sizing, color variants, stock count.
2. **`profiles`**: Student/faculty accounts, ID numbers, campus wallet balance, reward points.
3. **`orders`**: Placed kiosk orders, order numbers, payment method, pickup status, item details.
4. **`rewards`**: Campus vouchers and merch loyalty gifts for redemption.

### How to apply schema to your Supabase project:
1. Log into your [Supabase Dashboard](https://supabase.com/dashboard/project/aograbohxutnakmcnrgm).
2. Go to **SQL Editor** -> **New Query**.
3. Paste the contents of [supabase_schema.sql](supabase_schema.sql) and click **Run**.
4. Retrieve your **anon public key** from **Project Settings -> API** and add it to `frontend/.env`:
   ```env
   VITE_SUPABASE_URL=https://aograbohxutnakmcnrgm.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
*(Note: If no Supabase key is entered, the kiosk automatically runs in local/FastAPI mode without interruption).*

---

## 🚀 Running the Kiosk

### One-Click Launch (Windows)
Double-click:
```bat
start_kiosk.bat
```
This launches the FastAPI backend on port `8000`, the Vite frontend on port `5173`, and opens `http://localhost:5173` in your browser.

### Manual Launch
#### Backend
```powershell
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Frontend
```powershell
cd frontend
npm run dev
```
Open `http://localhost:5173`
