import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone, insurance_type } = req.body;

  if (!first_name || !last_name || !email || !phone || !insurance_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Submit data to your SALT form
    const saltURL = "https://insuranceform.app/l/irm-insurance-quot/Li_rVkxO0ozaY";
    
    await axios.post(saltURL, {
      first_name,
      last_name,
      email,
      phone,
      insurance_type
    });

    res.status(200).json({
      success: true,
      message: "Quote successfully submitted to IRM Insurance!"
    });
  } catch (error) {
    console.error("Error submitting to SALT:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting quote to SALT form.",
      details: error.message
    });
  }
}
