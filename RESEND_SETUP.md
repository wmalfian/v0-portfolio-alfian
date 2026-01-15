# Resend Email Setup Guide

This portfolio uses Resend for sending contact form emails. Resend is a modern email API that works great in serverless environments.

## Setup Instructions

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key
1. Go to your Resend dashboard
2. Navigate to "API Keys"
3. Click "Create API Key"
4. Copy the API key (it starts with `re_`)

### 3. Add Environment Variable

#### For Local Development:
Add to your `.env.local` file:
\`\`\`
RESEND_API_KEY=re_your_api_key_here
\`\`\`

#### For Production (Vercel):
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `RESEND_API_KEY` with your API key value
4. Redeploy your application

### 4. Verify Domain (Optional but Recommended)

For production use, you should verify your domain:
1. Go to Resend dashboard → Domains
2. Click "Add Domain"
3. Follow the DNS setup instructions
4. Once verified, update the `from` field in `app/api/contact/route.tsx` from `onboarding@resend.dev` to `contact@yourdomain.com`

## Features

- Simple REST API (no DNS lookup issues)
- Works in all serverless environments
- Free tier: 100 emails/day, 3,000/month
- Automatic fallback to mailto if not configured
- Email delivery tracking and analytics

## Testing

Test your setup by filling out the contact form on your portfolio. You should receive an email at wmalfian@gmail.com within seconds.

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify RESEND_API_KEY is correctly set
- Check Resend dashboard for delivery logs
- Ensure you're within the free tier limits

**Still not working?**
- The form will automatically open your email client as a fallback
- Check browser console for error messages
