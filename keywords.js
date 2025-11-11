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

// Shuffle helper
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const shuffled = shuffleArray([...keywords]);
const container = document.getElementById("re-container");
container.innerHTML = "";

// Row building logic
for (let i = 0; i < shuffled.length; i += 3) {
  const row = document.createElement("div");
  row.className = "re-row";

  // First row: only 3 items
  if (i === 0) {
    for (let j = 0; j < 3 && j < shuffled.length; j++) {
      const item = document.createElement("div");
      item.className = "re-phrase";
      item.textContent = shuffled[j];
      row.appendChild(item);
    }
  } else {
    // Next rows: 3 + "It's something else..." + 1 frameless keyword
    for (let j = i; j < i + 3 && j < shuffled.length; j++) {
      const item = document.createElement("div");
      item.className = "re-phrase";
      item.textContent = shuffled[j];
      row.appendChild(item);
    }

    // Add frameless “It’s something else...”
    const other = document.createElement("div");
    other.className = "re-other";
    other.textContent = "It's something else...";
    row.appendChild(other);

    // Add one more frameless keyword if exists
    if (i + 3 < shuffled.length) {
      const extra = document.createElement("div");
      extra.className = "re-other";
      extra.textContent = shuffled[i + 3];
      row.appendChild(extra);
    }

    i++;
  }

  container.appendChild(row);
}
