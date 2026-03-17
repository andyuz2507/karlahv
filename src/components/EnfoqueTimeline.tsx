'use client'

type Enfoque = { titulo: string; descripcion: string }

export function EnfoqueTimeline({ enfoques }: { enfoques: Enfoque[] }) {
  return (
    <div className="relative">
      {/* Línea vertical */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-berry/30 via-dusty-rose/40 to-berry/30" />

      <div className="space-y-0">
        {enfoques.map((e, i) => (
          <div
            key={e.titulo}
            className="relative flex gap-8 pl-16 py-8 group animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Nodo */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-berry group-hover:scale-125 group-hover:bg-berry-dark transition-all duration-300 z-10" />

            <div className="flex-1 p-6 rounded-2xl bg-white border border-berry/5 shadow-soft transition-all duration-300 ease-out hover:border-dusty-rose/30 hover:shadow-[0_30px_60px_-15px_rgba(127,51,78,0.3),0_0_0_1px_rgba(127,51,78,0.05)] hover:-translate-y-4 hover:scale-[1.03] origin-center">
              <h4 className="font-serif text-xl font-bold text-berry mb-3">{e.titulo}</h4>
              <p className="text-charcoal-light leading-relaxed">{e.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
