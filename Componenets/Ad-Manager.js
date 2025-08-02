import { useState } from "react";

export default function AdManager() {
  const [formData, setFormData] = useState({
    productURL: "",
    targetAudience: "",
    budget: "",
  });
  const [generatedAd, setGeneratedAd] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateAd = async () => {
    setError("");
    try {
      const res = await fetch("/api/generate-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong.");
        return;
      }

      const data = await res.json();
      setGeneratedAd(data);
    } catch (err) {
      setError("Network error.");
    }
  };

  const createCampaign = async () => {
    const res = await fetch("/api/create-campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, ...generatedAd }),
    });
    const data = await res.json();
    alert("Campaign submitted!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Ad Manager</h1>
      <input
        name="productURL"
        onChange={handleChange}
        value={formData.productURL}
        placeholder="Product URL"
        className="w-full p-2 border mb-2"
      />
      <input
        name="targetAudience"
        onChange={handleChange}
        value={formData.targetAudience}
        placeholder="Target Audience"
        className="w-full p-2 border mb-2"
      />
      <input
        name="budget"
        onChange={handleChange}
        value={formData.budget}
        placeholder="Budget (USD)"
        className="w-full p-2 border mb-4"
      />
      <button onClick={generateAd} className="bg-blue-600 text-white w-full p-2 rounded">
        Generate Ad
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {generatedAd && (
        <div className="mt-6 border p-4 rounded-xl shadow space-y-4">
          <p><strong>Ad Copy:</strong> {generatedAd.adCopy}</p>
          <img src={generatedAd.adImage} className="rounded-xl" />
          <button onClick={createCampaign} className="bg-green-600 text-white w-full p-2 rounded">
            Submit Campaign
          </button>
        </div>
      )}
    </div>
  );
}