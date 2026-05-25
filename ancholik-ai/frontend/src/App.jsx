import { useState } from "react";
import "./App.css";

const DISTRICTS = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ",
  "কুমিল্লা", "নারায়ণগঞ্জ", "গাজীপুর", "ফরিদপুর", "টাঙ্গাইল", "জামালপুর", "নেত্রকোণা",
  "কিশোরগঞ্জ", "মানিকগঞ্জ", "মুন্সিগঞ্জ", "নরসিংদী", "শরীয়তপুর", "রাজবাড়ী", "মাদারীপুর",
  "গোপালগঞ্জ", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "লক্ষ্মীপুর", "নোয়াখালী", "ফেনী", "কক্সবাজার",
  "বান্দরবান", "রাঙামাটি", "খাগড়াছড়ি", "নওগাঁ", "নাটোর", "চাঁপাইনবাবগঞ্জ", "পাবনা",
  "সিরাজগঞ্জ", "বগুড়া", "জয়পুরহাট", "যশোর", "ঝিনাইদহ", "মাগুরা", "নড়াইল", "কুষ্টিয়া",
  "মেহেরপুর", "চুয়াডাঙ্গা", "সাতক্ষীরা", "বাগেরহাট", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর",
  "ভোলা", "বরগুনা", "সুনামগঞ্জ", "হবিগঞ্জ", "মৌলভীবাজার", "নীলফামারী", "লালমনিরহাট",
  "কুড়িগ্রাম", "গাইবান্ধা", "ঠাকুরগাঁও", "দিনাজপুর", "পঞ্চগড়", "শেরপুর"
];

export default function App() {
  const [text, setText] = useState("");
  const [district, setDistrict] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return setError("কিছু লিখুন আগে!");
    if (!district) return setError("জেলা সিলেক্ট করুন!");
    setError("");
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, district }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.translatedText);
    } catch (err) {
      setError(err.message || "সার্ভার এরর! Backend চালু আছে কি?");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <div className="bg-orbs">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>

      <div className="container">
        <header className="header">
          <div className="badge">🇧🇩 Bangladesh AI Tool</div>
          <h1 className="title">আঞ্চলিক <span className="gradient-text">AI</span></h1>
          <p className="subtitle">
            যেকোনো বাংলা টেক্সট বাংলাদেশের ৬৪ জেলার আঞ্চলিক ভাষায় রূপান্তর করুন
          </p>
        </header>

        <div className="card">
          <div className="section">
            <label className="label">বাংলা টেক্সট লিখুন</label>
            <textarea
              className="textarea"
              placeholder="এখানে বাংলা লিখুন..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
            />
            <div className="char-count">{text.length} অক্ষর</div>
          </div>

          <div className="section">
            <label className="label">জেলা বেছে নিন</label>
            <select
              className="select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">-- জেলা সিলেক্ট করুন --</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {error && <div className="error">{error}</div>}

          <button
            className={`btn-primary ${loading ? "loading" : ""}`}
            onClick={handleTranslate}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner" /> রূপান্তর হচ্ছে...</>
            ) : (
              <>রূপান্তর করুন →</>
            )}
          </button>
        </div>

        {result && (
          <div className="card result-card">
            <div className="result-header">
              <div>
                <div className="result-badge">{district} আঞ্চলিক ভাষা</div>
                <label className="label" style={{ marginTop: "8px" }}>রূপান্তরিত টেক্সট</label>
              </div>
              <button className="btn-icon" onClick={handleCopy} title="কপি করুন">
                {copied ? "✅" : "📋"}
              </button>
            </div>
            <div className="result-text">{result}</div>
          </div>
        )}

        <footer className="footer">
          Powered by Gemini AI • Made for Bangladesh 🇧🇩
        </footer>
      </div>
    </div>
  );
}