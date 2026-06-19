# 📋 TaskApp — React Todo Admin Panel (Vite)

React + Vite + Tailwind CSS bilan yozilgan to'liq CRUD Todo ilovasi.

## 🚀 Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda avtomatik ochiladi: `http://localhost:5173`

## 📦 Boshqa buyruqlar

```bash
npm run build      # production build (dist/ papkasiga)
npm run preview    # build qilingan versiyani lokal ko'rish
```

## 🗂️ Fayl tuzilmasi

```
todo-app/
├── index.html                 # Vite entry HTML (root darajada!)
├── vite.config.js             # Vite sozlamalari
├── tailwind.config.js
├── postcss.config.js
├── package.json
│
└── src/
    ├── main.jsx                # ⭐ Entry point — index.js o'rnini bosadi
    ├── App.jsx                 # State/logic markazi
    ├── api.js                  # Barcha fetch so'rovlar
    ├── index.css                # Tailwind directives
    │
    ├── layout/                 # Doimiy elementlar (har sahifada bor)
    │   ├── MainLayout.jsx        # Header + content + Toast wrapper
    │   ├── Header.jsx            # Tepa navbar, "Admin Panel" tugmasi
    │   └── AdminPanel.jsx        # O'ng tomondan chiqadigan drawer
    │
    ├── pages/                  # Alohida "ekran"lar
    │   └── TasksPage.jsx         # Asosiy todo ro'yxati sahifasi
    │
    └── components/              # Qayta ishlatiluvchi kichik bloklar
        ├── Icons.jsx
        ├── Toast.jsx
        ├── TaskForm.jsx          # useRef + useState namunasi
        ├── TaskCard.jsx
        ├── FilterBar.jsx
        ├── Pagination.jsx
        └── DeleteModal.jsx
```

## ⚡ Vite vs CRA farqi (muhim!)

| | Vite | Create React App |
|---|------|-------------------|
| Ishga tushirish | `npm run dev` | `npm start` |
| Entry fayl | `src/main.jsx` | `src/index.js` |
| `index.html` joyi | **root** papkada | `public/` papkada |
| Build buyrug'i | `npm run build` | `npm run build` |
| Tezlik | Juda tez (ESM asosida) | Sekinroq (Webpack) |

`npm run dev` ishlashi uchun albatta `package.json` da:
```json
"scripts": { "dev": "vite" }
```
qatori bo'lishi kerak — aks holda "Missing script: dev" xatosi chiqadi.

## 🧠 useRef vs useState

| Hook | Qayerda ishlatildi | Sabab |
|------|--------------------|-------|
| `useRef` | `TaskForm` dagi title input, `FilterBar` dagi search focus, toast ID | DOM ga to'g'ridan murojaat, re-render shart emas |
| `useState` | description, completed toggle, filter, search matni | UI darhol qayta chizilishi kerak |

## 🔗 API

`https://biyovo1194.pythonanywhere.com/api/v1/tasks/`

| Metod | Yo'l | Vazifa |
|-------|------|--------|
| GET | `/?page=1` | Ro'yxat (sahifalangan) |
| POST | `/` | Yaratish |
| PUT | `/:id/` | To'liq yangilash |
| PATCH | `/:id/` | Qisman yangilash (masalan, `completed`) |
| DELETE | `/:id/` | O'chirish |
