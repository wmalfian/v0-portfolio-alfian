# Email Setup Instructions

To enable the contact form to send emails to s70315@ocean.umt.edu.my, you need to set up the following environment variables:

## Environment Variables

Add these to your Vercel project settings or `.env.local` file:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup Steps

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

3. **Set Environment Variables**:
   - In Vercel: Project Settings → Environment Variables
   - Add `EMAIL_USER` with your Gmail address
   - Add `EMAIL_PASS` with the app password

## Alternative Email Services

If you prefer not to use Gmail, you can modify the transporter in `app/api/contact/route.ts` to use:
- SendGrid
- Mailgun
- AWS SES
- Resend

The contact form will now send all submissions directly to s70315@ocean.umt.edu.my with proper formatting and sender information.
