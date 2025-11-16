// Full JS: dynamic sections + header + mobile menu + RE keywords

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // Helper to load external HTML into a section by ID
  // -------------------------------
  function loadHTML(id, url) {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    return fetch(url)
      .then(res => res.ok ? res.text() : Promise.reject(`${url} failed`))
      .then(html => {
        container.innerHTML = html;

        // Run scripts inside loaded HTML
        const scripts = container.querySelectorAll("script");
        scripts.forEach(oldScript => {
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
  // HEADER: load + background + mobile menu
  // -------------------------------
  loadHTML("header", "header.html").then(() => {
    
    const header = document.getElementById("header");
    const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

    if (header) {
      header.classList.toggle("header--blue", isHome);
      header.classList.toggle("header--white", !isHome);
    }

    // 🔥 MOBILE MENU TOGGLE — WORKS NOW
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
      });
    }

    // 🔥 MOBILE SUBMENU — MUST BE INSIDE THIS THEN()
    document.querySelectorAll(".mobile-menu > li").forEach((item) => {
      const submenu = item.querySelector(".submenu");
      const link = item.querySelector("a");

      if (submenu && link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          // Close others
          document.querySelectorAll(".mobile-menu .expanded").forEach((openItem) => {
            if (openItem !== item) openItem.classList.remove("expanded");
          });

          item.classList.toggle("expanded");
        });
      }
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

    // Special: RE-CONTAINER + populate after load
    loadHTML("re-container", "re-container.html").then(() => {
      populateREKeywords();
    })
  ];

  Promise.allSettled(loads).then(() => {
    console.log("✔ All sections loaded successfully.");
  });

  // -------------------------------
  // Keyword generator for RE container
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

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

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
