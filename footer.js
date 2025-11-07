<script>
document.addEventListener('DOMContentLoaded', () => {
  const columns = document.querySelectorAll('.footer-column');
  const selector = document.getElementById('countrySelector');
  const popup = document.getElementById('countryPopup');
  const privacyTrigger = document.getElementById('privacyTrigger');
  const privacyPopup = document.getElementById('privacyPopup');
  const savePrivacy = document.getElementById('savePrivacy');

  // ---------- Mobile collapsible setup ----------
  function setupMobile() {
    const isMobile = window.innerWidth <= 900;
    columns.forEach(col => {
      const title = col.querySelector('h4');
      const list = col.querySelector('ul');

      if (!title || !list) return;

      if (!isMobile) {
        col.classList.remove('active', 'collapsed');
        list.style.display = 'block';
        title.onclick = null;
        return;
      }

      col.classList.add('collapsed');
      list.style.display = 'none';
      title.onclick = () => {
        const isActive = col.classList.contains('active');
        col.classList.toggle('active', !isActive);
        list.style.display = !isActive ? 'block' : 'none';
      };
    });
  }

  setupMobile();
  window.addEventListener('resize', setupMobile);

  // ---------- Country selector popup ----------
  if (selector && popup) {
    selector.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll('.country-option').forEach(option => {
      option.addEventListener('click', () => {
        const img = option.querySelector('img')?.src;
        const name = option.textContent.trim();
        if (img && selector.querySelector('img')) {
          selector.querySelector('img').src = img;
        }
        selector.querySelector('.country-link').textContent = name;
        popup.style.display = 'none';
      });
    });
  }

  // ---------- Privacy popup toggle ----------
  if (privacyTrigger && privacyPopup) {
    privacyTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      privacyPopup.style.display = privacyPopup.style.display === 'block' ? 'none' : 'block';
    });

    if (savePrivacy) {
      savePrivacy.addEventListener('click', () => {
        const selected = document.querySelector('input[name="privacy"]:checked');
        if (selected) alert(`Your preference: ${selected.value}`);
        privacyPopup.style.display = 'none';
      });
    }
  }

  // ---------- Close popups when clicking outside ----------
  document.addEventListener('click', () => {
    if (popup) popup.style.display = 'none';
    if (privacyPopup) privacyPopup.style.display = 'none';
  });
});
</script>
