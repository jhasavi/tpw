'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { BookOpen, TrendingUp, Award, Zap, Trophy, Flame, Star, Target, Brain, Heart, Shield, Rocket, Sparkles } from 'lucide-react';

interface QuizCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  questionCount: number;
  difficulty: string[];
  averageScore?: number;
  attemptCount?: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const QUIZ_CATEGORIES: QuizCategory[] = [
  { id: 1, name: 'Budgeting', description: 'Master budgeting fundamentals and smart money management', icon: '💰', color: 'purple', questionCount: 70, difficulty: ['beginner', 'intermediate'], isNew: false, isPopular: true },
  { id: 2, name: 'Banking & Accounts', description: 'Learn about banking products and digital finance', icon: '🏦', color: 'blue', questionCount: 70, difficulty: ['beginner'], isNew: false, isPopular: true },
  { id: 3, name: 'Credit & Debt', description: 'Understand credit scores, debt management, and borrowing strategies', icon: '💳', color: 'indigo', questionCount: 70, difficulty: ['beginner', 'intermediate', 'advanced'], isNew: false, isPopular: true },
  { id: 4, name: 'Saving & Emergency Funds', description: 'Build your savings and create financial security nets', icon: '🏆', color: 'green', questionCount: 70, difficulty: ['beginner', 'intermediate'], isNew: false, isPopular: true },
  { id: 5, name: 'Investing Basics', description: 'Introduction to investing, wealth building, and portfolio management', icon: '📈', color: 'emerald', questionCount: 70, difficulty: ['intermediate', 'advanced'], isNew: true, isPopular: true },
  { id: 6, name: 'Retirement Planning', description: 'Plan for a secure and comfortable retirement', icon: '🌅', color: 'orange', questionCount: 70, difficulty: ['intermediate', 'advanced', 'expert'], isNew: false, isPopular: false },
  { id: 7, name: 'Insurance', description: 'Protect yourself and your family with the right insurance coverage', icon: '🛡️', color: 'cyan', questionCount: 70, difficulty: ['beginner', 'intermediate'], isNew: false, isPopular: false },
  { id: 8, name: 'Taxes', description: 'Navigate tax planning, filing, and optimization strategies', icon: '📊', color: 'red', questionCount: 70, difficulty: ['intermediate', 'advanced'], isNew: false, isPopular: false },
  { id: 9, name: 'Real Estate & Mortgages', description: 'Home buying, mortgages, and real estate investment basics', icon: '🏠', color: 'pink', questionCount: 70, difficulty: ['intermediate', 'advanced'], isNew: false, isPopular: false },
  { id: 10, name: 'Career & Income', description: 'Maximize your earning potential and career financial planning', icon: '💼', color: 'violet', questionCount: 70, difficulty: ['beginner', 'intermediate'], isNew: false, isPopular: false },
  { id: 11, name: 'Small Business', description: 'Entrepreneurship, business finance, and startup strategies', icon: '🚀', color: 'fuchsia', questionCount: 70, difficulty: ['advanced', 'expert'], isNew: true, isPopular: false },
  { id: 12, name: 'Estate Planning', description: 'Plan your legacy and protect your assets for future generations', icon: '📜', color: 'slate', questionCount: 70, difficulty: ['advanced', 'expert'], isNew: false, isPopular: false },
  { id: 13, name: 'Divorce & Independence', description: 'Financial independence strategies during and after divorce', icon: '💪', color: 'rose', questionCount: 70, difficulty: ['intermediate', 'advanced'], isNew: false, isPopular: false },
  { id: 14, name: 'Financial Safety', description: 'Protect yourself from financial abuse and scams', icon: '🔒', color: 'amber', questionCount: 70, difficulty: ['beginner', 'intermediate'], isNew: false, isPopular: false },
  { id: 15, name: 'Empowerment', description: 'Build confidence and take control of your financial future', icon: '✨', color: 'teal', questionCount: 70, difficulty: ['beginner', 'intermediate', 'advanced'], isNew: false, isPopular: false }
];

