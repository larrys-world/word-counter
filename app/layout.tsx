import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from "@/components/Analytics";
import Script from 'next/script'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Word Counter - Free Online Word & Character Count Tool',
  description: 'Count words, characters, sentences, and paragraphs instantly. Free word counter with reading time estimation, keyword density analysis, and readability scores.',
  keywords: 'word counter, character counter, word count tool, text counter, writing tool, character count, sentence counter',
  openGraph: {
    title: 'Word Counter - Free Online Word & Character Count Tool',
    description: 'Count words, characters, sentences, and paragraphs instantly. Free online tool for writers and content creators.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}