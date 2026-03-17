/**
 * Contenido central del sitio Karlahv.mx
 * Edita este archivo para actualizar la información en todo el sitio.
 */

export const site = {
  imagenPrincipal: '/images/karla.png', // Imagen hero página inicial (editable en admin)
  name: 'Karla Hernández Villalobos',
  title: 'Psicóloga Integrativa',
  tagline: 'Acompañamiento para niños, adolescentes y familias',
  domain: 'karlahv.mx',
  email: 'contacto@karlahv.mx',
  phone: '+52 55 1234 5678',
  address: 'Ciudad de México, México',
  consultaDuracion: '15-20 min',
  consultaModalidad: 'Videollamada o presencial',
}

export const about = {
  imagenPrincipal: '', // Imagen Sobre mí (editable en admin)
  nombreCompleto: 'Karla Hernández Villalobos',
  titulo: 'Psicóloga Integrativa',
  experiencia: 'más de 10 años',
  bioCorta: 'Psicóloga integrativa con más de 10 años de experiencia trabajando con niños, adolescentes y adultos. Creo en un enfoque que integra mente, cuerpo y emoción, y en acompañar a las familias con herramientas prácticas que pueden llevarse a casa.',
  bioLarga: `Soy Karla Hernández Villalobos, psicóloga integrativa con más de 10 años de experiencia en el ámbito clínico. Mi formación y práctica se centran en acompañar a niños, adolescentes y adultos desde un enfoque que integra diferentes corrientes terapéuticas según las necesidades de cada persona.

Creo profundamente en que los papás son parte fundamental del proceso terapéutico, especialmente cuando trabajamos con niños. Por eso, además de las sesiones individuales, ofrezco orientación a padres, recursos prácticos y un espacio para que toda la familia crezca junta.

Mi objetivo es que lo que se trabaja en terapia no se quede solo en el consultorio: quiero que las familias tengan herramientas concretas para el día a día. Por eso creé este espacio con guías, recursos y una comunidad de apoyo.`,
  formacion: [
    {
      titulo: 'Licenciatura en Psicología',
      institucion: 'Universidad Nacional Autónoma de México (UNAM)',
      detalle: 'Formación base en psicología clínica y desarrollo.',
    },
    {
      titulo: 'Especialización en Psicología Clínica Infantil y Adolescente',
      institucion: 'Instituto de Formación en Psicología Clínica',
      detalle: 'Enfoque en evaluación e intervención con niños y adolescentes.',
    },
    {
      titulo: 'Formación en Terapia de Juego',
      institucion: 'Centro de Terapia de Juego',
      detalle: 'Técnicas de juego terapéutico para trabajo con población infantil.',
    },
    {
      titulo: 'Enfoque integrativo',
      institucion: 'Formación continua',
      detalle: 'Integración de enfoques cognitivo-conductual, humanista y sistémico.',
    },
  ],
  enfoques: [
    {
      titulo: 'Psicología integrativa',
      descripcion: 'Integro diferentes enfoques terapéuticos según las necesidades de cada persona: cognitivo-conductual, humanista, sistémico y técnicas basadas en juego y arte.',
    },
    {
      titulo: 'Trabajo con familias',
      descripcion: 'Los papás son parte fundamental del proceso. Ofrezco sesiones de orientación, recursos prácticos y un espacio para que toda la familia crezca junta.',
    },
    {
      titulo: 'Herramientas para casa',
      descripcion: 'Creo en dar recursos concretos: guías, ejercicios y estrategias que los papás pueden usar en casa para reforzar lo trabajado en terapia.',
    },
  ],
}

export const servicios = [
  {
    id: 'ninos',
    imagen: '', // URL de imagen (subir en admin)
    titulo: 'Terapia con niños',
    subtitulo: 'Acompañamiento a través del juego y la expresión',
    descripcion: 'Trabajo con los más pequeños utilizando el juego, el arte y la expresión emocional como herramientas principales. Cada sesión está adaptada a la edad y necesidades del niño. Siempre incluyo trabajo con los papás para que puedan reforzar en casa lo aprendido en terapia.',
    puntos: ['Juego terapéutico', 'Arte y expresión emocional', 'Orientación a padres', 'Herramientas para casa', 'Manejo de emociones', 'Desarrollo de habilidades sociales'],
  },
  {
    id: 'adolescentes',
    imagen: '',
    titulo: 'Terapia con adolescentes',
    subtitulo: 'Un espacio seguro para explorar y crecer',
    descripcion: 'La adolescencia es una etapa de cambios profundos. Ofrezco un espacio seguro donde los adolescentes pueden explorar su identidad, manejar sus emociones y fortalecer su relación con la familia. Trabajo también con los papás para mejorar la comunicación y el vínculo.',
    puntos: ['Identidad y autoconocimiento', 'Manejo emocional', 'Comunicación familiar', 'Acompañamiento en transiciones', 'Relaciones con pares', 'Proyecto de vida'],
  },
  {
    id: 'adultos',
    imagen: '',
    titulo: 'Terapia con adultos',
    subtitulo: 'Bienestar emocional y autoconocimiento',
    descripcion: 'Acompañamiento individual para adultos que buscan bienestar emocional, resolver conflictos internos, manejar ansiedad o depresión, y desarrollar herramientas para la vida diaria. Un espacio para conectar contigo mismo y construir una vida más plena.',
    puntos: ['Ansiedad y estrés', 'Autoconocimiento', 'Relaciones y vínculos', 'Herramientas prácticas', 'Duelo y pérdidas', 'Crecimiento personal'],
  },
]

