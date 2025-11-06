document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  fetch("header.html")
    .then(response => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then(html => {
      headerContainer.innerHTML = html;
    })
    .catch(err => console.error("Error loading header:", err));
});

