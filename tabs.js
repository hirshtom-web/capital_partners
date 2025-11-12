document.addEventListener('DOMContentLoaded', () => {
  const newToggleButtons = document.querySelectorAll('.uni-toggle-btn');
  const newPanels = document.querySelectorAll('.uni-panel');

  newToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      newToggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Hide all panels
      newPanels.forEach(panel => panel.classList.remove('active'));

      // Show the selected panel
      const target = button.dataset.tab;
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
});
