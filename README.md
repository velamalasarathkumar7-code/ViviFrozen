# VIVI Frozen Sea Foods

A responsive frozen seafood supplier website for hotels, restaurants, catering businesses, and wholesale customers.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. Open this folder in a terminal.
3. Install packages and start the preview:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed in the terminal.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Upload to GitHub

Create a new repository on GitHub, extract this ZIP, then upload the files and folders inside `vivi-frozen-sea-foods-github` to the repository root. Commit the upload. Do not upload `node_modules` or the generated `dist` folder.

If you use Git from a terminal instead, run these commands from this folder after creating an empty GitHub repository:

```bash
git init
git add .
git commit -m "Add VIVI Frozen Sea Foods website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the GitHub URL with the URL of your repository.

## Project files

- `src/App.tsx` — website layout, navigation, product ordering, cart, and WhatsApp inquiry flows.
- `src/catalog.ts` — editable product names, categories, prices, and image assignments.
- `src/index.css` — responsive design system and page styling.
- `index.html` — page title and search/social metadata.
- `public/images/` — locally bundled photos for Vannamei prawns, octopus, squid, and crab products.

The product catalog is structured in `src/catalog.ts` so prices and product details can be updated in one place. WhatsApp orders and inquiries open a prepared message for the customer to review and send; this static website does not save inquiries to a server.

Vannamei prawn, octopus, squid, and crab product images are included in `public/images/`. Other seafood photos are loaded from Pexels, and the site uses Google Fonts; those remote images and fonts require an internet connection.
## Deploy on GitHub Pages

1. Upload every file in this folder (including `.github`, `public`, `src`) to the root of a GitHub repo on the `main` branch.
2. Go to Settings > Pages > Source and choose **GitHub Actions**.
3. Push any change (or open Actions > Deploy to GitHub Pages > Run workflow). The site goes live at `https://USERNAME.github.io/REPO-NAME/` in 1-2 minutes.
