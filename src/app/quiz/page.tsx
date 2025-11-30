'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { BookOpen, TrendingUp, Award, Zap } from 'lucide-react';

interface QuizCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  questionCount: number;
  averageScore?: number;
  attemptCount?: number;
}

const QUIZ_CATEGORIES: QuizCategory[] = [
  { id: 1, name: 'Budgeting', description: 'Master budgeting fundamentals and strategies', icon: '💰', color: 'purple', questionCount: 70 },
  { id: 2, name: 'Banking & Accounts', description: 'Learn about banking products and services', icon: '🏦', color: 'blue', questionCount: 70 },
  { id: 3, name: 'Credit & Debt', description: 'Understand credit scores and debt management', icon: '💳', color: 'indigo', questionCount: 70 },
  { id: 4, name: 'Saving & Emergency Funds', description: 'Build your savings and emergency fund', icon: '🏆', color: 'green', questionCount: 70 },
  { id: 5, name: 'Investing Basics', description: 'Introduction to investing and wealth building', icon: '📈', color: 'emerald', questionCount: 70 },
  { id: 6, name: 'Retirement Planning', description: 'Plan for a secure retirement', icon: '🌅', color: 'orange', questionCount: 70 },
  { id: 7, name: 'Insurance', description: 'Protect yourself with the right insurance', icon: '🛡️', color: 'cyan', questionCount: 70 },
  { id: 8, name: 'Taxes', description: 'Navigate tax planning and filing', icon: '📊', color: 'red', questionCount: 70 },
  { id: 9, name: 'Real Estate & Mortgages', description: 'Home buying and mortgage basics', icon: '🏠', color: 'pink', questionCount: 70 },
  { id: 10, name: 'Career & Income', description: 'Maximize your earning potential', icon: '💼', color: 'violet', questionCount: 70 },
  { id: 11, name: 'Small Business', description: 'Entrepreneurship and business finance', icon: '🚀', color: 'fuchsia', questionCount: 70 },
  { id: 12, name: 'Estate Planning', description: 'Plan your legacy and protect assets', icon: '📜', color: 'slate', questionCount: 70 },
  { id: 13, name: 'Divorce & Independence', description: 'Financial independence after divorce', icon: '💪', color: 'rose', questionCount: 70 },
  { id: 14, name: 'Financial Safety', description: 'Protect yourself from financial abuse', icon: '🔒', color: 'amber', questionCount: 70 },
  { id: 15, name: 'Empowerment', description: 'Build confidence and financial power', icon: '✨', color: 'teal', questionCount: 70 }
];

export default function QuizCategoriesPage() {
  const [userStats, setUserStats] = useState<{ [key: number]: { score: number; attempts: number } }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserStats();
  }, []);

  async function loadUserStats() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Since we don't have category tracking in quiz_attempts yet,
      // just show that quizzes have been attempted
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('score')
        .eq('user_id', user.id);

      if (attempts && attempts.length > 0) {
        // For now, just track overall stats
        // TODO: Update once category tracking is added to quiz_attempts
        const avgScore = Math.round(
          attempts.reduce((sum, a) => sum + (a.score || 0), 0) / attempts.length
        );
        
        console.log(`User has completed ${attempts.length} quizzes with avg score of ${avgScore}%`);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Literacy Quizzes</h1>
          <p className="text-xl text-purple-100 mb-8">
            Test your knowledge across 15 categories with 1,050+ questions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <BookOpen className="w-10 h-10 mb-3" />
              <p className="text-3xl font-bold mb-1">1,050+</p>
              <p className="text-purple-100">Total Questions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <TrendingUp className="w-10 h-10 mb-3" />
              <p className="text-3xl font-bold mb-1">15</p>
              <p className="text-purple-100">Categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <Award className="w-10 h-10 mb-3" />
              <p className="text-3xl font-bold mb-1">Earn</p>
              <p className="text-purple-100">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Category</h2>
          <p className="text-gray-600">Select a topic to start testing your knowledge</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_CATEGORIES.map((category) => {
              const stats = userStats[category.id];
              const hasAttempted = stats && stats.attempts > 0;

              return (
                <Link
                  key={category.id}
                  href={`/quiz/category/${category.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300"
                >
                  <div className={`p-6 bg-gradient-to-br from-${category.color}-50 to-white`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{category.icon}</div>
                      {hasAttempted && (
                        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-semibold text-gray-700">
                            {stats.score}%
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {category.questionCount} questions
                      </span>
                      {hasAttempted && (
                        <span className="text-purple-600 font-medium">
                          {stats.attempts} {stats.attempts === 1 ? 'attempt' : 'attempts'}
                        </span>
                      )}
                    </div>

                    {hasAttempted && (
                      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${stats.score}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 group-hover:bg-purple-50 transition-colors">
                    <span className="text-purple-600 font-medium text-sm flex items-center gap-2">
                      {hasAttempted ? 'Try Again' : 'Start Quiz'}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Quick Stats */}
        {Object.keys(userStats).length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Quiz Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {Object.values(userStats).reduce((sum, s) => sum + s.attempts, 0)}
                </p>
                <p className="text-gray-600 mt-1">Total Quizzes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {Object.keys(userStats).length}
                </p>
                <p className="text-gray-600 mt-1">Categories Tried</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round(
                    Object.values(userStats).reduce((sum, s) => sum + s.score, 0) / 
                    Object.keys(userStats).length
                  )}%
                </p>
                <p className="text-gray-600 mt-1">Average Score</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {15 - Object.keys(userStats).length}
                </p>
                <p className="text-gray-600 mt-1">Categories Remaining</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
