<script src="transition.js" defer></script>
<script defer>
document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------
  // Footer collapsible columns
  // ----------------------------
  if (window.innerWidth <= 600) {
    const footerColumns = document.querySelectorAll('.footer-column h4');
    footerColumns.forEach(header => {
      header.style.cursor = 'pointer';
      const ul = header.nextElementSibling;
      ul.style.display = 'none'; // collapsed by default

      header.addEventListener('click', () => {
        ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
      });
    });
  }

  // ----------------------------
  // Popups (country & privacy)
  // ----------------------------
  const countrySelector = document.getElementById('countrySelector');
  const countryPopup    = document.getElementById('countryPopup');
  const privacyTrigger  = document.getElementById('privacyTrigger');
  const privacyPopup    = document.getElementById('privacyPopup');
  const savePrivacy     = document.getElementById('savePrivacy');

  const openPopup = (popup) => {
    if (!popup) return;
    popup.style.display = 'block';
    if (window.innerWidth <= 900) popup.classList.add('open');
  };

  const closePopup = (popup) => {
    if (!popup) return;
    if (window.innerWidth <= 900) popup.classList.remove('open');
    setTimeout(() => {
      if (!popup.classList.contains('open')) popup.style.display = 'none';
    }, 350);
  };

  // ----------------------------
  // Country selector logic
  // ----------------------------
  if (countrySelector && countryPopup) {
    countrySelector.addEventListener('click', (e) => {
      e.stopPropagation();
      if (countryPopup.style.display === 'block') {
        closePopup(countryPopup);
      } else {
        closePopup(privacyPopup); // close other popup
        openPopup(countryPopup);
      }
    });

    document.querySelectorAll('.country-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const img = opt.querySelector('img')?.src;
        const text = opt.textContent.trim();
        const selImg = countrySelector.querySelector('img');
        const selText = countrySelector.querySelector('.country-link');
        if (selImg) selImg.src = img;
        if (selText) selText.textContent = text;
        closePopup(countryPopup);
      });
    });
  }

  // ----------------------------
  // Privacy popup logic
  // ----------------------------
  if (privacyTrigger && privacyPopup) {
    privacyTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (privacyPopup.style.display === 'block') {
        closePopup(privacyPopup);
      } else {
        closePopup(countryPopup);
        openPopup(privacyPopup);
      }
    });

    savePrivacy?.addEventListener('click', () => {
      const selected = document.querySelector('input[name="privacy"]:checked');
      if (selected) console.log('Saved privacy option:', selected.value);
      closePopup(privacyPopup);
    });
  }

  // ----------------------------
  // Close popups on outside click or ESC
  // ----------------------------
  document.addEventListener('click', () => {
    closePopup(countryPopup);
    closePopup(privacyPopup);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(countryPopup);
      closePopup(privacyPopup);
    }
  });

  // Stop propagation inside popups
  countryPopup?.addEventListener('click', e => e.stopPropagation());
  privacyPopup?.addEventListener('click', e => e.stopPropagation());
});
</script>
