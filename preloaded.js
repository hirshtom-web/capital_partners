document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800; // minimum preloader display
  const startTime = performance.now();

  const sections = [
    {id: "header", url: "header.html"},
    {id: "main-section", url: "main-section.html"},
    {id: "trusted-by", url: "https://hirshtom-web.github.io/capital_partners/trusted-by.html"},
    {id: "property-slide", url: "property-slide.html"}
  ];

  const loadSection = ({id, url}) => {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    container.style.opacity = 0;
    container.style.transition = "opacity 0.6s ease";

    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`${id} not found`);
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        requestAnimationFrame(() => {
          container.style.opacity = 1;
        });
      })
      .catch(err => console.error(err));
  };

  const allLoads = sections.map(loadSection);

  Promise.allSettled(allLoads).then(() => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      if (!preloader) return;

      preloader.classList.add("fade-out");

      // Remove preloader after transition, or after 700ms as a backup
      const removePreloader = () => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      };

      preloader.addEventListener("transitionend", removePreloader);
      setTimeout(removePreloader, 700); // fallback in case transitionend doesn't fire
    }, remaining);
  });
});
