document.addEventListener('DOMContentLoaded', () => {
  /* Menu toggle */
  document.querySelector('.menu-toggle')?.addEventListener('click', () => { /* toggle nav */ });

  /* Dropdown logic */
  document.querySelectorAll('.dropdown').forEach(drop => { /* toggle dropdowns */ });

  /* Collapsible text */
  const text = document.getElementById('text'), btn = document.getElementById('toggle');
  btn?.addEventListener('click', () => { /* toggle collapsed/expanded */ });

  feather.replace();

  /* Animate on scroll for .loading-effect elements */
});
