document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Helper: Load external HTML
  // =========================
  const loadHTML = (id, url, errorMsg) => {
    const container = document.getElementById(id);
    if (container) {
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(errorMsg);
          return response.text();
        })
        .then(html => {
          container.innerHTML = html;
        })
        .catch(err => console.error(err));
    }
  };

  // =========================
  // Load Sections
  // =========================
  loadHTML("header", "header.html", "Header not found");
  loadHTML("main-section", "main-section.html", "Main section not found");
  loadHTML(
    "trusted-by",
    "https://hirshtom-web.github.io/capital_partners/trusted-by.html",
    "Trusted By section not found"
  );
  loadHTML("property-slide", "property-slide.html", "Property slide not found");
  
  // <-- NEW: Load footer dynamically -->
  loadHTML("footer", "footer.html", "Footer not found");

  // =========================
  // Toggle Mobile Menu
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
  // Prevent Default Link Jumps
  // =========================
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", e => e.preventDefault());
  });

  // =========================
  // Prevent reload on same-page nav links
  // =========================
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
  // Footer Accordion (Mobile)
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
