/**
 * Rutu Maheshbhai Vekariya - Portfolio Interactive Script
 * High performance, zero external dependencies, accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initNavbarScroll();
  initMobileMenu();
  initProjectFiltering();
  initProjectModal();
  initContactInteractions();
  initBackToTop();
  initScrollSpy();
});

/* ==========================================
   1. THEME TOGGLE (Dark / Light)
   ========================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('rutu_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('rutu_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;
  const icon = themeToggleBtn.querySelector('i');
  if (icon) {
    if (theme === 'light') {
      icon.className = 'fas fa-sun';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      icon.className = 'fas fa-moon';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }
}

/* ==========================================
   2. SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ==========================================
   3. NAVBAR SHRINK ON SCROLL
   ========================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================
   4. MOBILE NAVIGATION DRAWER
   ========================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
    mobileBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking on any navigation link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================
   5. PROJECT CATEGORY FILTERING
   ========================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const categories = cardCategory.split(' ');
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================
   6. PROJECT DETAILS MODAL
   ========================================== */
const projectDetailsData = {
  futuremap: {
    title: 'FutureMap',
    subtitle: 'AI-Assisted Career Guidance Platform',
    badge: 'AI & Full-Stack',
    badgeClass: 'badge-ai',
    description: 'A comprehensive AI-powered platform designed to provide real-time, context-aware career recommendations for engineering students and job-seekers.',
    keyFeatures: [
      'Engineered autonomous AI agents with specialized prompt engineering to produce structured, consistent career pathways.',
      'Developed robust RESTful API endpoints and relational SQL data pipelines utilizing Node.js and Express.',
      'Interactive, high-responsiveness frontend built using React.js with modular component architecture.',
      'Agile / Scrum delivery workflow with continuous testing and iterative prompt tuning.'
    ],
    techStack: ['Python', 'SQL', 'LLMs', 'Prompt Engineering', 'Node.js', 'Express', 'React.js', 'REST APIs']
  },
  churn: {
    title: 'Customer Churn & Retention Analytics',
    subtitle: 'Data Pipeline, Risk Modeling & Executive Tableau BI Dashboard',
    badge: 'Business & Data Analytics',
    badgeClass: 'badge-data',
    description: 'An enterprise-grade commercial data intelligence system analyzing customer attrition patterns, quantifying revenue vulnerability, and delivering stakeholder-ready Tableau analytics for strategic decision-making.',
    keyFeatures: [
      'Constructed scalable Python (Pandas, NumPy) and SQL pipelines for data cleaning, transformation, and multi-factor exploratory data analysis (EDA).',
      'Uncovered primary business churn drivers across contract type, subscription tenure, and payment behavioral patterns.',
      'Trained, benchmarked, and evaluated Scikit-learn classification models to maximize prediction accuracy and minimize false negatives.',
      'Designed executive-level Tableau analytics dashboards visualizing high-risk segments and revenue at risk to guide stakeholder retention decisions.'
    ],
    techStack: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'Business Intelligence', 'Statistical Modeling']
  },
  quiz: {
    title: 'Distributed Quiz System',
    subtitle: 'Real-Time Scalable Architecture & Anti-Cheat Tab Detection',
    badge: 'Real-Time Systems',
    badgeClass: 'badge-web',
    description: 'A fault-tolerant distributed assessment system delivering low-latency synchronization and proactive integrity monitoring during online competitions.',
    keyFeatures: [
      'Architected live data ingestion and publishing pipelines utilizing WebSockets for real-time question broadcasting and participant scoring.',
      'Centralized administration monitoring console providing live participant tracking, latency metrics, and system uptime.',
      'Built automated tab-switch and focus-loss detection to flag suspicious assessment activity and protect testing integrity.',
      'Implemented robust reconnection fallbacks and state synchronization to eliminate message drops.'
    ],
    techStack: ['WebSockets', 'Real-Time Systems', 'Node.js', 'Event-Driven Architecture', 'Security Monitoring']
  },
  carprice: {
    title: 'Car Price Prediction Machine Learning',
    subtitle: 'Multivariate Regression & Vehicle Valuation Engine',
    badge: 'Data Science',
    badgeClass: 'badge-data',
    description: 'A predictive regression modeling project analyzing automotive specifications to deliver accurate pricing forecasts for vehicle marketplaces.',
    keyFeatures: [
      'Preprocessed complex automotive tabular data, handling collinearity, missing variables, and feature scaling.',
      'Engineered feature representations from horsepower, engine displacement, mileage, and vehicle dimensions.',
      'Trained and validated Scikit-learn regression models, optimizing RMSE and R² metrics against unseen test sets.',
      'Conducted feature importance analysis to identify top valuation drivers informing pricing decisions.'
    ],
    techStack: ['Python', 'Scikit-learn', 'Regression', 'Data Wrangling', 'Model Evaluation', 'Statistical Analysis']
  },
  painter: {
    title: 'Virtual Painter',
    subtitle: 'Gesture-Based Interactive Canvas with Computer Vision',
    badge: 'Computer Vision',
    badgeClass: 'badge-vision',
    description: 'An interactive digital drawing system allowing users to illustrate on screen using real-time hand tracking and intuitive gesture recognition.',
    keyFeatures: [
      'Developed native Java application adhering to clean Object-Oriented Programming (OOP) paradigms.',
      'Leveraged OpenCV real-time hand tracking algorithms to track finger landmarks with high frame-rate performance.',
      'Implemented intuitive spatial gestures for seamless brush thickness modulation, color palette selection, and canvas clearing.',
      'Smooth interpolation and low-latency canvas rendering for natural drawing experience.'
    ],
    techStack: ['Java', 'OpenCV', 'Computer Vision', 'Gesture Recognition', 'OOP', 'Interactive Systems']
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modalOverlay || !closeBtn) return;

  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesc = document.getElementById('modal-desc');
  const modalList = document.getElementById('modal-list');
  const modalTechPills = document.getElementById('modal-tech');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectDetailsData[projId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalBadge.textContent = data.badge;
      modalBadge.className = `modal-badge ${data.badgeClass}`;
      modalDesc.textContent = data.description;

      modalList.innerHTML = data.keyFeatures.map(item => `<li>${item}</li>`).join('');
      modalTechPills.innerHTML = data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================
   7. CONTACT FORM & EMAIL COPYING
   ========================================== */
function initContactInteractions() {
  // Check if visitor was redirected back after successful submission
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('sent') || urlParams.has('status')) {
    setTimeout(() => {
      showToast('Thank you! Your message has been sent to Rutu.', 'fa-check-circle');
    }, 600);
    // Clean URL without triggering page reload
    if (window.history && window.history.replaceState) {
      const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '#contact';
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
  }

  // Copy email button
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'rutuvekariya136@gmail.com';
      copyToClipboard(email, 'Email copied to clipboard!');
    });
  }

  // Contact form native submission (reliable across all browsers & no popups)
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-form-btn');
  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', () => {
      // Let the browser submit the form natively to FormSubmit
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i><span>Sending message...</span>';
    });
  }
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage, 'fa-check-circle');
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage, 'fa-check-circle');
  } catch (err) {
    showToast('Failed to copy. Please manually copy the email.', 'fa-exclamation-triangle');
  }
  document.body.removeChild(textArea);
}

function showToast(message, iconClass = 'fa-check-circle') {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================
   8. BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   9. SCROLL SPY FOR NAVIGATION
   ========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

