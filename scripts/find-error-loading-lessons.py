#!/usr/bin/env python3
import os
import json
from supabase import create_client, Client

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Missing environment variables")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def check_lesson_content(lesson):
    try:
        content = lesson.get('content')
        
        if not content or not isinstance(content, dict):
            return False
        
        has_introduction = isinstance(content.get('introduction'), str) and len(content.get('introduction', '').strip()) > 50
        has_sections = isinstance(content.get('sections'), list) and len(content.get('sections', [])) > 0
        has_markdown = isinstance(content.get('markdown'), str) and len(content.get('markdown', '').strip()) > 50
        
        return has_introduction or has_sections or has_markdown
    except:
        return False

def main():
    print('🔍 Scanning all lessons for "Error Loading Lesson" issues...\n')
    
    try:
        response = supabase.table('lessons').select('id, title, slug, content, courses(slug, curricula(slug))').order('title').execute()
        lessons = response.data
        
        if not lessons:
            print('No lessons found')
            return
        
        problem_lessons = []
        healthy_lessons = []
        
        print(f'📚 Total lessons: {len(lessons)}\n')
        
        for lesson in lessons:
            course = lesson.get('courses')
            if not course:
                continue
            
            curriculum = course.get('curricula')
            if not curriculum:
                continue
            
            url = f"/learn/{curriculum['slug']}/{course['slug']}/{lesson['slug']}"
            has_valid_content = check_lesson_content(lesson)
            
            if not has_valid_content:
                problem_lessons.append({
                    'url': url,
                    'title': lesson['title'],
                    'slug': lesson['slug'],
                    'status': '❌ MISSING/INVALID CONTENT'
                })
            else:
                healthy_lessons.append(url)
        
        if problem_lessons:
            print(f'\n⚠️  LESSONS WITH ISSUES ({len(problem_lessons)}):\n')
            for idx, lesson in enumerate(problem_lessons, 1):
                print(f"{idx}. {lesson['status']}")
                print(f"   Title: {lesson['title']}")
                print(f"   URL: https://www.thepurplewings.org{lesson['url']}\n")
        
        print(f'\n✅ HEALTHY LESSONS: {len(healthy_lessons)}')
        print(f'❌ PROBLEM LESSONS: {len(problem_lessons)}')
        print(f'📊 Health: {round((len(healthy_lessons) / len(lessons)) * 100)}%\n')
        
        if problem_lessons:
            print('JSON Export for reference:')
            print(json.dumps(problem_lessons, indent=2))
    
    except Exception as err:
        print(f'Fatal error: {err}')

if __name__ == '__main__':
    main()
