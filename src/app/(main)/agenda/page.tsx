import { getSiteData } from '@/lib/get-site-data'
import { requirePageActive } from '@/lib/page-visibility'

export default async function AgendaPage() {
  await requirePageActive('agenda')
  const { site, agenda } = await getSiteData()
  return (
    <>
      {/* Hero destacado */}
      <section className="relative py-20 md:py-28 px-6 bg-berry text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] blob bg-white/5" />
          <div className="absolute bottom-0 left-0 w-80 h-80 blob-2 bg-dusty-rose/10" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-dusty-rose font-semibold mb-4 tracking-[0.2em] uppercase text-xs">
            Consulta gratuita
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Reserva tu consulta
          </h1>
          <p className="text-cream-light/90 text-lg max-w-2xl mx-auto">
            El primer paso para conocernos. {site.consultaDuracion} para resolver tus dudas 
            y ver si encajamos.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="relative py-16 md:py-24 px-6 bg-cream-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-6">
                {site.name}
              </h2>
              <p className="text-berry font-semibold mb-6">
                {agenda.titulo}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-charcoal-light">
                  <span className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry text-sm">⏱</span>
                  {site.consultaDuracion}
                </li>
                <li className="flex items-center gap-3 text-charcoal-light">
                  <span className="w-8 h-8 rounded-full bg-berry/10 flex items-center justify-center text-berry text-sm">📞</span>
                  {site.consultaModalidad}
                </li>
              </ul>
              <p className="text-charcoal-light leading-relaxed mb-10">
                {agenda.descripcion}
              </p>
              <a
                href={agenda.linkCalendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block mb-8"
              >
                Abrir calendario en Calendly
              </a>
              <p className="text-sm text-charcoal-light">
                <a href="/politica-privacidad" className="text-berry hover:underline">Política de privacidad</a>
              </p>
            </div>

            <div className="bg-white rounded-[2rem] border border-berry/10 shadow-soft-lg overflow-hidden">
              <div className="p-6 border-b border-berry/10 bg-cream/30">
                <h2 className="font-serif text-xl font-semibold text-charcoal">
                  Selecciona fecha y hora
                </h2>
              </div>
              <div className="min-h-[500px]">
                <iframe
                  src={`${agenda.linkCalendly}${agenda.linkCalendly.includes('?') ? '&' : '?'}embed_domain=karlahv.mx`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Reservar consulta con Karla"
                  className="min-h-[500px]"
                />
              </div>
              <div className="p-4 border-t border-berry/10 bg-cream-light/50">
                <p className="text-sm text-charcoal-light">
                  La zona horaria se ajusta automáticamente según tu ubicación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
