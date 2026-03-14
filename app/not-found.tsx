import Link from 'next/link'
import type { Metadata, Viewport } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The system could not locate the requested resource.',
}

export function generateViewport(): Viewport {
  return {
    themeColor: '#0a0a0f',
    width: 'device-width',
    initialScale: 1,
  }
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-white p-4 font-sans">
      <div className="relative border border-cyan-500/30 bg-black/40 p-12 rounded-lg backdrop-blur-xl max-w-md w-full text-center">
        {/* Cyber accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500" />

        <h1 className="text-6xl font-bold text-cyan-500 mb-2 font-mono">404</h1>
        <div className="h-1 w-20 bg-cyan-500 mx-auto mb-6" />
        
        <h2 className="text-2xl font-semibold mb-4">RESOURCE_NOT_FOUND</h2>
        <p className="text-gray-400 mb-8 font-mono text-sm">
          The requested address was not found in the system registry. 
          Access to this sub-sector is restricted or the path has been decommissioned.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-500 font-mono text-sm hover:bg-cyan-500 hover:text-black transition-all duration-300"
        >
          RETURN_TO_CORE
        </Link>
      </div>
      
      {/* Background scanline effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00e5ff 2px, #00e5ff 4px)"
        }}
      />
    </div>
  )
}
