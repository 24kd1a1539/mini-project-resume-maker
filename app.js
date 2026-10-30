/**
 * SmartResume Builder — Professional Resume Creation Platform
 * Fully Customizable, Live-Reactive & Direct-Editable Resume Engine
 * Technology Stack: HTML5, CSS3, JavaScript (Frontend-only)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================================================
  // 1. Predefined Job Role Skill Dictionaries & Recommended Skills (FR-02, FR-10)
  // ===================================================================
  const ROLE_SKILL_DATABASE = {
    'Software Developer': [
      'Data Structures', 'Algorithms', 'Git', 'Object-Oriented Programming (OOP)',
      'SQL', 'RESTful APIs', 'Java', 'C++', 'System Design', 'Unit Testing',
      'CI/CD', 'Docker', 'Design Patterns', 'Debugging'
    ],
    'Frontend Developer': [
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'TypeScript',
      'Tailwind CSS', 'Responsive Web Design', 'Redux', 'RESTful APIs',
      'Webpack', 'Git', 'Next.js', 'UI/UX Principles', 'Cross-Browser Compatibility'
    ],
    'Python Developer': [
      'Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL',
      'REST APIs', 'Git', 'Docker', 'Pandas', 'NumPy',
      'SQLAlchemy', 'Linux', 'Celery', 'Redis', 'Unit Testing'
    ],
    'Data Analyst': [
      'SQL', 'Python', 'Microsoft Excel', 'Tableau', 'Power BI',
      'Pandas', 'Data Visualization', 'Statistical Analysis', 'R',
      'Data Cleaning', 'ETL Processes', 'Exploratory Data Analysis (EDA)', 'PostgreSQL'
    ],
    'AI/ML Engineer': [
      'Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
      'Scikit-Learn', 'Natural Language Processing (NLP)', 'Computer Vision',
      'Pandas', 'NumPy', 'Model Deployment', 'Git', 'Docker', 'Data Preprocessing'
    ],
    'Web Developer': [
      'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js',
      'MongoDB', 'SQL', 'RESTful APIs', 'Git', 'Responsive Design',
      'Authentication (JWT)', 'React', 'Web Security'
    ]
  };

  // ===================================================================
  // 2. DOM Elements Selection
  // ===================================================================
  const form = document.getElementById('resume-form');
  const btnBlankForm = document.getElementById('btn-blank-form');
  const btnClearForm = document.getElementById('btn-clear-form');
  const btnPrintPdf = document.getElementById('btn-print-pdf');
  const btnSuggestSummary = document.getElementById('btn-suggest-summary');
  const btnToggleDirectEdit = document.getElementById('btn-toggle-direct-edit');
  const editModeState = document.getElementById('edit-mode-state');
  const directEditHint = document.getElementById('direct-edit-hint');
  const saveText = document.getElementById('save-text');

  // Dynamic Add Buttons
  const btnAddEducation = document.getElementById('btn-add-education');
  const btnAddProject = document.getElementById('btn-add-project');
  const btnAddExperience = document.getElementById('btn-add-experience');

  // Section Checkbox Toggles
  const chkShowSummary = document.getElementById('chk-show-summary');
  const chkShowExperience = document.getElementById('chk-show-experience');
  const chkShowCertifications = document.getElementById('chk-show-certifications');
  const groupSummary = document.getElementById('group-summary');
  const groupCertifications = document.getElementById('group-certifications');

  // Dynamic Containers
  const educationContainer = document.getElementById('education-container');
  const projectsContainer = document.getElementById('projects-container');
  const experienceContainer = document.getElementById('experience-container');
  const blankEducationMarkup = educationContainer.innerHTML;
  const blankProjectsMarkup = projectsContainer.innerHTML;
  const blankExperienceMarkup = experienceContainer.innerHTML;

  // Inputs
  const inputFullName = document.getElementById('fullName');
  const inputEmail = document.getElementById('email');
  const inputPhone = document.getElementById('phone');
  const inputLocation = document.getElementById('location');
  const inputLinkedin = document.getElementById('linkedin');
  const inputGithub = document.getElementById('github');
  const selectJobRole = document.getElementById('jobRole');
  const inputJobDesc = document.getElementById('jobDescription');
  const inputSummary = document.getElementById('summary');
  const inputSkills = document.getElementById('skills');
  const inputCertifications = document.getElementById('certifications');
  const skillsChipsPreview = document.getElementById('skills-chips-preview');

  // Analysis Box Elements
  const matchScoreBadge = document.getElementById('match-score-badge');
  const matchSummaryText = document.getElementById('match-summary-text');
  const matchedSkillsList = document.getElementById('matched-skills-list');
  const suggestedSkillsList = document.getElementById('suggested-skills-list');
  const suggestedRoleLabel = document.getElementById('suggested-role-label');

  // Resume Document Output Elements
  const resumeOutput = document.getElementById('resume-output');
  const outFullName = document.getElementById('out-fullName');
  const outJobRole = document.getElementById('out-jobRole');
  const outEmail = document.getElementById('out-email');
  const outPhone = document.getElementById('out-phone');
  const sepPhone = document.getElementById('sep-phone');
  const outLocation = document.getElementById('out-location');
  const sepLocation = document.getElementById('sep-location');
  const outLinkedin = document.getElementById('out-linkedin');
  const sepLinkedin = document.getElementById('sep-linkedin');
  const outGithub = document.getElementById('out-github');
  const sepGithub = document.getElementById('sep-github');

  const secSummary = document.getElementById('sec-summary');
  const outSummary = document.getElementById('out-summary');
  const secSkills = document.getElementById('sec-skills');
  const outSkills = document.getElementById('out-skills');
  const secEducation = document.getElementById('sec-education');
  const outEducation = document.getElementById('out-education');
  const secProjects = document.getElementById('sec-projects');
  const outProjects = document.getElementById('out-projects');
  const secExperience = document.getElementById('sec-experience');
  const outExperience = document.getElementById('out-experience');
  const secCertifications = document.getElementById('sec-certifications');
  const outCertifications = document.getElementById('out-certifications');

  // Dynamic counter trackers
  let eduCount = 1;
  let projCount = 1;
  let expCount = 1;

  let directEditEnabled = true;
  let currentMatchedSkills = new Set();
  const STORAGE_KEY = 'smartresume_builder_draft_v2';
  const SETTINGS_KEY = 'smartresume_builder_settings_v2';

  // ===================================================================
  // 3. Security & Utility Functions (FR-13)
  // ===================================================================
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
      .replace(/[-_./]/g, ' ')
      .replace(/[^a-z0-9+# ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function parseSkillsList(input) {
    if (!input) return [];
    return input
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  function formatBullets(text) {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.trim().replace(/^[•\-\*]\s*/, ''))
      .filter(line => line.length > 0);
  }

  function cleanUrlDisplay(url) {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  }

  // ===================================================================
  // 4. Rule-Based Keyword Matching Engine (FR-03, FR-10)
  // ===================================================================
  function analyzeJobDescriptionAndSkills() {
    const jobRole = selectJobRole.value;
    const jdText = inputJobDesc.value.trim();
    const userSkills = parseSkillsList(inputSkills.value);

    // Update Suggested Role Label
    suggestedRoleLabel.textContent = jobRole || 'Selected Role';

    // 1. Find Recommended skills for the selected role
    const roleRecommendations = ROLE_SKILL_DATABASE[jobRole] || [];
    renderSuggestedSkills(roleRecommendations, userSkills);

    // Reset matched state
    currentMatchedSkills.clear();
    if (!jdText) {
      matchScoreBadge.textContent = '0 Matches';
      matchScoreBadge.classList.remove('has-matches');
      matchSummaryText.textContent = 'Paste a job description to analyze matching skills.';
      matchedSkillsList.innerHTML = '<span class="placeholder-text">Enter your skills and paste a job description above to inspect keyword alignment.</span>';
      return;
    }

    const normalizedJD = normalizeText(jdText);

    // Check each user skill against JD text
    userSkills.forEach(skill => {
      const normSkill = normalizeText(skill);
      if (!normSkill) return;

      const escapedNorm = normSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(^|\\b|\\s)${escapedNorm}(\\b|\\s|$)`, 'i');

      if (pattern.test(normalizedJD) || normalizedJD.includes(normSkill)) {
        currentMatchedSkills.add(skill.toLowerCase());
      }
    });

    // 2. Render Matched Skills
    const matchCount = currentMatchedSkills.size;
    matchScoreBadge.textContent = `${matchCount} ${matchCount === 1 ? 'Match' : 'Matches'}`;

    if (matchCount > 0) {
      matchScoreBadge.classList.add('has-matches');
      matchSummaryText.textContent = `${matchCount} of your skills match this job description directly!`;
      
      const matchedChipsHTML = userSkills
        .filter(s => currentMatchedSkills.has(s.toLowerCase()))
        .map(s => `<span class="badge-matched">${escapeHTML(s)}</span>`)
        .join('');
      matchedSkillsList.innerHTML = matchedChipsHTML;
    } else {
      matchScoreBadge.classList.remove('has-matches');
      matchSummaryText.textContent = 'None of your listed skills match the keywords in this job description yet.';
      matchedSkillsList.innerHTML = '<span class="placeholder-text">Add technologies mentioned in the job post (or pick from suggestions below).</span>';
    }
  }

  function renderSuggestedSkills(roleSkills, userSkills) {
    const userSkillNorms = new Set(userSkills.map(s => normalizeText(s)));
    const missingSuggestions = roleSkills.filter(s => !userSkillNorms.has(normalizeText(s)));

    if (missingSuggestions.length === 0) {
      suggestedSkillsList.innerHTML = '<span class="placeholder-text">Great! You have listed all standard skills for this role.</span>';
      return;
    }

    suggestedSkillsList.innerHTML = missingSuggestions.map(skill => `
      <button type="button" class="badge-suggested" data-skill="${escapeHTML(skill)}" title="Click to add to your skills list">
        <span>${escapeHTML(skill)}</span>
        <span class="add-icon">+ Add</span>
      </button>
    `).join('');

    suggestedSkillsList.querySelectorAll('.badge-suggested').forEach(btn => {
      btn.addEventListener('click', () => {
        const skillToAdd = btn.getAttribute('data-skill');
        addSkillToInput(skillToAdd);
      });
    });
  }

  function addSkillToInput(skillName) {
    let current = inputSkills.value.trim();
    if (current.length > 0 && !current.endsWith(',')) {
      current += ', ';
    } else if (current.length > 0 && current.endsWith(',')) {
      current += ' ';
    }
    inputSkills.value = current + skillName;
    updateSkillsChipsPreview();
    analyzeJobDescriptionAndSkills();
    generateResume(false);
  }

  function updateSkillsChipsPreview() {
    const skills = parseSkillsList(inputSkills.value);
    if (skills.length === 0) {
      skillsChipsPreview.innerHTML = '';
      return;
    }
    skillsChipsPreview.innerHTML = skills.map(s => `
      <span class="form-chip">${escapeHTML(s)}</span>
    `).join('');
  }

  // ===================================================================
  // 5. Dynamic Form Entries (Add/Remove Education, Projects, Experience)
  // ===================================================================
  btnAddEducation.addEventListener('click', () => {
    eduCount++;
    const entry = document.createElement('div');
    entry.className = 'dynamic-card education-item';
    entry.dataset.index = eduCount;
    entry.innerHTML = `
      <div class="dynamic-card-header">
        <span class="entry-counter">Education #${eduCount}</span>
        <button type="button" class="btn-danger-sm btn-remove-entry">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group col-span-2">
          <label>Degree or Qualification <span class="req">*</span></label>
          <input type="text" class="edu-degree" placeholder="e.g. M.S. in Software Engineering" required>
        </div>
        <div class="form-group">
          <label>College or University <span class="req">*</span></label>
          <input type="text" class="edu-school" placeholder="e.g. Stanford University" required>
        </div>
        <div class="form-group">
          <label>Graduation Year</label>
          <input type="text" class="edu-year" placeholder="e.g. 2022">
        </div>
      </div>
    `;
    educationContainer.appendChild(entry);
    attachRemoveHandler(entry);
    bindInputEvents(entry);
    generateResume(false);
  });

  btnAddProject.addEventListener('click', () => {
    projCount++;
    const entry = document.createElement('div');
    entry.className = 'dynamic-card project-item';
    entry.dataset.index = projCount;
    entry.innerHTML = `
      <div class="dynamic-card-header">
        <span class="entry-counter">Project #${projCount}</span>
        <button type="button" class="btn-danger-sm btn-remove-entry">Remove</button>
      </div>
      <div class="form-group">
        <label>Project Title <span class="req">*</span></label>
        <input type="text" class="project-title" placeholder="e.g. Cloud Infrastructure Automation" required>
      </div>
      <div class="form-group">
        <label>Key Technologies / Tools</label>
        <input type="text" class="project-tech" placeholder="e.g. Python, Docker, AWS, Terraform">
      </div>
      <div class="form-group">
        <label>Project Details / Highlights (One point per line) <span class="req">*</span></label>
        <textarea class="project-desc" rows="3" placeholder="• Automated container deployment pipeline saving 10 hours weekly&#10;• Implemented fault-tolerant microservice architecture" required></textarea>
      </div>
    `;
    projectsContainer.appendChild(entry);
    attachRemoveHandler(entry);
    bindInputEvents(entry);
    generateResume(false);
  });

  btnAddExperience.addEventListener('click', () => {
    expCount++;
    const entry = document.createElement('div');
    entry.className = 'dynamic-card experience-item';
    entry.dataset.index = expCount;
    entry.innerHTML = `
      <div class="dynamic-card-header">
        <span class="entry-counter">Experience #${expCount}</span>
        <button type="button" class="btn-danger-sm btn-remove-entry">Remove</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Job Title / Role</label>
          <input type="text" class="exp-title" placeholder="e.g. Software Engineer">
        </div>
        <div class="form-group">
          <label>Company / Organization</label>
          <input type="text" class="exp-company" placeholder="e.g. Tech Corp">
        </div>
        <div class="form-group col-span-2">
          <label>Duration & Location</label>
          <input type="text" class="exp-duration" placeholder="e.g. Jan 2023 – Present | New York, NY">
        </div>
        <div class="form-group col-span-2">
          <label>Responsibilities & Achievements (One point per line)</label>
          <textarea class="exp-desc" rows="3" placeholder="• Spearheaded design and development of customer-facing features"></textarea>
        </div>
      </div>
    `;
    experienceContainer.appendChild(entry);
    attachRemoveHandler(entry);
    bindInputEvents(entry);
    generateResume(false);
  });

  function attachRemoveHandler(entryElement) {
    const removeBtn = entryElement.querySelector('.btn-remove-entry');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        entryElement.remove();
        generateResume(false);
      });
    }
  }

  function bindInputEvents(parentElement) {
    parentElement.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => {
        generateResume(false);
      });
      input.addEventListener('change', () => {
        generateResume(false);
      });
    });
  }

  // Summary Generator Helper
  btnSuggestSummary.addEventListener('click', () => {
    const role = selectJobRole.value || 'Software Professional';
    const skills = parseSkillsList(inputSkills.value);
    const topSkills = skills.slice(0, 4).join(', ');

    let template = `Results-driven ${role} with practical expertise in designing robust, scalable, and user-friendly applications.`;
    if (topSkills) {
      template += ` Proficient in ${topSkills}, with a proven ability to write clean, maintainable code and collaborate effectively across cross-functional engineering teams.`;
    } else {
      template += ` Committed to engineering excellence, algorithmic problem-solving, and continuous learning in modern tech stacks.`;
    }
    inputSummary.value = template;
    generateResume(false);
  });

  // ===================================================================
  // 6. Direct In-Place Edit Mode Controls
  // ===================================================================
  function setDirectEditMode(enabled) {
    directEditEnabled = enabled;
    if (enabled) {
      resumeOutput.classList.add('direct-edit-active');
      resumeOutput.setAttribute('contenteditable', 'true');
      btnToggleDirectEdit.classList.remove('off');
      editModeState.textContent = 'ON';
      directEditHint.style.display = 'flex';
    } else {
      resumeOutput.classList.remove('direct-edit-active');
      resumeOutput.setAttribute('contenteditable', 'false');
      btnToggleDirectEdit.classList.add('off');
      editModeState.textContent = 'OFF';
      directEditHint.style.display = 'none';
    }
  }

  btnToggleDirectEdit.addEventListener('click', () => {
    setDirectEditMode(!directEditEnabled);
  });

  // Listen for direct text edits inside the resume paper to save changes
  resumeOutput.addEventListener('input', () => {
    notifySaved('Changes saved to resume');
  });

  // ===================================================================
  // 7. Theme Color & Typography Switchers
  // ===================================================================
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const chosenTheme = swatch.getAttribute('data-color');
      document.body.setAttribute('data-theme', chosenTheme);
      saveSettings();
    });
  });

  const btnFontSans = document.getElementById('btn-font-sans');
  const btnFontSerif = document.getElementById('btn-font-serif');

  btnFontSans.addEventListener('click', () => {
    btnFontSans.classList.add('active');
    btnFontSerif.classList.remove('active');
    document.body.setAttribute('data-font', 'sans');
    saveSettings();
  });

  btnFontSerif.addEventListener('click', () => {
    btnFontSerif.classList.add('active');
    btnFontSans.classList.remove('active');
    document.body.setAttribute('data-font', 'serif');
    saveSettings();
  });

  function saveSettings() {
    const settings = {
      theme: document.body.getAttribute('data-theme') || 'navy',
      font: document.body.getAttribute('data-font') || 'sans'
    };
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      // Storage unavailable, proceed safely
    }
  }

  function loadSettings() {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        if (settings.theme) {
          document.body.setAttribute('data-theme', settings.theme);
          document.querySelectorAll('.color-swatch').forEach(s => {
            s.classList.toggle('active', s.getAttribute('data-color') === settings.theme);
          });
        }
        if (settings.font) {
          document.body.setAttribute('data-font', settings.font);
          btnFontSans.classList.toggle('active', settings.font === 'sans');
          btnFontSerif.classList.toggle('active', settings.font === 'serif');
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  // ===================================================================
  // 8. Form Validation (FR-13)
  // ===================================================================
  function validateForm() {
    let isValid = true;
    document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

    if (!inputFullName.value.trim()) {
      inputFullName.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputEmail.value.trim() || !emailRegex.test(inputEmail.value.trim())) {
      inputEmail.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!selectJobRole.value) {
      selectJobRole.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    const skillsList = parseSkillsList(inputSkills.value);
    if (skillsList.length === 0) {
      inputSkills.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    let hasValidEducation = false;
    educationContainer.querySelectorAll('.education-item').forEach(card => {
      const degree = card.querySelector('.edu-degree').value.trim();
      const school = card.querySelector('.edu-school').value.trim();
      if (degree && school) hasValidEducation = true;
    });

    if (!hasValidEducation) {
      document.getElementById('err-education').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('err-education').style.display = 'none';
    }

    let hasValidProject = false;
    projectsContainer.querySelectorAll('.project-item').forEach(card => {
      const title = card.querySelector('.project-title').value.trim();
      const desc = card.querySelector('.project-desc').value.trim();
      if (title && desc) hasValidProject = true;
    });

    if (!hasValidProject) {
      document.getElementById('err-projects').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('err-projects').style.display = 'none';
    }

    return isValid;
  }

  // ===================================================================
  // 9. Real-Time Resume Rendering Engine (FR-09: Exact Section Order)
  // ===================================================================
  function generateResume(showValidationErrors = false) {
    if (showValidationErrors) {
      const isValid = validateForm();
      if (!isValid) {
        const firstError = document.querySelector('.has-error, [style*="display: block"]');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
      }
    }

    // Refresh Keyword Analyzer
    analyzeJobDescriptionAndSkills();

    // 1. Personal Information & Role (FR-01, FR-02)
    outFullName.textContent = inputFullName.value.trim() || 'Your Full Name';
    outJobRole.textContent = selectJobRole.value || 'Target Job Role';

    const emailVal = inputEmail.value.trim();
    outEmail.textContent = emailVal || 'your.email@example.com';

    toggleContactItem(outPhone, sepPhone, inputPhone.value.trim());
    toggleContactItem(outLocation, sepLocation, inputLocation.value.trim());
    toggleContactItem(outLinkedin, sepLinkedin, cleanUrlDisplay(inputLinkedin.value.trim()));
    toggleContactItem(outGithub, sepGithub, cleanUrlDisplay(inputGithub.value.trim()));

    // 2. Professional Summary (FR-09 Item 3)
    if (chkShowSummary.checked) {
      const summaryText = inputSummary.value.trim();
      secSummary.style.display = 'block';
      outSummary.textContent = summaryText || 'A professional summary highlighting your career goals, key strengths, and technical background will appear here.';
    } else {
      secSummary.style.display = 'none';
    }

    // 3. Technical Skills (FR-09 Item 4)
    const userSkills = parseSkillsList(inputSkills.value);
    if (userSkills.length > 0) {
      secSkills.style.display = 'block';
      outSkills.innerHTML = userSkills.map(skill => {
        const isMatched = currentMatchedSkills.has(skill.toLowerCase());
        const matchClass = isMatched ? 'resume-skill-badge matched-skill' : 'resume-skill-badge';
        return `<span class="${matchClass}">${escapeHTML(skill)}</span>`;
      }).join('');
    } else {
      secSkills.style.display = 'block';
      outSkills.innerHTML = '<span class="resume-skill-badge">Add technical skills in the form</span>';
    }

    // 4. Education (FR-09 Item 5)
    const eduCards = educationContainer.querySelectorAll('.education-item');
    const eduHTML = [];
    eduCards.forEach(card => {
      const degree = card.querySelector('.edu-degree').value.trim();
      const school = card.querySelector('.edu-school').value.trim();
      const year = card.querySelector('.edu-year').value.trim();

      if (degree || school) {
        eduHTML.push(`
          <div class="resume-entry">
            <div class="entry-row-main">
              <span class="entry-title">${escapeHTML(school || 'University Name')}</span>
              <span class="entry-meta-right">${escapeHTML(year || '')}</span>
            </div>
            <div class="entry-subtitle">${escapeHTML(degree || 'Degree Program')}</div>
          </div>
        `);
      }
    });

    if (eduHTML.length > 0) {
      secEducation.style.display = 'block';
      outEducation.innerHTML = eduHTML.join('');
    } else {
      secEducation.style.display = 'block';
      outEducation.innerHTML = `
        <div class="resume-entry">
          <div class="entry-row-main">
            <span class="entry-title">Institution / University</span>
            <span class="entry-meta-right">Year</span>
          </div>
          <div class="entry-subtitle">Degree / Major</div>
        </div>
      `;
    }

    // 5. Projects (FR-09 Item 6)
    const projCards = projectsContainer.querySelectorAll('.project-item');
    const projHTML = [];
    projCards.forEach(card => {
      const title = card.querySelector('.project-title').value.trim();
      const tech = card.querySelector('.project-tech').value.trim();
      const desc = card.querySelector('.project-desc').value.trim();

      if (title || desc) {
        const bullets = formatBullets(desc);
        const bulletsHTML = bullets.map(b => `<li>${escapeHTML(b)}</li>`).join('');

        projHTML.push(`
          <div class="resume-entry">
            <div class="entry-row-main">
              <span class="entry-title">${escapeHTML(title || 'Project Name')}</span>
              ${tech ? `<span class="entry-tech-badge">Technologies: ${escapeHTML(tech)}</span>` : ''}
            </div>
            ${bullets.length > 0 ? `<ul class="resume-bullets-list">${bulletsHTML}</ul>` : ''}
          </div>
        `);
      }
    });

    if (projHTML.length > 0) {
      secProjects.style.display = 'block';
      outProjects.innerHTML = projHTML.join('');
    } else {
      secProjects.style.display = 'block';
      outProjects.innerHTML = `
        <div class="resume-entry">
          <div class="entry-row-main">
            <span class="entry-title">Project Title</span>
          </div>
          <ul class="resume-bullets-list">
            <li>Highlight project features and measurable impacts here.</li>
          </ul>
        </div>
      `;
    }

    // 6. Work Experience (FR-09 Item 7 - Optional)
    if (chkShowExperience.checked) {
      const expCards = experienceContainer.querySelectorAll('.experience-item');
      const expHTML = [];
      expCards.forEach(card => {
        const title = card.querySelector('.exp-title').value.trim();
        const company = card.querySelector('.exp-company').value.trim();
        const duration = card.querySelector('.exp-duration').value.trim();
        const desc = card.querySelector('.exp-desc').value.trim();

        if (title || company || desc) {
          const bullets = formatBullets(desc);
          const bulletsHTML = bullets.map(b => `<li>${escapeHTML(b)}</li>`).join('');

          expHTML.push(`
            <div class="resume-entry">
              <div class="entry-row-main">
                <span class="entry-title">${escapeHTML(title || 'Role')}</span>
                <span class="entry-meta-right">${escapeHTML(duration || '')}</span>
              </div>
              <div class="entry-subtitle">${escapeHTML(company || '')}</div>
              ${bullets.length > 0 ? `<ul class="resume-bullets-list">${bulletsHTML}</ul>` : ''}
            </div>
          `);
        }
      });

      if (expHTML.length > 0) {
        secExperience.style.display = 'block';
        outExperience.innerHTML = expHTML.join('');
      } else {
        secExperience.style.display = 'none';
      }
    } else {
      secExperience.style.display = 'none';
    }

    // 7. Certifications & Achievements (FR-09 Item 8 - Optional)
    if (chkShowCertifications.checked) {
      const certsText = inputCertifications.value.trim();
      if (certsText) {
        const certBullets = formatBullets(certsText);
        if (certBullets.length > 0) {
          secCertifications.style.display = 'block';
          outCertifications.innerHTML = certBullets.map(c => `<li>${escapeHTML(c)}</li>`).join('');
        } else {
          secCertifications.style.display = 'none';
        }
      } else {
        secCertifications.style.display = 'none';
      }
    } else {
      secCertifications.style.display = 'none';
    }

    // Auto-save form draft to localStorage
    saveDraftToStorage();
    notifySaved('Changes synced live');
    return true;
  }

  function toggleContactItem(itemEl, sepEl, val) {
    if (val) {
      itemEl.textContent = val;
      itemEl.style.display = 'inline';
      sepEl.style.display = 'inline';
    } else {
      itemEl.style.display = 'none';
      sepEl.style.display = 'none';
    }
  }

  function notifySaved(msg = 'Saved locally') {
    if (saveText) {
      saveText.textContent = msg;
    }
  }

  // ===================================================================
  // 10. LocalStorage Persistence
  // ===================================================================
  function saveDraftToStorage() {
    const eduData = [];
    educationContainer.querySelectorAll('.education-item').forEach(card => {
      eduData.push({
        degree: card.querySelector('.edu-degree').value,
        school: card.querySelector('.edu-school').value,
        year: card.querySelector('.edu-year').value
      });
    });

    const projData = [];
    projectsContainer.querySelectorAll('.project-item').forEach(card => {
      projData.push({
        title: card.querySelector('.project-title').value,
        tech: card.querySelector('.project-tech').value,
        desc: card.querySelector('.project-desc').value
      });
    });

    const expData = [];
    experienceContainer.querySelectorAll('.experience-item').forEach(card => {
      expData.push({
        title: card.querySelector('.exp-title').value,
        company: card.querySelector('.exp-company').value,
        duration: card.querySelector('.exp-duration').value,
        desc: card.querySelector('.exp-desc').value
      });
    });

    const draft = {
      fullName: inputFullName.value,
      email: inputEmail.value,
      phone: inputPhone.value,
      location: inputLocation.value,
      linkedin: inputLinkedin.value,
      github: inputGithub.value,
      jobRole: selectJobRole.value,
      jobDescription: inputJobDesc.value,
      summary: inputSummary.value,
      skills: inputSkills.value,
      certifications: inputCertifications.value,
      showSummary: chkShowSummary.checked,
      showExperience: chkShowExperience.checked,
      showCertifications: chkShowCertifications.checked,
      education: eduData,
      projects: projData,
      experience: expData
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      // Storage unavailable, ignore
    }
  }

  function loadDraftFromStorage() {
    try {
      const dataStr = localStorage.getItem(STORAGE_KEY);
      if (!dataStr) return false;
      const draft = JSON.parse(dataStr);

      if (
        draft.fullName === 'Jordan Lee' &&
        draft.email === 'jordan.lee@example.edu' &&
        draft.projects?.some(project => project.title === 'CloudTask — Collaborative Task Platform')
      ) {
        localStorage.removeItem(STORAGE_KEY);
        return false;
      }

      inputFullName.value = draft.fullName || '';
      inputEmail.value = draft.email || '';
      inputPhone.value = draft.phone || '';
      inputLocation.value = draft.location || '';
      inputLinkedin.value = draft.linkedin || '';
      inputGithub.value = draft.github || '';
      selectJobRole.value = draft.jobRole || '';
      inputJobDesc.value = draft.jobDescription || '';
      inputSummary.value = draft.summary || '';
      inputSkills.value = draft.skills || '';
      inputCertifications.value = draft.certifications || '';

      if (typeof draft.showSummary === 'boolean') chkShowSummary.checked = draft.showSummary;
      if (typeof draft.showExperience === 'boolean') chkShowExperience.checked = draft.showExperience;
      if (typeof draft.showCertifications === 'boolean') chkShowCertifications.checked = draft.showCertifications;

      // Restore Education
      if (Array.isArray(draft.education) && draft.education.length > 0) {
        educationContainer.innerHTML = '';
        draft.education.forEach((edu, idx) => {
          const entry = document.createElement('div');
          entry.className = 'dynamic-card education-item';
          entry.dataset.index = idx;
          entry.innerHTML = `
            ${idx > 0 ? `<div class="dynamic-card-header"><span class="entry-counter">Education #${idx + 1}</span><button type="button" class="btn-danger-sm btn-remove-entry">Remove</button></div>` : ''}
            <div class="form-grid">
              <div class="form-group col-span-2">
                <label>Degree or Qualification <span class="req">*</span></label>
                <input type="text" class="edu-degree" value="${escapeHTML(edu.degree || '')}" required>
              </div>
              <div class="form-group">
                <label>College or University <span class="req">*</span></label>
                <input type="text" class="edu-school" value="${escapeHTML(edu.school || '')}" required>
              </div>
              <div class="form-group">
                <label>Graduation Year</label>
                <input type="text" class="edu-year" value="${escapeHTML(edu.year || '')}">
              </div>
            </div>
          `;
          educationContainer.appendChild(entry);
          attachRemoveHandler(entry);
        });
      }

      // Restore Projects
      if (Array.isArray(draft.projects) && draft.projects.length > 0) {
        projectsContainer.innerHTML = '';
        draft.projects.forEach((proj, idx) => {
          const entry = document.createElement('div');
          entry.className = 'dynamic-card project-item';
          entry.dataset.index = idx;
          entry.innerHTML = `
            ${idx > 0 ? `<div class="dynamic-card-header"><span class="entry-counter">Project #${idx + 1}</span><button type="button" class="btn-danger-sm btn-remove-entry">Remove</button></div>` : ''}
            <div class="form-group">
              <label>Project Title <span class="req">*</span></label>
              <input type="text" class="project-title" value="${escapeHTML(proj.title || '')}" required>
            </div>
            <div class="form-group">
              <label>Key Technologies / Tools</label>
              <input type="text" class="project-tech" value="${escapeHTML(proj.tech || '')}">
            </div>
            <div class="form-group">
              <label>Project Details / Highlights (One point per line) <span class="req">*</span></label>
              <textarea class="project-desc" rows="3" required>${escapeHTML(proj.desc || '')}</textarea>
            </div>
          `;
          projectsContainer.appendChild(entry);
          attachRemoveHandler(entry);
        });
      }

      // Restore Experience
      if (Array.isArray(draft.experience) && draft.experience.length > 0) {
        experienceContainer.innerHTML = '';
        draft.experience.forEach((exp, idx) => {
          const entry = document.createElement('div');
          entry.className = 'dynamic-card experience-item';
          entry.dataset.index = idx;
          entry.innerHTML = `
            ${idx > 0 ? `<div class="dynamic-card-header"><span class="entry-counter">Experience #${idx + 1}</span><button type="button" class="btn-danger-sm btn-remove-entry">Remove</button></div>` : ''}
            <div class="form-grid">
              <div class="form-group">
                <label>Job Title / Role</label>
                <input type="text" class="exp-title" value="${escapeHTML(exp.title || '')}">
              </div>
              <div class="form-group">
                <label>Company / Organization</label>
                <input type="text" class="exp-company" value="${escapeHTML(exp.company || '')}">
              </div>
              <div class="form-group col-span-2">
                <label>Duration & Location</label>
                <input type="text" class="exp-duration" value="${escapeHTML(exp.duration || '')}">
              </div>
              <div class="form-group col-span-2">
                <label>Responsibilities & Achievements (One point per line)</label>
                <textarea class="exp-desc" rows="3">${escapeHTML(exp.desc || '')}</textarea>
              </div>
            </div>
          `;
          experienceContainer.appendChild(entry);
          attachRemoveHandler(entry);
        });
      }

      bindInputEvents(form);
      updateSkillsChipsPreview();
      generateResume(false);
      return true;
    } catch (e) {
      return false;
    }
  }

  // ===================================================================
  // 11. Blank Resume Loader
  // ===================================================================
  btnBlankForm.addEventListener('click', () => {
    if (confirm('Start with a clean blank form to type your own details?')) {
      resetToBlankForm();
    }
  });

  function resetToBlankForm() {
    form.reset();
    educationContainer.innerHTML = blankEducationMarkup;
    projectsContainer.innerHTML = blankProjectsMarkup;
    experienceContainer.innerHTML = blankExperienceMarkup;

    bindInputEvents(form);
    skillsChipsPreview.innerHTML = '';
    currentMatchedSkills.clear();
    generateResume(false);
  }

  btnClearForm.addEventListener('click', () => {
    if (confirm('Reset everything? This will clear all data and start with an empty resume.')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      resetToBlankForm();
    }
  });

  // ===================================================================
  // 12. Event Listeners & Live Two-Way Binding
  // ===================================================================
  // Live reactive typing across form
  form.addEventListener('input', () => {
    updateSkillsChipsPreview();
    generateResume(false);
  });

  form.addEventListener('change', () => {
    updateSkillsChipsPreview();
    generateResume(false);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = generateResume(true);
    if (success) {
      notifySaved('All inputs verified & synced ✓');
      if (window.innerWidth <= 980) {
        document.getElementById('preview-panel').scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  btnPrintPdf.addEventListener('click', () => {
    generateResume(false);
    window.print();
  });

  // ===================================================================
  // 13. Initialization
  // ===================================================================
  loadSettings();
  setDirectEditMode(true);
  bindInputEvents(form);

  loadDraftFromStorage();
});
