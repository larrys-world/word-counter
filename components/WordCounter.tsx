'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  FileText, 
  Clock, 
  Hash, 
  Type, 
  AlignLeft, 
  BarChart3,
  Download,
  Copy,
  Trash2
} from 'lucide-react'

interface TextStats {
  words: number
  wordsNoSpaces: number
  characters: number
  charactersNoSpaces: number
  sentences: number
  paragraphs: number
  lines: number
  readingTime: number // in minutes
  speakingTime: number // in minutes
  avgWordLength: number
  avgSentenceLength: number
  fleschScore: number
  fleschGrade: string
  keywordDensity: { word: string; count: number; density: number }[]
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    wordsNoSpaces: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
    avgWordLength: 0,
    avgSentenceLength: 0,
    fleschScore: 0,
    fleschGrade: 'N/A',
    keywordDensity: []
  })

  const calculateStats = (inputText: string): TextStats => {
    // Basic counts
    const characters = inputText.length
    const charactersNoSpaces = inputText.replace(/\s/g, '').length
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length
    const wordsNoSpaces = inputText.replace(/\s/g, '').split(/\b/).filter(w => w.match(/\w/)).length
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = inputText.split(/\n\n+/).filter(p => p.trim().length > 0).length
    const lines = inputText.split('\n').length

    // Reading and speaking time (avg 200 words/min reading, 150 words/min speaking)
    const readingTime = Math.ceil(words / 200)
    const speakingTime = Math.ceil(words / 150)

    // Average lengths
    const avgWordLength = words > 0 ? charactersNoSpaces / words : 0
    const avgSentenceLength = sentences > 0 ? words / sentences : 0

    // Flesch Reading Ease Score
    const syllableCount = countSyllables(inputText)
    const fleschScore = sentences > 0 && words > 0
      ? 206.835 - 1.015 * (words / sentences) - 84.6 * (syllableCount / words)
      : 0

    const fleschGrade = getFleschGrade(fleschScore)

    // Keyword density
    const keywordDensity = calculateKeywordDensity(inputText, words)

    return {
      words,
      wordsNoSpaces,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
      avgWordLength,
      avgSentenceLength,
      fleschScore,
      fleschGrade,
      keywordDensity
    }
  }

  const countSyllables = (text: string): number => {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    return words.reduce((count, word) => {
      // Simple syllable counting algorithm
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
      word = word.replace(/^y/, '')
      const matches = word.match(/[aeiouy]{1,2}/g)
      return count + (matches ? matches.length : 1)
    }, 0)
  }

  const getFleschGrade = (score: number): string => {
    if (score >= 90) return 'Very Easy (5th grade)'
    if (score >= 80) return 'Easy (6th grade)'
    if (score >= 70) return 'Fairly Easy (7th grade)'
    if (score >= 60) return 'Standard (8-9th grade)'
    if (score >= 50) return 'Fairly Difficult (10-12th grade)'
    if (score >= 30) return 'Difficult (College)'
    if (score >= 0) return 'Very Difficult (Graduate)'
    return 'N/A'
  }

  const calculateKeywordDensity = (text: string, totalWords: number): { word: string; count: number; density: number }[] => {
    if (totalWords === 0) return []

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || []
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'them', 'their', 'this', 'that', 'these', 'those'])

    const wordCount: { [key: string]: number } = {}
    words.forEach(word => {
      if (word.length > 2 && !stopWords.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1
      }
    })

    return Object.entries(wordCount)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / totalWords) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }

  useEffect(() => {
    const newStats = calculateStats(text)
    setStats(newStats)
  }, [text])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  const handleClear = () => {
    setText('')
  }

  const handleExport = () => {
    const statsText = `Text Statistics
===============
Words: ${stats.words}
Characters: ${stats.characters}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading Time: ${stats.readingTime} min
Speaking Time: ${stats.speakingTime} min
Readability: ${stats.fleschGrade}

Top Keywords:
${stats.keywordDensity.map(k => `${k.word}: ${k.count} (${k.density.toFixed(1)}%)`).join('\n')}

Original Text:
${text}`

    const blob = new Blob([statsText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'text-analysis.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Type className="w-5 h-5" />}
          label="Words"
          value={stats.words.toLocaleString()}
          subValue={`${stats.wordsNoSpaces.toLocaleString()} (no spaces)`}
        />
        <StatCard
          icon={<Hash className="w-5 h-5" />}
          label="Characters"
          value={stats.characters.toLocaleString()}
          subValue={`${stats.charactersNoSpaces.toLocaleString()} (no spaces)`}
        />
        <StatCard
          icon={<AlignLeft className="w-5 h-5" />}
          label="Sentences"
          value={stats.sentences.toLocaleString()}
          subValue={`${stats.paragraphs} paragraphs`}
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Reading Time"
          value={`${stats.readingTime} min`}
          subValue={`Speaking: ${stats.speakingTime} min`}
        />
      </div>

      {/* Text Input */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Copy text"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Export analysis"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Readability */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Readability Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Flesch Score:</span>
              <span className="font-medium">{stats.fleschScore.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grade Level:</span>
              <span className="font-medium">{stats.fleschGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Word Length:</span>
              <span className="font-medium">{stats.avgWordLength.toFixed(1)} chars</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Sentence Length:</span>
              <span className="font-medium">{stats.avgSentenceLength.toFixed(1)} words</span>
            </div>
          </div>
        </div>

        {/* Keyword Density */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top Keywords
          </h3>
          <div className="space-y-2">
            {stats.keywordDensity.length > 0 ? (
              stats.keywordDensity.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{keyword.word}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{keyword.count}x</span>
                    <span className="font-medium">{keyword.density.toFixed(1)}%</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Start typing to see keyword analysis</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, subValue }: {
  icon: React.ReactNode
  label: string
  value: string
  subValue?: string
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 text-gray-600 mb-1">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {subValue && <div className="text-xs text-gray-500 mt-1">{subValue}</div>}
    </div>
  )
}