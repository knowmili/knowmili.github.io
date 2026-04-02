# Milind Chauhan — Portfolio Website

Personal portfolio website for Milind Chauhan, AI/ML Software Engineer.

## 🚀 How to Host on GitHub Pages

### Step 1: Create a new repository
1. Go to [github.com/new](https://github.com/new)
2. Name it **`knowmili.github.io`** (this is your special GitHub Pages domain)
3. Set it to **Public**
4. Click **Create repository**

### Step 2: Upload the files
Upload these 3 files to the repository root:
- `index.html`
- `style.css`
- `script.js`

You can do this via:
- **GitHub web UI** → "Add file" → "Upload files"
- **Git CLI**:
  ```bash
  git clone https://github.com/knowmili/knowmili.github.io
  cd knowmili.github.io
  # copy the 3 files here
  git add .
  git commit -m "Initial portfolio commit"
  git push origin main
  ```

### Step 3: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under "Source", select **main branch** → **/ (root)**
3. Click **Save**

### Step 4: Visit your site
Your portfolio will be live at:
👉 **https://knowmili.github.io**

(May take 1–2 minutes to go live after first push)

---

## 📋 Customisation Tips

- **Add your photo**: Replace the `MC` avatar placeholder in `index.html` with an `<img>` tag pointing to your photo
- **Update project links**: Replace `href="https://github.com/knowmili"` with actual project repo links
- **Update publication links**: Add real DOI/BioRxiv links in the publications section
- **LinkedIn URL**: Update `https://linkedin.com/in/milind-chauhan` with your exact LinkedIn profile URL
- **Contact form**: The form currently shows a success animation. To make it functional, integrate [Formspree](https://formspree.io) — replace `<form id="contact-form">` with `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
