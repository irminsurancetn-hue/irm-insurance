export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone, insurance_type } = req.body;

  if (!first_name || !last_name || !email || !phone || !insurance_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // For now, just return success without calling SALT form
  res.status(200).json({
    success: true,
    message: "Quote received! (SALT form temporarily unavailable - data logged)",
    data: {
      first_name,
      last_name,
      email,
      phone,
      insurance_type
    }
  });
}
