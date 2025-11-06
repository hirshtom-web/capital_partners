document.addEventListener('DOMContentLoaded', () => {
  const chartHeight = document.querySelector('.graph-chart').offsetHeight;

  // Animate bars
  document.querySelectorAll('.graph-bar').forEach(bar => {
    const percent = parseFloat(bar.getAttribute('data-height'));
    const pixelHeight = (percent / 100) * chartHeight;
    bar.style.height = pixelHeight + 'px';
  });

  // Shorten bar labels on mobile
  if (window.innerWidth <= 600) {
    document.querySelectorAll('.graph-bar-label').forEach(label => {
      const shortLabel = label.getAttribute('data-label-mobile');
      if (shortLabel) {
        label.textContent = shortLabel;
      }
    });
  }

  // Chart configuration
  const canvas = document.getElementById('performanceChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const labels = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
    const actualData = [5.1, 5.1, 4.9, 4.7, 3.7, 2.6, 3.3, 12.2, 12.9, 9.8, 8.9, null];
    const forecastData = [null, null, null, null, null, null, null, null, null, null, 8.9, 11.4];
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'צמיחה שנתית',
            data: actualData,
            borderColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) return '#7474e8';
              const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
              gradient.addColorStop(0, '#7474e8');
              gradient.addColorStop(1, '#a758db');
              return gradient;
            },
            tension: 0.35,
            fill: true,
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) return 'rgba(116, 116, 232, 0.5)';
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'rgba(116, 116, 232, 0.5)');
              gradient.addColorStop(1, 'rgba(116, 116, 232, 0)');
              return gradient;
            },
            borderWidth: 3,
            pointRadius: function(context) {
              if (context.dataIndex === 0) return 0;
              return window.innerWidth <= 600 ? 4.5 : 6;
            },
            pointHoverRadius: function(context) {
              if (context.dataIndex === 0) return 0;
              return window.innerWidth <= 600 ? 6.5 : 9;
            },
            pointBackgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) return '#7474e8';
              const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
              gradient.addColorStop(0, '#7474e8');
              gradient.addColorStop(1, '#a758db');
              return gradient;
            },
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            spanGaps: true
          },
          {
            label: 'תחזית',
            data: forecastData,
            borderColor: '#ED1566',
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) return 'rgba(237, 21, 102, 0.3)';
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'rgba(237, 21, 102, 0.3)');
              gradient.addColorStop(1, 'rgba(237, 21, 102, 0)');
              return gradient;
            },
            borderDash: [5, 5],
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointRadius: function(context) {
              return context.dataIndex === labels.length - 2 ? 0 : (window.innerWidth <= 600 ? 4.5 : 6);
            },
            pointHoverRadius: function(context) {
              return context.dataIndex === labels.length - 2 ? 0 : (window.innerWidth <= 600 ? 6.5 : 8);
            },
            pointBackgroundColor: '#ED1566',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointStyle: 'circle',
            spanGaps: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        plugins: {
          tooltip: {
            rtl: true,
            backgroundColor: '#fff',
            titleColor: '#333',
            bodyColor: '#333',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 8,
            boxPadding: 6,
            displayColors: false,
            callbacks: {
              label: function(context) {
                if (context.dataset.label === 'תחזית' && context.dataIndex === labels.length - 2) return null;
                if (context.dataIndex === 0 && context.dataset.label === 'צמיחה שנתית') {
                  return `שיעור צמיחה: ${actualData[1]}%`;
                }
                return `שיעור צמיחה: ${context.formattedValue}%`;
              },
              title: function(context) {
                return `שנה: ${context[0].label}`;
              }
            },
            titleFont: {
              weight: 'bold',
              size: function(context) {
                return window.innerWidth <= 600 ? 6 : 16;
              }
            },
            bodyFont: {
              size: function(context) {
                return window.innerWidth <= 600 ? 6 : 14;
              }
            }
          },
          legend: { display: false }
        },
        scales: {
          x: {
            offset: false,
            ticks: {
              callback: function(value, index) {
                if (window.innerWidth <= 600) {
                  const mobileYears = ['2015', '2017', '2019', '2021', '2023', '2025'];
                  return mobileYears.includes(labels[index]) ? labels[index] : '';
                }
                return labels[index];
              },
              font: {
                size: function(context) {
                  return window.innerWidth <= 600 ? 8 : 12;
                }
              },
              maxRotation: function(context) {
                return window.innerWidth <= 600 ? 45 : 0;
              },
              minRotation: function(context) {
                return window.innerWidth <= 600 ? 45 : 0;
              }
            },
            grid: { display: false }
          },
          y: {
            min: 0,
            max: 15,
            ticks: {
              stepSize: 2.5,
              callback: function(value) {
                if (window.innerWidth <= 600) {
                  return [5, 10, 15].includes(value) ? value + '%' : '';
                }
                return value + '%';
              },
              font: {
                size: function(context) {
                  return window.innerWidth <= 600 ? 8 : 12;
                }
              }
            },
            grid: { color: '#eee' }
          }
        }
      }
    });
  }

  // Gauge animation
  const gauges = [
    { id: 'gauge1', textId: 'value1', value: 9.42 },
    { id: 'gauge2', textId: 'value2', value: 7.61 },
    { id: 'gauge3', textId: 'value3', value: 10.26 },
    { id: 'gauge4', textId: 'value4', value: 9.12 }
  ];
  const maxVal = 11, duration = 1500;
  gauges.forEach(g => {
    const arc = document.getElementById(g.id), txt = document.getElementById(g.textId);
    if (!arc || !txt) return;
    const pathLen = 251.2;
    arc.style.strokeDasharray = pathLen;
    arc.style.strokeDashoffset = pathLen;
    const start = performance.now();
    function animate(ts) {
      const p = Math.min((ts - start) / duration, 1);
      const eased = p * (2 - p);
      const offset = pathLen * (1 - (g.value / maxVal) * eased);
      arc.style.strokeDashoffset = offset;
      txt.textContent = (g.value * eased).toFixed(2) + '%';
      if (p < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });

  // Collapsible text
  const text = document.getElementById('text'), btn = document.getElementById('toggle'), wrapper = document.getElementById('textWrapper');
  if (text && btn && wrapper) {
    btn.addEventListener('click', () => {
      text.classList.toggle('collapsed');
      wrapper.classList.toggle('expanded');
      btn.textContent = text.classList.contains('collapsed') ? 'עוד פרטים' : 'פחות פרטים';
    });
  }

  // Initialize Feather Icons
  feather.replace();
});

