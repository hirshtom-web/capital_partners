document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800; // Minimum preloader display
  const startTime = performance.now();

  const sections = [
    { id: "header", url: "header.html" },
    { id: "main-section", url: "main-section.html" },
    { id: "trusted-by", url: "https://hirshtom-web.github.io/capital_partners/trusted-by.html" },
    { id: "property-slide", url: "property-slide.html" }
  ];

  // Helper to fetch and fade in a section
  const loadSection = ({ id, url }) => {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    container.style.opacity = 0;
    container.style.transition = "opacity 0.6s ease";

    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`${id} failed to load (${res.status})`);
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        requestAnimationFrame(() => {
          container.style.opacity = 1;
        });
      })
      .catch(err => {
        console.warn(err);
        container.innerHTML = `<p style="color: white;">Failed to load ${id}</p>`;
        container.style.opacity = 1;
      });
  };

  // Load all sections in parallel
  Promise.allSettled(sections.map(loadSection))
    .finally(() => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN_TIME - elapsed);

      // Fade out preloader
      setTimeout(() => {
        if (preloader) {
          preloader.style.transition = "opacity 0.5s ease";
          preloader.style.opacity = 0;

          // Remove preloader after transition
          setTimeout(() => {
            preloader.remove();
          }, 600);
        }
      }, remaining);

      // Safety fallback: remove preloader after 5s
      setTimeout(() => preloader?.remove(), 5000);
    });
});
