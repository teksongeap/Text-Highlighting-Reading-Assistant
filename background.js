chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getHighlightColor') {
    chrome.storage.sync.get('highlightColor', function(data) {
      sendResponse({ color: data.highlightColor || '#ffff00' });
    });
    return true;
  }
});