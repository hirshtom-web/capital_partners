<script defer>
document.addEventListener('DOMContentLoaded', () => {
  async function loadHTML(id, url) {
    const container = document.getElementById(id);
    if (!container) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} failed: ${res.status}`);
      container.innerHTML = await res.text();
      container.style.opacity = 1;
    } catch (err) {
      console.warn(`Failed to load ${id}:`, err);
      container.innerHTML = `<strong>Failed to load: ${id}</strong>`;
      container.style.opacity = 1;
    }
  }

  function initFooter() {
    const footerColumns   = document.querySelectorAll('.footer-column');
    const countrySelector = document.getElementById('countrySelector');
    const countryPopup    = document.getElementById('countryPopup');
    const privacyTrigger  = document.getElementById('privacyTrigger');
    const privacyPopup    = document.getElementById('privacyPopup');
    const savePrivacy     = document.getElementById('savePrivacy');

    // --------- Accordion (mobile) ---------
    const initFooterAccordion = () => {
      const columns = document.querySelectorAll('.footer-column');
      columns.forEach(col => {
        const header = col.querySelector('h4');
        const ul     = col.querySelector('ul');
        const arrow  = col.querySelector('.arrow');
        if (!header || !ul || !arrow) return;

        if (window.innerWidth <= 600) {
          ul.style.display = 'none';
          header.style.cursor = 'pointer';
          header.onclick = () => {
            columns.forEach(c => {
              if (c !== col) {
                c.querySelector('ul')?.style.setProperty('display', 'none');
                c.querySelector('.arrow')?.style.setProperty('transform', 'rotate(0deg)');
                c.classList.remove('active');
              }
            });

            if (ul.style.display === 'block') {
              ul.style.display = 'none';
              arrow.style.transform = 'rotate(0deg)';
              col.classList.remove('active');
            } else {
              ul.style.display = 'block';
              arrow.style.transform = 'rotate(180deg)';
              col.classList.add('active');
            }
          };
        } else {
          ul.style.display = 'block';
          arrow.style.transform = 'rotate(0deg)';
          col.classList.remove('active');
        }
      });
    };

    initFooterAccordion();
    window.addEventListener('resize', initFooterAccordion);

    // --------- Popup helpers ---------
    const openPopup = popup => {
      if (!popup) return;
      popup.style.display = 'block';
      if (window.innerWidth <= 900) popup.classList.add('open');
    };

    const closePopup = popup => {
      if (!popup) return;
      if (window.innerWidth <= 900) popup.classList.remove('open');
      setTimeout(() => {
        if (!popup.classList.contains('open')) popup.style.display = 'none';
      }, 300);
    };

    // --------- Country popup ---------
    if (countrySelector && countryPopup) {
      countrySelector.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = countryPopup.style.display === 'block';
        closePopup(privacyPopup);
        isOpen ? closePopup(countryPopup) : openPopup(countryPopup);
      });

      document.querySelectorAll('.country-option').forEach(opt => {
        opt.addEventListener('click', e => {
          e.stopPropagation();
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

    // --------- Privacy popup ---------
    if (privacyTrigger && privacyPopup) {
      privacyTrigger.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = privacyPopup.style.display === 'block';
        closePopup(countryPopup);
        isOpen ? closePopup(privacyPopup) : openPopup(privacyPopup);
      });

      if (savePrivacy) {
        savePrivacy.addEventListener('click', () => {
          const selected = document.querySelector('input[name="privacy"]:checked');
          if (selected) console.log("Saved privacy option:", selected.value);
          closePopup(privacyPopup);
        });
      }
    }

    // --------- Close outside click ---------
    document.addEventListener('click', e => {
      if (countryPopup && !countryPopup.contains(e.target) && !countrySelector.contains(e.target)) {
        closePopup(countryPopup);
      }
      if (privacyPopup && !privacyPopup.contains(e.target) && !privacyTrigger.contains(e.target)) {
        closePopup(privacyPopup);
      }
    });

    // --------- ESC close ---------
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closePopup(countryPopup);
        closePopup(privacyPopup);
      }
    });

    countryPopup?.addEventListener('click', e => e.stopPropagation());
    privacyPopup?.addEventListener('click', e => e.stopPropagation());
  }

  // --------- Load footer dynamically ---------
  loadHTML("footer", "footer.html").then(() => {
    setTimeout(initFooter, 50); // ensure elements exist
  });
});
</script>
