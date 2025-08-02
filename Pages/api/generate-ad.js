let usageTracker = {};

export default async function handler(req, res) {
  const { productURL, targetAudience } = req.body;
  const email = "demo@user.com";

  if (!usageTracker[email]) usageTracker[email] = 0;
  if (usageTracker[email] >= 3) {
    return res.status(403).json({ error: "Limit reached. Upgrade to Pro." });
  }

  const adCopy = `Boost your sales! Check out ${productURL} — perfect for ${targetAudience}.`;
  const adImage = "https://via.placeholder.com/512";

  usageTracker[email] += 1;

  res.status(200).json({ adCopy, adImage });
}