document.addEventListener('DOMContentLoaded', () => {
  // Select all links
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const currentUrl = window.location.href.split('#')[0]; // Ignore hash for comparison

      // Prevent double-click spam
      if (link.dataset.clicked) {
        event.preventDefault();
        return;
      }
      link.dataset.clicked = true;
      setTimeout(() => delete link.dataset.clicked, 500); // Re-enable after 0.5s

      // If link points to the current page (ignoring hash)
      if (href === currentUrl || href === '') {
        event.preventDefault();

        // If it's a logo or home link, scroll to top
        if (link.id === 'logo' || href === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      // Smooth scroll for anchor links
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
