'use client'

import Link from 'next/link'
import { NewsletterForm } from './NewsletterForm'
import type { PageVisibility } from '@/lib/get-site-data'

const footerLinksConfig = [
  { href: '/sobre-mi', label: 'Sobre mí', key: 'sobreMi' as const },
  { href: '/servicios', label: 'Servicios', key: 'servicios' as const },
  { href: '/recursos-y-cursos', label: 'Recursos y cursos', key: 'recursosCursos' as const },
  { href: '/comunidad', label: 'Comunidad', key: 'comunidad' as const },
  { href: '/agenda', label: 'Agenda', key: 'agenda' as const },
  { href: '/contacto', label: 'Contacto', key: 'contacto' as const },
  { href: '/politica-privacidad', label: 'Privacidad', key: 'politicaPrivacidad' as const },
]

export function Footer({ pageVisibility }: { pageVisibility: PageVisibility }) {
  const footerLinks = footerLinksConfig.filter((l) => pageVisibility[l.key])

  return (
    <footer className="bg-ink text-white">
      {/* Top bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <a
            href="/admin"
            className="font-serif text-2xl md:text-3xl font-semibold text-white hover:text-dusty-rose transition-colors duration-200"
          >
            Karla Hernández Villalobos
          </a>
          {pageVisibility.agenda && (
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 bg-berry text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-berry-dark transition-all duration-200 shadow-berry-glow hover:shadow-[0_8px_30px_-4px_rgba(127,51,78,0.6)] hover:-translate-y-0.5 group flex-shrink-0"
            >
              Reservar consulta
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">

          {/* Col 1: About */}
          <div className="lg:col-span-1">
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Psicóloga integrativa con más de 10 años de experiencia. Acompañando a niños, adolescentes y adultos con un enfoque que integra mente, cuerpo y emoción.
            </p>
            <p className="text-dusty-rose/70 text-xs tracking-[0.25em] uppercase font-medium">
              karlahv.mx
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-medium mb-5">Navegación</h4>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200 group flex items-center gap-1.5"
                >
                  <span className="w-0 h-px bg-berry group-hover:w-3 transition-all duration-200 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Newsletter */}
          <div>
            <h4 className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-medium mb-5">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4 leading-relaxed">
              Guías prácticas, tips y contenido de valor.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()}{' '}
            <a href="/admin" className="hover:text-white/50 transition-colors">
              Karla Hernández Villalobos
            </a>
            . Todos los derechos reservados.
          </p>
          {pageVisibility.politicaPrivacidad && (
            <Link href="/politica-privacidad" className="text-white/25 hover:text-white/60 transition-colors text-xs">
              Política de privacidad
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
