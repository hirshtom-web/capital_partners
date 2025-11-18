<script src="transition.js" defer></script>
<script defer>
  document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // ELEMENTS
    // ========================
    const countrySelector = document.getElementById('countrySelector');
    const countryPopup    = document.getElementById('countryPopup');
    const privacyTrigger  = document.getElementById('privacyTrigger');
    const privacyPopup    = document.getElementById('privacyPopup');
    const savePrivacy     = document.getElementById('savePrivacy');

    // ========================
    // TOGGLE FUNCTIONS (with .open class for smooth mobile slide)
    // ========================
    const toggleCountryPopup = () => {
      const isOpen = countryPopup.classList.toggle('open');
      countryPopup.style.display = isOpen ? 'block' : 'none';
    };

    const togglePrivacyPopup = () => {
      const isOpen = privacyPopup.classList.toggle('open');
      privacyPopup.style.display = isOpen ? 'block' : 'none';
    };

    // ========================
    // COUNTRY SELECTOR
    // ========================
    if (countrySelector && countryPopup) {
      countrySelector.addEventListener('click', e => {
        e.stopPropagation();
        toggleCountryPopup();
      });

      document.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', () => {
          const img  = option.querySelector('img')?.src || '';
          const text = option.textContent.trim();

          const selectorImg  = countrySelector.querySelector('img');
          const selectorText = countrySelector.querySelector('.country-link');

          if (selectorImg)  selectorImg.src = img;
          if (selectorText) selectorText.textContent = text;

          toggleCountryPopup(); // closes it
        });
      });
    }

    // ========================
    // PRIVACY POPUP
    // ========================
    if (privacyTrigger && privacyPopup) {
      privacyTrigger.addEventListener('click', e => {
        e.stopPropagation();
        togglePrivacyPopup();
      });

      if (savePrivacy) {
        savePrivacy.addEventListener('click', () => {
          const selected = document.querySelector('input[name="privacy"]:checked');
          if (selected) {
            console.log('Privacy preference saved:', selected.value);
            // localStorage.setItem('privacyPref', selected.value); // uncomment when ready
          }
          togglePrivacyPopup();
        });
      }
    }

    // ========================
    // CLOSE ON OUTSIDE CLICK OR ESC
    // ========================
    const closeAll = () => {
      if (countryPopup?.classList.contains('open')) toggleCountryPopup();
      if (privacyPopup?.classList.contains('open')) togglePrivacyPopup();
    };

    document.addEventListener('click', e => {
      if (countryPopup?.contains(e.target) || privacyPopup?.contains(e.target)) return;
      if (e.target.closest('#countrySelector, #privacyTrigger')) return;
      closeAll();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAll();
    });

    // Prevent propagation inside popups
    [countryPopup, privacyPopup].forEach(p => p?.addEventListener('click', e => e.stopPropagation()));
  });
</script>
