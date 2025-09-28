console.log("Welcome to Capital Partners!");
<script>
  // Hamburger toggle script for mobile menu
  const hamburger = document.querySelector('.hamburger');
  const menuContainer = document.querySelector('.menu-container');

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    menuContainer.classList.toggle('show');
  });

  // Accessibility: also toggle menu on Enter/Space key on hamburger
  hamburger.addEventListener('keydown', e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  });
</script>
