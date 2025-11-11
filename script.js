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


  const buttons = document.querySelectorAll('.toggle-btn');
  const tabs = document.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.dataset.tab;
      tabs.forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });

  const switchBtns = document.querySelectorAll('.switch-btn');
  const panels = document.querySelectorAll('.panel');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const panelId = btn.dataset.panel;
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(panelId).classList.add('active');
    });
  });
const toggleBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
  // select all footer columns on mobile
  const footerColumns = document.querySelectorAll(".footer-column");

  footerColumns.forEach(column => {
    const header = column.querySelector("h4");
    header.addEventListener("click", () => {
      // toggle 'active' class
      column.classList.toggle("active");
    });
  });
});

