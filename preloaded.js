<script>
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

  // Helper to fetch HTML and fade in
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

  // Load all sections
  const allLoads = sections.map(loadSection);

  // Wait for all sections + minimum preloader time
  Promise.allSettled(allLoads).then(() => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      preloader.classList.add("fade-out");
      // remove after CSS transition
      preloader.addEventListener("transitionend", () => preloader.remove());
    }, remaining);
  });
});
</script>

