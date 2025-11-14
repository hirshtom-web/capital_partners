<!-- ================= KEYWORDS ================= -->
<div id="re-container"></div>

<!-- ================= CHAT POPUP (from before) ================= -->
<div class="chat-backdrop" id="chatBackdrop">
  <div class="chat-card">
    <img src="your-logo.png" alt="Logo" class="chat-logo">
    <div class="chat-messages" id="chatMessages">
      <div class="chat-message bot">Hello! How can I help you today?</div>
    </div>
    <div class="chat-input-wrapper">
      <input type="text" id="chatInput" placeholder="Type a message...">
      <button id="chatSend">Send</button>
    </div>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
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

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const shuffled = shuffleArray([...keywords]);
  const container = document.getElementById("re-container");
  if (!container) return;
  container.innerHTML = "";

  function createRow(start, end, extra) {
    const row = document.createElement("div");
    row.className = "re-row";
    for (let i = start; i < end; i++) {
      const item = document.createElement("div");
      item.className = "re-phrase";
      item.textContent = shuffled[i];
      row.appendChild(item);
    }
    if(extra) row.appendChild(extra);
    container.appendChild(row);
  }

  // ROWS
  createRow(0, 3);
  const other = document.createElement("div");
  other.className = "re-other";
  other.textContent = "It's something else...";
  createRow(3, 6, other);

  // ================= CHAT LOGIC =================
  const chatBackdrop = document.getElementById('chatBackdrop');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  function addMessage(text, sender='user', typing=false) {
    const msg = document.createElement('div');
    msg.classList.add('chat-message', sender);
    chatMessages.appendChild(msg);

    if(typing && sender==='bot') {
      let i = 0;
      const interval = setInterval(() => {
        msg.textContent += text.charAt(i);
        i++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if(i >= text.length) clearInterval(interval);
      }, 30);
    } else {
      msg.textContent = text;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function botReply(userText) {
    const replies = [
      `You said: "${userText}".`,
      "Interesting, tell me more!",
      "I see! Let's continue.",
      "Got it, thanks for sharing!"
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    addMessage(reply, 'bot', true);
  }

  function sendMessage(text) {
    if(text) {
      addMessage(text, 'user');
      setTimeout(() => botReply(text), 500);
    }
  }

  chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    chatInput.value = '';
    sendMessage(text);
  });

  chatInput.addEventListener('keypress', e => {
    if(e.key === 'Enter') {
      const text = chatInput.value.trim();
      chatInput.value = '';
      sendMessage(text);
    }
  });

  chatBackdrop.addEventListener('click', e => {
    if(e.target === chatBackdrop) chatBackdrop.classList.remove('show');
  });

  function openChat() { chatBackdrop.classList.add('show'); }

  // ================= CONNECT KEYWORDS TO CHAT =================
  container.addEventListener('click', e => {
    if(e.target.classList.contains('re-phrase') || e.target.classList.contains('re-other')) {
      const text = e.target.textContent;
      chatMessages.innerHTML = ''; // optional: clear previous messages
      openChat();
      sendMessage(text);
    }
  });

});
</script>
