# Changelog
## [Unreleased]
### Added
- Working on time-paced procedurally-developed pixel color values
### Changed
- Randomizer engine: Working on rules for the engine. Would be able to decide the color value according to neighbors


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
