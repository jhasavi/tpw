#!/bin/bash
# Backup and clean up image folders

echo "Image cleanup and organization..."

# The optimized images are already in public/images with webp versions
# The root images/ and images/optimized folders are duplicates

echo "Images are already organized in public/images/"
echo "Root 'images/' folder contains source files and can be archived or removed"
echo "Recommendation: Keep public/images/ as the single source of truth"

# Create a note file
cat > /Users/Sanjeev/tpw/IMAGE_ORGANIZATION.md << 'INNEREOF'
# Image Organization

## Current Structure
- **public/images/** - Active images used by the website (KEEP)
  - Contains optimized WebP versions (800px, 1280px, 1920px)
  - Contains original JPG/PNG versions
  
## Folders to Archive/Remove
- **images/** - Root folder with source images (can be archived)
- **images/optimized/** - Duplicate of public/images WebP files (can be removed)
- **images/optimized copy/** - Another duplicate (can be removed)

## Recommendation
All website code references `/images/` which maps to `public/images/`
The root `images/` folder and its subfolders are redundant backups.

## Action Items
1. ✅ All active images are in public/images/
2. Optional: Archive root images/ folder to external backup
3. Optional: Remove images/optimized/ and "images/optimized copy/"
INNEREOF

echo "Created IMAGE_ORGANIZATION.md for reference"