export const recursos = {
  categorias: [
    {
      titulo: 'Guías DIY',
      descripcion: 'PDFs descargables para trabajar emociones, rutinas, límites y comunicación en familia. Diseñadas para que las uses en casa con tus hijos.',
      icono: '📄',
      items: [
        'Guía de emociones para niños (3-8 años)',
        'Rutinas que funcionan: mañana y noche',
        'Comunicación sin gritos',
        'Manejo de rabietas paso a paso',
        'El frasco de la calma: instrucciones',
        'Tablero de emociones para imprimir',
      ],
    },
    {
      titulo: 'Lecturas y recomendaciones',
      descripcion: 'Artículos, libros, podcasts y videos curados para ti. Contenido de calidad que complementa el trabajo en terapia.',
      icono: '📚',
      items: [
        'Libros recomendados por edad',
        'Podcasts sobre crianza consciente',
        'Videos educativos para familias',
        'Artículos del blog',
        'Recursos para mamás y papás',
      ],
    },
    {
      titulo: 'Comunidad de papás',
      descripcion: 'Un espacio para compartir experiencias, dudas y consejos de papis a papis. Moderado y con respeto.',
      icono: '💬',
      items: [
        'Foro por categorías',
        'Compartir experiencias',
        'Consejos entre padres',
        'Soporte mutuo',
        'Preguntas frecuentes',
      ],
    },
  ],
}

export const cursos = [
  {
    id: 'emociones-familia',
    titulo: 'Taller: Emociones en familia',
    descripcion: 'Un espacio para aprender a identificar, nombrar y acompañar las emociones de tus hijos. Incluye ejercicios prácticos y materiales para casa. Ideal para papás con niños de 3 a 10 años.',
    fecha: 'Próximamente',
    modalidad: 'Presencial',
    duracion: '2 sesiones de 2 horas',
    ubicacion: 'Ciudad de México',
    linkLuma: 'https://lu.ma/karlahv-emociones',
  },
  {
    id: 'limites-amor',
    titulo: 'Curso online: Límites con amor',
    descripcion: 'Cómo poner límites claros sin perder la conexión. Estrategias prácticas para el día a día. Incluye videos, ejercicios y material descargable.',
    fecha: 'Próximamente',
    modalidad: 'En línea',
    duracion: '4 módulos',
    ubicacion: 'Plataforma online',
    linkLuma: 'https://lu.ma/karlahv-limites',
  },
  {
    id: 'adolescentes',
    titulo: 'Taller: Comunicación con adolescentes',
    descripcion: 'Herramientas para padres de adolescentes. Cómo mantener el vínculo y la comunicación en una etapa de cambios.',
    fecha: 'Próximamente',
    modalidad: 'Presencial',
    duracion: '1 sesión de 3 horas',
    ubicacion: 'Ciudad de México',
    linkLuma: 'https://lu.ma/karlahv-adolescentes',
  },
]

export const agenda = {
  titulo: 'Consulta inicial gratuita',
  descripcion: 'Ya seas nuevo en terapia o busques un acompañamiento para esta etapa, una consulta de 15-20 minutos nos permite conocernos y ver si encajamos. Resolveremos tus dudas y podrás decidir si quieres continuar.',
  linkCalendly: 'https://calendly.com/karlahv/consulta',
  tiposCita: [
    { nombre: 'Consulta inicial', duracion: '15-20 min', tipo: 'Gratuita' },
    { nombre: 'Sesión individual', duracion: '50 min', tipo: 'Terapia' },
  ],
}

export const contacto = {
  mensaje: 'Si tienes dudas sobre los servicios, quieres más información o prefieres contactar antes de reservar, completa el formulario y te responderé pronto. Generalmente respondo en menos de 24 horas.',
  horarioAtencion: 'Lunes a Viernes, 9:00 - 18:00',
}

/** Páginas activas/inactivas. true = visible públicamente */
export const pageVisibility = {
  home: true,
  sobreMi: true,
  servicios: true,
  recursosCursos: true,
  comunidad: true,
  contacto: true,
  agenda: true,
  politicaPrivacidad: true,
  cursos: true,
  recursos: true,
}
