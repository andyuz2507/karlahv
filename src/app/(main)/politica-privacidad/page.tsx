import Link from 'next/link'
import { getSiteData } from '@/lib/get-site-data'
import { requirePageActive } from '@/lib/page-visibility'

export default async function PoliticaPrivacidadPage() {
  await requirePageActive('politicaPrivacidad')
  const { site } = await getSiteData()
  return (
    <section className="section-padding bg-cream-light">
      <div className="max-w-4xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal mb-8">
          Política de privacidad
        </h1>
        <div className="prose prose-charcoal max-w-none text-charcoal-light space-y-6">
          <p>
            En {site.domain}, propiedad de {site.name}, nos comprometemos a proteger tu privacidad.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal mt-8">Datos que recopilamos</h2>
          <p>
            Recopilamos únicamente los datos que nos proporcionas voluntariamente: nombre, correo electrónico 
            y mensaje cuando te pones en contacto con nosotros, o cuando te suscribes al newsletter.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal mt-8">Uso de los datos</h2>
          <p>
            Utilizamos tus datos para responder a tus consultas, enviarte el newsletter si te suscribiste, 
            y gestionar las citas y servicios que solicites.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal mt-8">Protección</h2>
          <p>
            No compartimos tu información con terceros sin tu consentimiento. Los datos se almacenan 
            de forma segura y se utilizan únicamente para los fines indicados.
          </p>
          <h2 className="font-serif text-xl font-semibold text-charcoal mt-8">Contacto</h2>
          <p>
            Para ejercer tus derechos de acceso, rectificación o eliminación de datos, contacta a{' '}
            <a href={`mailto:${site.email}`} className="text-berry hover:underline">{site.email}</a>.
          </p>
        </div>
        <Link href="/" className="inline-block mt-12 text-berry font-medium hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </section>
  )
}
