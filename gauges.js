document.addEventListener('DOMContentLoaded', () => {
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
      arc.style.strokeDashoffset = pathLen * (1 - (g.value / maxVal) * eased);
      txt.textContent = (g.value * eased).toFixed(2) + '%';
      if (p < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });
});
