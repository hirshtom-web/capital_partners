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

function toggleMenu(element) {
  const nav = document.getElementById('nav-menu');
  nav.classList.toggle('active');
  element.classList.toggle('active'); // rotates hamburger into X
}
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.href === window.location.href) {
      e.preventDefault(); // Prevent reload/jump
      console.log('Already on this page!');
    }
  });
});
// Prevent default jump for all links with href="#"
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // stops the jump
    });
  });
});

// JS to trigger fade-in
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

document.querySelectorAll('nav a[href="#"]').forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});


  const buttons = document.querySelectorAll('.toggle-btn');
  const tabs = document.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.dataset.tab;
      tabs.forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });

  const switchBtns = document.querySelectorAll('.switch-btn');
  const panels = document.querySelectorAll('.panel');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const panelId = btn.dataset.panel;
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(panelId).classList.add('active');
    });
  });


function toggleMenu(el) {
  const nav = document.getElementById('nav-menu');
  nav.classList.toggle('active');
  el.classList.toggle('active');
}
</script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://unpkg.com/topojson@3"></script>
<script>
d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(topojsonData => {
  const states = topojson.feature(topojsonData, topojsonData.objects.states);
  const width = 960, height = 600;
  const svg = d3.select("#map").append("svg")
                .attr("viewBox", [0, 0, width, height])
                .style("width", "100%")
                .style("height", "auto");
  const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
  const path = d3.geoPath().projection(projection);
  const tooltip = d3.select("#tooltip");
  svg.selectAll("path.state")
     .data(states.features)
     .enter()
     .append("path")
     .attr("class", "state")
     .attr("d", path)
     .on("mousemove", function (event, d) {
        tooltip.style("opacity", 1)
               .style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 20) + "px")
               .text(d.properties.name || "State");
     })
     .on("mouseout", () => tooltip.style("opacity", 0));
});

