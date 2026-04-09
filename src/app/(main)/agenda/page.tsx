import Link from 'next/link'
import { getSiteData } from '@/lib/get-site-data'
import { requirePageActive } from '@/lib/page-visibility'
import { AgendaCalendarioGrid } from '@/components/AgendaCalendarioGrid'

export default async function AgendaPage() {
  await requirePageActive('agenda')
  const { site, agenda } = await getSiteData()
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <p className="font-serif font-bold text-white/[0.025] leading-none text-[14vw] whitespace-nowrap select-none">
            RESERVA TU CONSULTA
          </p>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="eyebrow-light justify-center">Consulta gratuita</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[0.95]">
            Reserva tu consulta
          </h1>
          <div className="w-14 h-0.5 bg-berry mx-auto mb-8" />
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            El primer paso para conocernos.{' '}
            <span className="text-dusty-rose font-semibold">{site.consultaDuracion}</span>{' '}
            para resolver tus dudas y ver si encajamos.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-off-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

            {/* Left: info */}
            <div>
              <p className="eyebrow">Cómo funciona</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-8">
                {site.name}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-sand shadow-soft">
                  <div className="w-10 h-10 rounded-full bg-berry/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-berry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-light uppercase tracking-widest mb-1">Duración</p>
                    <p className="text-ink font-medium">{site.consultaDuracion}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-sand shadow-soft">
                  <div className="w-10 h-10 rounded-full bg-berry/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-berry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal-light uppercase tracking-widest mb-1">Modalidad</p>
                    <p className="text-ink font-medium">{site.consultaModalidad}</p>
                  </div>
                </div>
              </div>

              <p className="text-charcoal-light leading-relaxed mb-8 text-sm sm:text-base">
                {agenda.descripcion}
              </p>

              <p className="text-xs text-charcoal-light/60">
                Al reservar aceptas nuestra{' '}
                <Link href="/politica-privacidad" className="text-berry hover:underline">
                  Política de privacidad
                </Link>
              </p>
            </div>

            {/* Right: calendar */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-sand shadow-bold overflow-hidden p-4 sm:p-6">
              <AgendaCalendarioGrid variant="light" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
