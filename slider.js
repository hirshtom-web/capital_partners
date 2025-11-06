document.querySelectorAll('.slider-container').forEach(container => {
  const imgs = container.querySelectorAll('.slider-images img');
  let currentIndex = 0;

  const leftArrow = document.createElement('div');
  const rightArrow = document.createElement('div');
  leftArrow.className = 'slider-arrow left';
  rightArrow.className = 'slider-arrow right';
  leftArrow.innerHTML = `<i data-feather="chevron-left"></i>`;
  rightArrow.innerHTML = `<i data-feather="chevron-right"></i>`;
  container.append(leftArrow, rightArrow);

  function showSlide(index) { imgs.forEach((img, i) => img.classList.toggle('active', i === index)); }
  showSlide(currentIndex);

  leftArrow.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex - 1 + imgs.length) % imgs.length; showSlide(currentIndex); });
  rightArrow.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex + 1) % imgs.length; showSlide(currentIndex); });
});
