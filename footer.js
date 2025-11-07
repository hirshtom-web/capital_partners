// footer.js

// Wait until the page loads
document.addEventListener('DOMContentLoaded', () => {
  const footerDiv = document.getElementById('footer');

  // Footer HTML directly as a string
  const footerHTML = `
    <footer class="footer">
      <div class="footer-column">
        <h4>About Us</h4>
        <ul>
          <li><a href="#">Company</a></li>
          <li><a href="#">Team</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Contact</h4>
        <ul>
          <li><a href="#">Email</a></li>
          <li><a href="#">Phone</a></li>
        </ul>
      </div>
      <!-- Add more columns, country selector, privacy popup, etc. -->
    </footer>
  `;

  // Insert footer HTML
  footerDiv.innerHTML = footerHTML;

  // ---------- Mobile toggle logic ----------
  const columns = footerDiv.querySelectorAll('.footer-column');
  function setupMobile() {
    const isMobile = window.innerWidth <= 900;
    columns.forEach(col => {
      const title = col.querySelector('h4');
      const list = col.querySelector('ul');
      if (!title || !list) return;

      if (!isMobile) {
        col.classList.remove('active', 'collapsed');
        list.style.display = 'block';
        title.onclick = null;
        return;
      }

      col.classList.add('collapsed');
      list.style.display = 'none';

      title.onclick = () => {
        const isActive = col.classList.contains('active');
        col.classList.toggle('active', !isActive);
        list.style.display = !isActive ? 'block' : 'none';
      };
    });
  }

  setupMobile();
  window.addEventListener('resize', setupMobile);

  // Here you can also add country selector, privacy popup, etc.
});
