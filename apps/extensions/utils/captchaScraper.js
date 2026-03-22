(() => {
  function waitForCaptcha(selector, timeout = 15000) {
    return new Promise((resolve) => {
      const start = Date.now();

      const check = () => {
        const el = document.querySelector(selector);

        if (el && el.value) {
          resolve(el.value);
        } else if (Date.now() - start >= timeout) {
          resolve(null);
        } else {
          setTimeout(check, 300);
        }
      };

      check();
    });
  }

  (async () => {
    const value = await waitForCaptcha('[name="cf-turnstile-response"]');

    chrome.runtime.sendMessage({
      action: 'captchaResult',
      value,
    });
  })();
})();
