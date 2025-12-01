'use client'

import type { Lesson } from '@/types/curriculum'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface LessonContentProps {
  lesson: Lesson
  courseTitle: string
}

export default function LessonContent({ lesson, courseTitle }: LessonContentProps) {
  const content = lesson.content

  return (
    <div className="lesson-content-wrapper">
      {/* Lesson Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {lesson.title}
            </h1>
            <p className="text-gray-600 text-lg">{lesson.description}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>30 min</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📚</span>
              <span>Beginner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content Sections */}
      {content.introduction && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            {content.introduction.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Markdown-based content fallback */}
      {!content.introduction && (content as any).markdown && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="prose prose-purple max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{(content as any).markdown}</ReactMarkdown>
          </div>
        </div>
      )}

      {content.sections && content.sections.map((section: any, index: number) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            {section.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}

      {content.keyTakeaways && content.keyTakeaways.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 mb-6 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💡</span> Key Takeaways
          </h2>
          <ul className="space-y-3">
            {content.keyTakeaways.map((takeaway: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="text-green-600 text-xl mt-0.5">✓</span>
                <span className="font-medium">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.actionItems && content.actionItems.length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg p-8 mb-6 border-2 border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Action Items
          </h2>
          <div className="space-y-3">
            {content.actionItems.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 h-5 w-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500" />
                <label className="text-gray-700">{item}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.resources && content.resources.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📖</span> Additional Resources
          </h2>
          <div className="grid gap-4">
            {content.resources.map((resource: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{resource.type === 'article' ? '📄' : resource.type === 'video' ? '🎥' : '🔗'}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                    {resource.description && (
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium mt-2 inline-block"
                      >
                        Access Resource →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
