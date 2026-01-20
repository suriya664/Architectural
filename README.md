# Architectural Visualization Studio Portal

Client-facing collaboration portal built with Bootstrap 5, jQuery, and custom CSS/JS.

## Pages
- `index.html` (Home v1)
- `index-niche.html` (Home v2 - niche)
- `about.html`
- `services.html`
- `service-detail.html`
- `blog.html`
- `blog-detail.html`
- `contact.html`
- `pricing.html`
- `admin-dashboard.html`
- `login.html`
- `register.html`
- `404.html`
- `coming-soon.html`

## Scripts
- `js/main.js` for UI interactions (counters, carousels, filters, countdown, back-to-top)
- `js/theme-switcher.js` for light/dark + RTL toggle (localStorage)
- `js/form-validation.js` for form validation
- `js/dashboard.js` for Chart.js and DataTables

## CSS
- `css/style.css` base design tokens and components
- `css/dark-mode.css` dark theme overrides
- `css/style-rtl.css` RTL adjustments
- `css/responsive.css` responsive tweaks

## Notes
- External libraries are loaded from CDNs.
- Replace placeholder images with production assets in `images/`.
- Google Maps embed in `contact.html` can be swapped with API integration if needed.

## Run
Open any HTML file in a browser. For dynamic features using local files, serve locally via a static server.
