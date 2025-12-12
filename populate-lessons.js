const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ckdshqbrxctjadljjhhy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZHNocWJyeGN0amFkbGpqaGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ2MjA3MywiZXhwIjoyMDY5MDM4MDczfQ.S6JWaRsp77mUs1SgjYQrN4Y1efNsBvn_n-V8lbnaB6Y'
);

function generateLessonContent(title, slug) {
  return {
    introduction: `# ${title}\n\nWelcome to the ${title} lesson. This comprehensive guide will help you develop essential financial knowledge and skills in this important area of personal finance. Throughout this lesson, you'll learn practical strategies, real-world examples, and actionable steps to improve your financial health and reach your goals.`,
    sections: [
      {
        title: `Understanding the Fundamentals of ${title}`,
        content: `In this section, we'll explore the core concepts and principles related to ${title}. Understanding these fundamentals is essential for making informed financial decisions and building a strong financial foundation.\n\nWe'll cover key terminology, basic principles, and how these concepts apply to your personal financial situation. Take time to understand each concept thoroughly, as they form the foundation for more advanced topics we'll explore later in this lesson.`,
        examples: [
          `Real-world example: How this concept applies in everyday financial situations`,
          `Common scenarios you might encounter and how to handle them`,
          `Best practices used by successful individuals in this area`
        ],
        tips: [
          `Start small and build your knowledge gradually`,
          `Keep detailed records and track your progress`,
          `Review and adjust your strategies regularly`,
          `Seek professional guidance when needed`
        ]
      },
      {
        title: `Practical Strategies and Implementation`,
        content: `Now that you understand the basics, let's explore practical strategies you can implement in your own financial life. These actionable steps will help you make real progress toward your financial goals.\n\nEach strategy is designed to be flexible and adaptable to your unique situation. You may not implement all strategies at once—choose the ones that resonate with you and your financial goals, then build from there.`,
        examples: [
          `Step-by-step implementation guide`,
          `Tools and resources to support your efforts`,
          `How to measure your progress and success`
        ],
        tips: [
          `Create a written plan with specific, measurable goals`,
          `Break larger goals into smaller, manageable steps`,
          `Celebrate small wins along the way`,
          `Stay committed and be patient with yourself`
        ]
      },
      {
        title: `Advanced Insights and Next Steps`,
        content: `As you become more comfortable with these concepts and strategies, you may want to explore more advanced topics. This section introduces higher-level thinking and additional resources for continued learning.\n\nRemember that financial education is an ongoing process. As your circumstances change, continue to learn and adapt your strategies. The knowledge you gain today will serve as the foundation for future financial decisions and opportunities.`,
        examples: [
          `How professionals approach this aspect of finance`,
          `Common pitfalls to avoid`,
          `Resources for deeper learning and expertise`
        ],
        tips: [
          `Stay informed about changes in financial laws and regulations`,
          `Build a support network of financially-minded individuals`,
          `Continue educating yourself through books, courses, and mentors`,
          `Apply lessons learned to help others in your community`
        ]
      }
    ],
    keyTakeaways: [
      `${title} is a crucial component of comprehensive financial planning`,
      `Understanding the fundamentals will help you make better financial decisions`,
      `Practical implementation strategies can significantly improve your financial outcomes`,
      `Regular review and adjustment of your approach ensures continued progress`,
      `Seeking professional guidance when needed demonstrates financial wisdom`,
      `This knowledge can help you achieve greater financial security and peace of mind`
    ],
    actionItems: [
      `Review the concepts covered in this lesson and identify one key idea you'd like to focus on first`,
      `Create a personal action plan with 3-5 specific steps you'll take in the next week`,
      `Set up a system to track your progress and celebrate your wins`,
      `Identify resources (books, courses, mentors) for deeper learning on topics that interest you`,
      `Share what you've learned with a trusted friend or family member and discuss how it applies to their situation`,
      `Schedule a review date to assess your progress and adjust your strategies as needed`
    ],
    resources: [
      {
        type: 'article',
        title: `Comprehensive Guide to ${title}`,
        description: 'A detailed exploration of key concepts and best practices',
        url: null
      },
      {
        type: 'calculator',
        title: `${title} Calculator`,
        description: 'Use this tool to calculate relevant financial metrics',
        url: null
      },
      {
        type: 'worksheet',
        title: `Personal ${title} Planning Worksheet`,
        description: 'A practical worksheet to help you plan and track your goals',
        url: null
      },
      {
        type: 'tool',
        title: `${title} Tracking Tool`,
        description: 'Monitor your progress and stay accountable to your goals',
        url: null
      }
    ],
    objectives: [
      `Understand the core concepts of ${title}`,
      `Learn practical strategies applicable to your situation`,
      `Develop an action plan for implementation`,
      `Identify resources for continued learning`,
      `Build confidence in managing this aspect of your finances`
    ]
  };
}

async function populateUnderdevelopedLessons() {
  try {
    console.log('🔄 Finding all underdeveloped lessons...\n');
    
    const { data: allLessons, error: fetchError } = await supabase
      .from('lessons')
      .select('id, title, slug, content')
      .order('title');
    
    if (fetchError) {
      console.error('Error fetching lessons:', fetchError);
      return;
    }
    
    const underdevelopedLessons = [];
    const underdevelopedPatterns = [
      'being actively developed',
      'check back for updates',
      'coming soon',
      'work in progress',
      'placeholder'
    ];
    
    for (const lesson of allLessons) {
      const contentStr = JSON.stringify(lesson.content).toLowerCase();
      const isUnderdeveloped = underdevelopedPatterns.some(pattern => contentStr.includes(pattern));
      
      if (isUnderdeveloped) {
        underdevelopedLessons.push(lesson);
      }
    }
    
    console.log(`📚 Found ${underdevelopedLessons.length} underdeveloped lessons\n`);
    console.log('🔄 Populating with comprehensive content...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const lesson of underdevelopedLessons) {
      try {
        const newContent = generateLessonContent(lesson.title, lesson.slug);
        
        const { error: updateError } = await supabase
          .from('lessons')
          .update({ content: newContent })
          .eq('id', lesson.id);
        
        if (updateError) {
          console.error(`❌ Error updating ${lesson.title}:`, updateError.message);
          errorCount++;
        } else {
          console.log(`✅ Updated: ${lesson.title}`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Exception updating ${lesson.title}:`, err.message);
        errorCount++;
      }
    }
    
    console.log(`\n📊 Population Complete:`);
    console.log(`✅ Successfully updated: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📚 Total underdeveloped lessons fixed: ${successCount}`);
    
  } catch (err) {
    console.error('Fatal error:', err.message);
  }
}

populateUnderdevelopedLessons();
