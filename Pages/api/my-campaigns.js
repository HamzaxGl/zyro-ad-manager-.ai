let fakeDB = [];

export default async function handler(req, res) {
  const userEmail = "demo@user.com";
  const campaigns = fakeDB.filter((c) => c.userEmail === userEmail);
  res.status(200).json(campaigns);
}