import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
async function checkLessonContent(lesson) {
    try {
        const content = lesson.content;
        if (!content || typeof content !== 'object') {
            return false;
        }
        // Check if content has required fields
        const hasIntroduction = content.introduction && typeof content.introduction === 'string' && content.introduction.trim().length > 50;
        const hasSections = content.sections && Array.isArray(content.sections) && content.sections.length > 0;
        const hasMarkdown = content.markdown && typeof content.markdown === 'string' && content.markdown.trim().length > 50;
        // If has at least one significant content block, it's properly loaded
        return hasIntroduction || hasSections || hasMarkdown;
    }
    catch (err) {
        return false;
    }
}
async function main() {
    console.log('🔍 Scanning all lessons for "Error Loading Lesson" issues...\n');
    try {
        // Get all lessons
        const { data: lessons, error } = await supabase
            .from('lessons')
            .select('id, title, slug, content, courses(slug, curricula(slug))')
            .order('title', { ascending: true });
        if (error) {
            console.error('Error fetching lessons:', error);
            return;
        }
        if (!lessons || lessons.length === 0) {
            console.log('No lessons found');
            return;
        }
        const problemLessons = [];
        const healthyLessons = [];
        console.log(`📚 Total lessons: ${lessons.length}\n`);
        for (const lesson of lessons) {
            const course = lesson.courses;
            if (!course)
                continue;
            const curriculum = course.curricula;
            if (!curriculum)
                continue;
            const url = `/learn/${curriculum.slug}/${course.slug}/${lesson.slug}`;
            const hasValidContent = await checkLessonContent(lesson);
            if (!hasValidContent) {
                problemLessons.push({
                    url,
                    title: lesson.title,
                    slug: lesson.slug,
                    status: '❌ MISSING/INVALID CONTENT'
                });
            }
            else {
                healthyLessons.push(url);
            }
        }
        // Display results
        if (problemLessons.length > 0) {
            console.log(`\n⚠️  LESSONS WITH ISSUES (${problemLessons.length}):\n`);
            problemLessons.forEach((lesson, idx) => {
                console.log(`${idx + 1}. ${lesson.status}`);
                console.log(`   Title: ${lesson.title}`);
                console.log(`   URL: https://www.thepurplewings.org${lesson.url}\n`);
            });
        }
        console.log(`\n✅ HEALTHY LESSONS: ${healthyLessons.length}`);
        console.log(`❌ PROBLEM LESSONS: ${problemLessons.length}`);
        console.log(`📊 Health: ${Math.round((healthyLessons.length / lessons.length) * 100)}%\n`);
        if (problemLessons.length > 0) {
            console.log('JSON Export for reference:');
            console.log(JSON.stringify(problemLessons, null, 2));
        }
    }
    catch (err) {
        console.error('Fatal error:', err);
    }
}
main();
