// background.js - Handles background tasks for the extension

// Background script for the extension
// No message handling needed since settings are now in popup

// Initialize default settings when extension is first installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['scrollSpeed'], (data) => {
    if (data.scrollSpeed === undefined) {
      // Set default settings
      chrome.storage.sync.set({
        scrollSpeed: 5 // Default speed is 5 (mid-range)
      });
    }
  });
});
