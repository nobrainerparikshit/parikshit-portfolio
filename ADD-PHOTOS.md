# Add certificate photos and gallery images

1. Copy your images into **assets/gallery/** in this portfolio folder.
2. Double-click **UPDATE-GALLERY.cmd** in the main portfolio folder (Windows).
3. Refresh the website. If it is already open, use Ctrl+F5.

The updater reads local image filenames and updates the gallery list. It does not upload, move, or delete your pictures. The homepage strip and full gallery use the same list, and both work offline.

Supported: JPG, JPEG, PNG, WebP, GIF, AVIF. Convert HEIC images or PDF certificates to JPG/PNG first. Put files directly inside assets/gallery, not in subfolders.

Name examples: `01-iisc-young-scientist.jpg`, `02-linghacks-certificate.png`, `03-eutrobot-presentation.jpg`. Pictures appear in filename order. Images are shown at roughly 180 × 128 pixels in the moving strip (160 × 112 on phones); click to see full size. Hover, keyboard focus, or the Pause button stops scrolling. Reduced-motion preferences disable automatic movement.

## Captions
Open **gallery-captions.json** in a text editor. Change `caption` (the displayed label) and `alt` (the image description). Leave `file` equal to the actual filename. Run UPDATE-GALLERY.cmd again after editing. Existing captions are preserved when new images are added.

## Manual option / macOS / Linux
Edit **gallery-data.js** with the same list. For example:

```js
window.PORTFOLIO_GALLERY = [
  { "file": "01-iisc-young-scientist.jpg", "caption": "IISc Young Scientist Challenge — AIR 33", "alt": "My IISc Young Scientist Challenge merit certificate" },
  { "file": "02-linghacks-certificate.png", "caption": "LingHacks VII — second prize", "alt": "My LingHacks VII second prize certificate" }
];
```

Only list images you have actually placed in assets/gallery. Your existing gallery photos are already listed.

When deploying, upload the changed images, gallery-data.js, and the rest of the portfolio together. The local updater does not alter an already deployed website.
