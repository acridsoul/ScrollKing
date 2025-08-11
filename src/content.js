// content.js - Injects floating scroll arrows and handles auto-scroll functionality

// Default settings (will be updated from storage)
let scrollSpeed = 5;
let isScrolling = false;
let scrollDirection = null;
let scrollInterval = null;

// Create the floating navigation container
function createFloatingNavigation() {
  // Create container for the floating navigation
  const navContainer = document.createElement('div');
  navContainer.id = 'scroll-king-nav';
  
  // Create arrow buttons
  const upArrow = createArrowButton('up', '↑');
  const leftArrow = createArrowButton('left', '←');
  const rightArrow = createArrowButton('right', '→');
  const downArrow = createArrowButton('down', '↓');
  
  // Create play/pause button
  const playPauseButton = document.createElement('button');
  playPauseButton.id = 'scroll-king-play-pause';
  playPauseButton.innerHTML = '▶️';
  playPauseButton.title = 'Start/Stop Scrolling';
  playPauseButton.addEventListener('click', toggleScrolling);
  
  // Create settings button (cog icon)
  const settingsButton = document.createElement('button');
  settingsButton.id = 'scroll-king-settings';
  settingsButton.innerHTML = '⚙️';
  settingsButton.title = 'Settings';
  settingsButton.addEventListener('click', openSettings);
  
  // Create arrow layout container
  const arrowContainer = document.createElement('div');
  arrowContainer.className = 'scroll-king-arrows';
  
  // Assemble the arrows in a cross pattern
  const middleRow = document.createElement('div');
  middleRow.className = 'scroll-king-row';
  middleRow.appendChild(leftArrow);
  
  // Create a placeholder for center - replace with play/pause
  middleRow.appendChild(playPauseButton);
  
  middleRow.appendChild(rightArrow);
  
  arrowContainer.appendChild(upArrow);
  arrowContainer.appendChild(middleRow);
  arrowContainer.appendChild(downArrow);
  
  // Create status indicator
  const statusIndicator = document.createElement('div');
  statusIndicator.id = 'scroll-king-status';
  statusIndicator.textContent = 'Idle';
  
  // Add arrows and settings button to container
  navContainer.appendChild(arrowContainer);
  navContainer.appendChild(statusIndicator);
  navContainer.appendChild(settingsButton);
  
  // Add the container to the page
  document.body.appendChild(navContainer);
  
  // Make the navigation draggable
  makeDraggable(navContainer);
}

// Helper function to create arrow buttons
function createArrowButton(direction, symbol) {
  const button = document.createElement('button');
  button.className = `scroll-king-arrow scroll-king-${direction}`;
  button.innerHTML = symbol;
  button.title = `Auto-scroll ${direction}`;
  
  button.addEventListener('click', () => {
    startScrolling(direction);
  });
  
  return button;
}

// Function to start auto-scrolling in the specified direction
function startScrolling(direction) {
  // If already scrolling, stop current scroll
  if (isScrolling) {
    stopScrolling();
  }
  
  // Update status
  scrollDirection = direction;
  isScrolling = true;
  updatePlayPauseButton();
  updateStatusIndicator();
  
  // Start interval for continuous scrolling
  scrollInterval = setInterval(() => {
    performScroll(direction);
  }, 50); // Adjust timing for smoother scrolling
}

// Function to perform a single scroll step
function performScroll(direction) {
  // Calculate scroll amount based on speed
  const scrollAmount = scrollSpeed * 2;  // Base scroll amount per step
  
  switch(direction) {
    case 'up':
      window.scrollBy({
        top: -scrollAmount,
        behavior: 'auto' // Using 'auto' for smoother continuous scrolling
      });
      break;
    case 'down':
      window.scrollBy({
        top: scrollAmount,
        behavior: 'auto'
      });
      break;
    case 'left':
      window.scrollBy({
        left: -scrollAmount,
        behavior: 'auto'
      });
      break;
    case 'right':
      window.scrollBy({
        left: scrollAmount,
        behavior: 'auto'
      });
      break;
  }
}

// Function to stop scrolling
function stopScrolling() {
  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
  isScrolling = false;
  updatePlayPauseButton();
  updateStatusIndicator();
}

// Function to toggle scrolling (play/pause)
function toggleScrolling() {
  if (isScrolling) {
    stopScrolling();
  } else if (scrollDirection) {
    startScrolling(scrollDirection);
  }
}

// Update the play/pause button based on scroll state
function updatePlayPauseButton() {
  const playPauseButton = document.getElementById('scroll-king-play-pause');
  if (playPauseButton) {
    if (isScrolling) {
      playPauseButton.innerHTML = '⏸️';
      playPauseButton.title = 'Pause Scrolling';
    } else {
      playPauseButton.innerHTML = '▶️';
      playPauseButton.title = 'Resume Scrolling';
    }
  }
}

// Update the status indicator
function updateStatusIndicator() {
  const statusIndicator = document.getElementById('scroll-king-status');
  if (statusIndicator) {
    if (isScrolling) {
      statusIndicator.textContent = `Scrolling ${scrollDirection}`;
      statusIndicator.classList.add('active');
    } else {
      statusIndicator.textContent = scrollDirection ? 'Paused' : 'Idle';
      statusIndicator.classList.remove('active');
    }
  }
}

// Make an element draggable
function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Don't start drag if clicking on a button
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    
    e = e || window.event;
    e.preventDefault();
    // Get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // Call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // Stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
    
    // Save the current position
    chrome.storage.sync.set({
      position: {
        top: element.style.top,
        left: element.style.left
      }
    });
  }
}

// Function to open settings page
function openSettings() {
  chrome.runtime.sendMessage({ action: "openSettings" });
}

// Load saved settings from storage
function loadSettings() {
  chrome.storage.sync.get(['scrollSpeed', 'position', 'lastDirection'], function(data) {
    if (data.scrollSpeed) {
      scrollSpeed = data.scrollSpeed;
    }
    
    // Restore last scrolling direction
    if (data.lastDirection) {
      scrollDirection = data.lastDirection;
    }
    
    // Apply saved position if available
    if (data.position) {
      const navContainer = document.getElementById('scroll-king-nav');
      if (navContainer) {
        navContainer.style.top = data.position.top;
        navContainer.style.left = data.position.left;
      }
    }
  });
}

// Save current scroll state
function saveScrollState() {
  chrome.storage.sync.set({
    lastDirection: scrollDirection
  });
}

// Initialize extension functionality
function init() {
  createFloatingNavigation();
  loadSettings();
  
  // Listen for settings updates
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.scrollSpeed) {
      scrollSpeed = changes.scrollSpeed.newValue;
      // If currently scrolling, adjust speed dynamically
      if (isScrolling && scrollInterval) {
        stopScrolling();
        startScrolling(scrollDirection);
      }
    }
  });
  
  // Clean up when leaving the page
  window.addEventListener('beforeunload', () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }
    saveScrollState();
  });
  
  // Add keyboard shortcuts for stopping scrolling
  document.addEventListener('keydown', (e) => {
    // Escape key stops scrolling
    if (e.key === 'Escape' && isScrolling) {
      stopScrolling();
    }
  });
}

// Start extension when the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