// Map popup functions (outside DOMContentLoaded for accessibility)
function openMapPopup() {
  document.getElementById("mapPopup").classList.add("show");
}

function closeMapPopup() {
  document.getElementById("mapPopup").classList.remove("show");
}

document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = (element, callback) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);  // stop observing after animation triggered
        }
      });
    });
    observer.observe(element);
  };

  // Example for your loading effect elements
  document.querySelectorAll('.loading-effect').forEach(el => {
    animateOnScroll(el, (element) => {
      // Run your animation logic here, e.g. add a class:
      element.classList.add('animate');
    });
  });
});

  function toggleMenu(el) {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
    el.classList.toggle('active');
  }
   
feather.replace();

/* -------------------- DROPDOWN TOGGLE (FIXED) -------------------- */
document.querySelectorAll('.dropdown').forEach(drop => {
  drop.addEventListener('click', (e) => {
    // If clicked inside dropdown-content, don’t toggle
    if (e.target.closest('.dropdown-content')) return;

    e.stopPropagation();
    const isActive = drop.classList.contains('active');
    // Close all
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    // Open current if it wasn’t active
    if (!isActive) drop.classList.add('active');
  });
});

// Prevent dropdown closing when clicking inside
document.querySelectorAll('.dropdown-content').forEach(menu => {
  menu.addEventListener('click', e => e.stopPropagation());
});

// Close dropdowns when clicking anywhere else
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
});

/* -------------------- FILTER LOGIC -------------------- */
const activeFiltersContainer = document.querySelector('.active-filters');
const propertyCards = document.querySelectorAll('.property-card');
const clearBtn = document.querySelector('.clear-filters-btn');

const selectedFilters = {
  city: [],
  price: [],
  type: [],
  status: []
};

function applyFilters() {
  const searchTerm = document.querySelector('#search-bar')?.value.toLowerCase() || '';

  propertyCards.forEach(card => {
    let show = true;
    const projectName = card.querySelector('.project-name').textContent.toLowerCase();

    // Search
    if (searchTerm && !projectName.includes(searchTerm)) show = false;

    // City filter
    if (show && selectedFilters.city.length > 0) {
      const city = card.querySelector('.project-name').textContent;
      show = selectedFilters.city.some(f => city.includes(f));
    }

    // Type filter
    if (show && selectedFilters.type.length > 0) {
      const type = card.querySelector('.project-name').textContent;
      show = selectedFilters.type.some(f => type.includes(f));
    }

    // Status filter
    if (show && selectedFilters.status.length > 0) {
      const status = card.querySelector('.status-tag').textContent.trim();
      show = selectedFilters.status.includes(status);
    }

    // Price filter
    if (show && selectedFilters.price.length > 0) {
      const priceText = card.querySelector('.price').textContent.replace(/[^0-9]/g, '');
      const price = parseInt(priceText, 10);
      show = selectedFilters.price.some(range => {
        if (range === '0-2M') return price <= 2000000;
        if (range === '2-4M') return price > 2000000 && price <= 4000000;
        if (range === '4M+') return price > 4000000;
      });
    }

    card.style.display = show ? '' : 'none';
  });
}

