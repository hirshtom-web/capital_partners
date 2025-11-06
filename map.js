function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.0853, lng: 34.7818 },
    zoom: 12,
  });
}
window.onload = initMap;

/* Map / Grid view toggle */
document.querySelectorAll('.view-toggle button').forEach(btn => {
  btn.addEventListener('click', () => { /* show map / grid / both */ });
});

/* Popup open/close */
function openMapPopup() { document.getElementById("mapPopup").classList.add("show"); }
function closeMapPopup() { document.getElementById("mapPopup").classList.remove("show"); }
