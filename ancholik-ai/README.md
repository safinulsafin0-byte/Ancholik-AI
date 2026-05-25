# আঞ্চলিক AI 🇧🇩

বাংলাদেশের ৬৪ জেলার আঞ্চলিক ভাষায় বাংলা টেক্সট রূপান্তর করার AI টুল।

---

## ✅ যা যা লাগবে (আগে install করুন)

- [Node.js](https://nodejs.org/) — v18 বা তার উপরে
- Gemini API Key (নিচে দেখুন কীভাবে পাবেন)

---

## 🔑 STEP 1: Gemini API Key নিন (FREE)

1. এই লিংকে যান → https://aistudio.google.com/app/apikey
2. Google account দিয়ে login করুন
3. **"Create API Key"** বাটনে ক্লিক করুন
4. API Key টা copy করুন (এটা পরে লাগবে)

---

## 📁 STEP 2: Project Download করুন

Project folder টা আপনার computer এ রাখুন।

```
ancholik-ai/
├── frontend/
├── backend/
└── README.md
```

---

## ⚙️ STEP 3: Backend Setup

### Terminal/CMD খুলুন, backend folder এ যান:

```bash
cd ancholik-ai/backend
```

### .env file বানান:

```bash
# Windows এ:
copy .env.example .env

# Mac/Linux এ:
cp .env.example .env
```

### .env file খুলুন (Notepad বা VS Code দিয়ে) এবং API key বসান:

```
GEMINI_API_KEY=এখানে_আপনার_api_key_বসান
PORT=5000
```

### Dependencies install করুন:

```bash
npm install
```

### Backend চালু করুন:

```bash
npm start
```

✅ দেখবেন: `Server running on http://localhost:5000`

---

## 🎨 STEP 4: Frontend Setup

### নতুন Terminal খুলুন (backend বন্ধ করবেন না!), frontend folder এ যান:

```bash
cd ancholik-ai/frontend
```

### Dependencies install করুন:

```bash
npm install
```

### Frontend চালু করুন:

```bash
npm run dev
```

✅ দেখবেন: `Local: http://localhost:3000`

---

## 🚀 STEP 5: Browser এ Open করুন

Browser এ যান → http://localhost:3000

---

## 🧪 Test করবেন কীভাবে?

1. টেক্সট বক্সে লিখুন: **"আমি তোমাকে ভালোবাসি"**
2. জেলা সিলেক্ট করুন: **সিলেট**
3. **"রূপান্তর করুন"** বাটনে ক্লিক করুন
4. Result দেখুন!
5. **🔊 Play** বাটনে ক্লিক করলে শুনতে পারবেন

---

## ❌ সমস্যা হলে কী করবেন?

| সমস্যা | সমাধান |
|--------|--------|
| "সার্ভার এরর" দেখাচ্ছে | Backend চালু আছে কিনা চেক করুন (Step 3) |
| API key error | .env ফাইলে key সঠিকভাবে বসিয়েছেন কিনা দেখুন |
| Port already in use | অন্য terminal এ একই command চলছে কিনা বন্ধ করুন |
| Voice কাজ করছে না | Chrome browser use করুন |

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + CSS
- **Backend**: Node.js + Express
- **AI**: Google Gemini 1.5 Flash
- **Voice**: Browser SpeechSynthesis API (Free)

---

Made with ❤️ for Bangladesh 🇧🇩