function updateFilterBarState() {
  const filtersBar = document.querySelector('.filters-bar');
  const hasTags = activeFiltersContainer.children.length > 0;
  filtersBar.classList.toggle('has-tags', hasTags);
}

/* -------------------- CHECKBOX CHANGE -------------------- */
document.querySelectorAll('.dropdown-content input').forEach(input => {
  input.addEventListener('change', () => {
    const filterType = input.closest('.dropdown').dataset.filter;
    const value = input.value;

    if (input.checked) {
      if (!selectedFilters[filterType].includes(value)) {
        selectedFilters[filterType].push(value);
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.dataset.value = value;
        tag.dataset.filter = filterType;
        tag.innerHTML = `${value} <button>×</button>`;
        activeFiltersContainer.appendChild(tag);
      }
    } else {
      selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
      document.querySelector(`.filter-tag[data-value="${value}"]`)?.remove();
    }

    applyFilters();
    updateFilterBarState();
    updateClearButtonVisibility();
  });
});

/* -------------------- REMOVE TAG -------------------- */
activeFiltersContainer.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const tag = e.target.closest('.filter-tag');
    const value = tag.dataset.value;
    const filterType = tag.dataset.filter;

    selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== value);
    document.querySelector(`.dropdown-content input[value="${value}"]`).checked = false;
    tag.remove();
    applyFilters();
    updateFilterBarState();
    updateClearButtonVisibility();
  }
});

/* -------------------- CLEAR ALL FILTERS -------------------- */
function updateClearButtonVisibility() {
  const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);
  clearBtn.style.display = hasFilters ? 'inline-block' : 'none';
}

clearBtn.addEventListener('click', () => {
  Object.keys(selectedFilters).forEach(key => selectedFilters[key] = []);
  document.querySelectorAll('.dropdown-content input').forEach(i => (i.checked = false));
  document.querySelectorAll('.filter-tag').forEach(tag => tag.remove());
  applyFilters();
  updateFilterBarState();
  updateClearButtonVisibility();
});

/* -------------------- SEARCH -------------------- */
const searchInput = document.querySelector('#search-bar');
if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

/* -------------------- SLIDER ARROWS -------------------- */
document.querySelectorAll('.slider-container').forEach(container => {
  const imgs = container.querySelectorAll('.slider-images img');
  let currentIndex = 0;

  const leftArrow = document.createElement('div');
  const rightArrow = document.createElement('div');
  leftArrow.className = 'slider-arrow left';
  rightArrow.className = 'slider-arrow right';
  leftArrow.innerHTML = `<i data-feather="chevron-left"></i>`;
  rightArrow.innerHTML = `<i data-feather="chevron-right"></i>`;
  container.append(leftArrow, rightArrow);

  function showSlide(index) {
    imgs.forEach((img, i) => img.classList.toggle('active', i === index));
  }

  showSlide(currentIndex);

  leftArrow.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    showSlide(currentIndex);
  });
  rightArrow.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % imgs.length;
    showSlide(currentIndex);
  });
});

/* -------------------- MAP INIT -------------------- */
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.0853, lng: 34.7818 },
    zoom: 12,
  });
}
window.onload = initMap;

/* -------------------- MAP / GRID VIEW TOGGLE -------------------- */
const mapSection = document.getElementById('map');
const gridWrapper = document.querySelector('.property-grid-wrapper');
const viewButtons = document.querySelectorAll('.view-toggle button');

viewButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    viewButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const mode = btn.dataset.view;

    if (mode === 'map') {
      mapSection.style.display = 'block';
      gridWrapper.style.display = 'none';
    } else if (mode === 'grid') {
      mapSection.style.display = 'none';
      gridWrapper.style.display = 'block';
    } else {
      mapSection.style.display = 'block';
      gridWrapper.style.display = 'block';
    }
  });
});

/* -------------------- REFRESH FEATHER ICONS -------------------- */
feather.replace();
