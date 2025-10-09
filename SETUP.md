# Environment Variables Setup

## Required Environment Variables

You need to add these environment variables to your Vercel project:

### 1. EMAIL_USER
```
EMAIL_USER=webbdevabdul@gmail.com
```

### 2. EMAIL_PASS
```
EMAIL_PASS=your_16_character_app_password_here
```

## How to Get Gmail App Password

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Click on "Security" in the left sidebar

2. **Enable 2-Factor Authentication**
   - If not already enabled, turn on 2-Step Verification

3. **Generate App Password**
   - Go to "Security" > "App passwords"
   - Select "Mail" as the app
   - Generate a new password
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

4. **Add to Vercel**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add both variables:
     - `EMAIL_USER` = `webbdevabdul@gmail.com`
     - `EMAIL_PASS` = `your_16_character_app_password`

5. **Redeploy**
   - After adding variables, redeploy your project

## Local Development

Create a `.env` file in your project root:

```bash
# Copy this content to .env file
EMAIL_USER=webbdevabdul@gmail.com
EMAIL_PASS=your_16_character_app_password_here
```

## Testing

Once set up, test the email endpoint:

```bash
curl -X POST https://irm-insurance.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe", 
    "email": "john@example.com",
    "phone": "1234567890",
    "contact_method": "Email",
    "insurance_type": "Auto",
    "additional_info": "Test quote"
  }'
```
