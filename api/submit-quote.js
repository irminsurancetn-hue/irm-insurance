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
    // Try to submit to SALT form
    const saltURL = "https://insuranceform.app/l/irm-insurance-quot/Li_rVkxO0ozaY";
    
    try {
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
    } catch (saltError) {
      // If SALT form is blocked or fails, log the data and return success
      console.log("SALT form submission failed, but data received:", {
        first_name,
        last_name,
        email,
        phone,
        insurance_type,
        error: saltError.message
      });
      
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
  } catch (error) {
    console.error("Error processing quote:", error);
    res.status(500).json({
      success: false,
      message: "Error processing quote.",
      details: error.message
    });
  }
}
