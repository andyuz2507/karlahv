'use client'

import { useState } from 'react'

type Site = { email?: string; phone?: string; address?: string }
type Contacto = { mensaje?: string; horarioAtencion?: string }

export function ContactoClient({ site, contacto }: { site: Site; contacto: Contacto }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  return (
    <>
      <section className="section-padding bg-cream-light">
        <div className="max-w-6xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <p className="text-berry font-medium mb-4 uppercase tracking-wider text-sm">
                Contacto
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-6">
                Escríbenos
              </h1>
              <p className="text-charcoal-light mb-8">
                {contacto?.mensaje}
              </p>
              <div className="space-y-4 mb-8">
                <p className="text-charcoal-light">
                  <strong className="text-charcoal">Email:</strong>{' '}
                  <a href={`mailto:${site?.email}`} className="text-berry hover:underline">
                    {site?.email}
                  </a>
                </p>
                <p className="text-charcoal-light">
                  <strong className="text-charcoal">Teléfono:</strong>{' '}
                  <a href={`tel:${(site?.phone || '').replace(/\s/g, '')}`} className="text-berry hover:underline">
                    {site?.phone}
                  </a>
                </p>
                <p className="text-charcoal-light">
                  <strong className="text-charcoal">Ubicación:</strong> {site?.address}
                </p>
                <p className="text-charcoal-light">
                  <strong className="text-charcoal">Horario de atención:</strong> {contacto?.horarioAtencion}
                </p>
              </div>
              <p className="text-sm text-charcoal-light">
                Si prefieres reservar una consulta directamente, puedes hacerlo en la sección{' '}
                <a href="/agenda" className="text-berry hover:underline">Agenda</a>.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-berry/10 p-4 sm:p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-6">
                Envíanos un mensaje
              </h2>
              {status === 'success' ? (
                <div className="py-12 text-center">
                  <p className="text-berry font-semibold text-lg mb-2">¡Mensaje enviado!</p>
                  <p className="text-charcoal-light">
                    Te responderé lo antes posible, generalmente en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-berry/20 text-charcoal focus:outline-none focus:ring-2 focus:ring-berry/30"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-berry/20 text-charcoal focus:outline-none focus:ring-2 focus:ring-berry/30"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-berry/20 text-charcoal focus:outline-none focus:ring-2 focus:ring-berry/30 resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
