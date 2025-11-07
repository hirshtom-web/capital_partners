
<script>
  const buttons = document.querySelectorAll('.toggle-btn');
  const tabs = document.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.dataset.tab;
      tabs.forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });

  const switchBtns = document.querySelectorAll('.switch-btn');
  const panels = document.querySelectorAll('.panel');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const panelId = btn.dataset.panel;
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(panelId).classList.add('active');
    });
  });
</script>
