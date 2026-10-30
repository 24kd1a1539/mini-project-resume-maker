# Product Requirements Document (PRD)
## SmartResume Builder — Professional Resume Creation Platform

**Version:** 1.0  
**Project Type:** Web Application  
**Document Status:** Approved  
**Technology Stack:** HTML5, CSS3, JavaScript (Frontend-only)

---

## 1. Project Overview

### 1.1 Product Name
SmartResume Builder

### 1.2 Product Description
SmartResume Builder is a web-based application that enables users to create professional, job-specific resumes by entering their personal information, educational qualifications, technical skills, projects, and work experience.

The application allows users to select a target job role, provide a job description, identify relevant keywords through rule-based matching, preview their resumes in real time after generation, and download the final resume as a PDF.

The application aims to simplify resume creation for students, fresh graduates, and job seekers without requiring technical knowledge or AI-powered services.

### 1.3 Problem Statement
Creating a professional resume can be challenging for students and job seekers, especially when they need to customize their resumes for different job opportunities.

Common challenges include:
- Lack of professional resume-writing knowledge.
- Difficulty organizing technical skills and project information.
- Difficulty identifying relevant job-description keywords.
- Limited access to simple resume-building tools.
- Time-consuming manual formatting and editing.
- Difficulty creating a consistent, professional resume layout.

SmartResume Builder addresses these challenges by providing a simple interface for entering information, generating structured resumes, identifying relevant keywords, and exporting documents.

### 1.4 Product Vision
To provide an accessible and easy-to-use resume-building platform that helps students and job seekers create professional, well-structured resumes tailored to their target job roles.

---

## 2. Product Objectives

1. Enable users to create a resume by entering their information into a structured form.
2. Generate a professional resume with clearly organized sections.
3. Allow users to select a target job role.
4. Analyze pasted job descriptions using basic keyword-matching techniques.
5. Highlight skills that match the supplied job description.
6. Identify additional skills that users may wish to develop.
7. Provide an immediate resume preview.
8. Allow users to print or save their resumes as PDF documents.
9. Provide a responsive interface for desktop, tablet, and mobile devices.
10. Minimize setup complexity by using frontend technologies without requiring a backend or AI API.

---

## 3. Functional Requirements

- **FR-01: Personal Information Management**: Full name, email address (required), phone number, location, LinkedIn profile URL, GitHub profile URL. Escapes HTML safely.
- **FR-02: Job Role Selection**: Predefined roles: Software Developer, Frontend Developer, Python Developer, Data Analyst, AI/ML Engineer, Web Developer.
- **FR-03: Job Description Input**: Paste job description, rule-based keyword extraction and match against user skills.
- **FR-04: Education Management**: Degree/qualification, institution, graduation year.
- **FR-05: Technical Skills Management**: Comma-separated skills, displayed as badges, matching skills highlighted.
- **FR-06: Project Information**: Titles and multi-line descriptions rendered as bullet points.
- **FR-07: Work Experience**: Optional internship/work experience, omitted when empty.
- **FR-08: Certifications and Achievements**: Optional, omitted when empty.
- **FR-09: Resume Generation**: Structured sections in exact order:
  1. Name and contact information
  2. Target job role
  3. Professional summary
  4. Technical skills
  5. Education
  6. Projects
  7. Work experience
  8. Certifications and achievements
- **FR-10: Job Description Matching**: Reports matching skill count, highlights matches, recommends role skills without auto-adding.
- **FR-11: Resume Preview**: Live/generated preview on A4 styled sheet.
- **FR-12: PDF Export**: Browser print interface (`window.print()`), A4 format, excluded UI controls via print CSS.
- **FR-13: Input Validation**: Validates required inputs, valid email format, sanitizes inputs.

---

## 4. Architecture & Design
- Client-side only (HTML5, CSS3, vanilla JavaScript ES6+).
- Navy-blue (#0f2a4a) and white clean professional palette.
- Separation of concerns across `index.html`, `styles.css`, and `app.js`.
