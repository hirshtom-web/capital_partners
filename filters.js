<script>
document.addEventListener('DOMContentLoaded', function() {
  // -------------------
  // Footer collapse for mobile
  // -------------------
  if (window.innerWidth <= 900) {
    const footerColumns = document.querySelectorAll('.footer-column h4');
    footerColumns.forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('active');
      });
    });
  }

  // -------------------
  // Filter functionality
  // -------------------
  const selectedFilters = { city: [], price: [], type: [], status: [] };

  function applyFilters() {
    // your filtering logic here
  }

  function updateFilterBarState() {
    // ...
  }

  function updateClearButtonVisibility() {
    // ...
  }

  // Checkbox listeners
  document.querySelectorAll('.dropdown-content input').forEach(input => {
    input.addEventListener('change', applyFilters);
  });

  // Search input listener
  document.querySelector('#search-bar')?.addEventListener('input', applyFilters);

  // Clear filters button
  document.querySelector('.clear-filters-btn')?.addEventListener('click', () => {
    // reset selectedFilters
    Object.keys(selectedFilters).forEach(key => selectedFilters[key] = []);
    applyFilters();
    updateFilterBarState();
    updateClearButtonVisibility();
  });

});
</script>
