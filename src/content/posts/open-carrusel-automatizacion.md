---
title: "Open Carrusel: Cómo diseñé mi fábrica de contenido con Claude CLI y Puppeteer"
date: "2026-06-10"
description: "La arquitectura técnica de una herramienta interna hecha a medida para automatizar el diseño y la exportación de carruseles de Instagram usando IA y Next.js."
tags: ["Next.js", "Puppeteer", "Claude CLI", "Automatización"]
---

Crear contenido de valor para redes sociales consume tiempo. Como desarrollador y fundador, diseñar carruseles de Instagram paso a paso en Figma me costaba horas valiosas que debían estar enfocadas en programar. La solución lógica no fue comprar otra suscripción SaaS, sino construir mi propia herramienta a medida: **Open Carrusel**.

Open Carrusel es una utilidad local diseñada con una filosofía clara: **chatea con una IA para diseñar y genera archivos PNG listos para publicar**.

## Arquitectura de la Herramienta

La herramienta está construida sobre un stack moderno que asegura flexibilidad de diseño y velocidad de desarrollo:

```
[ Frontend: Next.js 16 + React 19 ]
       │                │
       ▼                ▼
[ API: Claude CLI ]  [ API: Puppeteer Export ]
       │                │
       ▼                ▼
[ Claude subprocess ] [ Render Slides to PNG ]
```

* **Interfaz Visual**: Un dashboard en Next.js 16 con un chat lateral interactivo a la izquierda, una vista previa interactiva del slide actual al centro, y un carrete de miniaturas al fondo.
* **Agente de IA**: Un subproceso que corre localmente utilizando **Claude CLI** mediante Server-Sent Events (SSE). El agente tiene acceso a herramientas de sistema y a las APIs internas para modificar el código HTML/CSS del carrusel directamente mientras chateas con él.
* **Almacenamiento Atómico**: Un sistema de base de datos ultraligero basado en archivos JSON en la carpeta `/data/` local, orquestado con un mutex asíncrono para prevenir escrituras corruptas.
* **Motor de Render e iframe**: Para garantizar seguridad y aislamiento, cada slide se renderiza como un documento HTML embebido en un iframe con el atributo `sandbox=""` (deshabilitando JavaScript).

## El Flujo de Exportación con Puppeteer

La parte más crítica de Open Carrusel es exportar el diseño exacto a un archivo PNG. Instagram exige dimensiones precisas:
* Relación de aspecto **4:5** (1080x1350 píxeles).
* Formato PNG de alta definición.

Para lograr esto de forma automatizada, configuré una ruta API que inicia una instancia headless de **Puppeteer**. El flujo de trabajo funciona de la siguiente manera:

1. Puppeteer arranca y abre una página web en blanco.
2. Inyecta el HTML y CSS del slide compilado por el helper `wrapSlideHtml()`.
3. Ajusta el viewport del navegador a exactamente 1080x1350 píxeles.
4. Toma una captura de pantalla (*screenshot*) a nivel de elemento y la guarda en disco.
5. Si el carrusel tiene múltiples páginas, repite el proceso para cada una, agrupa los archivos en un ZIP usando `archiver` y los sirve al usuario listo para descargar.

## ¿Por qué no hacerlo una SaaS pública?

Al principio consideré empaquetar Open Carrusel como una plataforma de suscripción. Sin embargo, decidí mantenerlo como una **herramienta interna de apoyo de mi marca personal**. Esto me permite:
1. **Evitar costos de servidor elevados**: Puppeteer corriendo en serverless es costoso y complejo de escalar; localmente en mi máquina funciona al instante y gratis.
2. **Personalización Absoluta**: Puedo inyectar directamente las tipografías, colores de acento y palabras clave de mi marca sin crear complejos sistemas multi-tenant.
3. **Build in Public Puro**: Compartir el código fuente completo en GitHub es mucho más valioso para mi posicionamiento como desarrollador que lanzar una startup de carruseles genérica.

Si quieres explorar el código, revisar cómo configuramos las llamadas al subproceso de Claude o ver cómo Puppeteer captura el HTML, el repositorio es 100% público: [github.com/Hainrixz/open-carrusel](https://github.com/Hainrixz/open-carrusel).
