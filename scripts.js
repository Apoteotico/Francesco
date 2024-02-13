const videoSources = [];
let currentVideoIndex = 0;

async function obtenerVideos() {
  try {
    const response = await fetch('/videos');
    const text = await response.text();
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(text, 'text/html');
    const links = htmlDocument.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href.endsWith('.mp4') || href.endsWith('.avi') || href.endsWith('.mkv')) {
        videoSources.push(href);
      }
    });
  } catch (error) {
    console.error('Error al cargar los videos:', error);
  }
}

async function mostrarVideo(index) {
  const videoSrc = videoSources[index];
  const contenedor = document.getElementById("conTenedor");
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar el nuevo video
  
  const video = document.createElement('video');
  video.controls = true;
  const source = document.createElement('source');
  source.src = videoSrc;
  source.type = 'video/mp4'; // Puedes ajustar el tipo de video según sea necesario
  video.appendChild(source);
  contenedor.appendChild(video);
}

async function changeVideo(delta) {
  currentVideoIndex += delta;
  if (currentVideoIndex < 0) {
    currentVideoIndex = videoSources.length - 1;
  } else if (currentVideoIndex >= videoSources.length) {
    currentVideoIndex = 0;
  }
  await mostrarVideo(currentVideoIndex);
}

async function iniciarReproductor() {
  await obtenerVideos();
  await mostrarVideo(currentVideoIndex);
}

iniciarReproductor();

