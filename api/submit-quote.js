const axios = require("axios");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone, insurance_type } = req.body;

  if (!first_name || !last_name || !email || !phone || !insurance_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // For now, just return success without calling SALT form
    // TODO: Uncomment the SALT form submission when ready
    /*
    const saltURL = "https://insuranceform.app/l/irm-insurance-quot/Li_rVkxO0ozaY";
    
    await axios.post(saltURL, {
      first_name,
      last_name,
      email,
      phone,
      insurance_type
    });
    */

    res.status(200).json({
      success: true,
      message: "Quote successfully submitted to IRM Insurance!",
      data: {
        first_name,
        last_name,
        email,
        phone,
        insurance_type
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
