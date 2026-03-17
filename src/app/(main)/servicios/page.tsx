import Link from 'next/link'
import Image from 'next/image'
import { getSiteData } from '@/lib/get-site-data'
import { requirePageActive } from '@/lib/page-visibility'

export default async function ServiciosPage() {
  await requirePageActive('servicios')
  const { servicios } = await getSiteData()
  return (
    <>
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 bg-cream-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-berry font-medium mb-2 uppercase tracking-wider text-sm">
            Servicios
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Terapia para cada etapa
          </h1>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            Niños, adolescentes y adultos. Cada servicio está diseñado para las necesidades 
            específicas de cada etapa de la vida.
          </p>
        </div>
      </section>

      {servicios.map((service, i) => {
        const backgrounds = [
          'bg-dusty-rose/40',
          'bg-berry/20',
          'bg-peach/35',
        ]
        return (
          <section
            key={service.id}
            id={service.id}
            className={`group py-12 md:py-16 px-4 sm:px-6 lg:px-8 ${backgrounds[i]} scroll-mt-24`}
          >
            <div className="max-w-6xl mx-auto transition-transform duration-300 ease-out group-hover:scale-[1.04] origin-center">
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-berry mb-2">
                    {service.titulo}
                  </h2>
                  <p className="text-dusty-rose font-medium mb-4">{service.subtitulo}</p>
                  <p className="text-charcoal-light leading-relaxed mb-6">
                    {service.descripcion}
                  </p>
                  <ul className="space-y-2">
                    {service.puntos.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-charcoal">
                        <span className="w-2 h-2 rounded-full bg-berry" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-[4/3] rounded-xl md:rounded-2xl border border-berry/10 overflow-hidden bg-gradient-to-br from-dusty-rose/30 to-cream">
                  {service.imagen ? (
                    <Image
                      src={service.imagen}
                      alt={service.titulo}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                      unoptimized={service.imagen.startsWith('http')}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-berry text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
            ¿Te gustaría conocerme?
          </h2>
          <p className="text-cream-light/90 mb-6">
            Una consulta inicial nos permite conocernos y ver si encajamos.
          </p>
          <Link href="/agenda" className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-dusty-rose text-berry hover:bg-white transition-colors">
            Reservar consulta
          </Link>
        </div>
      </section>
    </>
  )
}
