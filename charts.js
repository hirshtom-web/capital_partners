document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('performanceChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const labels = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  const actualData = [5.1, 5.1, 4.9, 4.7, 3.7, 2.6, 3.3, 12.2, 12.9, 9.8, 8.9, null];
  const forecastData = [null, null, null, null, null, null, null, null, null, null, 8.9, 11.4];

  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [ /* actual + forecast dataset code */ ] },
    options: { /* all your scales, tooltips, responsive options */ }
  });
});
