#!/bin/bash

# Security Warnings Fix Script
# This script will copy the SQL migration to your clipboard
# so you can paste it into Supabase SQL Editor

set -e

echo "========================================="
echo "Supabase Security Warnings Fix"
echo "========================================="
echo ""

SQL_FILE="database/migrations/fix_security_warnings_v2.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Error: Migration file not found: $SQL_FILE"
    exit 1
fi

echo "📋 Copying SQL migration to clipboard..."

# Try different clipboard commands based on OS
if command -v pbcopy &> /dev/null; then
    # macOS
    cat "$SQL_FILE" | pbcopy
    echo "✅ Migration copied to clipboard!"
elif command -v xclip &> /dev/null; then
    # Linux with xclip
    cat "$SQL_FILE" | xclip -selection clipboard
    echo "✅ Migration copied to clipboard!"
elif command -v xsel &> /dev/null; then
    # Linux with xsel
    cat "$SQL_FILE" | xsel --clipboard
    echo "✅ Migration copied to clipboard!"
else
    echo "⚠️  Could not find clipboard utility."
    echo "Please manually copy the contents of: $SQL_FILE"
fi

echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo "1. Open Supabase Dashboard: https://supabase.com/dashboard"
echo "2. Go to SQL Editor"
echo "3. Create a new query"
echo "4. Paste (Cmd+V / Ctrl+V) the migration"
echo "5. Click 'Run'"
echo ""
echo "See SECURITY_FIX_INSTRUCTIONS.md for details"
echo "========================================="
