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
      <section className="relative py-24 md:py-32 px-6 bg-cream-light overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 blob bg-dusty-rose/20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-soft-lg mx-auto">
                {(about.imagenPrincipal || site.imagenPrincipal) ? (
                  <Image
                    src={about.imagenPrincipal || site.imagenPrincipal || '/images/karla.png'}
                    alt={about.nombreCompleto}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={(about.imagenPrincipal || site.imagenPrincipal || '').startsWith('http')}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-dusty-rose/50 to-peach/30 flex items-center justify-center">
                    <span className="text-berry/40 font-serif text-8xl">KH</span>
                  </div>
                )}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 blob bg-berry/10" />
              </div>
            </div>
            <div>
              <p className="text-berry font-semibold mb-4 tracking-[0.15em] uppercase text-xs">
                Sobre mí
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">
                {about.nombreCompleto}
              </h1>
              <p className="text-lg text-charcoal-light leading-relaxed mb-6">
                {about.bioCorta}
              </p>
              <p className="text-charcoal-light leading-relaxed mb-8">
                Creo en la importancia de que los papás formen parte activa del proceso terapéutico. 
                Por eso trabajo de cerca con las familias para que las herramientas se lleven a casa.
              </p>
              <Link href="/agenda" className="btn-primary">
                Reservar consulta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 bg-cream overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-12 text-center">
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

      <section className="relative py-24 md:py-32 px-6 bg-berry text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 blob bg-white/5" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
            ¿Listo para dar el primer paso?
          </h2>
          <p className="text-cream-light/90 mb-10">
            Una consulta de {site.consultaDuracion} nos permite conocernos y ver si encajamos.
          </p>
          <Link
            href="/agenda"
            className="inline-flex items-center justify-center px-12 py-4 rounded-full font-semibold bg-dusty-rose text-berry hover:bg-white transition-all duration-300"
          >
            Ver disponibilidad
          </Link>
        </div>
      </section>
    </>
  )
}
