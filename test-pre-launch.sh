#!/bin/bash

# The Purple Wings - Pre-Launch Testing Script
# Run this script to verify all critical functionality before launch

echo "🧪 The Purple Wings - Pre-Launch Testing"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SITE_URL="${1:-https://www.thepurplewings.org}"
echo "Testing site: $SITE_URL"
echo ""

# Test 1: Homepage loads
echo -n "1. Testing homepage... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

# Test 2: Sitemap accessible
echo -n "2. Testing sitemap.xml... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/sitemap.xml" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

# Test 3: Robots.txt accessible
echo -n "3. Testing robots.txt... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/robots.txt" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

# Test 4: Manifest accessible
echo -n "4. Testing manifest.json... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/manifest.json" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

# Test 5: PWA icons
echo -n "5. Testing PWA icon-192.png... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/icon-192.png" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "6. Testing PWA icon-512.png... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/icon-512.png" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

# Test 7: Key pages load
echo -n "7. Testing /courses page... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/courses" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "8. Testing /blog page... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/blog" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "9. Testing /about page... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/about" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "10. Testing /contact page... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/contact" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "11. Testing /terms page... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/terms" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "12. Testing /privacy page... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/privacy" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

# Test 13: Curriculum pages
echo -n "13. Testing women's literacy curriculum... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/learn/womens-financial-literacy" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo -n "14. Testing FINRA curriculum... "
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/learn/finra-40-hour" | grep -q "200"; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC}"
fi

echo ""
echo "========================================"
echo "📊 Testing Summary"
echo "========================================"
echo ""
echo -e "${YELLOW}Manual Tests Required:${NC}"
echo "  □ Sign up new account"
echo "  □ Complete a lesson"
echo "  □ Take a quiz"
echo "  □ Subscribe to newsletter"
echo "  □ Submit contact form"
echo "  □ Test on mobile device"
echo "  □ Test dark mode toggle"
echo "  □ Test cookie consent banner"
echo ""
echo -e "${YELLOW}Analytics Verification:${NC}"
echo "  □ Check Google Analytics is receiving events"
echo "  □ Verify GA4 dashboard shows data"
echo ""
echo -e "${YELLOW}SEO Submission:${NC}"
echo "  □ Submit sitemap to Google Search Console"
echo "  □ Submit sitemap to Bing Webmaster Tools"
echo "  □ Verify social media meta tags"
echo ""
echo "🚀 Ready for launch!"
