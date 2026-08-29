export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "IA & Agentes" | "Arquitectura" | "Frontend" | "Casos de Estudio";
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tesis-vertical-agents",
    title: "Tesis de Vertical Agents: Por qué dejé de construir herramientas genéricas",
    excerpt: "Reflexión sobre el enfoque de crear agentes súper especializados para verticales específicas (Moodle, PyMEs locales) en lugar de soluciones horizontales sin foco.",
    date: "16 Mayo, 2026",
    readTime: "5 min de lectura",
    category: "IA & Agentes",
    tags: ["IA", "Agentes", "Estrategia", "ONYX"],
    content: `
En mayo de 2026 escuché una cita de Eric Schmidt (ex-CEO de Google) que resonó profundamente con la dirección que estaba tomando con ONYX Inc:

> *"Si realmente quieres ganar valor, construye un agente para hacer algo ultra específico. Si ese agente termina siendo mejor que cualquier otro en el mundo haciendo esa tarea, tienes un activo real."*

### De herramientas genéricas a patrones verticales

Cuando empecé a desarrollar automatizaciones, la tentación natural era intentar vender "bots de WhatsApp para cualquier negocio" o "landings automatizadas para todo el mundo". El problema con ese enfoque es que cada cliente requiere reinventar la rueda desde cero.

Adoptar la **tesis de vertical agents** cambió por completo la forma en que construyo:

1. **MoodleSync no es un gestor de tareas genérico:** Es *el agente que opera la vida académica en Moodle* para el ITCG. Conecta Web Services, comprime PDFs en el cliente y sincroniza calendarios.
2. **Cada cliente PyME suma a un patrón empacable:** Al desarrollar para un gimnasio o una barbería local en Ciudad Guzmán, no construyo un proyecto aislado (*snowflake*), sino un *Operating Agent* replicable que la siguiente PyME del mismo rubro puede adoptar en la mitad del tiempo.

### El Moat local en México

Para un fundador independiente en LATAM, el verdadero valor no está en competir con modelos de lenguaje gigantes globales, sino en la **integración profunda con el contexto local**:
- Mantener la privacidad de los datos con stacks locales (n8n, Ollama, Whisper).
- Resolver problemas reales de negocios locales que no tienen tiempo de configurar software complejo.
- Entregar sistemas listos para usar en lugar de plataformas que el cliente debe configurar.

Construir en público significa aprender a enfocar el tiro. Un agente especialista siempre le ganará a diez herramientas generales.
`
  },
  {
    slug: "asistente-whatsapp-hibrido",
    title: "Arquitectura de mi Asistente Híbrido en WhatsApp: Docker, Node.js y Claude API",
    excerpt: "Desglose técnico de JARVIS: enrutamiento tri-state, bypass de latencia para el dueño, pausa nocturna y protección anti-baneos.",
    date: "10 Abril, 2026",
    readTime: "7 min de lectura",
    category: "Arquitectura",
    tags: ["WhatsApp", "Docker", "Node.js", "Claude API", "Automatización"],
    content: `
Manejar un único número de teléfono cuando eres estudiante de ingeniería en IA y fundador de una agencia puede volverse un caos rápidamente. Para solucionar esto sin depender de plataformas de terceros costosas, diseñé mi propio **Asistente Híbrido en WhatsApp (codenamed JARVIS)**.

### El problema de los bots convencionales

La mayoría de los bots de WhatsApp sufren de tres grandes defectos:
1. Tratan a todo el mundo igual (le responden a tu mamá igual que a un cliente potencial).
2. Tienen respuestas instantáneas sin variación que activan los algoritmos de spam de WhatsApp.
3. Requieren estar encendidos 24/7 sin respetar horas de descanso.

### La solución: Arquitectura Tri-State

Construí un servidor puente en **Node.js (Express)** conectado a un contenedor **Docker de OpenWA API Gateway** que clasifica cada mensaje entrante en tres perfiles:

\`\`\`
       Mensaje de WhatsApp
                ↓
      OpenWA API Gateway (Docker)
                ↓  (Webhook HMAC)
      Node.js Express Bridge
                ↓
     ┌──────────┼──────────┐
     ▼          ▼          ▼
   Dueño      Familia    Clientes
  (Juan)    (Excluidos) (Desconocidos)
     │          │          │
  Bypass     Silencio   Asistente IA
  500ms      Manual     5-15s delay
\`\`\`

#### 1. Dueño (Bypass total · 500ms)
Cuando le escribo a mi asistente desde mi número personal, salta todas las restricciones. Actúa como **JARVIS**: respuestas técnicas ultra cortas, confirmación de tareas y ejecución de comandos sin rodeos.

#### 2. Contactos Excluidos (Silencio absoluto)
Ciertos números (familia, amigos cercanos) son silenciados automáticamente por el bot. El servidor registra el webhook pero no envía respuesta, permitiéndome chatear manualmente de forma normal.

#### 3. Clientes (Asistente Comercial · Latencia adaptativa)
Para números desconocidos, el bot responde en su rol comercial. Para evitar sospechas de automatización:
- Aplica un **delay aleatorio de 5 a 15 segundos** (simulando tiempo de tipeo humano).
- Incluye una **pausa nocturna** (10 PM a 8 AM) donde los mensajes se encolan para ser procesados al inicio de la jornada.

### Conclusión

Controlar tu propia infraestructura de comunicación da una flexibilidad increíble. Con un par de contenedores Docker y código limpio en Node, es posible construir sistemas de IA adaptados exactamente a tu flujo de trabajo diario.
`
  },
  {
    slug: "compresion-pdf-browser-moodlesync",
    title: "Cómo comprimimos PDFs en el navegador en menos de 4 segundos con Canvas y PDF.js",
    excerpt: "Lección aprendida construyendo MoodleSync: procesar archivos pesados del lado del cliente para saltarse los límites de subida de plataformas escolares.",
    date: "28 Marzo, 2026",
    readTime: "4 min de lectura",
    category: "Frontend",
    tags: ["React", "Canvas", "PDF.js", "Web Performance", "MoodleSync"],
    content: `
Uno de los dolores de cabeza más comunes para los estudiantes universitarios es el límite estricto de tamaño de archivos en plataformas escolares como Moodle (a menudo limitado a 2MB o 5MB por entrega).

Al escanear tareas o guías con la cámara del celular, un documento en PDF fácilmente puede pesar entre 10MB y 25MB. La solución tradicional requiere subir el archivo a una web externa con publicidad molesta o pagar una suscripción.

En **MoodleSync**, decidimos resolver este problema **100% en el navegador del usuario**, sin enviar los documentos a ningún servidor.

### ¿Por qué procesar client-side?

1. **Privacidad total:** Los documentos escolares del estudiante nunca salen de su dispositivo.
2. **Cero costo de servidor:** No hay gasto de ancho de banda ni servidores procesando imágenes.
3. **Velocidad:** En dispositivos modernos, el procesamiento toma entre 2 y 4 segundos.

### La estrategia de optimización

El flujo de compresión funciona renderizando cada página del PDF en un \`<canvas>\` oculto en memoria y re-encodificándolo en WebP/JPEG con calidad ajustada:

\`\`\`typescript
// 1. Cargar el documento PDF con PDF.js
const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

// 2. Iterar por cada página y renderizar a Canvas
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const viewport = page.getViewport({ scale: 1.2 }); // Escala optimizada
  
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  
  // 3. Exportar como imagen comprimida
  const imageUri = canvas.toDataURL("image/jpeg", 0.72); // 72% de calidad
  // ... reconstruir el nuevo PDF comprimido
}
\`\`\`

### Resultados

- Archivos de **18 MB** escaneados con celular se reducen a **~850 KB** en menos de 3.5 segundos.
- La legibilidad del texto se mantiene perfecta para revisión de profesores.
- Cero fallas por límites de servidor durante picos de entrega de tareas.

A veces la mejor optimización de backend es no usar backend en absoluto.
`
  }
];
