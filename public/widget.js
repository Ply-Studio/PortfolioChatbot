(function() {
  if (document.getElementById('cyber-ivan-widget-root')) return;

  var currentScript = document.currentScript;
  var appOrigin = 'https://portfoliochatbot-five.vercel.app';
  if (currentScript && currentScript.src) {
    try {
      var scriptUrl = new URL(currentScript.src);
      appOrigin = scriptUrl.origin;
    } catch(e) {}
  }

  // Insert styles
  var styleTag = document.createElement('style');
  styleTag.textContent = `
    @keyframes cyberIvanFadeIn {
      from { opacity: 0; transform: translateY(12px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    #cyber-ivan-widget-root {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999999;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      pointer-events: none;
    }
    #cyber-ivan-launcher-btn {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      background: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 12px 30px -4px rgba(79,70,229,0.5), 0 4px 12px rgba(0,0,0,0.3);
      font-size: 13px;
      font-weight: 700;
      transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    #cyber-ivan-launcher-btn:hover {
      transform: scale(1.04);
      box-shadow: 0 16px 36px -4px rgba(79,70,229,0.65), 0 6px 16px rgba(0,0,0,0.4);
    }
    #cyber-ivan-launcher-btn:active {
      transform: scale(0.97);
    }
    #cyber-ivan-iframe-box {
      pointer-events: auto;
      display: none;
      width: 420px;
      height: 640px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 48px);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 24px 60px -12px rgba(0,0,0,0.7), 0 0 40px rgba(79,70,229,0.15);
      border: 1px solid rgba(255,255,255,0.12);
      background: #07090e;
      margin-bottom: 12px;
      animation: cyberIvanFadeIn 0.22s ease-out;
    }
    #cyber-ivan-iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background: transparent;
    }
    @media (max-width: 640px) {
      #cyber-ivan-widget-root {
        bottom: 16px;
        right: 16px;
      }
      #cyber-ivan-widget-root.is-open {
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100% !important;
        height: 100dvh !important;
      }
      #cyber-ivan-launcher-btn {
        padding: 10px 16px;
      }
      #cyber-ivan-iframe-box {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100% !important;
        height: 100dvh !important;
        max-width: 100vw !important;
        max-height: 100dvh !important;
        border-radius: 0 !important;
        border: none !important;
        margin: 0 !important;
      }
    }
  `;
  document.head.appendChild(styleTag);

  // Create Root Container
  var root = document.createElement('div');
  root.id = 'cyber-ivan-widget-root';

  // Create Floating Launcher Button
  var button = document.createElement('button');
  button.id = 'cyber-ivan-launcher-btn';
  button.setAttribute('aria-label', 'Open Interview Chatbot');
  button.innerHTML = '<div style="position:relative;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;">IZ<span style="position:absolute;bottom:0;right:0;width:8px;height:8px;background:#34d399;border:1.5px solid #0f172a;border-radius:50%;"></span></div><div style="display:flex;flex-direction:column;text-align:left;line-height:1.2;"><span style="font-size:13px;font-weight:700;">Interview Me</span><span style="font-size:10px;font-weight:500;opacity:0.85;">Cyber Version</span></div><svg style="width:18px;height:18px;margin-left:2px;fill:currentColor;" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';

  // Create Iframe Container
  var iframeContainer = document.createElement('div');
  iframeContainer.id = 'cyber-ivan-iframe-box';

  var iframe = document.createElement('iframe');
  iframe.id = 'cyber-ivan-iframe';
  iframe.src = appOrigin + '/?mode=widget&open=true';
  iframe.allow = 'clipboard-write';
  iframe.title = 'Cyber Ivan Portfolio AI Chatbot';

  iframeContainer.appendChild(iframe);

  var isOpen = false;

  function setWidgetState(open) {
    isOpen = open;
    if (isOpen) {
      root.classList.add('is-open');
      iframeContainer.style.display = 'block';
      button.style.display = 'none';
      try {
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: 'CYBER_IVAN_OPEN' }, '*');
        }
      } catch (e) {}
      if (window.innerWidth <= 640) {
        document.body.dataset.cyberIvanOldOverflow = document.body.style.overflow || '';
        document.body.style.overflow = 'hidden';
      }
    } else {
      root.classList.remove('is-open');
      iframeContainer.style.display = 'none';
      button.style.display = 'flex';
      if (document.body.dataset.cyberIvanOldOverflow !== undefined) {
        document.body.style.overflow = document.body.dataset.cyberIvanOldOverflow;
      }
    }
  }

  button.onclick = function() {
    setWidgetState(!isOpen);
  };

  // Listen for close events from inside the chatbot iframe
  window.addEventListener('message', function(event) {
    if (event.data && (
      event.data.type === 'CYBER_IVAN_CLOSE' ||
      event.data === 'close-widget' ||
      (event.data.type === 'CYBER_IVAN_STATE' && event.data.isOpen === false)
    )) {
      setWidgetState(false);
    }
  });

  root.appendChild(iframeContainer);
  root.appendChild(button);
  document.body.appendChild(root);
})();
