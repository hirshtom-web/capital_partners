
const purchaseInput = document.getElementById('purchasePrice');
const cashInput = document.getElementById('cashInvestment');
const mortgageInput = document.getElementById('mortgageAmount');
const additionalCriteria = document.getElementById('additionalCriteria');
const cashFinancingToggle = document.getElementById('cashFinancingToggle');

// Auto-calculate mortgage
function updateMortgage() {
  const purchase = parseFloat(purchaseInput.value || 0);
  const cash = parseFloat(cashInput.value || 0);
  if (purchase > 0 && cash >= 0) {
    mortgageInput.value = Math.max(purchase - cash, 0).toFixed(0);
  }
}
purchaseInput.addEventListener('input', updateMortgage);
cashInput.addEventListener('input', updateMortgage);
updateMortgage();

// Toggle ALL CASH / FINANCING
cashFinancingToggle.addEventListener('change', () => {
  if (cashFinancingToggle.checked) {
    additionalCriteria.style.display = 'flex';
  } else {
    additionalCriteria.style.display = 'none';
    mortgageInput.value = 0;
  }
});

// Format number with thousand separators
function formatMoney(num) {
  return "$" + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Calculate metrics
document.getElementById('calculateBtn').addEventListener('click', () => {
  const rent = parseFloat(document.getElementById('rent').value || 0);
  const hoa = parseFloat(document.getElementById('hoa').value || 0);
  const tax = parseFloat(document.getElementById('tax').value || 0) / 12;
  const insurance = parseFloat(document.getElementById('insurance').value || 0) / 12;
  const managementRate = parseFloat(document.getElementById('management').value || 0) / 100;
  const vacancyRate = parseFloat(document.getElementById('vacancy').value || 0) / 100;
  const other = parseFloat(document.getElementById('otherExpenses').value || 0) / 12;
  const cashInvestment = parseFloat(document.getElementById('cashInvestment').value || 0);

  // Mortgage calculation
  let mortgagePayment = 0;
  if (additionalCriteria.style.display === 'flex') {
    const P = parseFloat(mortgageInput.value || 0);
    const r = parseFloat(document.getElementById('mortgageRate').value || 0) / 100 / 12;
    const n = parseFloat(document.getElementById('mortgageTerm').value || 30) * 12;

    if (P > 0 && r > 0 && n > 0) {
      mortgagePayment = (P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
    }
  }

  // Effective rent after vacancy
  const effectiveRent = rent * (1 - vacancyRate);
  const managementFee = effectiveRent * managementRate;
  const totalExpenses = mortgagePayment + hoa + insurance + tax + managementFee + other;
  const netIncome = effectiveRent - totalExpenses;

  // Cash-on-cash return
  const cashOnCash = cashInvestment > 0 ? (netIncome * 12 / cashInvestment * 100) : 0;

  // Update results
  document.getElementById('rentResult').textContent = formatMoney(effectiveRent);
  document.getElementById('expensesResult').textContent = formatMoney(totalExpenses);
  document.getElementById('netResult').textContent = formatMoney(netIncome);
  document.getElementById('cocResult').textContent = cashOnCash.toFixed(2) + "%";
});

  // Handle calculator button selection
const calcButtons = document.querySelectorAll('.calc-btn');
calcButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calcButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // You could later load a different calculator here based on btn.textContent
    console.log(`Switched to ${btn.textContent} calculator`);
  });
});
  cashFinancingToggle.addEventListener('change', () => {
  if (cashFinancingToggle.checked) {
    additionalCriteria.classList.add('visible');
  } else {
    additionalCriteria.classList.remove('visible');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Wait until the header is loaded by your include.js
  const observer = new MutationObserver(() => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.remove("header-dark");
      header.classList.add("header-light");
      observer.disconnect();
    }
  });

  // Watch for new elements being added
  observer.observe(document.body, { childList: true, subtree: true });
});


</script>
