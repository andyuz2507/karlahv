import Link from 'next/link'
import Image from 'next/image'
import { NewsletterForm } from '@/components/NewsletterForm'
import { RecursosCarousel } from '@/components/RecursosCarousel'
import { AgendaCalendarioGrid } from '@/components/AgendaCalendarioGrid'
import { getSiteData } from '@/lib/get-site-data'
import { requirePageActive } from '@/lib/page-visibility'

export default async function HomePage() {
  await requirePageActive('home')
  const { site, about, servicios, recursos, cursos } = await getSiteData()

  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section className="relative flex flex-col lg:flex-row min-h-[100svh] overflow-hidden">

        {/* Left: photo — constrained, not full-bleed */}
        <div className="lg:w-[38%] relative order-2 lg:order-1 bg-off-white flex items-end justify-center pt-0 pb-0 lg:pb-0 overflow-hidden">
          {/* Soft tinted background behind photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-dusty-rose/15 via-cream to-sand/30" />

          {/* Photo — bottom-anchored portrait, slightly cropped at top on smaller screens */}
          <div className="relative w-full h-full min-h-[50vw] lg:min-h-[100svh]">
            <Image
              src={site.imagenPrincipal || '/images/karla.png'}
              alt={about.nombreCompleto}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 38vw"
              priority
              unoptimized={site.imagenPrincipal?.startsWith('http')}
            />
            {/* Subtle vignette at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-off-white/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-6 left-6 hidden lg:block">
            <p className="text-charcoal-light/40 text-[10px] font-sans tracking-[0.35em] uppercase">
              {site.title}
            </p>
          </div>
        </div>

        {/* Right: editorial content — more space, more weight */}
        <div className="lg:w-[62%] relative flex flex-col justify-center bg-off-white py-14 sm:py-16 lg:py-0 px-6 sm:px-10 lg:px-14 xl:px-20 order-1 lg:order-2">

          {/* Decorative monogram — hidden on mobile */}
          <span className="absolute bottom-6 right-6 font-serif text-[140px] leading-none font-bold text-sand select-none pointer-events-none hidden xl:block">
            KHV
          </span>

          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow">Psicóloga Integrativa</p>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-ink leading-[0.93] mb-6 sm:mb-8">
              Hola,<br />
              soy {about.nombreCompleto?.split(' ')[0]}<br />
              <span className="text-berry">{about.nombreCompleto?.split(' ').slice(1).join(' ')}</span>
            </h1>

            <div className="w-14 h-0.5 bg-berry mb-6 sm:mb-8" />

            <p className="text-charcoal-light text-base sm:text-lg leading-relaxed mb-4 max-w-lg">
              {about.bioCorta}
            </p>
            <p className="text-charcoal-light/80 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Creo en que los papás formen parte activa del proceso. Por eso trabajo
              de cerca con las familias para que las herramientas se lleven a casa.
            </p>

            {/* Quick stats */}
            <div className="flex gap-8 mb-8 sm:mb-10">
              <div>
                <p className="font-serif text-3xl font-bold text-ink">10+</p>
                <p className="text-xs text-charcoal-light/70 tracking-wide mt-0.5">años de experiencia</p>
              </div>
              <div className="w-px bg-sand" />
              <div>
                <p className="font-serif text-3xl font-bold text-ink">3</p>
                <p className="text-xs text-charcoal-light/70 tracking-wide mt-0.5">enfoques integrativos</p>
              </div>
              <div className="w-px bg-sand" />
              <div>
                <p className="font-serif text-3xl font-bold text-berry">∞</p>
                <p className="text-xs text-charcoal-light/70 tracking-wide mt-0.5">familias acompañadas</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/agenda" className="btn-primary">
                Reservar consulta
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/sobre-mi" className="btn-secondary">
                Conocer más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. SERVICIOS ─── */}
      <section className="relative py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Background number */}
        <span className="absolute top-8 right-8 font-serif text-[160px] leading-none font-bold text-sand/60 select-none pointer-events-none hidden md:block">
          01
        </span>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 md:mb-16 gap-6">
            <div>
              <p className="eyebrow">Lo que ofrezco</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
                Servicios para<br className="hidden sm:block" /> ti y tu familia
              </h2>
            </div>
            <Link href="/servicios" className="hidden sm:inline-flex btn-secondary text-sm">
              Ver todos
            </Link>
          </div>

          {/* Editorial grid */}
          <div className="grid md:grid-cols-3 border border-sand">
            {servicios.map((s, i) => (
              <Link
                key={s.id}
                href={`/servicios#${s.id}`}
                className="group relative flex flex-col border-r border-b border-sand last:border-r-0 md:[&:nth-child(3n)]:border-r-0 hover:z-10 transition-all duration-500 overflow-hidden"
              >
                {/* Card fill on hover */}
                <div className="absolute inset-0 bg-berry opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  {s.imagen ? (
                    <Image
                      src={s.imagen}
                      alt={s.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized={s.imagen.startsWith('http')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dusty-rose/30 to-cream" />
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-berry/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-6 lg:p-8">
                  <span className="font-serif text-5xl font-bold text-sand group-hover:text-white/20 leading-none absolute top-4 right-5 transition-colors duration-500 select-none">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ink group-hover:text-white mb-3 transition-colors duration-300 pr-10">
                    {s.titulo}
                  </h3>
                  <p className="text-charcoal-light group-hover:text-white/80 text-sm leading-relaxed flex-1 line-clamp-3 transition-colors duration-300">
                    {s.descripcion}
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-berry group-hover:text-white text-sm font-semibold transition-colors duration-300">
                    Ver más
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex sm:hidden justify-center">
            <Link href="/servicios" className="btn-secondary">Ver todos los servicios</Link>
          </div>
        </div>
      </section>

      {/* ─── 3. DA EL PRIMER PASO ─── */}
      <section className="relative py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-ink text-white overflow-hidden">
        {/* Large background typography */}
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none overflow-hidden">
          <p className="font-serif font-bold text-white/[0.025] leading-none text-[18vw] whitespace-nowrap pl-4 select-none">
            TU ESPACIO FIJO DE TERAPIA
          </p>
        </div>

        {/* Background number */}
        <span className="absolute top-8 right-8 font-serif text-[160px] leading-none font-bold text-white/[0.04] select-none pointer-events-none hidden md:block">
          02
        </span>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="eyebrow-light">Así comenzamos</p>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] mb-6 sm:mb-8">
                Elige el horario<br />que será tuyo.
              </h2>

              <div className="w-14 h-0.5 bg-berry mb-8" />

              {/* Steps */}
              <ol className="space-y-6 mb-10">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-berry flex items-center justify-center text-white text-xs font-bold mt-0.5">1</span>
                  <div>
                    <p className="text-white font-semibold mb-1">Marca el espacio que te interesa</p>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Selecciona el horario en el que podrías verte semana a semana —o cada dos semanas— para tu proceso terapéutico.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-berry flex items-center justify-center text-white text-xs font-bold mt-0.5">2</span>
                  <div>
                    <p className="text-white font-semibold mb-1">Me pongo en contacto contigo</p>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Te escribo para agendar una llamada de{' '}
                      <span className="text-dusty-rose font-semibold">15-20 minutos</span>{' '}
                      sin costo, donde nos conocemos, alineamos expectativas y confirmo que el espacio es para ti.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-berry flex items-center justify-center text-white text-xs font-bold mt-0.5">3</span>
                  <div>
                    <p className="text-white font-semibold mb-1">Ese horario es tuyo</p>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Si encajamos, reservamos el espacio de forma fija —semanal o quincenal— y comenzamos el trabajo juntos.
                    </p>
                  </div>
                </li>
              </ol>

              <Link
                href="/agenda"
                className="inline-flex items-center gap-3 bg-berry text-white px-10 py-5 rounded-full font-semibold hover:bg-berry-dark transition-all duration-300 shadow-berry-glow hover:shadow-[0_12px_40px_-4px_rgba(127,51,78,0.7)] hover:-translate-y-1 group"
              >
                Ver horarios disponibles
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <p className="mt-6 text-white/35 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-berry flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                La llamada de conocernos no tiene costo ni compromiso
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <AgendaCalendarioGrid variant="dark" compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. RECURSOS Y CURSOS ─── */}
      <RecursosCarousel recursos={recursos} cursos={cursos} />

      {/* ─── 5. NEWSLETTER ─── */}
      <section id="newsletter" className="relative py-20 md:py-28 px-4 sm:px-6 bg-off-white overflow-hidden">
        {/* Background number */}
        <span className="absolute top-8 right-8 font-serif text-[160px] leading-none font-bold text-sand/60 select-none pointer-events-none hidden md:block">
          03
        </span>

        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white rounded-[2rem] p-8 sm:p-10 md:p-14 shadow-bold border border-sand overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-berry flex flex-col items-center justify-center">
                <span className="text-white text-[8px] font-bold tracking-widest leading-tight text-center">GRATIS</span>
              </div>
            </div>

            <p className="eyebrow">Comunidad</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-3">
              Recursos y novedades
            </h2>
            <p className="text-charcoal-light mb-8 max-w-md">
              Guías prácticas, tips y contenido de valor directo a tu correo.
            </p>
            <NewsletterForm variant="light" />
          </div>
        </div>
      </section>
    </>
  )
}
