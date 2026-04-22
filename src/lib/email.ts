import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'The Purple Wings <noreply@updates.namastebostonhomes.com>'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@thepurplewings.org'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface NewsletterSubscriber {
  email: string
  name?: string
}

interface UserWelcomeData {
  email: string
  name: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Reply directly to this email to respond to ${data.name}.
          </p>
        </div>
      `,
      replyTo: data.email,
    })

    // Send auto-reply to user
    const autoReply = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'We received your message - The Purple Wings',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">The Purple Wings</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0;">Financial Literacy & Empowerment</p>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #7c3aed; margin-top: 0;">Thank You for Reaching Out!</h2>
            <p style="color: #374151; line-height: 1.6;">
              Hi ${data.name},
            </p>
            <p style="color: #374151; line-height: 1.6;">
              We've received your message and appreciate you taking the time to contact us. 
              Our team will review your inquiry and get back to you within 24-48 hours.
            </p>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;"><strong>Your message:</strong></p>
              <p style="color: #374151; margin: 10px 0 0 0;">${data.message}</p>
            </div>
            <p style="color: #374151; line-height: 1.6;">
              In the meantime, feel free to explore our:
            </p>
            <ul style="color: #374151; line-height: 1.8;">
              <li><a href="https://www.thepurplewings.org/courses" style="color: #7c3aed; text-decoration: none;">Free Financial Literacy Courses</a></li>
              <li><a href="https://www.thepurplewings.org/blog" style="color: #7c3aed; text-decoration: none;">Educational Blog Articles</a></li>
              <li><a href="https://www.thepurplewings.org/quiz" style="color: #7c3aed; text-decoration: none;">Financial Knowledge Quiz</a></li>
            </ul>
            <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong style="color: #7c3aed;">The Purple Wings Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    return { success: true, adminEmail, autoReply }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return { success: false, error }
  }
}

export async function sendNewsletterWelcome(subscriber: NewsletterSubscriber) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: subscriber.email,
      subject: 'Welcome to The Purple Wings Newsletter! 💜',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">💜 Welcome!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 18px;">You're now part of The Purple Wings community</p>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6; font-size: 16px;">
              ${subscriber.name ? `Hi ${subscriber.name},` : 'Hi there,'}
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for subscribing to The Purple Wings newsletter! You've taken an important 
              step toward financial empowerment and independence.
            </p>
            <h2 style="color: #7c3aed; margin-top: 30px;">What to Expect</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>Weekly Financial Tips</strong> - Practical advice you can use immediately</li>
                <li><strong>New Course Announcements</strong> - Be the first to know about free courses</li>
                <li><strong>Exclusive Content</strong> - Subscriber-only articles and resources</li>
                <li><strong>Success Stories</strong> - Inspiration from women achieving financial independence</li>
              </ul>
            </div>
            <h2 style="color: #7c3aed; margin-top: 30px;">Get Started Today</h2>
            <p style="color: #374151; line-height: 1.6;">
              While you're here, check out these popular resources:
            </p>
            <div style="margin: 20px 0;">
              <a href="https://www.thepurplewings.org/courses" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Start Learning
              </a>
              <a href="https://www.thepurplewings.org/blog" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Read Blog
              </a>
              <a href="https://www.thepurplewings.org/quiz" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Take Quiz
              </a>
            </div>
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                We respect your privacy and will never share your email. You can unsubscribe at any time.
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                With gratitude,<br>
                <strong style="color: #7c3aed;">The Purple Wings Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending newsletter welcome:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending newsletter welcome:', error)
    return { success: false, error }
  }
}

export async function sendUserWelcome(user: UserWelcomeData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: 'Welcome to The Purple Wings - Start Your Financial Journey! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Welcome to The Purple Wings!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 18px;">Your journey to financial independence starts now</p>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6; font-size: 16px;">
              Hi ${user.name},
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Congratulations on taking the first step toward financial empowerment! We're thrilled 
              to have you join our community of women building financial independence.
            </p>
            <h2 style="color: #7c3aed; margin-top: 30px;">Getting Started</h2>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <ol style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>Complete Your Profile</strong> - Tell us about your financial goals</li>
                <li><strong>Take the Assessment Quiz</strong> - Discover your financial literacy level</li>
                <li><strong>Start Your First Course</strong> - Begin with Financial Literacy Basics</li>
                <li><strong>Join the Community</strong> - Connect with other women on the same journey</li>
              </ol>
            </div>
            <h2 style="color: #7c3aed; margin-top: 30px;">Recommended First Steps</h2>
            <div style="margin: 20px 0;">
              <a href="https://www.thepurplewings.org/dashboard" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: bold;">
                Go to Dashboard
              </a>
              <a href="https://www.thepurplewings.org/quiz/personality" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Take Assessment
              </a>
              <a href="https://www.thepurplewings.org/learn/beginner/financial-literacy-basics/introduction" style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Start Learning
              </a>
            </div>
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 4px;">
              <p style="color: #92400e; margin: 0; font-weight: bold;">💡 Pro Tip</p>
              <p style="color: #92400e; margin: 10px 0 0 0;">
                Set aside just 15 minutes a day for learning. Small, consistent steps lead to big changes!
              </p>
            </div>
            <h2 style="color: #7c3aed; margin-top: 30px;">Need Help?</h2>
            <p style="color: #374151; line-height: 1.6;">
              We're here to support you every step of the way:
            </p>
            <ul style="color: #374151; line-height: 1.8;">
              <li>Browse our <a href="https://www.thepurplewings.org/faq" style="color: #7c3aed;">FAQ</a></li>
              <li>Read our <a href="https://www.thepurplewings.org/blog" style="color: #7c3aed;">Blog</a> for tips and inspiration</li>
              <li>Contact us at <a href="mailto:${CONTACT_EMAIL}" style="color: #7c3aed;">${CONTACT_EMAIL}</a></li>
            </ul>
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                You're now part of a community of women taking control of their financial futures. 
                We can't wait to see what you accomplish!
              </p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                Here's to your success,<br>
                <strong style="color: #7c3aed;">The Purple Wings Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending user welcome:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending user welcome:', error)
    return { success: false, error }
  }
}

export async function sendCourseCompletion(user: { email: string; name: string }, course: { title: string; curriculum: string; slug?: string }) {
  try {
    const certificateUrl = course.slug
      ? `https://www.thepurplewings.org/certificate/${course.slug}`
      : `https://www.thepurplewings.org/dashboard`
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `🎓 Congratulations! You completed ${course.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Congratulations!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0; font-size: 18px;">You've completed a course!</p>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6; font-size: 16px;">
              Hi ${user.name},
            </p>
            <p style="color: #374151; line-height: 1.6;">
              Amazing work! You've successfully completed <strong>${course.title}</strong>. 
              This is a significant milestone in your financial education journey.
            </p>
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 30px; border-radius: 8px; margin: 30px 0; text-align: center;">
              <h2 style="color: white; margin: 0 0 10px 0;">Certificate of Completion</h2>
              <p style="color: #e9d5ff; margin: 0; font-size: 24px; font-weight: bold;">${course.title}</p>
              <p style="color: #e9d5ff; margin: 10px 0 0 0;">Curriculum: ${course.curriculum}</p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3);">
                <p style="color: white; margin: 0;">${user.name}</p>
                <p style="color: #e9d5ff; margin: 5px 0 0 0; font-size: 14px;">Completed on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div style="margin: 24px 0; text-align: center;">
              <a href="${certificateUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                View &amp; Print Certificate →
              </a>
            </div>
            <h2 style="color: #7c3aed; margin-top: 30px;">What's Next?</h2>
            <p style="color: #374151; line-height: 1.6;">
              Keep the momentum going! Here are some recommended next steps:
            </p>
            <ul style="color: #374151; line-height: 1.8;">
              <li>Download or print your certificate and share it on LinkedIn</li>
              <li>Explore the next course in the curriculum</li>
              <li>Take a quiz to reinforce what you've learned</li>
              <li>Apply what you've learned to your real financial goals</li>
            </ul>
            <div style="margin: 30px 0;">
              <a href="https://www.thepurplewings.org/dashboard" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                View Dashboard
              </a>
              <a href="https://www.thepurplewings.org/courses" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px;">
                Browse Courses
              </a>
            </div>
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Proud of your progress,<br>
                <strong style="color: #7c3aed;">The Purple Wings Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending course completion:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending course completion:', error)
    return { success: false, error }
  }
}

// ─── Drip sequence ─────────────────────────────────────────────────────────

/**
 * Day 3 drip: Nudge user to start their first lesson
 */
export async function sendDripDay3(user: UserWelcomeData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `${user.name.split(' ')[0]}, your financial journey is waiting 💜`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-size: 48px;">📚</div>
            <h1 style="color: white; margin: 10px 0 0 0; font-size: 26px;">Ready to Start?</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6; font-size: 16px;">
              Hi ${user.name.split(' ')[0]},
            </p>
            <p style="color: #374151; line-height: 1.6;">
              You signed up 3 days ago — and we want to make sure you get the most out of your membership.
              The #1 thing that separates women who improve their finances from those who don't? 
              <strong>Starting.</strong>
            </p>
            <div style="background: #f3f4f6; border-left: 4px solid #7c3aed; padding: 20px; border-radius: 4px; margin: 24px 0;">
              <p style="color: #374151; margin: 0; font-weight: bold;">🎯 Suggested first lesson:</p>
              <p style="color: #374151; margin: 8px 0 0 0;">
                <strong>Financial Literacy Basics → Understanding Money & Banking</strong><br/>
                <span style="color: #6b7280; font-size: 14px;">30 minutes · Beginner · No math required</span>
              </p>
            </div>
            <p style="color: #374151; line-height: 1.6;">
              Just 30 minutes today can change how you think about money forever.
            </p>
            <div style="margin: 28px 0; text-align: center;">
              <a href="https://www.thepurplewings.org/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking"
                 style="display: inline-block; background: #7c3aed; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Start My First Lesson →
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              All courses are free. No credit card ever needed.<br/>
              — Shalini &amp; The Purple Wings Team
            </p>
          </div>
        </div>
      `,
    })
    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Error sending day-3 drip:', error)
    return { success: false, error }
  }
}

