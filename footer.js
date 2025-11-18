<script src="transition.js" defer></script>
<script defer>
  document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // COUNTRY SELECTOR
    // ========================
    const countrySelector = document.getElementById('countrySelector');
    const countryPopup    = document.getElementById('countryPopup');

    if (countrySelector && countryPopup) {
      const toggleCountryPopup = (show = null) => {
        const shouldShow = show ?? countryPopup.style.display !== 'block';
        countryPopup.style.display = shouldShow ? 'block' : 'none';
      };

      countrySelector.addEventListener('click', (e) => {
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

          toggleCountryPopup(false);
        });
      });
    }

    // ========================
    // PRIVACY POPUP
    // ========================
    const privacyTrigger = document.getElementById('privacyTrigger');
    const privacyPopup   = document.getElementById('privacyPopup');
    const savePrivacy    = document.getElementById('savePrivacy');

    if (privacyTrigger && privacyPopup) {
      const togglePrivacyPopup = (show = null) => {
        const shouldShow = show ?? privacyPopup.style.display !== 'block';
        privacyPopup.style.display = shouldShow ? 'block' : 'none';
      };

      privacyTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePrivacyPopup();
      });

      if (savePrivacy) {
        savePrivacy.addEventListener('click', () => {
          const selected = document.querySelector('input[name="privacy"]:checked');
          if (selected) {
            // Replace alert with whatever you actually want to do
            console.log('Privacy preference saved:', selected.value);
            // Example: localStorage.setItem('privacyPref', selected.value);
          }
          togglePrivacyPopup(false);
        });
      }
    }

    // ========================
    // CLOSE POPUPS ON OUTSIDE CLICK OR ESC
    // ========================
    const closeAllPopups = () => {
      if (countryPopup)   countryPopup.style.display   = 'none';
      if (privacyPopup)   privacyPopup.style.display   = 'none';
    };

    document.addEventListener('click', (e) => {
      // If click is inside any popup → do nothing
      if (countryPopup?.contains(e.target) || privacyPopup?.contains(e.target)) return;
      // If click is on the triggers → already handled above
      if (e.target.closest('#countrySelector, #privacyTrigger')) return;

      closeAllPopups();
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllPopups();
    });

    // Prevent popups from closing when clicking inside them
    [countryPopup, privacyPopup].forEach(popup => {
      popup?.addEventListener('click', e => e.stopPropagation());
    });
  });
</script>
