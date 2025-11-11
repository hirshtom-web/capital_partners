const keywords = [
  "I'm looking for a new condo",
  "I want to refinance my home",
  "Looking for investment property",
  "Need a vacation home",
  "Searching for a townhouse",
  "Want to sell my house",
  "Buying first home",
  "Interested in luxury real estate",
  "Looking for rental property",
  "Need commercial property",
  "Looking for waterfront property",
  "Seeking fixer-upper",
  "Need mortgage advice",
  "Looking for a plot of land",
  "Interested in new developments",
  "Want a retirement home",
  "Looking for a duplex",
  "Need property management",
  "Seeking vacation rental",
  "Looking for a historic home"
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadKeywords() {
  const container = document.getElementById("re-container");
  container.innerHTML = ""; // clear previous

  const shuffled = shuffleArray([...keywords]);
  const firstSix = shuffled.slice(0, 6); // first 6 random keywords

  // Add "It's something else..." as the 7th item
  firstSix.push("It's something else...");

  // Create and append all 7 items
  firstSix.forEach(keyword => {
    const div = document.createElement("div");
    div.className = "re-phrase";
    div.textContent = keyword;
    container.appendChild(div);
  });
}

// Run on page load
window.addEventListener("DOMContentLoaded", loadKeywords);
