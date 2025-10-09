# IRM Insurance API

A Vercel-based API for handling insurance quote submissions via email.

## Setup

### 1. Email Configuration

You need to set up Gmail SMTP credentials in your Vercel environment variables:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for this application
4. Add these environment variables in Vercel:
   - `EMAIL_USER=webbdevabdul@gmail.com`
   - `EMAIL_PASS=your_generated_app_password`

### 2. API Endpoints

- `POST /api/send-email` - Sends quote data via email
- `POST /api/submit-quote` - Logs quote data (no email)
- `GET /api/test` - Test endpoint

### 3. GPT Action

Use the `openapi.json` file to create a GPT Action that will:
1. Collect quote information from users
2. Send it to `/api/send-email` endpoint
3. Email will be sent to webbdevabdul@gmail.com

## Flow

1. **User** → **GPT** → **Your API** → **Email to webbdevabdul@gmail.com**
2. **Direct API calls** → **Your API** → **Email to webbdevabdul@gmail.com**
