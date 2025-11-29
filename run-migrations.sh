#!/bin/bash

# Run database migrations for newsletter, blog, and admin features

echo "🔧 Running database migrations..."
echo ""

# Check if DATABASE_URL is set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ Error: NEXT_PUBLIC_SUPABASE_URL not set in .env.local"
  exit 1
fi

echo "📝 Migration SQL file: database/migrations/add_newsletter_blog.sql"
echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo ""
echo "1. Go to your Supabase project: https://supabase.com/dashboard/project/ckdshqbrxctjadljjhhy"
echo "2. Navigate to: SQL Editor"
echo "3. Click 'New Query'"
echo "4. Copy the content of database/migrations/add_newsletter_blog.sql"
echo "5. Paste and execute"
echo ""
echo "The migration will create:"
echo "  - newsletter_subscribers table"
echo "  - blog_posts table"
echo "  - newsletter_campaigns table"
echo "  - profiles.is_admin column"
echo "  - RLS policies for all tables"
echo ""

read -p "Press Enter once you've completed the migration in Supabase dashboard..."

echo ""
echo "✅ Migration should be complete!"
echo ""
echo "Next steps:"
echo "1. Test newsletter subscription: /newsletter/subscribe"
echo "2. Access admin dashboard: /admin"
echo "3. Check blog page: /blog"
echo ""
