// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: 'welcome.html' });
});

chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse) => {
  switch (msg.action) {
    case 'isExtensionInstalled':
      sendResponse({ status: true });
      break;

    case 'getCaptcha':
      chrome.tabs.create(
        {
          url: msg.url || 'https://appointment.ivacbd.com/signin',
          active: false,
        },
        (tab) => {
          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (tabId === tab.id && info.status === 'complete') {
              chrome.tabs.onUpdated.removeListener(listener);

              setTimeout(() => {
                chrome.scripting.executeScript({
                  target: { tabId: tab.id, allFrames: true },
                  files: ['utils/captchaScraper.js'],
                });
              }, 900);
            }
          });

          chrome.runtime.onMessage.addListener(
            function responseListener(response, sender) {
              if (
                response.action === 'captchaResult' &&
                sender.tab?.id === tab.id
              ) {
                sendResponse({ value: response.value });

                chrome.tabs.remove(tab.id);
                chrome.runtime.onMessage.removeListener(responseListener);
              }
            },
          );
        },
      );

      return true;

    default:
      sendResponse({ status: 'unknown action' });
      break;
  }
});
