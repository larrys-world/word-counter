import WordCounter from '@/components/WordCounter'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Word Counter
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Free online word counter, character counter, and text analysis tool
          </p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 inline-block">
            <p className="text-sm text-indigo-800 font-medium">
              📝 100% Free • No Registration • Real-time Analysis
            </p>
          </div>
        </header>

        <WordCounter />

        <section className="mt-16 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Word Counter
          </h2>
          <p className="text-gray-600 mb-4">
            Our free word counter tool provides instant text analysis for writers, students, 
            content creators, and SEO professionals. Simply paste or type your text to get 
            detailed statistics including word count, character count, reading time, and more.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h4 className="font-semibold mb-2">Basic Counting</h4>
              <ul className="space-y-1 text-sm">
                <li>• Word count (with and without spaces)</li>
                <li>• Character count (with and without spaces)</li>
                <li>• Sentence and paragraph count</li>
                <li>• Line count</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Advanced Analysis</h4>
              <ul className="space-y-1 text-sm">
                <li>• Reading time estimation</li>
                <li>• Speaking time calculation</li>
                <li>• Keyword density analysis</li>
                <li>• Readability score (Flesch-Kincaid)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Common Word Count Requirements
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <ul className="space-y-2 text-gray-600">
              <li><strong>Twitter/X post:</strong> 280 characters</li>
              <li><strong>LinkedIn post:</strong> 3,000 characters</li>
              <li><strong>Facebook post:</strong> 63,206 characters</li>
              <li><strong>Instagram caption:</strong> 2,200 characters</li>
              <li><strong>Blog post:</strong> 1,000-2,500 words (optimal for SEO)</li>
              <li><strong>Academic essay:</strong> 500-5,000 words</li>
              <li><strong>Novel:</strong> 70,000-120,000 words</li>
              <li><strong>Short story:</strong> 1,000-7,500 words</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
            Writing Tips
          </h3>
          <div className="space-y-4 text-gray-600">
            <div>
              <h4 className="font-semibold mb-2">For Better Readability</h4>
              <ul className="space-y-1 text-sm">
                <li>• Keep sentences under 20 words on average</li>
                <li>• Use simple words when possible</li>
                <li>• Break up long paragraphs (3-5 sentences ideal)</li>
                <li>• Aim for a Flesch Reading Ease score above 60</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For SEO Content</h4>
              <ul className="space-y-1 text-sm">
                <li>• Target 1-2% keyword density for main keywords</li>
                <li>• Use variations and related terms naturally</li>
                <li>• Include keywords in headings and first paragraph</li>
                <li>• Write comprehensive content (1,500+ words for competitive topics)</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Recommended Writing Tools
            </h3>
            <p className="text-gray-600 mb-4">
              Take your writing to the next level with these professional tools:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Grammar & Style:</strong> Grammarly, ProWritingAid, Hemingway Editor</li>
              <li><strong>SEO Optimization:</strong> Surfer SEO, Clearscope, MarketMuse</li>
              <li><strong>Plagiarism Check:</strong> Copyscape, Turnitin, Quetext</li>
              <li><strong>AI Writing:</strong> Jasper, Copy.ai, Writesonic</li>
              <li><strong>Note Taking:</strong> Notion, Obsidian, Roam Research</li>
            </ul>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2026 Word Counter. All text analysis is performed locally in your browser.</p>
        </footer>
      </div>
    </main>
  )
}