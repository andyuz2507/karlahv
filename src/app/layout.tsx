import type { Metadata } from 'next'
import { Cormorant_Garamond, Nunito } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Karla Hernández Villalobos | Psicóloga Integrativa',
  description: 'Psicóloga integrativa con más de 10 años de experiencia trabajando con niños, adolescentes y adultos. Terapia, recursos y acompañamiento para familias.',
  openGraph: {
    title: 'Karla Hernández Villalobos | Psicóloga Integrativa',
    description: 'Psicóloga integrativa con más de 10 años de experiencia. Herramientas y acompañamiento para familias.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
