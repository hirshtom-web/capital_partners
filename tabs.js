document.addEventListener('DOMContentLoaded', () => {
  // ---- OLD SYSTEM (toggle-btn / tab-content) ----
  const oldToggleButtons = document.querySelectorAll('.toggle-btn');
  const oldTabs = document.querySelectorAll('.tab-content');

  oldToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      oldToggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.dataset.tab;
      oldTabs.forEach(tab => tab.classList.remove('active'));
      const targetTab = document.getElementById(tabId);
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // ---- OLD SYSTEM (switch-btn / panel) ----
  const switchButtons = document.querySelectorAll('.switch-btn');
  const panels = document.querySelectorAll('.panel');

  switchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const panelId = btn.dataset.panel;
      panels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(panelId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // ---- NEW SYSTEM (uni-toggle-btn / uni-panel) ----
  const newToggleButtons = document.querySelectorAll('.uni-toggle-btn');
  const newPanels = document.querySelectorAll('.uni-panel');

  newToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      newToggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const targetId = button.dataset.tab;
      newPanels.forEach(panel => panel.classList.remove('active'));
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
});
