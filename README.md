# SmartResume Builder — Interactive & Fully Customizable Resume Builder

SmartResume Builder is an interactive, client-side web application where users can create, edit, customize, and export professional job-tailored resumes in real time with rule-based keyword matching.

Built in strict compliance with the **Product Requirements Document (PRD v1.0)**.

---

## ✨ Ways Users Can Make Changes

### 1. ⚡ Live Reactive Form Editing
- As you type in any field (name, contact details, role, summary, skills, education, projects, experience, or certifications), the resume preview updates **instantly in real time**.
- No need to repeatedly submit or wait — every keystroke is rendered live.

### 2. ✏️ Direct On-Resume In-Place Editing
- Click directly on the resume paper to edit, rewrite, or delete any text like a word processor.
- Modify headings, bullet points, titles, or dates right where they appear.
- Toggle **"Direct Edit on Resume: ON / OFF"** via the toolbar at any time.

### 3. 🎨 Color Theme & Typography Customizer
- Customize the resume accent color with one click:
  - ⚓ **Classic Navy** (`#0f2b48`)
  - 🔷 **Royal Blue** (`#1d4ed8`)
  - 🪨 **Slate Dark** (`#334155`)
  - 🌲 **Tech Emerald** (`#065f46`)
  - 🍷 **Executive Wine** (`#701a75`)
- Switch between **Modern Sans** (`Inter`) and **Classic Serif** (`Merriweather`) fonts.

### 4. 🎛️ Section Visibility & Dynamic Cards
- Toggle checkboxes to show or hide optional sections:
  - Professional Summary
  - Work Experience
  - Certifications & Achievements
- Add or remove multiple education degrees, projects, and work experiences with dynamic `+ Add` and `Remove` buttons.

### 5. 💾 Automatic Local Storage Saving
- Every change is automatically preserved in the browser's `localStorage`.
- Refreshing the page or closing the tab will not lose your customized resume.
- Switch between **"Blank Resume"** (clean slate) and **"Load Example Template"** at any time.

### 6. 🎯 Rule-Based Job Description Keyword Matching
- Paste any job posting into the Target Job Description box.
- The builder automatically matches your listed skills against the job posting without external AI APIs or privacy risks.
- Provides role-specific skill suggestions with 1-click `+ Add` into your skills list.

### 7. 📄 One-Click A4 PDF Export
- Click **"Download PDF"** to trigger the browser print dialog.
- The dedicated `@media print` stylesheet strips all UI controls, borders, and banners, formatting the document cleanly for A4 printing or saving as PDF.

---

## 📁 Project Structure

```text
resume_bul/
├── index.html        # Semantic layout with live form editor and direct-editable A4 resume paper
├── styles.css        # Navy-blue & customizable color themes, typography, and @media print CSS
├── app.js            # Live reactive engine, direct-edit mode, keyword matcher, and localStorage sync
├── PRD.md            # Approved Product Requirements Document (PRD v1.0)
└── README.md         # Documentation & guide
```

---

## 🚀 How to Run

1. Open [index.html](file:///c:/Users/lendi_45/Desktop/resume_bul/index.html) in Google Chrome, Microsoft Edge, Firefox, or Safari.
2. Click **"Blank Resume"** in the top header if you want to start completely empty and type your own details, or click **"Load Example Template"** to see a filled example.
3. Edit fields in the left panel, or click directly on the resume paper on the right to tweak text.
4. Click **"Download PDF"** to export your finished resume as a PDF.
