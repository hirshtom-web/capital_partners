document.addEventListener("DOMContentLoaded", () => {

  // ====================
  // Load external HTML
  // ====================
  async function loadHTML(id, url) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} failed: ${res.status}`);
      const html = await res.text();
      container.innerHTML = html;

      // ⭐ FIX: Run inline scripts inside the container, not body
      container.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        container.appendChild(newScript);
        oldScript.remove();
      });

      container.style.opacity = 1;

    } catch (err) {
      console.warn(`❌ SECTION FAILED: ${id} ->`, err);
      container.style.opacity = 1;

      container.innerHTML = `<strong>Failed to load: ${id}</strong><br>${err.message}`;
    }
  }

  // ====================
  // Header + Menu
  // ====================
  function resetPageState() {
    document.body.classList.remove("menu-open");
    document.querySelectorAll(".mobile-menu, .mobile-menu .expanded")
            .forEach(el => el.classList.remove("active", "expanded"));
    document.querySelectorAll("#services-submenu.active")
            .forEach(el => el.classList.remove("active"));
    const header = document.getElementById("header");
    if (header) header.classList.remove("header--blue", "header--white");
  }

  function setupHeaderMenu() {
    const header = document.getElementById("header");
    const body = document.body;
    const isHome = window.location.pathname === "/" ||
                   window.location.pathname.endsWith("index.html");

    if (header) {
      header.classList.toggle("header--blue", isHome);
      header.classList.toggle("header--white", !isHome);
    }

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open");

      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        body.classList.toggle("menu-open", mobileMenu.classList.contains("active"));
      });
    }

    document.querySelectorAll(".mobile-menu > li").forEach(item => {
      const link = item.querySelector("a");
      const submenu = item.querySelector(".submenu-mobile");
      if (link && submenu) {
        link.addEventListener("click", e => {
          e.preventDefault();
          document.querySelectorAll(".mobile-menu > li.expanded")
                  .forEach(openItem => {
                    if (openItem !== item) openItem.classList.remove("expanded");
                  });
          item.classList.toggle("expanded");
        });
      }
    });

    const openServices = document.getElementById("open-services");
    const servicesSubmenu = document.getElementById("services-submenu");
    const backLinks = document.querySelectorAll(".mobile-submenu .back-link");

    if (openServices && servicesSubmenu) {
      openServices.addEventListener("click", e => {
        e.preventDefault();
        servicesSubmenu.classList.add("active");
      });
    }

    backLinks.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        servicesSubmenu.classList.remove("active");
      });
    });
  }

  // ====================
  // Real Estate Keywords
  // ====================
  function populateREKeywords() {
    const keywords = [
      "Looking for a new condo", "Want to refinance my home", "Buying my first property",
      "Exploring investment options", "Selling my house", "Finding a real estate agent",
      "Interested in luxury homes", "Looking for office space", "Seeking mortgage advice",
      "Relocating to a new city", "Need property valuation", "Investing in rental properties",
      "Building a new home", "Checking current market trends", "Finding foreclosed properties",
      "Upsizing my home", "Downsizing after retirement", "Interested in vacation homes",
      "Want to co-invest", "Looking for real estate partnerships"
    ];

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);
    const list = shuffle([...keywords]);
    const container = document.getElementById("re-container");
    if (!container) return;

    container.innerHTML = "";

    const row1 = document.createElement("div");
    row1.className = "re-row";
    list.slice(0, 3).forEach(text => {
      const d = document.createElement("div");
      d.className = "re-phrase";
      d.textContent = text;
      row1.appendChild(d);
    });

    const row2 = document.createElement("div");
    row2.className = "re-row";
    list.slice(3, 6).forEach(text => {
      const d = document.createElement("div");
      d.className = "re-phrase";
      d.textContent = text;
      row2.appendChild(d);
    });

    const other = document.createElement("div");
    other.className = "re-other";
    other.textContent = "It's something else...";
    row2.appendChild(other);

    container.appendChild(row1);
    container.appendChild(row2);
    container.style.opacity = 1;
  }

  // ============================
  // Flow Graphics Init
  // ============================
  function initFlowGraphics() {
    const line = document.querySelector('.uix-growth-line');
    const percentEl = document.getElementById('uix-percent');
    if (!line || !percentEl) return;

    line.style.strokeDashoffset = 0;

    let current = 0;
    const target = 42.7;
    const duration = 2000;
    const increment = target / (duration / 20);

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      percentEl.textContent = `+${current.toFixed(1)}%`;
    }, 20);
  }

  // ============================
  // CHAT MODULE INIT
  // ============================
  function startChat() {
    if (!uixChat) return;
    uixNextMessage();
  }

  // ====================
  // Main Execution
  // ====================
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800;
  const startTime = performance.now();

  loadHTML("header", "header.html").then(() => {
    resetPageState();
    setupHeaderMenu();
  });

  const sections = [
    loadHTML("alert", "alert.html"),
    loadHTML("main-section", "main-section.html"),
    loadHTML("trusted-by", "https://hirshtom-web.github.io/capital_partners/trusted-by.html"),
    loadHTML("property-slide", "property-slide.html"),
    loadHTML("tabs", "tabs.html"),

    // ⭐ FIX: flow loads → then scripts run → THEN animations start
    loadHTML("flow", "flow.html").then(() => {
      setTimeout(() => {

        // ⭐ FIX: fetch chat container AFTER flow.html is loaded
        const chatEl = document.getElementById("uix-chat-messages");
        if (chatEl) window.uixChat = chatEl;

        initFlowGraphics();
        startChat();

      }, 50);
    }),

    loadHTML("market", "market.html"),
    loadHTML("footer", "footer.html"),
    Promise.resolve().then(populateREKeywords)
  ];

  Promise.allSettled(sections).finally(() => {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      if (preloader) {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 600);
      }
    }, remaining);

    setTimeout(() => preloader?.remove(), 5000);
  });
});

/* ========================================== */
/* CHAT MODULE (kept exactly as original)     */
/* ========================================== */

const uixMessages = [
  {text: "Hello! How can I help you today?", side: "left"},
  {text: "Hi! I want to check my pre-approval.", side: "right"},
  {text: "Sure! It only takes a few seconds. 👌", side: "left"},
  {text: "Great, let's do it!", side: "right"},
  {text: "Please provide your info.", side: "left"},
  {text: "Done! Submitted.", side: "right"},
];

const uixChat = document.getElementById('uix-chat-messages');
let uixIndex = 0;

function uixAddMessage(msg) {
  const bubble = document.createElement('div');
  bubble.className = 'uix-chat-bubble ' +
                     (msg.side === 'right' ? 'uix-right-bubble' : 'uix-left-bubble');
  bubble.textContent = msg.text;
  uixChat.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = 1;
    bubble.style.transform = 'translateY(0)';
    uixChat.style.transform =
      `translateY(-${Math.max(0, uixChat.scrollHeight - uixChat.parentNode.clientHeight)}px)`;
  }, 50);
}

function uixNextMessage() {
  if (uixIndex >= uixMessages.length) return;

  const msg = uixMessages[uixIndex];

  const typing = document.createElement('div');
  typing.className = 'uix-typing ' +
                     (msg.side === 'right' ? 'uix-typing-right' : 'uix-typing-left');
  typing.innerHTML =
    '<div class="uix-dot"></div><div class="uix-dot"></div><div class="uix-dot"></div>';
  uixChat.appendChild(typing);

  setTimeout(() => {
    typing.remove();
    uixAddMessage(msg);
    uixIndex++;
    setTimeout(uixNextMessage, 500 + Math.random() * 800);
  }, 1200 + Math.random() * 800);
}
