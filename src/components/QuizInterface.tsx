'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Clock, Award, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'scenario';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  options: string[];
  correct_answer: string;
  explanation: string;
  points: number;
  time_limit_seconds: number;
  tags: string[];
}

interface QuizProps {
  categoryId: number;
  categoryName: string;
  questionCount?: number;
  difficultyFilter?: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
}

export default function QuizInterface({ 
  categoryId, 
  categoryName,
  questionCount = 10,
  difficultyFilter = 'mixed'
}: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    loadQuestions();
  }, [categoryId, difficultyFilter]);

  useEffect(() => {
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  async function loadQuestions() {
    try {
      const supabase = createClient();
      let query = supabase
        .from('quiz_questions_bank')
        .select('*')
        .eq('category_id', categoryId)
        .limit(questionCount);

      if (difficultyFilter !== 'mixed') {
        query = query.eq('difficulty_level', difficultyFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data && data.length > 0) {
        // Shuffle questions
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, questionCount));
      } else {
        console.warn('No questions found for this category');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }

  function startQuiz() {
    setQuizStarted(true);
    setTimeLeft(questions[0]?.time_limit_seconds || 30);
  }

  function handleAnswerSelect(answer: string) {
    setSelectedAnswer(answer);
  }

  function handleNextQuestion() {
    // Save answer
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestionIndex]: selectedAnswer });
    }

    setShowResult(true);

    // Move to next question after showing result
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(questions[currentQuestionIndex + 1]?.time_limit_seconds || 30);
      } else {
        finishQuiz();
      }
    }, 3000); // Show result for 3 seconds
  }

  async function finishQuiz() {
    setQuizCompleted(true);

    // Calculate score
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    questions.forEach((q, idx) => {
      totalPoints += q.points;
      if (answers[idx] === q.correct_answer) {
        correctCount++;
        earnedPoints += q.points;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);

    // Save to database
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: attemptData, error: attemptError } = await supabase
        .from('quiz_attempts_detailed')
        .insert({
          user_id: user.id,
          category_id: categoryId,
          total_questions: questions.length,
          correct_answers: correctCount,
          score: finalScore,
          points_earned: earnedPoints,
          time_taken_seconds: questions.reduce((sum, q) => sum + q.time_limit_seconds, 0),
          difficulty_level: difficultyFilter === 'mixed' ? null : difficultyFilter
        })
        .select()
        .single();

      if (attemptError) throw attemptError;

      // Save individual responses
      const responses = questions.map((q, idx) => ({
        attempt_id: attemptData.id,
        question_id: q.id,
        user_answer: answers[idx] || null,
        is_correct: answers[idx] === q.correct_answer,
        time_spent_seconds: q.time_limit_seconds
      }));

      await supabase.from('quiz_responses').insert(responses);

      // Check for achievements
      checkAchievements(user.id, finalScore, correctCount, earnedPoints);

    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  }

  async function checkAchievements(userId: string, score: number, correctCount: number, points: number) {
    const supabase = createClient();
    const achievements = [];

    // First quiz
    const { data: attempts } = await supabase
      .from('quiz_attempts_detailed')
      .select('id')
      .eq('user_id', userId);

    if (attempts?.length === 1) {
      achievements.push({
        user_id: userId,
        achievement_name: 'First Quiz',
        achievement_description: 'Completed your first quiz!',
        achievement_icon: '🎯',
        category: 'milestone'
      });
    }

    // Perfect score
    if (score === 100) {
      achievements.push({
        user_id: userId,
        achievement_name: 'Perfect Score',
        achievement_description: 'Scored 100% on a quiz!',
        achievement_icon: '💯',
        category: 'performance'
      });
    }

    // Save achievements
    if (achievements.length > 0) {
      await supabase.from('quiz_achievements').insert(achievements);
    }
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correct_answer;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600 mb-4">No questions available for this category yet.</p>
        <button
          onClick={() => router.push('/quiz')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Browse Other Categories
        </button>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryName} Quiz</h1>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span>{questions.length} questions</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>~{Math.round(questions.reduce((sum, q) => sum + q.time_limit_seconds, 0) / 60)} minutes</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Earn up to {questions.reduce((sum, q) => sum + q.points, 0)} points</span>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="w-full bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 font-semibold text-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className={`text-6xl mb-4 ${score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}`}>
            {score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-5xl font-bold text-purple-600 mb-8">{score}%</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Correct</p>
              <p className="text-2xl font-bold text-green-600">
                {Object.values(answers).filter((ans, idx) => ans === questions[idx]?.correct_answer).length}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">
                {questions.length - Object.values(answers).filter((ans, idx) => ans === questions[idx]?.correct_answer).length}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Points</p>
              <p className="text-2xl font-bold text-purple-600">
                {questions.reduce((sum, q, idx) => 
                  sum + (answers[idx] === q.correct_answer ? q.points : 0), 0
                )}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push('/quiz')}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              Browse Quizzes
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            currentQuestion.difficulty_level === 'beginner' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty_level}
          </span>
          <span className="text-sm text-gray-600">{currentQuestion.points} points</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentQuestion.question_text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showResult && handleAnswerSelect(option)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                showResult
                  ? option === currentQuestion.correct_answer
                    ? 'border-green-500 bg-green-50'
                    : option === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                  : selectedAnswer === option
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && option === currentQuestion.correct_answer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correct_answer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`mt-6 p-4 rounded-lg ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-gray-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {!showResult && (
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="mt-6 w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
