document.addEventListener('DOMContentLoaded', function() {
  const enableHighlightCheckbox = document.getElementById('enableHighlight');

  chrome.storage.sync.get('enableHighlight', function(data) {
    enableHighlightCheckbox.checked = data.enableHighlight !== false;
  });

  enableHighlightCheckbox.addEventListener('change', function() {
    const enableHighlight = enableHighlightCheckbox.checked;
    chrome.storage.sync.set({ enableHighlight }, function() {
      console.log('Highlighting setting updated.');
    });
  });
});