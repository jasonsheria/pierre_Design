// Chatbot Logic
(function() {
  const chatbotToggle = document.createElement('button');
  chatbotToggle.id = 'chatbot-toggle';
  // Utilisation d'une icône SVG moderne pour le bouton (chat et flèche)
  const chatIcon = `<span class="icon" id="chatbot-toggle-icon"> 
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  </span>`;
  const arrowIcon = `<span class="icon" id="chatbot-toggle-icon"> 
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  </span>`;
  chatbotToggle.innerHTML = chatIcon;
  document.body.appendChild(chatbotToggle);

  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'chatbot-container';
  chatbotContainer.innerHTML = `
    <div id="chatbot-header">Assistant Bee</div>
    <div id="chatbot-quick-replies"></div>
    <div id="chatbot-messages"></div>
    <div id="chatbot-input-area">
      <input id="chatbot-input" type="text" placeholder="Écrivez un message..." autocomplete="off" />
      <button id="chatbot-send">➤</button>
    </div>
  `;
  document.body.appendChild(chatbotContainer);

  const messages = [
    { text: "Bonjour 👋, comment puis-je vous aider aujourd'hui ?", user: false },
    { text: "Voici quelques exemples :\n- Demander un devis\n- Prendre rendez-vous\n- En savoir plus sur nos services", user: false }
  ];

  const quickReplies = [
    "Demander un devis",
    "Prendre rendez-vous",
    "En savoir plus sur nos services",
    "Contacter le support"
  ];

  function renderMessages() {
    const msgArea = document.getElementById('chatbot-messages');
    msgArea.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'chatbot-message' + (msg.user ? ' user' : '');
      div.textContent = msg.text;
      msgArea.appendChild(div);
    });
    msgArea.scrollTop = msgArea.scrollHeight;
  }

  function renderQuickReplies() {
    const quickArea = document.getElementById('chatbot-quick-replies');
    if (!quickArea) return;
    quickArea.innerHTML = '';
    quickReplies.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-quick-btn';
      btn.textContent = q;
      btn.onclick = function() {
        messages.push({ text: q, user: true });
        renderMessages();
        setTimeout(() => {
          messages.push({ text: "Merci pour votre message ! Un membre de notre équipe vous répondra bientôt.", user: false });
          renderMessages();
        }, 800);
      };
      quickArea.appendChild(btn);
    });
  }

  let isOpen = false;
  chatbotToggle.onclick = function() {
    isOpen = !isOpen;
    chatbotContainer.style.display = isOpen ? 'flex' : 'none';
    chatbotToggle.classList.toggle('open', isOpen);
    chatbotToggle.innerHTML = isOpen ? arrowIcon : chatIcon;
    chatbotToggle.blur();
    chatbotToggle.style.animation = 'chatbot-bounce 0.3s';
    setTimeout(() => chatbotToggle.style.animation = '', 350);
    if (isOpen) {
      renderQuickReplies();
      renderMessages();
      setTimeout(() => document.getElementById('chatbot-input').focus(), 300);
    }
  };

  document.getElementById('chatbot-send').onclick = sendMessage;
  document.getElementById('chatbot-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const text = input.value.trim();
    if (!text) return;
    messages.push({ text, user: true });
    renderMessages();
    input.value = '';
    setTimeout(() => {
      // Simulate bot response
      messages.push({ text: "Merci pour votre message ! Un membre de notre équipe vous répondra bientôt.", user: false });
      renderMessages();
    }, 800);
  }

  // Show chatbot on load for demo (optional)
  // setTimeout(() => chatbotToggle.click(), 1200);
})();
