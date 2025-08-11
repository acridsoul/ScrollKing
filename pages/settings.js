// settings.js - Handles settings page functionality

// DOM elements
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const saveButton = document.getElementById('save-settings');

// Load current settings
function loadSettings() {
  chrome.storage.sync.get(['scrollSpeed'], function(data) {
    if (data.scrollSpeed) {
      speedSlider.value = data.scrollSpeed;
      speedValue.textContent = data.scrollSpeed;
    }
  });
}

// Update speed value display when slider is moved
speedSlider.addEventListener('input', function() {
  speedValue.textContent = this.value;
});

// Save settings when save button is clicked
saveButton.addEventListener('click', function() {
  const newSpeed = parseInt(speedSlider.value);
  
  chrome.storage.sync.set({
    scrollSpeed: newSpeed
  }, function() {
    // Show a brief saved message
    const originalText = saveButton.textContent;
    saveButton.textContent = 'Settings Saved!';
    saveButton.disabled = true;
    
    setTimeout(function() {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    }, 1500);
  });
});

// Load settings when page is opened
document.addEventListener('DOMContentLoaded', loadSettings);
