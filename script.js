document.addEventListener('DOMContentLoaded', () => {
  // === Hamburger Toggle ===
  const hamburger = document.querySelector('.hamburger');
  const menuContainer = document.querySelector('.menu-container');

  if (hamburger && menuContainer) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isExpanded));
      menuContainer.classList.toggle('show');
    });

    hamburger.addEventListener('keydown', e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        hamburger.click();
      }
    });
  }

  // === Animate Graph Bars ===
  const chartHeight = document.querySelector('.graph-chart')?.offsetHeight || 0;
  document.querySelectorAll('.graph-bar').forEach(bar => {
    const percent = parseFloat(bar.getAttribute('data-height'));
    const pixelHeight = (percent / 100) * chartHeight;
    bar.style.height = pixelHeight + 'px';
  });

  // === Shorten Bar Labels on Mobile ===
  if (window.innerWidth <= 600) {
    document.querySelectorAll('.graph-bar-label').forEach(label => {
      const shortLabel = label.getAttribute('data-label-mobile');
      if (shortLabel) {
        label.textContent = shortLabel;
      }
    });
  }

  // === Chart.js Initialization ===
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
            borderColor: (ctx) => {
              const { chartArea, ctx: context } = ctx.chart;
              if (!chartArea) return '#7474e8';
              const gradient = context.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
              gradient.addColorStop(0, '#7474e8');
              gradient.addColorStop(1, '#a758db');
              return gradient;
            },
            tension: 0.35,
            fill: true,
            backgroundColor: (ctx) => {
              const { chartArea, ctx: context } = ctx.chart;
              if (!chartArea) return 'rgba(116, 116, 232, 0.5)';
              const gradient = context.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'rgba(116, 116, 232, 0.5)');
              gradient.addColorStop(1, 'rgba(116, 116, 232, 0)');
              return gradient;
            },
            borderWidth: 3,
            pointRadius: (ctx) => ctx.dataIndex === 0 ? 0 : (window.innerWidth <= 600 ? 4.5 : 6),
            pointHoverRadius: (ctx) => ctx.dataIndex === 0 ? 0 : (window.innerWidth <= 600 ? 6.5 : 9),
            pointBackgroundColor: (ctx) => {
              const { chartArea, ctx: context } = ctx.chart;
              if (!chartArea) return '#7474e8';
              const gradient = context.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
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
            backgroundColor: (ctx) => {
              const { chartArea, ctx: context } = ctx.chart;
              if (!chartArea) return 'rgba(237, 21, 102, 0.3)';
              const gradient = context.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'rgba(237, 21, 102, 0.3)');
              gradient.addColorStop(1, 'rgba(237, 21, 102, 0)');
              return gradient;
            },
            borderDash: [5, 5],
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointRadius: (ctx) => ctx.dataIndex === labels.length - 2 ? 0 : (window.innerWidth <= 600 ? 4.5 : 6),
            pointHoverRadius: (ctx) => ctx.dataIndex === labels.length - 2 ? 0 : (window.innerWidth <= 600 ? 6.5 : 8),
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
              label: function(ctx) {
                if (ctx.dataset.label === 'תחזית' && ctx.dataIndex === labels.length - 2) return null;
                if (ctx.dataIndex === 0 && ctx.dataset.label === 'צמיחה שנתית') {
                  return `שיעור צמיחה: ${actualData[1]}%`;
                }
                return `שיעור צמיחה: ${ctx.formattedValue}%`;
              },
              title: function(ctx) {
                return `שנה: ${ctx[0].label}`;
              }
            },
            titleFont: {
              weight: 'bold',
              size: () => window.innerWidth <= 600 ? 6 : 16
            },
            bodyFont: {
              size: () => window.innerWidth <= 600 ? 6 : 14
            }
          },
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: {
              callback: (value, index) => {
                if (window.innerWidth <= 600) {
                  const mobileYears = ['2015', '2017', '2019', '2021', '2023', '2025'];
                  return mobileYears.includes(labels[index]) ? labels[index] : '';
                }
                return labels[index];
              },
              font: {
                size: () => window.innerWidth <= 600 ? 8 : 12
              },
              maxRotation: () => window.innerWidth <= 600 ? 45 : 0,
              minRotation: () => window.innerWidth <= 600 ? 45 : 0
            },
            grid: { display: false }
          },
          y: {
            min: 0,
            max: 15,
            ticks: {
              stepSize: 2.5,
              callback: (value) => window.innerWidth <= 600 && ![5, 10, 15].includes(value) ? '' : value + '%',
              font: {
                size: () => window.innerWidth <= 600 ? 8 : 12
              }
            },
            grid: { color: '#eee' }
          }
        }
      }
    });
  }

  // === Gauge Animation ===
  const gauges = [
    { id: 'gauge1', textId: 'value1', value: 9.42 },
    { id: 'gauge2', textId: 'value2', value: 7.61 },
    { id: 'gauge3', textId: 'value3', value: 10.26 },
    { id: 'gauge4', textId: 'value4', value: 9.12 }
  ];
  const maxVal = 11, duration = 1500;
  gauges.forEach(g => {
    const arc = document.getElementById(g.id);
    const txt = document.getElementById(g.textId);
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

  // === Collapsible Text ===
  const text = document.getElementById('text');
  const btn = document.getElementById('toggle');
  const wrapper = document.getElementById('textWrapper');
  if (text && btn && wrapper) {
    btn.addEventListener('click', () => {
      text.classList.toggle('collapsed');
      wrapper.classList.toggle('expanded');
      btn.textContent = text.classList.contains('collapsed') ? 'עוד פרטים' : 'פחות פרטים';
    });
  }

  // === Feather Icons ===
  if (typeof feather !== 'undefined') feather.replace();
});

// === Map Popup Functions ===
function openMapPopup() {
  document.getElementById("mapPopup")?.classList.add("show");
}
function closeMapPopup() {
  document.getElementById("mapPopup")?.classList.remove("show");
}
