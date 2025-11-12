document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Load header
  // =========================
  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    fetch("header.html")
      .then(response => {
        if (!response.ok) throw new Error("Header not found");
        return response.text();
      })
      .then(html => {
        headerContainer.innerHTML = html;
      })
      .catch(err => console.error("Error loading header:", err));
  }
  
// =========================
// Load Trusted By Section
// =========================
const trustedContainer = document.getElementById("trusted-by");
if (trustedContainer) {
  fetch("https://hirshtom-web.github.io/capital_partners/trusted-by.html")
    .then(response => {
      if (!response.ok) throw new Error("Trusted By section not found");
      return response.text();
    })
    .then(html => {
      trustedContainer.innerHTML = html;
    })
    .catch(err => console.error("Error loading Trusted By section:", err));
}

  // =========================
  // Load property slide
  // =========================
  const propertySlideContainer = document.getElementById("property-slide");
  if (propertySlideContainer) {
    fetch("property-slide.html")
      .then(response => {
        if (!response.ok) throw new Error("Property slide not found");
        return response.text();
      })
      .then(html => {
        propertySlideContainer.innerHTML = html;
      })
      .catch(err => console.error("Error loading property slide:", err));
  }

  // =========================
  // Toggle mobile menu
  // =========================
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  // =========================
  // Prevent default link jumps
  // =========================
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
      if (this.href === window.location.href) {
        e.preventDefault();
        console.log("Already on this page!");
      }
    });
  });

  // =========================
  // Tabs
  // =========================
  const buttons = document.querySelectorAll(".toggle-btn");
  const tabs = document.querySelectorAll(".tab-content");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tabId = btn.dataset.tab;
      tabs.forEach(tab => tab.classList.remove("active"));
      const activeTab = document.getElementById(tabId);
      if (activeTab) activeTab.classList.add("active");
    });
  });

  // =========================
  // Panels
  // =========================
  const switchBtns = document.querySelectorAll(".switch-btn");
  const panels = document.querySelectorAll(".panel");
  switchBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      switchBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const panelId = btn.dataset.panel;
      panels.forEach(p => p.classList.remove("active"));
      const activePanel = document.getElementById(panelId);
      if (activePanel) activePanel.classList.add("active");
    });
  });

  // =========================
  // Footer accordion for mobile
  // =========================
  const footerColumns = document.querySelectorAll(".footer-column");
  footerColumns.forEach(column => {
    const header = column.querySelector("h4");
    if (header) {
      header.addEventListener("click", () => {
        column.classList.toggle("active");
      });
    }
  });

  // =========================
  // Fade-in effect
  // =========================
  document.body.classList.add("loaded");
});

// =========================
// Optional: toggle menu rotation
// =========================
function toggleMenu(element) {
  const nav = document.getElementById("nav-menu");
  if (nav) nav.classList.toggle("active");
  element.classList.toggle("active"); // rotates hamburger into X
}
