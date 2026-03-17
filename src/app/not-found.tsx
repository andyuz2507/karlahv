import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center section-padding">
      <h1 className="font-serif text-6xl font-semibold text-berry mb-4">404</h1>
      <p className="text-charcoal-light text-lg mb-8">Página no encontrada</p>
      <Link href="/" className="btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}
