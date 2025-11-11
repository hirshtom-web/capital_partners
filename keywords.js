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

// ---- ROW 1: first 3 keywords ----
const row1 = document.createElement("div");
row1.className = "re-row";
for (let i = 0; i < 3; i++) {
  const item = document.createElement("div");
  item.className = "re-phrase";
  item.textContent = shuffled[i];
  row1.appendChild(item);
}
container.appendChild(row1);

// ---- ROW 2: next 3 keywords + “It’s something else...” (frameless) ----
const row2 = document.createElement("div");
row2.className = "re-row";
for (let i = 3; i < 6; i++) {
  const item = document.createElement("div");
  item.className = "re-phrase";
  item.textContent = shuffled[i];
  row2.appendChild(item);
}

// Add the frameless text
const other = document.createElement("div");
other.className = "re-other";
other.textContent = "It's something else...";
row2.appendChild(other);

container.appendChild(row2);
