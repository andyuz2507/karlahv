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
    <footer className="bg-berry text-white">
      <div className="max-w-6xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <a
              href="/admin"
              className="font-serif text-2xl font-semibold mb-4 block hover:text-dusty-rose transition-colors"
            >
              Karla Hernández Villalobos
            </a>
            <p className="text-cream-light/90 mb-6 max-w-md">
              Psicóloga integrativa con más de 10 años de experiencia. Acompañando a niños, adolescentes y adultos.
            </p>
            <div className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dusty-rose hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl font-semibold mb-4">Recibe recursos y novedades</h4>
            <p className="text-cream-light/90 mb-4 text-sm">
              Guías prácticas, tips y contenido de valor.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-berry-dark/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream-light/90 text-sm">
            © {new Date().getFullYear()}{' '}
            <a href="/admin" className="hover:text-dusty-rose transition-colors underline decoration-dusty-rose/50 hover:decoration-dusty-rose">
              Karla Hernández Villalobos
            </a>
            . Todos los derechos reservados.
          </p>
          {pageVisibility.politicaPrivacidad && (
            <Link href="/politica-privacidad" className="text-dusty-rose hover:text-white transition-colors text-sm">
              Política de privacidad
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
