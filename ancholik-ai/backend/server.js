const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/translate", async (req, res) => {
  const { text, district } = req.body;

  if (!text || !district) {
    return res.status(400).json({ error: "text এবং district দিতে হবে" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `তুমি বাংলাদেশের আঞ্চলিক ভাষার বিশেষজ্ঞ। তোমার কাজ হলো ${district} জেলার মানুষ যেভাবে সত্যিকারের কথ্য ভাষায় কথা বলে, হুবহু সেইভাবে রূপান্তর করা।

গুরুত্বপূর্ণ নিয়ম:
- শুধু ${district} এর নিজস্ব আঞ্চলিক শব্দ, উচ্চারণ এবং বাক্যগঠন ব্যবহার করো
- ক্রিয়াপদের শেষাংশ আঞ্চলিকভাবে পরিবর্তন করো (যেমন: করছি → করতেছি/কইরতাছি)
- আঞ্চলিক সর্বনাম ব্যবহার করো (আমি → আঁই/মুই/আমি — জেলা অনুযায়ী)
- standard বাংলা শব্দ যতটা সম্ভব কমাও
- input Banglish হলেও বাংলা আঞ্চলিক ভাষায় output দাও
- শুধুমাত্র রূপান্তরিত টেক্সট দাও, কোনো ব্যাখ্যা দেবে না

টেক্সট: "${text}"`;

    const result = await model.generateContent(prompt);
    const translatedText = result.response.text().trim();

    res.json({ translatedText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "রূপান্তর করতে সমস্যা হয়েছে। API key চেক করুন।" });
  }
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));