#!/bin/bash
# Run all quiz generation scripts with proper environment

export NEXT_PUBLIC_SUPABASE_URL="https://ckdshqbrxctjadljjhhy.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZHNocWJyeGN0amFkbGpqaGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2MjA3MywiZXhwIjoyMDY5MDM4MDczfQ.S6JWaRsp77mUs1SgjYQrN4Y1efNsBvn_n-V8lbnaB6Y"

echo "🚀 Quiz Question Generation - Categories 5-9"
echo "============================================"
echo ""

# Check current status
echo "📊 Current Question Counts:"
PGPASSWORD='T3ra-ghar25' psql -h db.ckdshqbrxctjadljjhhy.supabase.co -U postgres -d postgres -p 5432 -c "SELECT category_id, COUNT(*) as count FROM quiz_questions GROUP BY category_id ORDER BY category_id;"
echo ""

echo "📝 Generating questions for remaining categories..."
echo ""

# Category 5: Investing
echo "▶️  Category 5: Investing Basics"
npx tsx scripts/generate-category-5-investing.ts
echo ""

# Category 6: Retirement  
echo "▶️  Category 6: Retirement Planning"
npx tsx scripts/generate-category-6-retirement.ts
echo ""

# Category 7: Insurance
echo "▶️  Category 7: Insurance"
npx tsx scripts/generate-category-7-insurance.ts
echo ""

# Category 8: Taxes
echo "▶️  Category 8: Taxes"
npx tsx scripts/generate-category-8-taxes.ts
echo ""

# Category 9: Real Estate
echo "▶️  Category 9: Real Estate & Mortgages"
npx tsx scripts/generate-category-9-real-estate.ts
echo ""

echo "✅ Generation Complete!"
echo ""
echo "📊 Final Question Counts:"
PGPASSWORD='T3ra-ghar25' psql -h db.ckdshqbrxctjadljjhhy.supabase.co -U postgres -d postgres -p 5432 -c "SELECT category_id, COUNT(*) as count FROM quiz_questions GROUP BY category_id ORDER BY category_id;"
echo ""

echo "📈 Total Progress:"
PGPASSWORD='T3ra-ghar25' psql -h db.ckdshqbrxctjadljjhhy.supabase.co -U postgres -d postgres -p 5432 -c "SELECT COUNT(*) as total, ROUND((COUNT(*) * 100.0 / 1050), 1) as percent_complete FROM quiz_questions;"

