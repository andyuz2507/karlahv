import Link from 'next/link'
import Image from 'next/image'
import { NewsletterForm } from '@/components/NewsletterForm'
import { CurveDivider } from '@/components/CurveDivider'
import { RecursosCarousel } from '@/components/RecursosCarousel'
import { getSiteData } from '@/lib/get-site-data'

export default async function HomePage() {
  const { site, about, servicios, recursos, cursos } = await getSiteData()
  return (
    <>
      {/* 1. Hola soy Karla */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-[45%] relative min-h-[50vh] lg:min-h-[90vh] order-2 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-br from-dusty-rose/30 via-cream-light to-peach/20" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-soft-lg">
              <Image
                src={site.imagenPrincipal || '/images/karla.png'}
                alt={about.nombreCompleto}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={site.imagenPrincipal?.startsWith('http')}
              />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 blob bg-peach/15" />
            </div>
          </div>
        </div>

        <div className="lg:w-[55%] relative flex items-center py-16 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-24 order-1 lg:order-2 bg-cream">
          <div className="absolute top-20 right-0 w-80 h-80 blob bg-dusty-rose/15 -z-0" />
          <div className="relative z-10 max-w-xl">
            <p className="text-berry font-medium mb-6 tracking-[0.2em] uppercase text-xs">
              {site.title}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1] mb-6">
              Hola, soy {about.nombreCompleto}
            </h1>
            <p className="text-lg text-charcoal-light leading-relaxed mb-8">
              {about.bioCorta}
            </p>
            <p className="text-charcoal-light leading-relaxed mb-10">
              Creo en que los papás formen parte activa del proceso. Por eso trabajo 
              de cerca con las familias para que las herramientas se lleven a casa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sobre-mi" className="btn-secondary">
                Conocer más
              </Link>
              <Link href="/agenda" className="btn-primary">
                Reservar consulta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CurveDivider variant="cream" />

      {/* 2. Servicios - 3 columnas, visual, sin scroll */}
      <section className="relative py-16 md:py-20 px-6 bg-cream overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-berry font-medium mb-4 tracking-[0.15em] uppercase text-xs">
            Lo que ofrezco
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-12">
            Servicios para ti y tu familia
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {servicios.map((s) => (
              <Link
                key={s.id}
                href={`/servicios#${s.id}`}
                className="group flex flex-col p-6 rounded-[2rem] bg-white border border-berry/5 hover:border-dusty-rose/40 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1 origin-center"
              >
                <div className="aspect-[4/3] rounded-xl mb-6 overflow-hidden bg-gradient-to-br from-dusty-rose/20 to-cream">
                  {s.imagen ? (
                    <Image
                      src={s.imagen}
                      alt={s.titulo}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={s.imagen.startsWith('http')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-berry/30 to-dusty-rose/20 opacity-60 group-hover:opacity-80 transition-opacity" />
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal mb-3 group-hover:text-berry transition-colors">
                  {s.titulo}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed flex-1 line-clamp-3">
                  {s.descripcion}
                </p>
                <span className="inline-block mt-4 text-berry font-medium text-sm group-hover:underline">
                  Ver más →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/servicios" className="btn-secondary">
              Conocer todos los servicios
            </Link>
          </div>
        </div>
      </section>

      <CurveDivider variant="cream-light" />

      {/* 3. Da el primer paso */}
      <section className="relative py-28 md:py-36 px-6 bg-berry text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 blob bg-white/5" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 blob-2 bg-dusty-rose/15" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="text-dusty-rose font-semibold mb-4 tracking-[0.2em] uppercase text-xs">
            Consulta gratuita
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Da el primer paso
          </h2>
          <p className="text-cream-light/90 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Ya seas nuevo en terapia o busques acompañamiento para esta etapa, 
            una consulta de {site.consultaDuracion} nos permite conocernos y ver si encajamos.
          </p>
          <Link
            href="/agenda"
            className="inline-flex items-center justify-center px-14 py-5 rounded-full font-semibold bg-dusty-rose text-berry hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
          >
            Reservar mi consulta
          </Link>
        </div>
      </section>

      <CurveDivider variant="cream" />

      {/* 4. Recursos y Cursos - Collage + modal carrusel */}
      <RecursosCarousel recursos={recursos} cursos={cursos} />

      {/* Newsletter */}
      <section id="newsletter" className="relative py-24 md:py-32 px-6 bg-cream-light overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white rounded-[2rem] p-10 md:p-12 shadow-soft-lg border border-berry/5 overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-berry/90 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold tracking-wider">GRATIS</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-2">
              Recibe recursos y novedades
            </h2>
            <p className="text-charcoal-light mb-8">
              Guías prácticas, tips y contenido de valor en tu correo.
            </p>
            <NewsletterForm variant="light" />
          </div>
        </div>
      </section>
    </>
  )
}
