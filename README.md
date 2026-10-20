# Shaadana Rajesh — Portfolio

A static desktop portfolio for **https://shaadana.github.io/**, built with HTML, CSS, and JavaScript. No build or installation step is required.

## Preview

Run `npm start` (or `python3 -m http.server 4388 --bind 127.0.0.1`) from this directory, then open http://127.0.0.1:4388.

## GitHub Pages

The site lives at the repository root. Keep Pages configured to deploy from the `main` branch, `/ (root)`. The `.nojekyll` file tells Pages to serve these assets directly. Merge the `portfolio-desktop` branch into `main` to replace the previous homepage. The previous site is preserved under `archive/` and linked from the portfolio.

## Applications

- Home, Projects, Research, About me, Media Player, Resume, and Messages.
- Browser with an editable URL bar, bookmarks, back/forward, reload, and embedded websites. LeapOnSAT opens a local project overview with a direct website link, including when its URL is entered manually. The overview is also available at `index.html#leaponsat`. Other sites that disallow framing can be opened in a new tab. Only HTTP and HTTPS addresses are accepted; scripts cannot be entered through the address bar.
- Python Lab with three interactive output-prediction exercises, linked to Shaadana’s Python For Kids teaching. Exercises are labeled portfolio examples.
- Community with filterable records of student mentoring, the CHS REC Room, House of Shine, and Carroll Cares.
- AI Governance with three dossiers on the IAIMS internship: framework research, workflow testing, and IEEE TEMSCON co-presentation.
- Reading Room with research summaries, original reports, the Mentor Mindset connection, and per-reading visitor notes with local autosave, clear/undo, and text export.
- Desktop shortcuts for LeapOnSAT, Calculus Clinic, and Journalling.

Windows support drag, minimize, maximize, restore, and close. The Start menu provides all apps on smaller screens. The View menu changes the wallpaper, arranges windows, and shows the desktop. Sound is off by default. The desktop date is intentionally November 11th, 2009; the portfolio content retains its actual dates.

## Source files

- `index.html` — desktop shell and metadata.
- `styles.css` — interface, responsive, reduced-motion, and print styles.
- `app.js` — portfolio content and window management.
- `desktop-apps.js` — Browser, Python Lab, Community, AI Governance, and Reading Room.
- `assets/` — original resume/research downloads, icons, and locally bundled fonts with licenses.
- `archive/` — previous GitHub portfolio.

Content is grounded in the supplied resume and research reports. The research distinguishes correctness prediction from mastery and causation. Original reports remain available as Markdown downloads. Messages opens a draft addressed to `shaadana.e.rajesh@gmail.com`; it does not send email or store messages. Reading notes and wallpaper preferences are stored only in the visitor’s browser. The examples in Python Lab are fixed exercises, not a live Python interpreter.

## Validation

`npm run check` checks JavaScript syntax. Browser validation covers URL entry, embedded project loading, history, URL rejection, Python exercise feedback, community filters, governance dossiers, per-reading note persistence/export/undo, research controls, window controls, and responsive layouts down to 320 pixels.
