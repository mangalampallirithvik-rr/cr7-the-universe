# CR7 — The Universe

An original, responsive, static fan website celebrating Cristiano Ronaldo's football career. This is an independent fan-made project and is **not affiliated with or endorsed by Cristiano Ronaldo, his representatives, any football club, league, or governing body**.

## Features

- 21 standalone HTML pages, including biography, career eras, records, honours, gallery, relationships, setbacks, fan zone, and SIUUU.
- Responsive layout with mobile navigation, theme switcher, search panel, gallery filters/modal, quiz, and SIUUU audio interaction.
- Local CSS, JavaScript, portrait assets, and the supplied SIUUU MP3.
- Static hosting compatible: no build step, package manager, backend, or API key required.

## Run locally

1. Download and extract this repository/ZIP.
2. Open `index.html` in a modern browser.
3. Internet access is needed for externally hosted photographs and Google Fonts. The bundled site files and SIUUU MP3 are local.

For a more realistic local web-server test, run one of these commands from the project directory:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages

### Option A — publish from the repository root (recommended)

1. Create a new GitHub repository. For a personal site, the repository can be named `YOUR-USERNAME.github.io`; otherwise choose a normal repository name such as `cr7-the-universe`.
2. Extract this project ZIP.
3. Upload the **contents of the `CR7-The-Universe-Final` folder** to the repository root. `index.html`, `assets/`, `README.md`, `.nojekyll`, and the other HTML pages should appear at the top level—not nested inside another `CR7-The-Universe-Final/` folder.
4. Commit the files to the `main` branch.
5. On GitHub, open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch **main**, folder **/(root)**, and click **Save**.
8. Wait for the Pages deployment to finish. The URL appears in **Settings → Pages**. A normal repository site URL is usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`; a user site uses `https://YOUR-USERNAME.github.io/`.
9. Open the published URL on desktop and mobile and check the pages and interactions listed below.

GitHub may take a few minutes to publish changes. If you update files, commit and push the changes to the selected branch.

### Option B — upload with Git

From a terminal opened in the extracted project folder:

```bash
git init
git add .
git commit -m "Deploy CR7 The Universe fan site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Create the GitHub repository first and replace the placeholder remote URL with your actual repository URL. Then configure **Settings → Pages** as described in Option A.

## Before publishing: rights and attribution

**Do not assume all content in this project is automatically cleared for redistribution.**

- **Original site code and writing:** the MIT license in `LICENSE` applies only to the original code and original text created for this project, excluding third-party materials and the excluded assets described in `CONTENT-LICENSE.md`.
- **Photographs:** most photos are fetched from external Wikimedia Commons file URLs. Each file has its own author, license, attribution, and possibly share-alike requirements. Review the exact file page linked in `credits.html` before publishing or reusing it. A Commons URL is not a blanket license.
- **Supplied portrait:** `assets/images/ronaldo-young-portrait.png` and `assets/images/home-quote-reference.png` were supplied for this project. Confirm that you have permission to publish them publicly.
- **SIUUU recording:** `assets/audio/ronaldo-siuuuu-200-percent.mp3` is a user-supplied audio recording, amplified for playback. It is excluded from the MIT license. Confirm that you have permission to publish and distribute the recording; the website's fan-project disclaimer does not grant audio rights.
- **Branding and personality rights:** Cristiano Ronaldo's name, likeness, club marks, and related trademarks belong to their respective owners. Do not imply endorsement or affiliation.
- **Google Fonts and other external resources:** their own provider terms apply.

See `credits.html` and `CONTENT-LICENSE.md` for details. If you cannot establish the right to distribute a particular image or recording, replace it with content you created or content whose license permits your intended use before making the site public.

## Final deployment checklist

- [ ] `index.html` is in the repository root.
- [ ] `assets/` and all HTML pages were uploaded, not just the homepage.
- [ ] `Settings → Pages` points to `main` and `/(root)`.
- [ ] Homepage, all navigation links, theme switcher, mobile menu, search, gallery filters/modal, quiz, and SIUUU button tested.
- [ ] SIUUU audio plays on desktop and mobile after a user click.
- [ ] Externally hosted images load; any failed URLs are replaced.
- [ ] Every published photograph and the bundled audio have been reviewed for license/permission and attribution.
- [ ] No private data, credentials, or unrelated files were committed.

## Validation

The project package was checked for ZIP integrity, HTML page count, local relative references, bundled audio presence, and removal of browser-generated speech from the SIUUU interaction. These are static checks, not a substitute for testing the published website in real desktop and mobile browsers.
