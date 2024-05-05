import axios from "axios";
import { useState } from "react";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setShortenedUrl("");
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(originalUrl)) {
      setError("Невірний формат URL-адреси");
      return;
    }
    try {
      const response = await axios.post(
        "https://corsproxy.io/?https://cleanuri.com/api/v1/shorten",
        {
          url: originalUrl,
        }
      );
      setShortenedUrl(response.data.result_url);
    } catch (error) {
      setError("Помилка при скороченні URL-адреси");
    }
  };

  return (
    <div className="w-auto flex flex-col gap-5 bg-slate-600 text-white p-20 rounded-3xl">
      <h1 className="text-center text-xl">Скорочувач URL-адрес</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="h-10 rounded-md text-black"
          type="text"
          placeholder="Введіть URL-адресу"
          value={originalUrl}
          onChange={(event) => setOriginalUrl(event.target.value)}
        />
        <button className="p-2 ml-2 bg-slate-900 rounded-xl" type="submit">
          Скоротити
        </button>
      </form>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {shortenedUrl && (
        <div>
          <p>Скорочена URL-адреса:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
