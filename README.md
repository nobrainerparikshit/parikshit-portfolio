# Parikshitsinh Jadeja — portfolio

Open index.html after extracting the ZIP. No build step, npm install, or internet is required for the local pages, portrait, illustrations, and fonts.

For local HTTP preview, from this directory run:

    python -m http.server 8000 --bind 127.0.0.1

Then visit http://127.0.0.1:8000.

## Editing
Each page is plain HTML. style.css contains the reference layout; theme.css provides the original night palette; personal.css contains the adaptation. site.js handles navigation, theme, progress, and Formspree contact submissions. content.json is an editable reference dataset; changing it alone does not regenerate HTML.

The contact form posts to https://formspree.io/f/xkolvqlj and displays submission success or errors in place. Formspree manages delivery; the direct email link remains available as a fallback. Without JavaScript, the form uses a standard POST to Formspree. Social links, repositories, complete blog essays, and email delivery require an internet connection.

## Content notes
Prepared from the supplied experience/achievement text and https://pariksh1t.netlify.app/. Your existing site's photograph is included locally. Conceptual project illustrations are labelled and are not project screenshots. The original portfolio archives remain separate.

The supplied IRO heading said 2025, while its date and description said 2026; the page uses 2026. STEMXPLORE is described specifically as second prize in its category. ICWS is described as accepted/invited, not already presented. Selection rates and world-first wording were not added to the main narrative. The provided achievements and affiliations have not been independently verified.

Design basis: https://github.com/aksbhaskar/Akshat-No.github.io at commit 3a85fbafa5f2333acc02b59a7f1920e0a236aa7e. This adaptation reuses the supplied reference CSS and layout. No original owner's personal photos, profile pages, email endpoints, or domain routing are included in this personalized site.

No live deployment was performed. For Netlify static hosting, publish this folder's contents with no build command.

## September 2026 update

The site now includes 16 experience entries, 32 awards, 5 publications, 4 conference acceptances, and the newly supplied SANKET paper reviewer role. The updated source's September 2025 TKS date supersedes the earlier September 2024 date. The Rice entry uses Rice University consistently with its supplied title and issuer. All five publications include the supplied repository links, including Lumina Derma AI. Repository links were supplied by the user and are not evidence of peer review.

## Photo gallery

Put photos in **assets/gallery/**, then double-click **UPDATE-GALLERY.cmd** and refresh the browser. See **ADD-PHOTOS.md** for captions, ordering, and the manual option. The full gallery is **gallery.html**, and the small automatically scrolling strip appears on the homepage.
