#!/bin/bash

# Load environment
source .env.local 2>/dev/null || {
  echo "Error: .env.local not found"
  exit 1
}

# Query all lessons with their course and curriculum info
psql "$DATABASE_URL" << 'SQL' 2>/dev/null || echo "Using curl fallback..."

SELECT 
  curr.title as curriculum,
  c.title as course,
  l.title as lesson,
  l.slug,
  l.duration_minutes,
  CASE 
    WHEN l.content IS NULL THEN 'NO CONTENT'
    WHEN l.content::text = 'null' THEN 'NULL JSON'
    WHEN l.content->>'introduction' IS NOT NULL THEN 'HAS INTRO'
    WHEN l.content->'sections' IS NOT NULL THEN 'HAS SECTIONS'
    WHEN l.content->>'markdown' IS NOT NULL THEN 'HAS MARKDOWN'
    ELSE 'EMPTY'
  END as content_status
FROM lessons l
JOIN courses c ON l.course_id = c.id
JOIN curricula curr ON c.curriculum_id = curr.id
ORDER BY curr.title, c.display_order, l.display_order;

SQL

