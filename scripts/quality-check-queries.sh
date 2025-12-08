#!/bin/bash

# Comprehensive Quality Check Script - The Purple Wings
# Generates SQL queries to identify lessons with issues

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}     COMPREHENSIVE QUALITY CHECK - THE PURPLE WINGS${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}\n"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Error: .env.local not found${NC}"
    echo -e "${YELLOW}   Please ensure .env.local exists with Supabase credentials${NC}"
    exit 1
fi

# Generate SQL queries
echo -e "${YELLOW}📋 Generated SQL Queries:${NC}\n"

# Query 1: Lessons with no/empty content (Coming Soon)
echo -e "${BLUE}═══ Query 1: Lessons with 'Coming Soon' (No Content) ═══${NC}"
cat << 'EOF'
SELECT 
  l.id,
  l.title,
  l.slug,
  c.title as course_title,
  c.slug as course_slug,
  curr.slug as curriculum_slug,
  CASE 
    WHEN l.content IS NULL THEN 'NULL content'
    WHEN l.content = 'null'::jsonb THEN 'JSON null'
    WHEN (l.content->>'introduction' IS NULL OR l.content->>'introduction' = '') 
         AND (l.content->>'sections' IS NULL OR jsonb_array_length(l.content->'sections') = 0)
         AND (l.content->>'markdown' IS NULL OR l.content->>'markdown' = '') 
      THEN 'No content fields'
    ELSE 'Has content'
  END as status,
  l.created_at
FROM lessons l
JOIN courses c ON l.course_id = c.id
JOIN curricula curr ON c.curriculum_id = curr.id
WHERE 
  l.content IS NULL 
  OR l.content = 'null'::jsonb
  OR (
    (COALESCE(l.content->>'introduction', '') = '')
    AND (COALESCE(jsonb_array_length(l.content->'sections'), 0) = 0)
    AND (COALESCE(l.content->>'markdown', '') = '')
  )
ORDER BY c.title, l.title;
EOF

echo -e "\n"

# Query 2: Courses with no lessons
echo -e "${BLUE}═══ Query 2: Courses with No Lessons ═══${NC}"
cat << 'EOF'
SELECT 
  c.id,
  c.title,
  c.slug,
  curr.title as curriculum_title,
  curr.slug as curriculum_slug,
  COUNT(l.id) as lesson_count
FROM courses c
JOIN curricula curr ON c.curriculum_id = curr.id
LEFT JOIN lessons l ON c.id = l.course_id
GROUP BY c.id, c.title, c.slug, curr.id, curr.title, curr.slug
HAVING COUNT(l.id) = 0
ORDER BY curr.title, c.title;
EOF

echo -e "\n"

# Query 3: All lessons with content status
echo -e "${BLUE}═══ Query 3: All Lessons with Content Status ═══${NC}"
cat << 'EOF'
SELECT 
  COUNT(*) as total_lessons,
  SUM(CASE WHEN l.content IS NULL THEN 1 ELSE 0 END) as null_content,
  SUM(CASE WHEN l.content IS NOT NULL 
           AND (COALESCE(l.content->>'introduction', '') = '')
           AND (COALESCE(jsonb_array_length(l.content->'sections'), 0) = 0)
           AND (COALESCE(l.content->>'markdown', '') = '')
      THEN 1 ELSE 0 END) as empty_content,
  SUM(CASE WHEN l.content IS NOT NULL 
           AND (
             (COALESCE(l.content->>'introduction', '') != '')
             OR (COALESCE(jsonb_array_length(l.content->'sections'), 0) > 0)
             OR (COALESCE(l.content->>'markdown', '') != '')
           )
      THEN 1 ELSE 0 END) as has_content
FROM lessons l;
EOF

echo -e "\n"

# Query 4: Summary by course
echo -e "${BLUE}═══ Query 4: Content Status by Course ═══${NC}"
cat << 'EOF'
SELECT 
  c.title as course_title,
  c.slug as course_slug,
  COUNT(l.id) as total_lessons,
  SUM(CASE WHEN l.content IS NULL 
           OR l.content = 'null'::jsonb 
           OR (
             (COALESCE(l.content->>'introduction', '') = '')
             AND (COALESCE(jsonb_array_length(l.content->'sections'), 0) = 0)
             AND (COALESCE(l.content->>'markdown', '') = '')
           )
      THEN 1 ELSE 0 END) as missing_content_count,
  SUM(CASE WHEN l.content IS NOT NULL 
           AND l.content != 'null'::jsonb
           AND (
             (COALESCE(l.content->>'introduction', '') != '')
             OR (COALESCE(jsonb_array_length(l.content->'sections'), 0) > 0)
             OR (COALESCE(l.content->>'markdown', '') != '')
           )
      THEN 1 ELSE 0 END) as complete_lessons
FROM courses c
LEFT JOIN lessons l ON c.id = l.course_id
GROUP BY c.id, c.title, c.slug
ORDER BY c.title;
EOF

echo -e "\n"

# Query 5: Lessons with malformed content
echo -e "${BLUE}═══ Query 5: Lessons with Potentially Malformed Content ═══${NC}"
cat << 'EOF'
SELECT 
  l.id,
  l.title,
  l.slug,
  c.title as course_title,
  c.slug as course_slug,
  CASE 
    WHEN l.content::text LIKE '%\x00%' THEN 'Contains null bytes'
    WHEN jsonb_typeof(l.content->'sections') != 'array' THEN 'sections is not array'
    WHEN jsonb_typeof(l.content->'keyTakeaways') != 'array' THEN 'keyTakeaways is not array'
    ELSE 'Potentially malformed'
  END as issue
FROM lessons l
JOIN courses c ON l.course_id = c.id
WHERE l.content IS NOT NULL
  AND (
    l.content::text LIKE '%\x00%'
    OR (l.content ? 'sections' AND jsonb_typeof(l.content->'sections') != 'array')
    OR (l.content ? 'keyTakeaways' AND jsonb_typeof(l.content->'keyTakeaways') != 'array')
  )
ORDER BY c.title, l.title;
EOF

echo -e "\n${CYAN}════════════════════════════════════════════════════════════════${NC}\n"

echo -e "${YELLOW}📝 To run these queries:${NC}"
echo -e "   1. Open Supabase dashboard"
echo -e "   2. Go to SQL Editor"
echo -e "   3. Copy and paste each query above"
echo -e "   4. Review results to identify issues\n"

echo -e "${YELLOW}📌 Quick Check - Run this in your terminal:${NC}"
echo -e "   npx ts-node scripts/comprehensive-quality-check.ts\n"

echo -e "${YELLOW}💡 What the queries check:${NC}"
echo -e "   ${BLUE}Query 1${NC}: Lessons showing 'Coming Soon' (no content)"
echo -e "   ${BLUE}Query 2${NC}: Empty courses with no lessons"
echo -e "   ${BLUE}Query 3${NC}: Overall content coverage statistics"
echo -e "   ${BLUE}Query 4${NC}: Breakdown by course"
echo -e "   ${BLUE}Query 5${NC}: Malformed/corrupt lesson content\n"

echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}\n"
