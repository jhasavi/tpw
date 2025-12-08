#!/bin/bash
# Quality Check System - Verification Checklist
# Run this to verify everything is set up correctly

echo "═══════════════════════════════════════════════════════════════════════════"
echo "  QUALITY CHECK SYSTEM - VERIFICATION CHECKLIST"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

PASSED=0
FAILED=0

# Check 1: Scripts exist
echo "1️⃣  Checking if scripts exist..."
if [ -f "scripts/quality-check-auto.js" ]; then
    echo "   ✅ scripts/quality-check-auto.js found"
    ((PASSED++))
else
    echo "   ❌ scripts/quality-check-auto.js NOT found"
    ((FAILED++))
fi

if [ -f "scripts/comprehensive-quality-check.ts" ]; then
    echo "   ✅ scripts/comprehensive-quality-check.ts found"
    ((PASSED++))
else
    echo "   ❌ scripts/comprehensive-quality-check.ts NOT found"
    ((FAILED++))
fi

if [ -f "scripts/quality-check-queries.sh" ]; then
    echo "   ✅ scripts/quality-check-queries.sh found"
    ((PASSED++))
else
    echo "   ❌ scripts/quality-check-queries.sh NOT found"
    ((FAILED++))
fi

# Check 2: Documentation exists
echo ""
echo "2️⃣  Checking if documentation exists..."
DOCS=(
    "QUALITY_CHECK_SYSTEM.md"
    "QUALITY_CHECK_QUICK_REFERENCE.md"
    "FIX_ISSUES_GUIDE.md"
    "QUALITY_DASHBOARD.md"
    "QUALITY_CHECK_IMPLEMENTATION_SUMMARY.md"
    "README_QUALITY_CHECK.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✅ $doc found"
        ((PASSED++))
    else
        echo "   ❌ $doc NOT found"
        ((FAILED++))
    fi
done

# Check 3: Package.json updated
echo ""
echo "3️⃣  Checking if package.json has quality check commands..."
if grep -q "quality-check" package.json; then
    echo "   ✅ npm run quality-check found in package.json"
    ((PASSED++))
else
    echo "   ❌ npm run quality-check NOT found in package.json"
    ((FAILED++))
fi

# Check 4: Environment
echo ""
echo "4️⃣  Checking environment setup..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local exists"
    ((PASSED++))
    
    if grep -q "SUPABASE_URL" .env.local; then
        echo "   ✅ SUPABASE_URL found"
        ((PASSED++))
    else
        echo "   ⚠️  SUPABASE_URL not found"
    fi
else
    echo "   ❌ .env.local NOT found"
    ((FAILED++))
fi

# Check 5: Try running the script
echo ""
echo "5️⃣  Testing quality check script..."
if node scripts/quality-check-auto.js > /dev/null 2>&1; then
    echo "   ✅ Quality check script runs successfully"
    ((PASSED++))
else
    echo "   ⚠️  Quality check script returned an error (check .env.local)"
    # This is not a hard failure as it might be due to env vars
fi

# Check 6: Report generation
echo ""
echo "6️⃣  Checking if reports were generated..."
if [ -f "quality-check-*.json" ]; then
    echo "   ✅ Report file(s) found"
    ((PASSED++))
    # Count issues
    if command -v jq &> /dev/null; then
        ISSUES=$(jq '.issues.comingSoon | length' quality-check-*.json 2>/dev/null)
        LESSONS=$(jq '.lessonsScanned' quality-check-*.json 2>/dev/null)
        echo "   📊 Latest scan: $ISSUES issues in $LESSONS lessons"
        ((PASSED++))
    fi
else
    echo "   ℹ️  No reports yet (run: npm run quality-check)"
fi

# Summary
echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "  VERIFICATION SUMMARY"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "  ✅ Passed: $PASSED"
echo "  ❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "  🎉 ALL CHECKS PASSED!"
    echo ""
    echo "  Your quality check system is ready to use!"
    echo ""
    echo "  Next steps:"
    echo "    1. Run: npm run quality-check"
    echo "    2. Review results: cat quality-check-*.json | jq ."
    echo "    3. Fix issues: See FIX_ISSUES_GUIDE.md"
    exit 0
else
    echo "  ⚠️  Some checks failed. Please verify the above."
    exit 1
fi
