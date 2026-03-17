'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIAS = ['Todas', 'Preguntas', 'Consejos', 'Experiencias', 'Recursos']

const POSTS_MOCK = [
  {
    id: 1,
    tipo: 'pregunta',
    titulo: '¿Cómo manejar las rabietas de un niño de 3 años?',
    contenido: 'Mi hijo tiene 3 años y las rabietas se han vuelto muy frecuentes, sobre todo cuando no obtiene lo que quiere. ¿Alguien tiene estrategias que les hayan funcionado?',
    autor: 'Mamá de CDMX',
    fecha: 'hace 2 días',
    respuestas: 12,
    categoria: 'Preguntas',
  },
  {
    id: 2,
    tipo: 'consejo',
    titulo: 'Rutina de noche que nos cambió la vida',
    contenido: 'Después de meses de batallar con el sueño, probamos una rutina de 20 min: baño, pijama, cuento, luz tenue y música suave. En 2 semanas empezó a dormir mejor. ¡Vale la pena la constancia!',
    autor: 'Papá de Gdl',
    fecha: 'hace 3 días',
    respuestas: 8,
    categoria: 'Consejos',
  },
  {
    id: 3,
    tipo: 'experiencia',
    titulo: 'Primera sesión de terapia con mi hijo',
    contenido: 'Quería compartir que llevamos a nuestro hijo de 6 años a su primera sesión y salió contento. Nos dio mucha paz ver que hay un espacio seguro para él. A los que dudan: den el paso.',
    autor: 'Familia anónima',
    fecha: 'hace 5 días',
    respuestas: 15,
    categoria: 'Experiencias',
  },
  {
    id: 4,
    tipo: 'pregunta',
    titulo: '¿A qué edad empezar a hablar de emociones?',
    contenido: 'Mi hija tiene 2 años y me pregunto si ya es momento de nombrar las emociones con ella. ¿Alguien tiene recomendaciones o recursos?',
    autor: 'Mamá primeriza',
    fecha: 'hace 1 semana',
    respuestas: 6,
    categoria: 'Preguntas',
  },
]

export function ComunidadClient() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nuevoPost, setNuevoPost] = useState({ titulo: '', contenido: '' })
  const [posts, setPosts] = useState(POSTS_MOCK)

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (nuevoPost.titulo && nuevoPost.contenido) {
      setPosts([
        {
          id: posts.length + 1,
          tipo: 'pregunta',
          titulo: nuevoPost.titulo,
          contenido: nuevoPost.contenido,
          autor: 'Tú (sin registro)',
          fecha: 'ahora',
          respuestas: 0,
          categoria: 'Preguntas',
        },
        ...posts,
      ])
      setNuevoPost({ titulo: '', contenido: '' })
      setMostrarFormulario(false)
    }
  }

  const postsFiltrados = categoriaActiva === 'Todas'
    ? posts
    : posts.filter((p) => p.categoria === categoriaActiva)

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-6 bg-cream-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-berry font-medium mb-4 tracking-[0.15em] uppercase text-xs">
            De papis a papis
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Comunidad de papás
          </h1>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto">
            Comparte experiencias, haz preguntas y encuentra apoyo. Sin necesidad de registrarte.
          </p>
        </div>
      </section>

      {/* Feed estilo Reddit */}
      <section className="py-8 px-4 md:px-6 bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoriaActiva === cat
                    ? 'bg-berry text-white'
                    : 'bg-white border border-berry/20 text-charcoal hover:border-dusty-rose/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Botón nueva pregunta */}
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="w-full mb-8 p-4 rounded-xl bg-white border border-berry/10 hover:border-dusty-rose/40 text-left text-charcoal-light transition-colors"
          >
            {mostrarFormulario ? 'Cancelar' : '➕ Escribe una pregunta o comparte algo (sin registro)'}
          </button>

          {/* Formulario para publicar */}
          {mostrarFormulario && (
            <form onSubmit={handleEnviar} className="mb-8 p-6 rounded-2xl bg-white border border-berry/10 shadow-soft">
              <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Publicar</h3>
              <input
                type="text"
                placeholder="Título"
                value={nuevoPost.titulo}
                onChange={(e) => setNuevoPost({ ...nuevoPost, titulo: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-berry/20 mb-4 focus:outline-none focus:ring-2 focus:ring-berry/30"
              />
              <textarea
                placeholder="¿Qué quieres compartir o preguntar?"
                value={nuevoPost.contenido}
                onChange={(e) => setNuevoPost({ ...nuevoPost, contenido: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-berry/20 mb-4 focus:outline-none focus:ring-2 focus:ring-berry/30 resize-none"
              />
              <button type="submit" className="btn-primary">
                Publicar
              </button>
            </form>
          )}

          {/* Feed de posts */}
          <div className="space-y-4">
            {postsFiltrados.map((post) => (
              <article
                key={post.id}
                className="p-6 rounded-2xl bg-white border border-berry/5 shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <button className="text-charcoal-light hover:text-berry transition-colors">▲</button>
                    <span className="text-sm font-medium text-charcoal">{post.respuestas}</span>
                    <button className="text-charcoal-light hover:text-berry transition-colors">▼</button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-berry font-medium">{post.categoria}</span>
                    <h3 className="font-serif text-lg font-bold text-charcoal mt-1 mb-2">
                      {post.titulo}
                    </h3>
                    <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                      {post.contenido}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-charcoal-light">
                      <span>{post.autor}</span>
                      <span>·</span>
                      <span>{post.fecha}</span>
                      <button className="text-berry hover:underline font-medium">
                        {post.respuestas} respuestas
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-berry text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream-light/90 mb-4">
            ¿Buscas recursos o cursos?
          </p>
          <Link
            href="/recursos-y-cursos"
            className="inline-flex px-6 py-3 rounded-full bg-dusty-rose text-berry font-semibold hover:bg-white transition-colors"
          >
            Ver recursos y cursos
          </Link>
        </div>
      </section>
    </>
  )
}
