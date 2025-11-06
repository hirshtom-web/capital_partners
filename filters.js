const selectedFilters = { city: [], price: [], type: [], status: [] };

function applyFilters() { /* your full applyFilters function */ }
function updateFilterBarState() { /* ... */ }
function updateClearButtonVisibility() { /* ... */ }

/* Add event listeners for checkboxes, search input, clear button, and tag removal */
document.querySelectorAll('.dropdown-content input').forEach(input => { /* ... */ });
document.querySelector('#search-bar')?.addEventListener('input', applyFilters);
document.querySelector('.clear-filters-btn')?.addEventListener('click', () => { /* ... */ });