/**
 * Day 7 drip: Share what successful learners do; nudge quiz
 */
export async function sendDripDay7(user: UserWelcomeData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `What women who master money have in common 🌟`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-size: 48px;">🌟</div>
            <h1 style="color: white; margin: 10px 0 0 0; font-size: 26px;">One Week In!</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6; font-size: 16px;">Hi ${user.name.split(' ')[0]},</p>
            <p style="color: #374151; line-height: 1.6;">
              You've been part of The Purple Wings community for a week. Here's something 
              we've noticed about women who make real financial progress:
            </p>
            <div style="margin: 24px 0;">
              ${[
                ['📍', 'They know <strong>exactly where they stand</strong> — not a guess, an assessment.'],
                ['⏱️', 'They spend <strong>15 minutes a day</strong>, not hours on weekends.'],
                ['🎯', 'They focus on <strong>one goal at a time</strong> — not everything at once.'],
                ['🤝', 'They learn with a <strong>community</strong> — not alone.'],
              ].map(([icon, text]) => `
                <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                  <span style="font-size: 20px; flex-shrink: 0;">${icon}</span>
                  <p style="color: #374151; margin: 0; line-height: 1.5;">${text}</p>
                </div>
              `).join('')}
            </div>
            <p style="color: #374151; line-height: 1.6;">
              Not sure where you stand? Take our 15-question Financial Assessment. It takes 5 minutes 
              and tells you exactly which areas to focus on first.
            </p>
            <div style="margin: 28px 0; text-align: center;">
              <a href="https://www.thepurplewings.org/quiz/personality"
                 style="display: inline-block; background: #7c3aed; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Take My Free Assessment →
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              — Shalini &amp; The Purple Wings Team<br/>
              <a href="https://www.thepurplewings.org/newsletter/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    })
    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Error sending day-7 drip:', error)
    return { success: false, error }
  }
}

