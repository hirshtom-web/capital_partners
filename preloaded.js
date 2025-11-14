document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800; // minimum loader display
  const startTime = performance.now();

  const sections = [
    { id: "header", url: "header.html" },
    { id: "main-section", url: "main-section.html" },
    { id: "trusted-by", url: "https://hirshtom-web.github.io/capital_partners/trusted-by.html" },
    { id: "property-slide", url: "property-slide.html" }
  ];

  const loadSection = ({ id, url }) => {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve(); // skip missing containers

    container.style.opacity = 0;
    container.style.transition = "opacity 0.6s ease";

    return fetch(url)
      .then(res => res.ok ? res.text() : Promise.reject(`${id} not found`))
      .then(html => {
        container.innerHTML = html;
        requestAnimationFrame(() => container.style.opacity = 1);
      })
      .catch(err => {
        console.error(err);
        // fallback content if fetch fails
        container.innerHTML = `<p style="color: #fff;">${id} failed to load.</p>`;
        container.style.opacity = 1;
      });
  };

  // Load all sections
  const allLoads = sections.map(loadSection);

  // Ensure loader always fades
  Promise.allSettled(allLoads).finally(() => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      if (!preloader) return;
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 700); // remove after fade
    }, remaining);
  });
});
