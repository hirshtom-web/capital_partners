document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('performanceChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const labels = [...];
  const actualData = [...];
  const forecastData = [...];

  new Chart(ctx, { ...chart options... });
});
