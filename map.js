const mainContent = document.querySelector('.main-content');
const propertyGridWrapper = document.querySelector('.property-grid-wrapper');
const propertyGrid = document.querySelector('.property-grid');

document.querySelectorAll('.view-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove "active" class from all buttons
    document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const view = btn.dataset.view; // e.g., "grid-only", "map-only", "split"

    // Reset classes
    mainContent.classList.remove('grid-only', 'map-only');
    propertyGridWrapper.classList.remove('map-layout');

    if (view === 'grid-only') {
      mainContent.classList.add('grid-only');
      propertyGridWrapper.classList.remove('map-layout'); // full width grid
    } else if (view === 'map-only') {
      mainContent.classList.add('map-only');
      propertyGridWrapper.classList.add('map-layout'); // hide grid or keep small
    } else {
      // Split view (50/50)
      propertyGridWrapper.classList.add('map-layout'); // 2 columns
    }
  });
});
