# Carta para Samara ✦ Una Carta del Fin del Cretácico

Este proyecto ha sido organizado en archivos separados para mantener una estructura limpia, modular y fácil de mantener (HTML, CSS y JS).

## Estructura del Proyecto

- **`index.html`**: El código HTML principal que define la estructura y el contenido de la carta.
- **`styles.css`**: Las reglas de diseño, colores, fuentes tipográficas y animaciones.
- **`script.js`**: El comportamiento interactivo, las animaciones dinámicas, el control del reproductor de música y el efecto de escritura en el pizarrón.
- **`images/`**: Carpeta que contiene las imágenes del proyecto.

---

## Cómo agregar tus propias imágenes

Actualmente, el proyecto incluye imágenes vectoriales `.svg` como marcadores de posición (placeholders) con fondos blancos elegantes y marcos circulares. 

Si deseas agregar tus propias imágenes (por ejemplo, en formato `.png` o `.jpg` con fondo blanco), sigue estos pasos:

1. **Guarda tus imágenes** en la carpeta `images/` con los nombres correspondientes.
2. **Si tus imágenes tienen otra extensión** (como `.png` o `.jpg`), abre el archivo `index.html` y cambia la extensión en la ruta de la imagen correspondiente. Por ejemplo:
   - Cambia `images/dino_academico.svg` a `images/mi_dinosaurio.png`
3. ¡Listo! El diseño CSS está optimizado para darles forma circular y bordes sombreados automáticamente a cualquier imagen sobre fondo blanco.

### Relación de archivos de imágenes en `images/`:
- `libro_portada.svg`: Portada del libro en 3D.
- `dino_academico.svg`: Imagen del dinosaurio académico (Capítulo I).
- `pollo_ancestro.svg`: Imagen del pollo ancestro del Jurásico (Capítulo I).
- `thriller_dance.svg`: Imagen del baile de Thriller (Capítulo I).
- `mosasaurio_atlantico.svg`: Imagen de Mosasaurus (Capítulo I).
- `mj_silhouette.svg`: Silueta de Michael Jackson (Capítulo II).
- `mosa_water.svg`: Imagen del Mosasaurus nadando (Capítulo V).
- `pollo_sticker.svg`: Imagen del pollito en el pizarrón (Capítulo VI).
- `flor_cierre.svg`: Imagen de la rosa en la sección de cierre.

---

## Cómo agregar música de fondo

1. Guarda tu archivo de audio en formato `.mp3` en una carpeta que puedes crear llamada `audio/`, o colócalo directamente en la raíz como `musica_fondo.mp3`.
2. Edita la etiqueta `<audio>` en `index.html` (alrededor de la línea 35) para apuntar a tu archivo:
   ```html
   <audio id="bgAudio" loop>
     <source src="audio/musica_fondo.mp3" type="audio/mpeg">
   </audio>
   ```

---

## Mejoras premium añadidas:

1. **Sobre Interactivo (Envelope Intro)**: Al abrir el sitio, el destinatario verá una carta lacrada en 3D. Al hacer clic en el sello de cera, el sobre se abrirá de manera animada y la carta se deslizará hacia arriba, revelando el contenido principal.
2. **Pizarrón con Tiza Realista**: La letra se ha cambiado a color blanco simulando tiza y se cargó una tipografía escrita a mano (`Caveat` de Google Fonts). Además, se eliminaron los guiones y se programó un **efecto máquina de escribir** que escribe la lección en tiempo real cuando el pizarrón entra en pantalla.
3. **Pétalos Flotantes**: En la sección de cierre, caen de forma continua pétalos de rosa animados, creando una atmósfera poética y elegante.
4. **Reproductor de Música Widget**: Un botón flotante en la esquina superior derecha con forma de disco de vinilo que gira al reproducirse la música. La música se activa automáticamente al abrir la carta como parte de la experiencia interactiva.
5. **Barra de Progreso de Lectura**: Una fina barra de lectura en la parte superior que se llena a medida que el usuario se desliza hacia abajo.
