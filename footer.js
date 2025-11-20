<script defer>
document.addEventListener('DOMContentLoaded', () => {
  const footerColumns = document.querySelectorAll('.footer-column');

  // ----------------------------
  // Footer collapsible columns (accordion style)
  // ----------------------------
  const initFooterAccordion = () => {
    if (window.innerWidth > 600) return; // only mobile

    footerColumns.forEach(col => {
      const header = col.querySelector('h4');
      const ul = col.querySelector('ul');
      const arrow = col.querySelector('.arrow');

      ul.style.display = 'none'; // collapsed by default
      header.style.cursor = 'pointer';

      header.addEventListener('click', () => {
        // Close other columns
        footerColumns.forEach(c => {
          if (c !== col) {
            c.querySelector('ul').style.display = 'none';
            c.querySelector('.arrow').style.transform = 'rotate(0deg)';
          }
        });

        // Toggle current column
        if (ul.style.display === 'block') {
          ul.style.display = 'none';
          arrow.style.transform = 'rotate(0deg)';
        } else {
          ul.style.display = 'block';
          arrow.style.transform = 'rotate(180deg)'; // point up
        }
      });
    });
  };

  initFooterAccordion();

  // Optional: re-init on resize
  window.addEventListener('resize', () => {
    footerColumns.forEach(col => {
      const ul = col.querySelector('ul');
      const arrow = col.querySelector('.arrow');
      if (window.innerWidth > 600) {
        ul.style.display = 'block'; // always show on desktop
        arrow.style.transform = 'rotate(0deg)';
      } else {
        ul.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
      }
    });
    initFooterAccordion();
  });

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

  // Country popup
  if (countrySelector && countryPopup) {
    countrySelector.addEventListener('click', (e) => {
      e.stopPropagation();
      if (countryPopup.style.display === 'block') {
        closePopup(countryPopup);
      } else {
        closePopup(privacyPopup);
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

  // Privacy popup
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

  // Close popups on outside click or ESC
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

  countryPopup?.addEventListener('click', e => e.stopPropagation());
  privacyPopup?.addEventListener('click', e => e.stopPropagation());
});
</script>