/**
 * Day 14 drip: Progress check + course recommendation based on goals
 */
export async function sendDripDay14(user: UserWelcomeData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: user.email,
      subject: `2 weeks down — here's your personalized learning path 🗺️`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-size: 48px;">🗺️</div>
            <h1 style="color: white; margin: 10px 0 0 0; font-size: 26px;">Your Learning Path</h1>
          </div>
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #374151; line-height: 1.6; font-size: 16px;">Hi ${user.name.split(' ')[0]},</p>
            <p style="color: #374151; line-height: 1.6;">
              Two weeks! Whether you've completed a course or just logged in once, we're glad you're here. 
              Here's the full learning path most of our members follow:
            </p>
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
              ${[
                ['1', 'Financial Literacy Basics', '5 lessons · Foundation', '/learn/womens-financial-literacy/financial-literacy-basics/understanding-money-banking'],
                ['2', 'Budgeting Basics', '5 lessons · Control your spending', '/learn/womens-financial-literacy/budgeting-basics/budgeting-basics-intro'],
                ['3', 'Emergency Planning', '4 lessons · Build your safety net', '/courses'],
                ['4', 'Credit Management', '6 lessons · Own your credit score', '/courses'],
                ['5', 'Investing Fundamentals', '5 lessons · Make money work for you', '/courses'],
              ].map(([num, title, desc, url]) => `
                <div style="display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <div style="width: 32px; height: 32px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: white; font-weight: bold; font-size: 14px;">${num}</span>
                  </div>
                  <div style="flex: 1;">
                    <a href="https://www.thepurplewings.org${url}" style="color: #7c3aed; font-weight: bold; text-decoration: none;">${title}</a>
                    <p style="color: #6b7280; font-size: 13px; margin: 2px 0 0 0;">${desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <p style="color: #374151; line-height: 1.6;">
              Also — our next <strong>free in-person workshop is coming April 2026</strong> in Needham, MA. 
              <a href="https://www.thepurplewings.org/events" style="color: #7c3aed;">Get notified when registration opens →</a>
            </p>
            <div style="margin: 28px 0; text-align: center;">
              <a href="https://www.thepurplewings.org/dashboard"
                 style="display: inline-block; background: #7c3aed; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                View My Dashboard →
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
              — Shalini &amp; The Purple Wings Team<br/>
              <a href="https://www.thepurplewings.org/newsletter/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    })
    if (error) return { success: false, error }
    return { success: true, data }
  } catch (error) {
    console.error('Error sending day-14 drip:', error)
    return { success: false, error }
  }
}

export async function sendBlogNotification(subscribers: string[], post: { title: string; excerpt: string; slug: string; category: string }) {
  try {
    const emailPromises = subscribers.map(email =>
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `New Article: ${post.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">📖 New on The Purple Wings Blog</h1>
            </div>
            <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <span style="background: #7c3aed; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                ${post.category}
              </span>
              <h2 style="color: #1f2937; margin: 20px 0;">${post.title}</h2>
              <p style="color: #374151; line-height: 1.6;">
                ${post.excerpt}
              </p>
              <div style="margin: 30px 0;">
                <a href="https://www.thepurplewings.org/blog/${post.slug}" style="display: inline-block; background: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Read Full Article →
                </a>
              </div>
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                  You're receiving this because you subscribed to The Purple Wings newsletter.
                  <a href="https://www.thepurplewings.org/newsletter/unsubscribe" style="color: #7c3aed;">Unsubscribe</a>
                </p>
              </div>
            </div>
          </div>
        `,
      })
    )

    const results = await Promise.allSettled(emailPromises)
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    return { success: true, sent: successful, failed }
  } catch (error) {
    console.error('Error sending blog notifications:', error)
    return { success: false, error }
  }
}
