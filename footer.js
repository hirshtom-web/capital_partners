<script defer>
document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------
  // Footer collapsible columns (accordion style)
  // ----------------------------
  if (window.innerWidth <= 600) {
    const footerColumns = document.querySelectorAll('.footer-column');
    
    footerColumns.forEach(column => {
      const header = column.querySelector('h4');
      const ul = column.querySelector('ul');
      
      // Add arrow
      const arrow = document.createElement('span');
      arrow.textContent = '▼'; // closed arrow
      arrow.style.float = 'right';
      arrow.style.transition = 'transform 0.3s';
      header.appendChild(arrow);

      ul.style.display = 'none'; // collapsed by default
      header.style.cursor = 'pointer';

      header.addEventListener('click', () => {
        // Close all other columns
        footerColumns.forEach(col => {
          const otherUl = col.querySelector('ul');
          const otherArrow = col.querySelector('h4 span');
          if (col !== column) {
            otherUl.style.display = 'none';
            otherArrow.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle this column
        if (ul.style.display === 'block') {
          ul.style.display = 'none';
          arrow.style.transform = 'rotate(0deg)';
        } else {
          ul.style.display = 'block';
          arrow.style.transform = 'rotate(180deg)'; // point up
        }
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

  // Country
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
