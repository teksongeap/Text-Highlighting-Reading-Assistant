document.addEventListener('DOMContentLoaded', function() {
  const highlightColorInput = document.getElementById('highlightColor');
  const saveButton = document.getElementById('saveButton');

  chrome.storage.sync.get('highlightColor', function(data) {
    highlightColorInput.value = data.highlightColor || '#ffff00';
  });

  saveButton.addEventListener('click', function() {
    const highlightColor = highlightColorInput.value;
    chrome.storage.sync.set({ highlightColor: highlightColor }, function() {
      console.log('Highlight color saved.');
    });
  });
});