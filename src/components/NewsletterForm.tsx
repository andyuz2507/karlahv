'use client'

import { useState } from 'react'

export function NewsletterForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
    setEmail('')
  }

  const isLight = variant === 'light'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        disabled={status === 'loading'}
        className={`flex-1 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-berry/30 transition-all ${
          isLight
            ? 'bg-cream/50 border-berry/15 text-charcoal placeholder-charcoal-light/50 focus:border-berry/40'
            : 'bg-cream/10 border-cream-light/30 text-white placeholder-cream-light/60 focus:border-dusty-rose'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`px-8 py-3.5 rounded-2xl font-semibold transition-all disabled:opacity-50 ${
          isLight
            ? 'bg-dusty-rose/80 text-berry hover:bg-dusty-rose border-2 border-berry/20'
            : 'bg-dusty-rose text-berry hover:bg-white'
        }`}
      >
        {status === 'loading' ? 'Enviando...' : status === 'success' ? '¡Gracias!' : 'Suscribirme'}
      </button>
      {status === 'success' && (
        <p className={`text-sm mt-1 ${isLight ? 'text-berry' : 'text-dusty-rose'}`}>
          Revisa tu correo para confirmar.
        </p>
      )}
    </form>
  )
}
