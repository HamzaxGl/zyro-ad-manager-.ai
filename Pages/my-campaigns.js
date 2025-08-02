import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyCampaigns() {
  const { data: session } = useSession();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (session) {
      fetch("/api/my-campaigns")
        .then((res) => res.json())
        .then((data) => setCampaigns(data));
    }
  }, [session]);

  if (!session) return <p className="text-center mt-10">Please log in to view your campaigns.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">My Campaigns</h1>
      {campaigns.map((c) => (
        <div key={c.id} className="border p-4 rounded-xl shadow">
          <p><strong>Product:</strong> {c.productURL}</p>
          <p><strong>Audience:</strong> {c.targetAudience}</p>
          <p><strong>Budget:</strong> ${c.budget}</p>
          <p><strong>Status:</strong> {c.status}</p>
          {c.adImage && <img src={c.adImage} className="mt-2 rounded-xl max-h-40" />}
        </div>
      ))}
    </div>
  );
}