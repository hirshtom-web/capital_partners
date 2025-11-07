document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('countrySelector');
  const popup = document.getElementById('countryPopup');
  const privacyTrigger = document.getElementById('privacyTrigger');
  const privacyPopup = document.getElementById('privacyPopup');
  const savePrivacy = document.getElementById('savePrivacy');

  if (selector && popup) {
    selector.addEventListener('click', e => {
      e.stopPropagation();
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });
    popup.addEventListener('click', e => e.stopPropagation());

    document.querySelectorAll('.country-option').forEach(option => {
      option.addEventListener('click', () => {
        const img = option.querySelector('img')?.src;
        const name = option.textContent.trim();
        selector.querySelector('img').src = img;
        selector.querySelector('.country-link').textContent = name;
        popup.style.display = 'none';
      });
    });
  }

  if (privacyTrigger && privacyPopup) {
    privacyTrigger.addEventListener('click', e => {
      e.stopPropagation();
      privacyPopup.style.display = privacyPopup.style.display === 'block' ? 'none' : 'block';
    });
    privacyPopup.addEventListener('click', e => e.stopPropagation());

    if (savePrivacy) {
      savePrivacy.addEventListener('click', () => {
        const selected = document.querySelector('input[name="privacy"]:checked');
        if (selected) alert(`Your preference: ${selected.value}`);
        privacyPopup.style.display = 'none';
      });
    }
  }

  // Close all popups when clicking outside
  document.addEventListener('click', () => {
    if (popup) popup.style.display = 'none';
    if (privacyPopup) privacyPopup.style.display = 'none';
  });
});
