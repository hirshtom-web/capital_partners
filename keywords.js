document.addEventListener("DOMContentLoaded", () => {
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
  if (!container) return; // safety check
  container.innerHTML = "";

  // Function to create a row
  function createRow(start, end, extra) {
    const row = document.createElement("div");
    row.className = "re-row";
    for (let i = start; i < end; i++) {
      const item = document.createElement("div");
      item.className = "re-phrase";
      item.textContent = shuffled[i];
      row.appendChild(item);
    }
    if(extra) row.appendChild(extra);
    container.appendChild(row);
  }

  // ROW 1
  createRow(0, 3);

  // ROW 2 + "It's something else..."
  const other = document.createElement("div");
  other.className = "re-other";
  other.textContent = "It's something else...";
  createRow(3, 6, other);

  // ================== KEYWORD CLICK TRIGGER ==================
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("re-phrase") || e.target.classList.contains("re-other")) {
      const keyword = e.target.textContent;

      // Option 2: Load chat-up.html into a popup div
      fetch("/chat-up.html") // ✅ changed URL
        .then(res => res.text())
        .then(html => {
          const popupDiv = document.createElement("div");
          popupDiv.innerHTML = html;
          popupDiv.style.position = "fixed";
          popupDiv.style.top = "0";
          popupDiv.style.left = "0";
          popupDiv.style.width = "100%";
          popupDiv.style.height = "100%";
          popupDiv.style.background = "rgba(0,0,0,0.5)";
          popupDiv.style.zIndex = "9999";
          popupDiv.style.display = "flex";
          popupDiv.style.justifyContent = "center";
          popupDiv.style.alignItems = "center";
          document.body.appendChild(popupDiv);

          // Optional: close on backdrop click
          popupDiv.addEventListener("click", (ev) => {
            if(ev.target === popupDiv) popupDiv.remove();
          });
        })
        .catch(err => {
          console.error("Popup loading error:", err);
          alert("Could not load chat-up.html — check console for details.");
        });
    }
  });
});
