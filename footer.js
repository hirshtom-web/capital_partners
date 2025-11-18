<script src="transition.js" defer></script>
<script defer>
document.addEventListener('DOMContentLoaded', () => {
  const countrySelector = document.getElementById('countrySelector');
  const countryPopup    = document.getElementById('countryPopup');
  const privacyTrigger  = document.getElementById('privacyTrigger');
  const privacyPopup    = document.getElementById('privacyPopup');
  const savePrivacy     = document.getElementById('savePrivacy');

  // Toggle with .open class only on mobile (for smooth slide), always control display
  const openPopup = (popup) => {
    popup.style.display = 'block';
    if (window.innerWidth <= 900) popup.classList.add('open');
  };
  const closePopup = (popup) => {
    if (window.innerWidth <= 900) popup.classList.remove('open');
    setTimeout(() => { if (!popup.classList.contains('open')) popup.style.display = 'none'; }, 350);
  };

  // Country
  if (countrySelector && countryPopup) {
    countrySelector.addEventListener('click', (e) => {
      e.stopPropagation();
      if (countryPopup.style.display === 'block') {
        closePopup(countryPopup);
      } else {
        closePopup(privacyPopup); // close the other one if open
        openPopup(countryPopup);
      }
    });

    document.querySelectorAll('.country-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const img = opt.querySelector('img')?.src;
        const text = opt.textContent.trim();
        countrySelector.querySelector('img').src = img;
        countrySelector.querySelector('.country-link').textContent = text;
        closePopup(countryPopup);
      });
    });
  }

  // Privacy
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
      if (selected) console.log('Saved:', selected.value);
      closePopup(privacyPopup);
    });
  }

  // Close on outside click or ESC
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
