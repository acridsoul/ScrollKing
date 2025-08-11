// popup.js - Handles popup settings page functionality

// DOM elements
let speedSlider, speedValue, saveButton;

// Load current settings
function loadSettings() {
  chrome.storage.sync.get(['scrollSpeed'], function(data) {
    console.log('Popup: Loaded settings:', data);
    if (data.scrollSpeed && speedSlider && speedValue) {
      speedSlider.value = data.scrollSpeed;
      speedValue.textContent = data.scrollSpeed;
      console.log('Popup: Set slider to:', data.scrollSpeed);
    }
  });
}

// Initialize popup functionality
function initPopup() {
  // Get DOM elements
  speedSlider = document.getElementById('speed-slider');
  speedValue = document.getElementById('speed-value');
  saveButton = document.getElementById('save-settings');
  
  // Check if elements exist
  if (!speedSlider || !speedValue || !saveButton) {
    console.error('Required DOM elements not found');
    return;
  }
  
  // Load current settings
  loadSettings();
  
  // Update speed value display when slider is moved
  speedSlider.addEventListener('input', function() {
    speedValue.textContent = this.value;
  });
  
  // Save settings when save button is clicked
  saveButton.addEventListener('click', function() {
    const newSpeed = parseInt(speedSlider.value);
    console.log('Popup: Saving speed:', newSpeed);
    
    chrome.storage.sync.set({
      scrollSpeed: newSpeed
    }, function() {
      console.log('Popup: Settings saved successfully');
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPopup); 