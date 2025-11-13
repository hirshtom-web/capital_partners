document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Helper: Load external HTML (returns a Promise)
  // =========================
  const loadHTML = (id, url, errorMsg) => {
    return new Promise((resolve, reject) => {
      const container = document.getElementById(id);
      if (!container) return resolve(); // skip if container missing

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(errorMsg);
          return response.text();
        })
        .then(html => {
          container.innerHTML = html;
          resolve(); // resolve after loading
        })
        .catch(err => {
          console.error(err);
          resolve(); // still resolve so Promise.allSettled continues
        });
    });
  };

  // =========================
  // Load all sections
  // =========================
  const loads = [
    loadHTML("header", "header.html", "Header not found"),
    loadHTML("main-section", "main-section.html", "Main section not found"),
    loadHTML(
      "trusted-by",
      "https://hirshtom-web.github.io/capital_partners/trusted-by.html",
      "Trusted By section not found"
    ),
    loadHTML("property-slide", "property-slide.html", "Property slide not found"),
    loadHTML("tabs", "tabs.html", "Tabs not found"),
    loadHTML("footer", "footer.html", "Footer not found"),
    loadHTML("re-container", "re-container.html", "Re Container not found")
      .then(() => {
        // ---------------------------
        // Populate keywords after re-container is loaded
        // ---------------------------
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

        function shuffleArray(array) {
          return array.sort(() => Math.random() - 0.5);
        }

        const shuffled = shuffleArray([...keywords]);
        const container = document.getElementById("re-container");
        container.innerHTML = "";

        // ROW 1
        const row1 = document.createElement("div");
        row1.className = "re-row";
        for (let i = 0; i < 3; i++) {
          const item = document.createElement("div");
          item.className = "re-phrase";
          item.textContent = shuffled[i];
          row1.appendChild(item);
        }
        container.appendChild(row1);

        // ROW 2
        const row2 = document.createElement("div");
        row2.className = "re-row";
        for (let i = 3; i < 6; i++) {
          const item = document.createElement("div");
          item.className = "re-phrase";
          item.textContent = shuffled[i];
          row2.appendChild(item);
        }

        const other = document.createElement("div");
        other.className = "re-other";
        other.textContent = "It's something else...";
        row2.appendChild(other);

        container.appendChild(row2);
      })
  ];

  // =========================
  // When all sections loaded
  // =========================
  Promise.allSettled(loads).then(() => {
    console.log("All sections loaded, keywords populated!");
  });
});
