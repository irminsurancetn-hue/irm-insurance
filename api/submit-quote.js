export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone, contact_method, insurance_type, additional_info } = req.body;

  if (!first_name || !last_name || !email || !phone || !contact_method || !insurance_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Log the quote data (SALT form submission is handled by GPT Action)
    console.log("Quote received:", {
      first_name,
      last_name,
      email,
      phone,
      contact_method,
      insurance_type,
      additional_info,
      timestamp: new Date().toISOString(),
      source: "API"
    });

    res.status(200).json({
      success: true,
      message: "Quote received successfully! Data logged for processing.",
      data: {
        first_name,
        last_name,
        email,
        phone,
        contact_method,
        insurance_type,
        additional_info
      }
    });
  } catch (error) {
    console.error("Error processing quote:", error);
    res.status(500).json({
      success: false,
      message: "Error processing quote.",
      details: error.message
    });
  }
}
