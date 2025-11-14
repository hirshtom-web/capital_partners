document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800;
  const startTime = performance.now();

  const sections = [
    { id: "header", url: "header.html" },
    { id: "main-section", url: "main-section.html" },
    { id: "trusted-by", url: "https://hirshtom-web.github.io/capital_partners/trusted-by.html" },
    { id: "property-slide", url: "property-slide.html" }
  ];

  const loadSection = ({ id, url }) => {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    container.style.opacity = 0;
    container.style.transition = "opacity 0.6s ease";

    return fetch(url)
      .then(res => res.ok ? res.text() : Promise.reject(`${id} not found`))
      .then(html => {
        container.innerHTML = html;
        requestAnimationFrame(() => container.style.opacity = 1);
      })
      .catch(err => {
        console.warn(err);
        container.innerHTML = `<p style="color: white;">Failed to load ${id}</p>`;
        container.style.opacity = 1;
      });
  };

  Promise.allSettled(sections.map(loadSection)).finally(() => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      if (!preloader) return;
      preloader.style.opacity = 0;
      setTimeout(() => preloader.remove(), 700); // remove even if transition fails
    }, remaining);
  });
});
