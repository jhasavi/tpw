'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Award, BookOpen, CheckCircle, Clock, Star, Target, TrendingUp } from 'lucide-react';

interface ProgressStats {
  lessonsCompleted: number;
  totalLessons: number;
  quizzesTaken: number;
  averageScore: number;
  totalPoints: number;
  streak: number;
  achievements: Achievement[];
  recentActivity: Activity[];
  courseProgress: CourseProgress[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
  category: string;
}

interface Activity {
  id: string;
  type: 'lesson' | 'quiz' | 'achievement';
  title: string;
  timestamp: string;
  details: string;
}

interface CourseProgress {
  curriculum_id: string;
  curriculum_title: string;
  course_id: string;
  course_title: string;
  completed: number;
  total: number;
  percentage: number;
}

export default function ProgressDashboard() {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgressData();
  }, []);

  async function loadProgressData() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get lesson progress
      const { data: lessonProgress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id);

      // Get quiz attempts
      const { data: quizAttempts } = await supabase
        .from('quiz_attempts_detailed')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Get achievements
      const { data: achievements } = await supabase
        .from('quiz_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      // Calculate stats
      const completedLessons = lessonProgress?.filter((l: any) => l.status === 'completed').length || 0;
      const totalLessons = 50; // This should come from curricula data
      
      const quizCount = quizAttempts?.length || 0;
      const avgScore = quizAttempts?.length 
        ? quizAttempts.reduce((sum: number, q: any) => sum + (q.score || 0), 0) / quizAttempts.length 
        : 0;
      
      const totalPoints = quizAttempts?.reduce((sum: number, q: any) => sum + (q.points_earned || 0), 0) || 0;

      // Calculate streak (simplified - days with activity)
      const recentDays = new Set(
        [...(lessonProgress || []), ...(quizAttempts || [])]
          .map(item => new Date(item.created_at || item.completed_at).toDateString())
      );
      const streak = recentDays.size;

      // Build course progress
      const courseProgress = buildCourseProgress(lessonProgress || []);

      // Build recent activity
      const recentActivity = buildRecentActivity(lessonProgress || [], quizAttempts || [], achievements || []);

      setStats({
        lessonsCompleted: completedLessons,
        totalLessons,
        quizzesTaken: quizCount,
        averageScore: Math.round(avgScore),
        totalPoints,
        streak,
        achievements: achievements || [],
        recentActivity: recentActivity.slice(0, 10),
        courseProgress
      });

    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }

  function buildCourseProgress(lessonProgress: any[]): CourseProgress[] {
    // Group by curriculum and course
    const grouped: { [key: string]: { completed: number; total: number } } = {};
    
    lessonProgress.forEach(lesson => {
      const key = `${lesson.curriculum_id || 'unknown'}-${lesson.course_id || 'unknown'}`;
      if (!grouped[key]) {
        grouped[key] = { completed: 0, total: 0 };
      }
      grouped[key].total++;
      if (lesson.status === 'completed') {
        grouped[key].completed++;
      }
    });

    return Object.entries(grouped).map(([key, data]) => {
      const [curriculumId, courseId] = key.split('-');
      return {
        curriculum_id: curriculumId,
        curriculum_title: curriculumId === 'womens-financial-literacy' ? "Women's Financial Literacy" : "FINRA 40-Hour",
        course_id: courseId,
        course_title: formatCourseTitle(courseId),
        completed: data.completed,
        total: data.total,
        percentage: Math.round((data.completed / data.total) * 100)
      };
    });
  }

  function buildRecentActivity(lessons: any[], quizzes: any[], achievements: any[]): Activity[] {
    const activities: Activity[] = [];

    lessons.forEach(lesson => {
      if (lesson.status === 'completed') {
        activities.push({
          id: lesson.id,
          type: 'lesson',
          title: 'Completed Lesson',
          timestamp: lesson.completed_at,
          details: lesson.lesson_id
        });
      }
    });

    quizzes.forEach(quiz => {
      activities.push({
        id: quiz.id,
        type: 'quiz',
        title: 'Took Quiz',
        timestamp: quiz.created_at,
        details: `Score: ${quiz.score}%`
      });
    });

    achievements.forEach(ach => {
      activities.push({
        id: ach.id,
        type: 'achievement',
        title: 'Earned Achievement',
        timestamp: ach.earned_at,
        details: ach.achievement_name
      });
    });

    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  function formatCourseTitle(courseId: string): string {
    return courseId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Unable to load progress data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Progress Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Lessons Completed"
          value={`${stats.lessonsCompleted}/${stats.totalLessons}`}
          color="purple"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6" />}
          label="Quizzes Taken"
          value={stats.quizzesTaken}
          color="blue"
        />
        <StatCard
          icon={<Star className="w-6 h-6" />}
          label="Average Score"
          value={`${stats.averageScore}%`}
          color="yellow"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Total Points"
          value={stats.totalPoints.toLocaleString()}
          color="green"
        />
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Course Progress
        </h2>
        <div className="space-y-4">
          {stats.courseProgress.map((course, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium text-gray-900">{course.course_title}</p>
                  <p className="text-sm text-gray-600">{course.curriculum_title}</p>
                </div>
                <span className="text-sm font-semibold text-purple-600">
                  {course.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {course.completed} of {course.total} lessons completed
              </p>
            </div>
          ))}
          {stats.courseProgress.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No courses started yet. Browse our courses to get started!
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`mt-1 ${
                  activity.type === 'lesson' ? 'text-purple-600' :
                  activity.type === 'quiz' ? 'text-blue-600' :
                  'text-yellow-600'
                }`}>
                  {activity.type === 'lesson' && <BookOpen className="w-5 h-5" />}
                  {activity.type === 'quiz' && <CheckCircle className="w-5 h-5" />}
                  {activity.type === 'achievement' && <Award className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {stats.recentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Achievements ({stats.achievements.length})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
                <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              </div>
            ))}
            {stats.achievements.length === 0 && (
              <div className="col-span-2 text-gray-500 text-center py-8">
                <Award className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No achievements yet. Keep learning!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Streak Section */}
      {stats.streak > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">🔥 {stats.streak} Day Streak!</h3>
              <p className="text-purple-100">Keep up the great work!</p>
            </div>
            <TrendingUp className="w-16 h-16 opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
  color: 'purple' | 'blue' | 'yellow' | 'green';
}) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
