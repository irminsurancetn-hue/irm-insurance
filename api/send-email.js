import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { first_name, last_name, email, phone, contact_method, insurance_type, additional_info } = req.body;

  if (!first_name || !last_name || !email || !phone || !contact_method || !insurance_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // webbdevabdul@gmail.com
        pass: process.env.EMAIL_PASS  // App password
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'webbdevabdul@gmail.com',
      subject: `New Insurance Quote Request - ${first_name} ${last_name}`,
      html: `
        <h2>New Insurance Quote Request</h2>
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>Customer Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${first_name} ${last_name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Contact Method:</strong> ${contact_method}</li>
            <li><strong>Insurance Type:</strong> ${insurance_type}</li>
            ${additional_info ? `<li><strong>Additional Info:</strong> ${additional_info}</li>` : ''}
          </ul>
          
          <h3>Quote Details:</h3>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Source:</strong> GPT Action</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This quote was submitted through the IRM Insurance GPT Action.
          </p>
        </div>
      `,
      text: `
New Insurance Quote Request

Customer Information:
- Name: ${first_name} ${last_name}
- Email: ${email}
- Phone: ${phone}
- Contact Method: ${contact_method}
- Insurance Type: ${insurance_type}
${additional_info ? `- Additional Info: ${additional_info}` : ''}

Quote Details:
- Submitted: ${new Date().toLocaleString()}
- Source: GPT Action

This quote was submitted through the IRM Insurance GPT Action.
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      first_name,
      last_name,
      email,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: "Quote submitted successfully! Email sent to webbdevabdul@gmail.com",
      messageId: info.messageId,
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
    console.error("Error sending email:", error);
    
    // Log the data even if email fails
    console.log("Quote data (email failed):", {
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
      message: "Error sending email, but data has been logged.",
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
