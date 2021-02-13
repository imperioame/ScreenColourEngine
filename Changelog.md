# Changelog
## [Unreleased]
### Added
- Monochrome: posibility to set a hue value with a slider to make a monochrome from it
### Changed
- Randomizer engine: Working on rules for the engine. Would be able to decide the color value according to neighbors
- Check if it's correct to reset requestAnimationFrame on construct function (considering it's requested every time user clicks a UI button)
- Aside pading. It's broken to the right.


## [0.4.0] - 2021-02-13
### Added
- Auto-develop on pixel value change for a threshold. For values of 16px and above, it calls develp on input change. Below that it doesnt.
- Speed slider: The user can set the animation speed 
### Changed
- Style on aside: now uses flexbox, and some other minor changes
- PingpongLoop checkbox and speed slider are now created dinamically
- Setted to start with animation and pingpongloop on

## [0.3.1] - 2021-01-30
### Added
- PingPong animation checkbox: now the user can chose whether to loop back and forwards when the animation reaches the target, instead of jumping back to zero

### Changed
- Fixed pixel gap in the screen limits (last row and last column)

## [0.3.0] - 2021-01-30
### Added
- Time-paced procedurally-developed pixel color values for B&W
- Slider to manually adjust pixel size. Default sugested 16px (for better performance)

### Changed
- Code structure: to avoid problems, now the script saves the total of rows and columns. Also, the UI buttons now calls "Develop" function instead of "colorize" (develop clears the HTML matrix of pixels and recreates it).

## [0.2.0] - 2021-01-30
### Changed
- Changed main font: now it's 'Bitter', from google fonts CDN
- Reorganized and simplify code
- Function "Colorice" now works for both B&N and color pixels
- Setted up constants replacing some variables (Screenwidth, screenheight and document, for example)

### Removed
- Function "blackAndWhite": replaced by function "colorice"
- Function "Render": replaced by function "colorice". This function wasn't needed as a standalone func.




## [0.1.0] - 2020-11-05
### Added
- First setup
- Procedurally generated pixel matrix
- Procedurally generated pixel colors in the pixel matrix
- First setup of the randomizer engine: traverse the matrix and gives a value pixel by pixel
- UI: Button to generate a new layout
- UI: Aside panel for the user to select B&W or Colored pixels
