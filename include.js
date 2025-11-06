function loadHTML(selector, file, callback) {
  fetch(file).then(r => r.text()).then(data => {
    document.querySelector(selector).innerHTML = data;
    if (callback) callback();
  }).catch(err => console.error('Error loading', file, err));
}

loadHTML("#header", "header.html", () => { feather.replace(); /* reattach menu & dropdowns */ });
loadHTML("#footer", "footer.html", () => { feather.replace(); });
