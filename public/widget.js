(function() {
  if (document.getElementById('cyber-ivan-widget-root')) return;

  var currentScript = document.currentScript;
  var appOrigin = 'https://ais-pre-5efmozibtofp33aeltzawf-486643578424.us-west2.run.app';
  if (currentScript && currentScript.src) {
    try {
      var scriptUrl = new URL(currentScript.src);
      appOrigin = scriptUrl.origin;
    } catch(e) {}
  }

  // Create Container
  var root = document.createElement('div');
  root.id = 'cyber-ivan-widget-root';
  root.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999999;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;pointer-events:none;';

  // Create Launcher Button
  var button = document.createElement('button');
  button.id = 'cyber-ivan-launcher-btn';
  button.style.cssText = 'pointer-events:auto;display:flex;align-items:center;gap:10px;padding:12px 18px;background:#4f46e5;color:#ffffff;border:none;border-radius:9999px;cursor:pointer;box-shadow:0 12px 30px -4px rgba(79,70,229,0.5),0 4px 12px rgba(0,0,0,0.3);font-size:13px;font-weight:700;transition:all 0.2s ease-in-out;outline:none;user-select:none;';
  button.innerHTML = '<div style="position:relative;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;">IZ<span style="position:absolute;bottom:0;right:0;width:8px;height:8px;background:#34d399;border:1.5px solid #0f172a;border-radius:50%;"></span></div><div style="display:flex;flex-direction:column;text-align:left;line-height:1.2;"><span style="font-size:13px;font-weight:700;">Interview Me</span><span style="font-size:10px;font-weight:500;opacity:0.85;">Cyber Version</span></div><svg style="width:18px;height:18px;margin-left:2px;fill:currentColor;" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';

  // Hover animations
  button.onmouseenter = function() {
    button.style.transform = 'scale(1.05)';
    button.style.boxShadow = '0 16px 36px -4px rgba(79,70,229,0.65),0 6px 16px rgba(0,0,0,0.4)';
  };
  button.onmouseleave = function() {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = '0 12px 30px -4px rgba(79,70,229,0.5),0 4px 12px rgba(0,0,0,0.3)';
  };

  // Create Iframe Window
  var iframeContainer = document.createElement('div');
  iframeContainer.id = 'cyber-ivan-iframe-box';
  iframeContainer.style.cssText = 'pointer-events:auto;display:none;width:420px;height:640px;max-width:calc(100vw - 32px);max-height:calc(100vh - 48px);border-radius:24px;overflow:hidden;box-shadow:0 24px 60px -12px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.1);background:#07090e;margin-bottom:12px;animation:cyberIvanFadeIn 0.25s ease-out;';

  var iframe = document.createElement('iframe');
  iframe.src = appOrigin + '/?mode=widget&open=true';
  iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;';
  iframe.allow = 'clipboard-write';
  iframe.title = 'Cyber Ivan Portfolio AI Chatbot';

  iframeContainer.appendChild(iframe);

  var isOpen = false;
  button.onclick = function() {
    isOpen = !isOpen;
    if (isOpen) {
      iframeContainer.style.display = 'block';
      button.style.display = 'none';
    } else {
      iframeContainer.style.display = 'none';
      button.style.display = 'flex';
    }
  };

  // Listen for close events from iframe
  window.addEventListener('message', function(event) {
    if (event.data && (event.data.type === 'CYBER_IVAN_CLOSE' || event.data === 'close-widget')) {
      isOpen = false;
      iframeContainer.style.display = 'none';
      button.style.display = 'flex';
    }
  });

  root.appendChild(iframeContainer);
  root.appendChild(button);

  // Append keyframe animations
  var styleTag = document.createElement('style');
  styleTag.textContent = '@keyframes cyberIvanFadeIn { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }';
  document.head.appendChild(styleTag);

  document.body.appendChild(root);
})();
