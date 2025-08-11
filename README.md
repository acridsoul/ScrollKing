# ScrollKing Chrome Extension

A Chrome extension that adds floating auto-scroll controls to every website for continuous scrolling.

## Features

- **Continuous Auto-Scroll:** Start automatic scrolling in any direction with a single click
- **Play/Pause Control:** Easily pause and resume scrolling
- **Adjustable Scroll Speed:** Customize scrolling speed to suit your preferences
- **Draggable Interface:** Position the control arrows anywhere on the page
- **Settings:** Configure your experience through a dedicated settings page

## How It Works

ScrollKing adds a floating navigation interface to every webpage with directional arrows that start continuous auto-scrolling:

- ↑ Up Arrow: Start auto-scrolling up
- ↓ Down Arrow: Start auto-scrolling down
- ← Left Arrow: Start auto-scrolling left
- → Right Arrow: Start auto-scrolling right
- ⏸️/▶️ Play/Pause: Pause or resume auto-scrolling

The floating controls are draggable, so you can position them anywhere on the page for convenient access. Press Escape key to immediately stop scrolling.

## Installation

### From Chrome Web Store
1. Visit the Chrome Web Store (link to be added)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer Mode" using the toggle in the top-right corner
4. Click "Load Unpacked" and select the ScrollKing folder
5. The extension is now installed and ready to use

## Usage

After installation, you'll see the floating navigation arrows on every webpage you visit.

- Click on any arrow to scroll in that direction
- Click and drag the navigation control to reposition it
- Click the gear icon (⚙️) to access settings

### Settings

Access the settings page by clicking the gear icon (⚙️) on the floating navigation control.

- **Scroll Speed:** Adjust the slider to set how fast the page scrolls (1-10)

## Development

### Project Structure
- `manifest.json`: Extension configuration
- `src/content.js`: Handles the floating navigation UI and scroll functionality
- `src/content.css`: Styles for the floating navigation
- `src/background.js`: Background script for handling settings
- `pages/settings.html`: Settings page UI
- `pages/settings.js`: Settings page functionality
- `images/`: Extension icons

## License

MIT License

## Version History

- 1.0.0: Initial release with floating arrows and speed settings