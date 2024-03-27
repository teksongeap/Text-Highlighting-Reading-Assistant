let highlightColor = '#ffff00';
let enableHighlight = true;
let timeoutId = null;

chrome.storage.sync.get(['highlightColor', 'enableHighlight'], function(data) {
  highlightColor = data.highlightColor || '#ffff00';
  enableHighlight = data.enableHighlight !== false;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.enableHighlight) {
    enableHighlight = changes.enableHighlight.newValue !== false;
  }
});

chrome.runtime.sendMessage({ action: 'getHighlightColor' }, function(response) {
  highlightColor = response.color;
});

document.addEventListener('mouseover', function(event) {
  if (!enableHighlight) return;

  const target = event.target;
  const text = target.textContent.trim();

  if (text !== '') {
    timeoutId = setTimeout(function() {
      const rect = target.getBoundingClientRect();
      const highlightElement = document.createElement('div');
      highlightElement.style.position = 'absolute';
      highlightElement.style.background = highlightColor;
      highlightElement.style.opacity = '0';
      highlightElement.style.pointerEvents = 'none';
      highlightElement.style.zIndex = '9999';
      highlightElement.style.top = `${rect.top + window.scrollY}px`;
      highlightElement.style.left = `${rect.left + window.scrollX}px`;
      highlightElement.style.width = `${rect.width}px`;
      highlightElement.style.height = `${rect.height}px`;
      highlightElement.style.transition = 'opacity 0.2s ease-in-out';
      highlightElement.style.borderRadius = '4px'; // Add this line to round off the edges
      highlightElement.setAttribute('data-highlight', 'true');
      document.body.appendChild(highlightElement);

      setTimeout(function() {
        highlightElement.style.opacity = '0.4';
      }, 50);
    }, 300);
  }
});

document.addEventListener('mouseout', function(event) {
  clearTimeout(timeoutId);
  const highlightElement = document.querySelector('[data-highlight]');
  if (highlightElement) {
    highlightElement.style.opacity = '0';
    setTimeout(function() {
      highlightElement.remove();
    }, 200);
  }
});