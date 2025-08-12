# ScrollKing Chrome Extension

A Chrome extension that provides smooth, continuous auto-scrolling functionality on any website. It adds a floating control panel with directional arrows that allow users to start automatic scrolling in any direction with a single click.

## Key Features

- **Smooth 60fps Auto-Scrolling**: Uses `requestAnimationFrame` for buttery-smooth scrolling without stuttering
- **Multi-Directional Control**: Arrow buttons for up, down, left, and right scrolling
- **Play/Pause Functionality**: Central button to pause/resume scrolling
- **Adjustable Speed**: Settings popup with 1-10 speed control slider
- **Draggable Interface**: Floating control panel can be positioned anywhere on the page
- **Keyboard Shortcuts**: Escape key to immediately stop scrolling
- **Position Memory**: Remembers the last position of the control panel
- **Compact Popup Settings**: Clean, minimal settings interface accessible via toolbar icon

## How It Works

ScrollKing adds a floating navigation interface to every webpage with directional arrows that start continuous auto-scrolling:

- ↑ Up Arrow: Start auto-scrolling up
- ↓ Down Arrow: Start auto-scrolling down
- ← Left Arrow: Start auto-scrolling left
- → Right Arrow: Start auto-scrolling right
- ⏸️/▶️ Play/Pause: Pause or resume auto-scrolling

The floating controls are draggable, so you can position them anywhere on the page for convenient access. Press Escape key to immediately stop scrolling.

## Installation

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
- Click the extension icon in the toolbar to access settings

### Settings

Access the settings by clicking the ScrollKing icon in the Chrome toolbar.

- **Scroll Speed:** Adjust the slider to set how fast the page scrolls (1-10)

## Technical Implementation

- **Manifest V3**: Modern Chrome extension architecture
- **Content Scripts**: Injects floating UI into every webpage
- **Chrome Storage API**: Syncs settings across browser instances
- **requestAnimationFrame**: Smooth 60fps scrolling animation
- **Time-based Movement**: Consistent scroll speed regardless of frame rate
- **Hardware Acceleration**: Optimized for performance

## Project Structure

```
ScrollKing/
├── manifest.json          # Extension configuration
├── popup.html            # Settings popup interface
├── popup.js              # Popup functionality
├── src/
│   ├── content.js        # Main scrolling logic & UI
│   ├── content.css       # Floating control styles
│   └── background.js     # Background service worker
├── images/               # Extension icons (SVG + PNG)
└── README.md            # Documentation
```

## Performance Optimizations

- Eliminated frame rate mismatch between scroll commands and display refresh
- Time-based scroll calculation for consistent speed across devices
- Proper animation cleanup to prevent memory leaks
- Hardware-accelerated scrolling for reduced CPU usage

## User Experience

- **Intuitive Controls**: Simple arrow buttons for directional scrolling
- **Visual Feedback**: Status indicator shows current scroll direction and state
- **Non-Intrusive**: Transparent floating panel that doesn't interfere with page content
- **Accessible**: Keyboard shortcuts and clear visual indicators

## License

MIT License

## Version History

- 1.0.0: Initial release with smooth scrolling, floating arrows, and speed settings