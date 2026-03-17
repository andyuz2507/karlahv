'use client'

import Link from 'next/link'
import { useState } from 'react'
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

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-berry/5">
      <div className="max-w-7xl mx-auto py-3 sm:py-4 md:py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-berry hover:text-berry-dark transition-colors"
        >
          Karla Hernández Villalobos
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-charcoal-light hover:text-berry font-medium text-sm tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {pageVisibility.agenda && (
            <Link
              href="/agenda"
              className="px-6 py-3 rounded-full font-semibold bg-berry text-white hover:bg-berry-dark transition-all shadow-md hover:shadow-lg"
            >
              Reservar consulta
            </Link>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-berry"
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-berry/10 bg-cream-light/95 backdrop-blur-md py-4 px-4 sm:py-6 sm:px-6">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-charcoal hover:text-berry font-medium"
              >
                {link.label}
              </Link>
            ))}
            {pageVisibility.agenda && (
              <Link
                href="/agenda"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center mt-2"
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
