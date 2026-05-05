'use client';

import { useParams } from 'next/navigation';
import EnhancedQuiz from '@/components/EnhancedQuiz';
import { Trophy, Star, Zap, Target } from 'lucide-react';

const CATEGORY_CONFIG: { [key: string]: { name: string; icon: string; color: string; description: string } } = {
  '1': { 
    name: 'Budgeting', 
    icon: '💰', 
    color: 'purple', 
    description: 'Master budgeting fundamentals and smart money management' 
  },
  '2': { 
    name: 'Banking & Accounts', 
    icon: '🏦', 
    color: 'blue', 
    description: 'Learn about banking products, services, and account management' 
  },
  '3': { 
    name: 'Credit & Debt', 
    icon: '💳', 
    color: 'indigo', 
    description: 'Understand credit scores, debt management, and borrowing strategies' 
  },
  '4': { 
    name: 'Saving & Emergency Funds', 
    icon: '🏆', 
    color: 'green', 
    description: 'Build your savings and create financial security nets' 
  },
  '5': { 
    name: 'Investing Basics', 
    icon: '📈', 
    color: 'emerald', 
    description: 'Introduction to investing, wealth building, and portfolio management' 
  },
  '6': { 
    name: 'Retirement Planning', 
    icon: '🌅', 
    color: 'orange', 
    description: 'Plan for a secure and comfortable retirement' 
  },
  '7': { 
    name: 'Insurance', 
    icon: '🛡️', 
    color: 'cyan', 
    description: 'Protect yourself and your family with the right insurance coverage' 
  },
  '8': { 
    name: 'Taxes', 
    icon: '📊', 
    color: 'red', 
    description: 'Navigate tax planning, filing, and optimization strategies' 
  },
  '9': { 
    name: 'Real Estate & Mortgages', 
    icon: '🏠', 
    color: 'pink', 
    description: 'Home buying, mortgages, and real estate investment basics' 
  },
  '10': { 
    name: 'Career & Income', 
    icon: '💼', 
    color: 'violet', 
    description: 'Maximize your earning potential and career financial planning' 
  },
  '11': { 
    name: 'Small Business', 
    icon: '🚀', 
    color: 'fuchsia', 
    description: 'Entrepreneurship, business finance, and startup strategies' 
  },
  '12': { 
    name: 'Estate Planning', 
    icon: '📜', 
    color: 'slate', 
    description: 'Plan your legacy and protect your assets for future generations' 
  },
  '13': { 
    name: 'Divorce & Independence', 
    icon: '💪', 
    color: 'rose', 
    description: 'Financial independence strategies during and after divorce' 
  },
  '14': { 
    name: 'Financial Safety', 
    icon: '🔒', 
    color: 'amber', 
    description: 'Protect yourself from financial abuse and scams' 
  },
  '15': { 
    name: 'Empowerment', 
    icon: '✨', 
    color: 'teal', 
    description: 'Build confidence and take control of your financial future' 
  }
};

export default function QuizCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const categoryConfig = CATEGORY_CONFIG[categoryId] || { 
    name: 'Quiz', 
    icon: '🎯', 
    color: 'purple', 
    description: 'Test your financial knowledge' 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{categoryConfig.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{categoryConfig.name} Quiz</h1>
              <p className="text-xl text-purple-100">{categoryConfig.description}</p>
            </div>
          </div>
          
          {/* Category Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <Trophy className="w-8 h-8 mb-3 text-yellow-300" />
              <p className="text-2xl font-bold mb-1">70</p>
              <p className="text-purple-100">Questions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <Star className="w-8 h-8 mb-3 text-yellow-300" />
              <p className="text-2xl font-bold mb-1">4</p>
              <p className="text-purple-100">Difficulty Levels</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <Zap className="w-8 h-8 mb-3 text-yellow-300" />
              <p className="text-2xl font-bold mb-1">∞</p>
              <p className="text-purple-100">Achievements</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <Target className="w-8 h-8 mb-3 text-yellow-300" />
              <p className="text-2xl font-bold mb-1">XP</p>
              <p className="text-purple-100">Experience Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <EnhancedQuiz
          lessonId={`category-${categoryId}`}
          lessonTitle={categoryConfig.name}
          category={categoryId}
          onComplete={(score, total, achievements) => {
            console.log('Quiz completed!', { score, total, achievements });
          }}
        />
      </div>
    </div>
  );
}
