import Link from 'next/link'
import Image from 'next/image'
import { getSiteData } from '@/lib/get-site-data'
import { EnfoqueTimeline } from '@/components/EnfoqueTimeline'
import { FormacionCarousel } from '@/components/FormacionCarousel'
import { requirePageActive } from '@/lib/page-visibility'

export default async function SobreMiPage() {
  await requirePageActive('sobreMi')
  const { about, site } = await getSiteData()
  return (
    <>
      <section className="relative flex flex-col md:flex-row min-h-[80vh] overflow-hidden">
        {/* Left: full-bleed photo */}
        <div className="md:w-[42%] relative min-h-[50vw] md:min-h-[80vh] bg-ink">
          {(about.imagenPrincipal || site.imagenPrincipal) ? (
            <Image
              src={about.imagenPrincipal || site.imagenPrincipal || '/images/karla.png'}
              alt={about.nombreCompleto}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 42vw"
              unoptimized={(about.imagenPrincipal || site.imagenPrincipal || '').startsWith('http')}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-wine to-ink flex items-center justify-center">
              <span className="text-white/10 font-serif text-9xl font-bold">KH</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right: content */}
        <div className="md:w-[58%] flex flex-col justify-center bg-off-white py-14 sm:py-16 px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-xl">
            <p className="eyebrow">Sobre mí</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[0.93] mb-6">
              {about.nombreCompleto}
            </h1>
            <div className="w-14 h-0.5 bg-berry mb-6" />
            <p className="text-lg text-charcoal-light leading-relaxed mb-4">
              {about.bioCorta}
            </p>
            <p className="text-charcoal-light/80 leading-relaxed mb-8">
              Creo en la importancia de que los papás formen parte activa del proceso terapéutico.
              Por eso trabajo de cerca con las familias para que las herramientas se lleven a casa.
            </p>
            <Link href="/agenda" className="btn-primary">
              Reservar consulta
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow">Trayectoria</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-12">
            Mi historia y enfoque
          </h2>
          <div className="prose prose-lg text-charcoal-light max-w-none mb-20 whitespace-pre-line leading-relaxed">
            {about.bioLarga}
          </div>
          <h3 className="font-serif text-xl font-bold text-berry mb-12">Formación</h3>
          <FormacionCarousel items={about.formacion} />
          <div className="mb-20" />
          <h3 className="font-serif text-xl font-bold text-berry mb-12">Mi enfoque</h3>
          <EnfoqueTimeline enfoques={about.enfoques} />
        </div>
      </section>

      <section className="relative py-20 md:py-28 px-4 sm:px-6 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p className="font-serif font-bold text-white/[0.025] leading-none text-[14vw] whitespace-nowrap select-none">
            PRIMERA CONSULTA GRATUITA
          </p>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="eyebrow-light justify-center">Da el primer paso</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
            ¿Lista para comenzar?
          </h2>
          <div className="w-14 h-0.5 bg-berry mx-auto mb-8" />
          <p className="text-white/65 text-lg mb-10 max-w-md mx-auto">
            Una consulta de {site.consultaDuracion} nos permite conocernos y ver si encajamos.
          </p>
          <Link
            href="/agenda"
            className="inline-flex items-center gap-3 bg-berry text-white px-10 py-5 rounded-full font-semibold hover:bg-berry-dark transition-all duration-300 shadow-berry-glow hover:-translate-y-1 group"
          >
            Ver disponibilidad
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
