document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const openBtn = document.getElementById('openPopup');
  const closeBtn = document.getElementById('closePopup');

  if (!popup || !openBtn || !closeBtn) return; // prevent errors if elements are missing

  // Open popup
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('show');
  });

  // Close popup
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('show');
  });

  // Close when clicking outside popup-card
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('show');
    }
  });
});
