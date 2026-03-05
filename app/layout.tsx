import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://saptak.saptech.online'),
  title: 'Saptak Roy Akash | Fullstack Developer & Cyber Security',
  description: 'Fullstack Developer | Cyber Security & IoT Specialist | Startup Founder. Building secure, scalable systems and businesses.',
  openGraph: {
    title: 'Saptak Roy Akash | Fullstack Developer & Cyber Security',
    description: 'Fullstack Developer | Cyber Security & IoT Specialist | Startup Founder. Building secure, scalable systems and businesses.',
    url: 'https://saptak.saptech.online',
    siteName: 'Saptak Roy Akash Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saptak Roy Akash | Fullstack Developer & Cyber Security',
    description: 'Fullstack Developer | Cyber Security & IoT Specialist | Startup Founder. Building secure, scalable systems and businesses.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
