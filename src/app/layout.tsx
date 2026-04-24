import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spencer Cheng — Software Engineer & Artist',
  description: 'Personal website of Spencer Cheng. Software engineer and visual artist showcasing engineering projects and artwork.',
  keywords: ['Spencer Cheng', 'Software Engineer', 'Artist', 'Portfolio', 'Projects'],
  authors: [{ name: 'Spencer Cheng' }],
  creator: 'Spencer Cheng',
  openGraph: {
    title: 'Spencer Cheng — Software Engineer & Artist',
    description: 'Software engineer and visual artist showcasing engineering projects and artwork.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Spencer Cheng',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spencer Cheng — Software Engineer & Artist',
    description: 'Software engineer and visual artist showcasing engineering projects and artwork.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}