let fakeDB = [];

export default async function handler(req, res) {
  const { productURL, targetAudience, adCopy, budget, adImage } = req.body;

  if (!productURL || !targetAudience || !adCopy || !budget) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const campaign = {
    id: Date.now(),
    userEmail: "demo@user.com",
    productURL,
    targetAudience,
    adCopy,
    budget,
    adImage,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  fakeDB.push(campaign);
  return res.status(200).json({ status: "success", campaign });
}