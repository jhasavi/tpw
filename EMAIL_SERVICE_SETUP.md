# Email Service Setup - Resend.com Integration

## Priority #3: Email Service Implementation

Setting up professional email service for:
- Contact form submissions
- Newsletter subscriptions
- Welcome emails for new users
- Course completion certificates
- Blog post notifications

## Step 1: Resend.com Account Setup

### Action Required (User)
1. **Sign up for Resend.com**:
   - Go to https://resend.com/signup
   - Sign up with your email
   - Verify your email address
   - Get your API key from dashboard

2. **Domain Verification**:
   - Add `thepurplewings.org` domain in Resend dashboard
   - Copy DNS records (SPF, DKIM, DMARC)
   - Add these records to your domain DNS settings
   - Wait for verification (can take up to 48 hours)

3. **Get API Key**:
   - Navigate to API Keys in Resend dashboard
   - Create new API key
   - Copy the key (it won't be shown again)
   - Add to Vercel environment variables:
     ```
     RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
     ```

## Step 2: Install Resend Package

```bash
npm install resend
```

## Step 3: Email Templates

### Templates to Create:

1. **Contact Form Submission**
   - Notifies admin of new contact request
   - Auto-reply to user confirming receipt

2. **Newsletter Welcome Email**
   - Welcome new newsletter subscribers
   - Set expectations for frequency
   - Link to manage preferences

3. **User Registration Welcome**
   - Welcome new platform users
   - Getting started guide
   - Links to popular courses

4. **Course Completion**
   - Congratulations on completing course
   - Certificate of completion (PDF)
   - Next recommended courses

5. **Blog Post Notification**
   - New blog post published
   - Excerpt and read more link
   - Unsubscribe option

## Step 4: Implementation Plan

### API Routes to Create:

1. `/api/email/contact` - Send contact form emails
2. `/api/email/newsletter-welcome` - Welcome new subscribers
3. `/api/email/user-welcome` - Welcome new users
4. `/api/email/course-complete` - Send completion certificate
5. `/api/email/blog-notification` - Notify about new posts

### Email Service Utility

Create `src/lib/email.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: ContactFormData) {
  // Implementation
}

export async function sendNewsletterWelcome(email: string) {
  // Implementation
}

export async function sendUserWelcome(user: User) {
  // Implementation
}

export async function sendCourseCompletion(user: User, course: Course) {
  // Implementation
}

export async function sendBlogNotification(subscribers: string[], post: BlogPost) {
  // Implementation
}
```

## Benefits of Resend.com

1. **Developer-Friendly**: 
   - Simple API
   - TypeScript support
   - React email templates

2. **Deliverability**:
   - High inbox placement rate
   - Automatic bounce handling
   - Spam score checking

3. **Analytics**:
   - Track opens and clicks
   - Delivery status
   - Bounce rates

4. **Pricing**:
   - Free tier: 3,000 emails/month
   - $20/month: 50,000 emails
   - $80/month: 100,000 emails

## Next Steps After User Setup

Once you've completed Step 1 (signup and API key), I will:

1. Install Resend package
2. Create email templates
3. Build email service utilities
4. Integrate with contact form
5. Integrate with newsletter signup
6. Set up welcome emails for new users
7. Test all email flows
8. Document email templates

## Current Status

⏸️ **Waiting for User Action**:
- [ ] Sign up for Resend.com account
- [ ] Get API key
- [ ] Add RESEND_API_KEY to Vercel environment variables
- [ ] (Optional) Verify domain for professional emails

Once you've done this, let me know and I'll continue with the implementation!

---

**Note**: Email functionality will work immediately with the free tier. Domain verification is optional but recommended for better deliverability and to send from `hello@thepurplewings.org` instead of `onboarding@resend.dev`.