export default function QuizCategoriesPage() {
  const [userStats, setUserStats] = useState<{ [key: number]: { score: number; attempts: number; achievements: number } }>({});
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced' | 'expert'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'difficulty'>('popular');

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

  const getDifficultyColor = (difficulty: string[]) => {
    if (difficulty.includes('beginner')) return 'text-green-600 bg-green-100';
    if (difficulty.includes('intermediate')) return 'text-yellow-600 bg-yellow-100';
    if (difficulty.includes('advanced')) return 'text-orange-600 bg-orange-100';
    if (difficulty.includes('expert')) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getDifficultyLabel = (difficulty: string[]) => {
    if (difficulty.includes('expert')) return 'Expert';
    if (difficulty.includes('advanced')) return 'Advanced';
    if (difficulty.includes('intermediate')) return 'Intermediate';
    if (difficulty.includes('beginner')) return 'Beginner';
    return 'Mixed';
  };

  const filteredCategories = QUIZ_CATEGORIES.filter(category => {
    if (selectedDifficulty === 'all') return true;
    return category.difficulty.includes(selectedDifficulty);
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'difficulty') {
      const difficultyOrder = { 'expert': 4, 'advanced': 3, 'intermediate': 2, 'beginner': 1 };
      const aLevel = Math.max(...a.difficulty.map(d => difficultyOrder[d as keyof typeof difficultyOrder] || 0));
      const bLevel = Math.max(...b.difficulty.map(d => difficultyOrder[d as keyof typeof difficultyOrder] || 0));
      return bLevel - aLevel;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white py-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20">🎯</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse opacity-20 delay-100">⭐</div>
          <div className="absolute bottom-10 left-1/4 text-4xl animate-bounce opacity-20 delay-200">🚀</div>
          <div className="absolute bottom-20 right-1/3 text-6xl animate-pulse opacity-20 delay-300">🏆</div>
          <div className="absolute top-1/2 left-20 text-5xl animate-bounce opacity-20 delay-500">💡</div>
          <div className="absolute top-1/3 right-1/4 text-4xl animate-pulse opacity-20 delay-700">🎮</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              Financial Literacy Quizzes
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Test your knowledge across 15 categories with 1,050+ questions. Unlock achievements, earn XP, and become a financial expert!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Brain className="w-10 h-10 mb-3 text-yellow-300" />
              <p className="text-3xl font-bold mb-1">1,050+</p>
              <p className="text-purple-100">Questions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Target className="w-10 h-10 mb-3 text-yellow-300" />
              <p className="text-3xl font-bold mb-1">15</p>
              <p className="text-purple-100">Categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Trophy className="w-10 h-10 mb-3 text-yellow-300" />
              <p className="text-3xl font-bold mb-1">∞</p>
              <p className="text-purple-100">Achievements</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Rocket className="w-10 h-10 mb-3 text-yellow-300" />
              <p className="text-3xl font-bold mb-1">4</p>
              <p className="text-purple-100">Game Modes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Challenge</h2>
              <p className="text-gray-600">Select a category and start your journey to financial mastery</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Difficulty Filter */}
              <div className="flex gap-2">
                {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="difficulty">By Difficulty</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCategories.map((category) => {
              const stats = userStats[category.id];
              const hasAttempted = stats && stats.attempts > 0;

              return (
                <Link
                  key={category.id}
                  href={`/quiz/category/${category.id}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300 transform hover:scale-[1.02] relative"
                >
                  {/* Badges */}
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    {category.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        NEW
                      </span>
                    )}
                    {category.isPopular && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        🔥 HOT
                      </span>
                    )}
                  </div>

                  <div className={`p-6 bg-gradient-to-br from-${category.color}-50 to-white relative`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-6xl group-hover:scale-110 transition-transform">{category.icon}</div>
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
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Difficulty Tags */}
                    <div className="flex gap-2 mb-4">
                      {category.difficulty.slice(0, 2).map((diff) => (
                        <span
                          key={diff}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor([diff])}`}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </span>
                      ))}
                      {category.difficulty.length > 2 && (
                        <span className="text-xs text-gray-500">+{category.difficulty.length - 2}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Target className="w-4 h-4" />
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
                          className={`bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${stats.score}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 group-hover:from-purple-50 group-hover:to-purple-100 transition-all">
                    <span className="text-purple-600 font-medium text-sm flex items-center gap-2 justify-center">
                      {hasAttempted ? '🔄 Try Again' : '🚀 Start Quiz'}
                      <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Enhanced Stats Section */}
        {Object.keys(userStats).length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl shadow-lg p-8 border-2 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Your Quiz Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <p className="text-3xl font-bold text-purple-600">
                  {Object.values(userStats).reduce((sum, s) => sum + s.attempts, 0)}
                </p>
                <p className="text-gray-600 mt-1">Total Quizzes</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <p className="text-3xl font-bold text-purple-600">
                  {Object.keys(userStats).length}
                </p>
                <p className="text-gray-600 mt-1">Categories Tried</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round(
                    Object.values(userStats).reduce((sum, s) => sum + s.score, 0) / 
                    Object.keys(userStats).length
                  )}%
                </p>
                <p className="text-gray-600 mt-1">Average Score</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <p className="text-3xl font-bold text-purple-600">
                  {Object.values(userStats).reduce((sum, s) => sum + (s.achievements || 0), 0)}
                </p>
                <p className="text-gray-600 mt-1">Achievements</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Challenge Yourself?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Take our personality quiz to get personalized learning recommendations, or dive straight into any category that interests you!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/quiz/personality"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-50 transition-all flex items-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Personality Quiz
              </Link>
              <Link
                href="/courses"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition-all"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
