document.addEventListener("DOMContentLoaded", () => {

  // ====================
  // Load external HTML into container, with script execution
  // ====================
  async function loadHTML(id, url, callback) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} failed: ${res.status}`);
      const html = await res.text();
      container.innerHTML = html;

      // Execute inline and external scripts sequentially
      const scripts = Array.from(container.querySelectorAll("script"));
      for (const oldScript of scripts) {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          await new Promise((resolve, reject) => {
            newScript.src = oldScript.src;
            newScript.onload = resolve;
            newScript.onerror = reject;
            document.head.appendChild(newScript);
          });
        } else {
          newScript.textContent = oldScript.textContent;
          document.head.appendChild(newScript);
        }
        oldScript.remove();
      }

      container.style.opacity = 1;
      if (callback) callback();
    } catch (err) {
      console.warn(`❌ SECTION FAILED: ${id} ->`, err);
      container.style.opacity = 1;
      container.innerHTML = `<strong>Failed to load: ${id}</strong><br>${err.message}`;
    }
  }

  // ====================
  // Footer popups (country/privacy)
  // ====================
  function initFooterPopups() {
    const countryBtn = document.querySelector(".footer-country-btn");
    const privacyBtn = document.querySelector(".footer-privacy-btn");

    function togglePopup(popup) {
      if (!popup) return;
      popup.classList.toggle("active");
    }

    if (countryBtn) countryBtn.addEventListener("click", () => togglePopup(document.getElementById("country-popup")));
    if (privacyBtn) privacyBtn.addEventListener("click", () => togglePopup(document.getElementById("privacy-popup")));

    document.body.addEventListener("click", (e) => {
      if (!e.target.closest(".footer-popup") && !e.target.closest(".footer-country-btn") && !e.target.closest(".footer-privacy-btn")) {
        document.querySelectorAll(".footer-popup.active").forEach(p => p.classList.remove("active"));
      }
    });
  }

  // ====================
  // Chat popup for keywords
  // ====================
  let uixChat = null;
  let uixIndex = 0;
  const uixMessages = [
    {text: "Hello! How can I help you today?", side: "left"},
    {text: "Hi! I want to check my pre-approval.", side: "right"},
    {text: "Sure! It only takes a few seconds. 👌", side: "left"},
    {text: "Great, let's do it!", side: "right"},
    {text: "Please provide your info.", side: "left"},
    {text: "Done! Submitted.", side: "right"},
  ];

  function uixAddMessage(msg) {
    if (!uixChat) return;
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
    if (!uixChat) return;
    const msg = uixMessages[uixIndex];

    const typing = document.createElement('div');
    typing.className = 'uix-typing ' +
                       (msg.side === 'right' ? 'uix-typing-right' : 'uix-typing-left');
    typing.innerHTML = '<div class="uix-dot"></div><div class="uix-dot"></div><div class="uix-dot"></div>';
    uixChat.appendChild(typing);

    setTimeout(() => {
      typing.remove();
      uixAddMessage(msg);
      uixIndex++;
      if (uixIndex >= uixMessages.length) uixIndex = 0;
      setTimeout(uixNextMessage, 500 + Math.random() * 800);
    }, 1200 + Math.random() * 800);
  }

  function showKeywordChat() {
    const overlay = document.createElement("div");
    overlay.className = "uix-overlay";
    document.body.appendChild(overlay);

    const chatContainer = document.createElement("div");
    chatContainer.id = "uix-chat-messages-keyword";
    chatContainer.className = "uix-chat-popup";
    overlay.appendChild(chatContainer);

    uixChat = chatContainer;
    uixIndex = 0;
    uixNextMessage();

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

  // ====================
  // Real estate keywords
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

    document.querySelectorAll(".re-phrase, .re-other").forEach(el => {
      el.addEventListener("click", showKeywordChat);
    });
  }

  // ====================
  // Main section loader
  // ====================
  const preloader = document.getElementById("preloader");
  const MIN_TIME = 800;
  const startTime = performance.now();

  async function loadSections() {
    // Load each section sequentially
    await loadHTML("header", "header.html", () => { setupHeaderMenu(); });
    await loadHTML("alert", "alert.html");
    await loadHTML("main-section", "main-section.html");
    await loadHTML("trusted-by", "https://hirshtom-web.github.io/capital_partners/trusted-by.html");
    await loadHTML("property-slide", "property-slide.html");
    await loadHTML("tabs", "tabs.html", () => { /* Tab setup logic */ });
    await loadHTML("flow", "flow.html", () => { /* Flow graphics + chat setup */ });
    await loadHTML("market", "market.html");

    // Footer MUST be last
    await loadHTML("footer", "footer.html", () => {
      initFooterPopups();
    });

    populateREKeywords();

    // Remove preloader
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);
    setTimeout(() => {
      if (preloader) {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = 0;
        setTimeout(() => preloader.remove(), 600);
      }
    }, remaining);
  }

  loadSections();

});
