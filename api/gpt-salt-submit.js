import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone, contact_method, insurance_type, additional_info } = req.body;

  if (!first_name || !last_name || !email || !phone || !contact_method || !insurance_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Submit directly to SALT form (this will be called by GPT Action from US-based servers)
    const saltURL = "https://insuranceform.app/l/irm-insurance-quot/Li_rVkxO0ozaY";
    
    const saltResponse = await axios.post(saltURL, {
      first_name,
      last_name,
      email,
      phone,
      contact_method,
      insurance_type,
      additional_info
    });

    console.log("SALT form submission successful:", {
      first_name,
      last_name,
      email,
      timestamp: new Date().toISOString(),
      salt_status: saltResponse.status
    });

    res.status(200).json({
      success: true,
      message: "Quote successfully submitted to IRM Insurance SALT form!",
      salt_response: {
        status: saltResponse.status,
        statusText: saltResponse.statusText
      },
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
    console.error("Error submitting to SALT form:", error);
    
    // Log the data even if SALT submission fails
    console.log("Quote data (SALT submission failed):", {
      first_name,
      last_name,
      email,
      phone,
      contact_method,
      insurance_type,
      additional_info,
      timestamp: new Date().toISOString(),
      error: error.message
    });

    res.status(500).json({
      success: false,
      message: "Error submitting to SALT form, but data has been logged.",
      details: error.message,
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
  }
}

