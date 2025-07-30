import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Walmart | Save Money. Live Better.',
  // description: 'Created with v0',
  // generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/walmart-logo-new.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
