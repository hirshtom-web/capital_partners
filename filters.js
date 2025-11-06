const selectedFilters = { city: [], price: [], type: [], status: [] };

document.querySelectorAll('.dropdown-content input').forEach(input => { ... });
activeFiltersContainer.addEventListener('click', ... );
clearBtn.addEventListener('click', ... );
document.querySelector('#search-bar')?.addEventListener('input', applyFilters);
