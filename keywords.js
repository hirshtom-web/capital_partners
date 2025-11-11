  const rePhrases = [
    "I'm looking for a new condo",
    "Homes for sale in my area",
    "I want to refinance my home",
    "What are the current mortgage rates",
    "Sell my house fast",
    "Apartments for rent near me",
    "Luxury villas for sale",
    "Cheap houses under $200k",
    "First-time home buyer help",
    "Commercial property listings",
    "Vacation homes for sale",
    "Land for sale near the city",
    "How much is my home worth",
    "Best real estate agents near me",
    "Townhouses for sale",
    "Waterfront homes for sale",
    "New construction homes",
    "Foreclosed homes for sale",
    "Open houses this weekend",
    "Investment properties for sale"
  ];

  // Shuffle
  const reShuffled = rePhrases.sort(() => 0.5 - Math.random());
  const reSelected = reShuffled.slice(0, 6);

  const reContainer = document.getElementById('re-phrases');
  reSelected.forEach(text => {
    const div = document.createElement('div');
    div.className = 're-phrase';
    div.textContent = text;
    reContainer.appendChild(div);
  });
