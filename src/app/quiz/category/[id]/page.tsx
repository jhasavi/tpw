'use client';

import { useParams } from 'next/navigation';
import QuizInterface from '@/components/QuizInterface';

const CATEGORY_NAMES: { [key: string]: string } = {
  '1': 'Budgeting',
  '2': 'Banking & Accounts',
  '3': 'Credit & Debt Management',
  '4': 'Saving & Emergency Funds',
  '5': 'Investing Basics',
  '6': 'Retirement Planning',
  '7': 'Insurance',
  '8': 'Taxes',
  '9': 'Real Estate & Mortgages',
  '10': 'Career & Income',
  '11': 'Small Business & Entrepreneurship',
  '12': 'Estate Planning',
  '13': 'Divorce & Financial Independence',
  '14': 'Abuse & Financial Safety',
  '15': 'Financial Empowerment'
};

export default function QuizCategoryPage() {
  const params = useParams();
  const categoryId = parseInt(params.id as string);
  const categoryName = CATEGORY_NAMES[categoryId.toString()] || 'Quiz';

  return (
    <QuizInterface
      categoryId={categoryId}
      categoryName={categoryName}
      questionCount={10}
      difficultyFilter="mixed"
    />
  );
}
