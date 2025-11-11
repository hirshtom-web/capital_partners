const popup = document.getElementById('popup');
const openBtn = document.getElementById('openPopup');
const closeBtn = document.getElementById('closePopup');

// Open popup
openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popup.style.display = 'flex';
});

// Close popup
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Close when clicking outside popup-card
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});
