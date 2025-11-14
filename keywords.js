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
      // Open your existing popup
      const popup = document.getElementById("popup");
      if (!popup) return;

      popup.style.display = "flex";       // make visible
      popup.style.opacity = "1";          // optional smooth fade if your CSS supports it

      // Optional: focus the first input inside popup
      const firstInput = popup.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  });

  // Optional: close popup button
  const closeBtn = document.getElementById("closePopup");
  if(closeBtn) {
    closeBtn.addEventListener("click", () => {
      const popup = document.getElementById("popup");
      popup.style.display = "none";
    });
  }

  // Optional: click outside popup to close
  const popupBackdrop = document.getElementById("popup");
  if(popupBackdrop) {
    popupBackdrop.addEventListener("click", (ev) => {
      if(ev.target === popupBackdrop) popupBackdrop.style.display = "none";
    });
  }
});
