'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { PageVisibility } from '@/lib/get-site-data'

const navConfig = [
  { href: '/', label: 'Inicio', key: 'home' as const },
  { href: '/sobre-mi', label: 'Sobre mí', key: 'sobreMi' as const },
  { href: '/servicios', label: 'Servicios', key: 'servicios' as const },
  { href: '/recursos-y-cursos', label: 'Recursos y cursos', key: 'recursosCursos' as const },
  { href: '/comunidad', label: 'Comunidad', key: 'comunidad' as const },
  { href: '/contacto', label: 'Contacto', key: 'contacto' as const },
]

export function Header({ pageVisibility }: { pageVisibility: PageVisibility }) {
  const navLinks = navConfig.filter((l) => pageVisibility[l.key])
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-off-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,10,12,0.08)]'
          : 'bg-off-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 md:py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl md:text-2xl font-semibold text-ink hover:text-berry transition-colors duration-200"
        >
          Karla Hernández Villalobos
        </Link>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-charcoal-light hover:text-ink font-medium text-sm tracking-wide transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-berry group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          {pageVisibility.agenda && (
            <Link
              href="/agenda"
              className="ml-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-berry text-white hover:bg-berry-dark transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(127,51,78,0.4)] hover:shadow-[0_6px_25px_-4px_rgba(127,51,78,0.55)] hover:-translate-y-0.5"
            >
              Reservar consulta
            </Link>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-ink rounded-lg hover:bg-sand transition-colors"
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-ink/5 bg-off-white py-6 px-4 sm:px-6 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-2 text-charcoal hover:text-berry font-medium border-b border-sand last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {pageVisibility.agenda && (
              <Link
                href="/agenda"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center mt-4"
              >
                Reservar consulta
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
