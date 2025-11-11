
const keywords = [
  "Buying a new home",
  "Looking for a condo",
  "Refinancing my mortgage",
  "Selling my property",
  "Finding a real estate agent",
  "Investing in rental homes",
  "Luxury properties",
  "First-time home buyer",
  "Commercial real estate",
  "Property valuation",
  "Down payment help",
  "Moving to a new area",
  "Retirement homes",
  "Vacation rentals",
  "Off-market listings",
  "Real estate investment",
  "Fix & flip",
  "Foreclosure deals",
  "Home renovation",
  "Mortgage pre-approval"
];

const container = document.getElementById("re-container");
const itemsPerRow = 3;

for (let i = 0; i < keywords.length; i += itemsPerRow) {
  const row = document.createElement("div");
  row.className = "re-row";

  // Add 3 keywords
  for (let j = i; j < i + itemsPerRow && j < keywords.length; j++) {
    const div = document.createElement("div");
    div.className = "re-phrase";
    div.textContent = keywords[j];
    row.appendChild(div);
  }

  // Add "It's something else..." to the SAME row
  const other = document.createElement("div");
  other.className = "re-other";
  other.textContent = "It's something else...";
  row.appendChild(other);

  container.appendChild(row);
}
