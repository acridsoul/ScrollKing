// content.js - Injects floating scroll arrows and handles auto-scroll functionality

// Default settings (will be updated from storage)
let scrollSpeed = 5;
let isScrolling = false;
let scrollDirection = null;
let animationId = null;
let lastFrameTime = 0;

// Create the floating navigation container
function createFloatingNavigation() {
  // Create container for the floating navigation
  const navContainer = document.createElement('div');
  navContainer.id = 'scroll-king-nav';
  
  // Create arrow buttons
  const upArrow = createArrowButton('up', 'images/arrows/up-arrow.png');
  const leftArrow = createArrowButton('left', 'images/arrows/left-arrow.png');
  const rightArrow = createArrowButton('right', 'images/arrows/right-arrow.png');
  const downArrow = createArrowButton('down', 'images/arrows/down-arrow.png');
  
  // Create play/pause button
  const playPauseButton = document.createElement('button');
  playPauseButton.id = 'scroll-king-play-pause';
  
  // Create play image
  const playImg = document.createElement('img');
  playImg.src = chrome.runtime.getURL('images/arrows/play.png');
  playImg.alt = 'Start Scrolling';
  playImg.className = 'scroll-king-play-pause-img';
  playImg.id = 'scroll-king-play-img';
  
  // Create pause image
  const pauseImg = document.createElement('img');
  pauseImg.src = chrome.runtime.getURL('images/arrows/pause.png');
  pauseImg.alt = 'Pause Scrolling';
  pauseImg.className = 'scroll-king-play-pause-img';
  pauseImg.id = 'scroll-king-pause-img';
  pauseImg.style.display = 'none';
  
  playPauseButton.appendChild(playImg);
  playPauseButton.appendChild(pauseImg);
  playPauseButton.title = 'Start/Stop Scrolling';
  playPauseButton.addEventListener('click', toggleScrolling);
  

  
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
  
  // Add arrows to container
  navContainer.appendChild(arrowContainer);
  navContainer.appendChild(statusIndicator);
  
  // Add the container to the page
  document.body.appendChild(navContainer);
  
  // Make the navigation draggable
  makeDraggable(navContainer);
}

// Helper function to create arrow buttons
function createArrowButton(direction, imagePath) {
  const button = document.createElement('button');
  button.className = `scroll-king-arrow scroll-king-${direction}`;
  
  // Create image element
  const img = document.createElement('img');
  img.src = chrome.runtime.getURL(imagePath);
  img.alt = `Auto-scroll ${direction}`;
  img.className = 'scroll-king-arrow-img';
  
  button.appendChild(img);
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
  lastFrameTime = performance.now();
  updatePlayPauseButton();
  updateStatusIndicator();
  
  // Start smooth scrolling with requestAnimationFrame
  animateScroll(direction);
}

// Function to perform smooth scrolling animation
function animateScroll(direction) {
  if (!isScrolling) return;
  
  const currentTime = performance.now();
  const deltaTime = currentTime - lastFrameTime;
  lastFrameTime = currentTime;
  
  // Calculate scroll amount based on time elapsed and speed
  // Base speed: 100px per second, adjusted by scrollSpeed (1-10)
  const baseSpeed = 100; // pixels per second
  const speedMultiplier = scrollSpeed / 5; // Normalize to 1-2 range
  const scrollAmount = (baseSpeed * speedMultiplier * deltaTime) / 1000;
  
  // Perform the scroll
  switch(direction) {
    case 'up':
      window.scrollBy({
        top: -scrollAmount,
        behavior: 'auto'
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
  
  // Continue animation if still scrolling
  if (isScrolling) {
    animationId = requestAnimationFrame(() => animateScroll(direction));
  }
}

// Function to stop scrolling
function stopScrolling() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
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
  const playImg = document.getElementById('scroll-king-play-img');
  const pauseImg = document.getElementById('scroll-king-pause-img');
  
  if (playImg && pauseImg) {
    if (isScrolling) {
      playImg.style.display = 'none';
      pauseImg.style.display = 'block';
    } else {
      playImg.style.display = 'block';
      pauseImg.style.display = 'none';
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



// Load saved settings from storage
function loadSettings() {
  chrome.storage.sync.get(['scrollSpeed', 'position', 'lastDirection'], function(data) {
    console.log('Content: Loaded settings:', data);
    if (data.scrollSpeed) {
      scrollSpeed = data.scrollSpeed;
      console.log('Content: Set scroll speed to:', scrollSpeed);
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
    console.log('Content: Storage changed:', changes);
    if (changes.scrollSpeed) {
      scrollSpeed = changes.scrollSpeed.newValue;
      console.log('Content: Speed updated to:', scrollSpeed);
      // Speed changes are automatically applied in the next animation frame
      // No need to restart scrolling
    }
  });
  
  // Clean up when leaving the page
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
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
