document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800; 
  const startTime = performance.now();

  // All your section loads (header, main-section, etc.)
  const sections = [
    loadHTML("header", "header.html"),
    loadHTML("main-section", "main-section.html"),
    loadHTML("trusted-by", "https://hirshtom-web.github.io/capital_partners/trusted-by.html"),
    loadHTML("property-slide", "property-slide.html"),
    loadHTML("tabs", "tabs.html"),
    loadHTML("footer", "footer.html"),
    loadHTML("re-container", "re-container.html").then(populateREKeywords)
  ];

  Promise.allSettled(sections).finally(() => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      if (preloader) {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 600);
      }
    }, remaining);

    setTimeout(() => preloader?.remove(), 5000);
  });
});
// Full JS: dynamic sections + header + mobile menu + RE keywords
document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // Helper: load external HTML into a section by ID
  // -------------------------------
  function loadHTML(id, url) {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    return fetch(url)
      .then(res => res.ok ? res.text() : Promise.reject(`${url} failed`))
      .then(html => {
        container.innerHTML = html;

        // Run scripts inside loaded HTML
        container.querySelectorAll("script").forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) newScript.src = oldScript.src;
          else newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
          oldScript.remove();
        });
      })
      .catch(err => console.warn("SECTION FAILED:", err));
  }

  // -------------------------------
  // Reset body & menu states (safe for dynamic pages)
  // -------------------------------
  function resetPageState() {
    document.body.classList.remove("menu-open");
    document.querySelectorAll(".mobile-menu, .mobile-menu .expanded").forEach(el => el.classList.remove("active", "expanded"));
    document.querySelectorAll("#services-submenu.active").forEach(el => el.classList.remove("active"));
    const header = document.getElementById("header");
    if (header) header.classList.remove("header--blue", "header--white");
  }

  // -------------------------------
  // HEADER: load + theme + mobile menu
  // -------------------------------
  loadHTML("header", "header.html").then(() => {
    resetPageState();

    const header = document.getElementById("header");
    const body = document.body;
    const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

    if (header) {
      header.classList.toggle("header--blue", isHome);
      header.classList.toggle("header--white", !isHome);
    }

    // MOBILE MENU TOGGLE
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {
      // Ensure clean initial state
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open");

      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        body.classList.toggle("menu-open", mobileMenu.classList.contains("active"));
      });
    }

    // MOBILE SUBMENU: slide per category
    document.querySelectorAll(".mobile-menu > li").forEach(item => {
      const link = item.querySelector("a");
      const submenu = item.querySelector(".submenu-mobile");

      if (link && submenu) {
        link.addEventListener("click", e => {
          e.preventDefault();

          document.querySelectorAll(".mobile-menu > li.expanded").forEach(openItem => {
            if (openItem !== item) openItem.classList.remove("expanded");
          });

          item.classList.toggle("expanded");
        });
      }
    });

    // SLIDING SUBMENU LOGIC (services)
    const openServices = document.getElementById("open-services");
    const servicesSubmenu = document.getElementById("services-submenu");
    const backLinks = document.querySelectorAll(".mobile-submenu .back-link");

    if (openServices && servicesSubmenu) {
      openServices.addEventListener("click", e => {
        e.preventDefault();
        servicesSubmenu.classList.add("active");
      });
    }

    backLinks.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        servicesSubmenu.classList.remove("active");
      });
    });

  });

  // -------------------------------
  // Load other sections
  // -------------------------------
  const loads = [
    loadHTML("main-section", "main-section.html"),
    loadHTML("trusted-by", "https://hirshtom-web.github.io/capital_partners/trusted-by.html"),
    loadHTML("property-slide", "property-slide.html"),
    loadHTML("tabs", "tabs.html"),
    loadHTML("footer", "footer.html"),

    // RE-CONTAINER + populate keywords
    loadHTML("re-container", "re-container.html").then(() => {
      populateREKeywords();
    })
  ];

  Promise.allSettled(loads).then(() => {
    console.log("✔ All sections loaded successfully.");
  });

  // -------------------------------
  // Real Estate Keywords Generator
  // -------------------------------
  function populateREKeywords() {
    const keywords = [
      "Looking for a new condo",
      "Want to refinance my home",
      "Buying my first property",
      "Exploring investment options",
      "Selling my house",
      "Finding a real estate agent",
      "Interested in luxury homes",
      "Looking for office space",
      "Seeking mortgage advice",
      "Relocating to a new city",
      "Need property valuation",
      "Investing in rental properties",
      "Building a new home",
      "Checking current market trends",
      "Finding foreclosed properties",
      "Upsizing my home",
      "Downsizing after retirement",
      "Interested in vacation homes",
      "Want to co-invest",
      "Looking for real estate partnerships"
    ];

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);
    const list = shuffle([...keywords]);
    const container = document.getElementById("re-container");
    if (!container) return;

    container.innerHTML = "";

    const row1 = document.createElement("div");
    row1.className = "re-row";
    list.slice(0, 3).forEach(text => {
      const d = document.createElement("div");
      d.className = "re-phrase";
      d.textContent = text;
      row1.appendChild(d);
    });

    const row2 = document.createElement("div");
    row2.className = "re-row";
    list.slice(3, 6).forEach(text => {
      const d = document.createElement("div");
      d.className = "re-phrase";
      d.textContent = text;
      row2.appendChild(d);
    });

    const other = document.createElement("div");
    other.className = "re-other";
    other.textContent = "It's something else...";
    row2.appendChild(other);

    container.appendChild(row1);
    container.appendChild(row2);
  }

});
