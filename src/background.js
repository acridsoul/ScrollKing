// background.js - Handles background tasks for the extension

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle opening settings page
  if (message.action === "openSettings") {
    chrome.runtime.openOptionsPage();
  }
});

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
