document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  fetch("header.html")
    .then(response => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then(html => {
      headerContainer.innerHTML = html;
    })
    .catch(err => console.error("Error loading header:", err));
});

function toggleMenu(element) {
  const nav = document.getElementById('nav-menu');
  nav.classList.toggle('active');
  element.classList.toggle('active'); // rotates hamburger into X
}
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.href === window.location.href) {
      e.preventDefault(); // Prevent reload/jump
      console.log('Already on this page!');
    }
  });
});
// Prevent default jump for all links with href="#"
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // stops the jump
    });
  });
});

// JS to trigger fade-in
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

document.querySelectorAll('nav a[href="#"]').forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});

