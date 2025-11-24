const mainContent = document.querySelector('.main-content');
const propertyGridWrapper = document.querySelector('.property-grid-wrapper');

document.querySelectorAll('.view-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove "active" from all buttons
    document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const view = btn.dataset.view; // must be "map", "both", "grid"
    console.log('View clicked:', view);

    // Reset classes
    mainContent.classList.remove('grid-only', 'map-only');
    propertyGridWrapper.classList.remove('map-layout');

    if (view === 'grid') {
      mainContent.classList.add('grid-only');
    } else if (view === 'map') {
      mainContent.classList.add('map-only');
      propertyGridWrapper.classList.add('map-layout');
    } else if (view === 'both') {
      propertyGridWrapper.classList.add('map-layout'); // split view
    }
  });
});
