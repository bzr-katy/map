
document.addEventListener('DOMContentLoaded', function () {
  const mapImage = document.getElementById('map-image');
  const markers = document.querySelectorAll('.point-wrapper');

  // Tamaño original de la imagen (para calcular posiciones)
  const originalWidth = 2500; 
  const originalHeight = 1300;

  function positionMarkers() {
      const currentWidth = mapImage.clientWidth;
      const scaleFactor = currentWidth / originalWidth;

      markers.forEach(marker => {
          const x = parseInt(marker.getAttribute('data-x')) * scaleFactor;
          const y = parseInt(marker.getAttribute('data-y')) * scaleFactor;

          marker.style.left = `${x}px`;
          marker.style.top = `${y}px`;
      });
  }

  window.addEventListener('resize', positionMarkers);
  positionMarkers(); // Coloca los marcadores al cargar la página

  // Mostrar Tooltip al hacer clic
  markers.forEach(marker => {
      marker.addEventListener('click', function (event) {
          event.stopPropagation(); // Evita que el clic fuera del marcador cierre el tooltip directamente

          const title = marker.getAttribute('data-title');
          const subtitle = marker.getAttribute('data-subtitle');
          const url = marker.getAttribute('data-url');

          let tooltip = document.querySelector('.tooltip');
          if (tooltip) {
              tooltip.remove(); // Elimina cualquier tooltip abierto antes de crear uno nuevo
          }

          tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.innerHTML = `<strong>${title}</strong><p>${subtitle}</p><a href="${url}" target="_blank">Ver más</a>`;

          document.body.appendChild(tooltip);

          const markerRect = marker.getBoundingClientRect();
          tooltip.style.left = `${markerRect.left + window.scrollX + 20}px`;
          tooltip.style.top = `${markerRect.top + window.scrollY - 20}px`;
          tooltip.style.display = 'block';

          // Cerrar tooltip al hacer clic fuera
          document.addEventListener('click', function closeTooltip(event) {
              if (!marker.contains(event.target) && !tooltip.contains(event.target)) {
                  tooltip.remove();
                  document.removeEventListener('click', closeTooltip);
              }
          });
      });
  });
});


/* video
const points = document.querySelectorAll('.point-wrapper');
        const tooltip = document.getElementById('tooltip');

        points.forEach(point => {
            point.addEventListener('click', (e) => {
                const { title, link } = point.dataset;
                tooltip.innerHTML = `<strong>${title}</strong><br><a href="${link}">Learn more</a>`;
                tooltip.style.top = `${e.clientY + 10}px`;
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.display = 'block';
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('point-wrapper')) {
                tooltip.style.display = 'none';
            }
        });
        */