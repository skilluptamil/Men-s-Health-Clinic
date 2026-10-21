/**
 * Vanguard Urology & Men's Health Clinic
 * Master Interactive Logic: Themes, RTL, Navigation, Modals, Forms, Filters,
 * Admin Dashboard, Authentication Tabs & Pricing Calculators
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileNav();
  initDesktopDropdown();
  setupInputMasks();
  initAppointmentModal();
  initFaqAccordions();
  initFilterAndSearch();
  initForms();
  initBackToTop();
  initSymptomChecker();
  initAuthTabs();
  initAdminDashboard();
  initCountdownTimer();
  initServiceDetailsDynamic();
  initBlogDetailsDynamic();
  initScrollAnimations();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('vanguard_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('vanguard_theme', theme);
  
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      btn.setAttribute('aria-label', 'Switch to Light Mode');
      btn.title = 'Switch to Light Mode';
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
      btn.title = 'Switch to Dark Mode';
    }
  });
}

/* ==========================================================================
   2. RTL Switcher (Left-to-Right / Right-to-Left)
   ========================================================================== */
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('vanguard_dir') || 'ltr';

  setDirection(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      setDirection(newDir);
    });
  });
}

function setDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('vanguard_dir', dir);
  
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggleBtns.forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR Layout' : 'Switch to RTL Layout');
    btn.title = dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left';
  });
}

/* ==========================================================================
   3. Mobile Navigation & Drawer
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeDrawer();
      }
    });
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  mobileDropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.mobile-nav-item');
      const dropdown = parent.querySelector('.mobile-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('active');
        const icon = trigger.querySelector('.dropdown-arrow');
        if (icon) {
          icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });
}

function initDesktopDropdown() {
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.dropdown-menu');
    if (!link || !menu) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      document.querySelectorAll('.nav-item.has-dropdown.open').forEach(item => {
        item.classList.remove('open');
      });
    }
  });
}

/* ==========================================================================
   4. Universal Form Validation & Real-time Sanitizers
   ========================================================================== */

function setFieldError(inputEl, message) {
  if (!inputEl) return;
  inputEl.classList.add('is-invalid');
  const group = inputEl.closest('.form-group') || inputEl.parentElement;
  if (group) {
    group.classList.add('has-error');
    let feedback = group.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      group.appendChild(feedback);
    }
    feedback.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>${message}</span>`;
  }
}

function clearFieldError(inputEl) {
  if (!inputEl) return;
  inputEl.classList.remove('is-invalid');
  const group = inputEl.closest('.form-group') || inputEl.parentElement;
  if (group) {
    group.classList.remove('has-error');
    const feedback = group.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.innerHTML = '';
    }
  }
}

function validatePhoneField(input, isRequired = true) {
  if (!input) return true;
  const val = input.value.trim();
  if (!val) {
    if (isRequired) {
      setFieldError(input, 'Confidential phone number is required.');
      return false;
    }
    clearFieldError(input);
    return true;
  }

  // Reject any letters or arbitrary symbols
  if (/[^\d\s+()\-.]/.test(val)) {
    setFieldError(input, 'Phone number must contain numbers and phone symbols (+, -, parentheses) only.');
    return false;
  }

  const digits = val.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    setFieldError(input, 'Please enter a valid phone number (7 to 15 digits, e.g. 555-019-2834 or +1 800 555 8765).');
    return false;
  }

  clearFieldError(input);
  return true;
}

function validateNameField(input, isRequired = true, label = 'Full name') {
  if (!input) return true;
  const val = input.value.trim();
  if (!val) {
    if (isRequired) {
      setFieldError(input, `${label} is required.`);
      return false;
    }
    clearFieldError(input);
    return true;
  }

  if (/\d/.test(val)) {
    setFieldError(input, `${label} must contain letters only, no numbers.`);
    return false;
  }

  const lettersOnly = val.replace(/[^a-zA-Z\u00C0-\u024F\u0600-\u06FF]/g, '');
  if (lettersOnly.length < 2) {
    setFieldError(input, `Please enter a valid ${label.toLowerCase()} (at least 2 letters).`);
    return false;
  }

  clearFieldError(input);
  return true;
}

function validateEmailField(input, isRequired = true) {
  if (!input) return true;
  const val = input.value.trim();
  if (!val) {
    if (isRequired) {
      setFieldError(input, 'Email address is required.');
      return false;
    }
    clearFieldError(input);
    return true;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(val)) {
    setFieldError(input, 'Please enter a complete and valid email address (e.g. patient@example.com).');
    return false;
  }

  clearFieldError(input);
  return true;
}

function validateSelectField(select, fieldName = 'Option') {
  if (!select) return true;
  if (!select.value || select.value.trim() === '' || (select.selectedIndex === 0 && select.options[0].value === '')) {
    setFieldError(select, `Please select a valid ${fieldName.toLowerCase()}.`);
    return false;
  }
  clearFieldError(select);
  return true;
}

function validateDateField(input, isAppointment = true) {
  if (!input) return true;
  const val = input.value;
  if (!val) {
    setFieldError(input, 'Please select a date.');
    return false;
  }

  const todayStr = new Date().toISOString().split('T')[0];
  if (isAppointment && val < todayStr) {
    setFieldError(input, 'Appointment date cannot be in the past.');
    return false;
  }

  clearFieldError(input);
  return true;
}

function validateSignupPassword(input) {
  if (!input) return true;
  const val = input.value;
  if (!val) {
    setFieldError(input, 'Password is required.');
    return false;
  }
  if (val.length < 8) {
    setFieldError(input, 'Password must be at least 8 characters long.');
    return false;
  }
  const hasUpper = /[A-Z]/.test(val);
  const hasLower = /[a-z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasSpecial = /[^A-Za-z0-9]/.test(val);

  if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
    const missing = [];
    if (!hasUpper) missing.push('an uppercase letter (A-Z)');
    if (!hasLower) missing.push('a lowercase letter (a-z)');
    if (!hasNumber) missing.push('a number (0-9)');
    if (!hasSpecial) missing.push('a special character (e.g. @, #, $, !)');
    setFieldError(input, `Password must contain at least ${missing.join(', ')}.`);
    return false;
  }
  clearFieldError(input);
  return true;
}

function validateLoginPassword(input, minLen = 6) {
  if (!input) return true;
  const val = input.value;
  if (!val) {
    setFieldError(input, 'Password is required.');
    return false;
  }
  if (val.length < minLen) {
    setFieldError(input, `Password must be at least ${minLen} characters long.`);
    return false;
  }
  clearFieldError(input);
  return true;
}

function validatePasswordField(input, minLen = 8) {
  if (!input) return true;
  if (input.id === 'reg-password') {
    return validateSignupPassword(input);
  }
  return validateLoginPassword(input, minLen);
}

function validateMessageField(textarea, minLen = 5, maxLen = 1000, isRequired = false) {
  if (!textarea) return true;
  const val = textarea.value.trim();
  if (!val) {
    if (isRequired) {
      setFieldError(textarea, 'Please provide a message or inquiry details.');
      return false;
    }
    clearFieldError(textarea);
    return true;
  }
  if (val.length < minLen && isRequired) {
    setFieldError(textarea, `Message must be at least ${minLen} characters long.`);
    return false;
  }
  if (val.length > maxLen) {
    setFieldError(textarea, `Message cannot exceed ${maxLen} characters.`);
    return false;
  }
  clearFieldError(textarea);
  return true;
}

function setupInputMasks() {
  // 1. Phone number inputs: strictly numbers and phone punctuation (+, -, (), spaces, .)
  document.querySelectorAll('input[type="tel"], input[id*="phone"], input[name*="phone"], input[id*="mobile"]').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      // Allow only digits, space, +, -, (, ), .
      if (!/[\d\s+()\-.]/.test(e.key)) {
        e.preventDefault();
      }
    });

    input.addEventListener('input', () => {
      const orig = input.value;
      const sanitized = orig.replace(/[^\d\s+()\-.]/g, '');
      if (orig !== sanitized) {
        input.value = sanitized;
      }
      const digitsCount = input.value.replace(/\D/g, '').length;
      if (digitsCount >= 7 && digitsCount <= 15) {
        clearFieldError(input);
      }
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        validatePhoneField(input, input.hasAttribute('required'));
      }
    });
  });

  // 2. Name inputs: letters, spaces, apostrophes, and hyphens only (strictly no digits or arbitrary symbols)
  document.querySelectorAll('input[id*="name"], input[name*="name"], input[id*="first-name"], input[id*="last-name"]').forEach(input => {
    if (input.type === 'text' && !input.id.includes('user') && !input.id.includes('search') && !input.id.includes('email')) {
      input.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
        // Block digits and disallowed special characters
        if (/[\d;:@#$%^&*()_+=\[\]{}|"\\<>\/?~`]/.test(e.key)) {
          e.preventDefault();
        }
      });

      input.addEventListener('input', () => {
        const orig = input.value;
        const sanitized = orig.replace(/[^a-zA-Z\u00C0-\u024F\u0600-\u06FF\s\-'.]/g, '');
        if (orig !== sanitized) {
          input.value = sanitized;
        }
        if (input.value.trim().length >= 2) {
          clearFieldError(input);
        }
      });

      input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
          validateNameField(input, input.hasAttribute('required'));
        }
      });
    }
  });

  // 3. Email inputs: live error clearance on full format match
  document.querySelectorAll('input[type="email"], input[id*="email"], input[name*="email"]').forEach(input => {
    input.addEventListener('input', () => {
      const val = input.value.trim();
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
        clearFieldError(input);
      }
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        validateEmailField(input, input.hasAttribute('required'));
      }
    });
  });

  // 4. Select dropdowns: live error clearance on change
  document.querySelectorAll('select.form-control, select').forEach(select => {
    select.addEventListener('change', () => {
      if (select.value && select.value.trim() !== '') {
        clearFieldError(select);
      }
    });
  });

  // 5. Date inputs: live error clearance on selection
  document.querySelectorAll('input[type="date"]').forEach(dateInput => {
    dateInput.addEventListener('change', () => {
      if (dateInput.value) {
        clearFieldError(dateInput);
      }
    });
    dateInput.addEventListener('input', () => {
      if (dateInput.value) {
        clearFieldError(dateInput);
      }
    });
  });

  // 6. Textarea inputs: live error clearance within character limits
  document.querySelectorAll('textarea.form-control, textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
      if (textarea.value.length <= 1000) {
        clearFieldError(textarea);
      }
    });
  });

  // 7. Password inputs: live validation and error clearance
  const regPassLive = document.getElementById('reg-password');
  const regConfirmLive = document.getElementById('reg-confirm-password');
  const loginPassLive = document.getElementById('login-password');

  if (loginPassLive) {
    loginPassLive.addEventListener('input', () => {
      if (loginPassLive.value.length >= 6) {
        clearFieldError(loginPassLive);
      }
    });
  }

  if (regPassLive) {
    regPassLive.addEventListener('input', () => {
      if (regPassLive.classList.contains('is-invalid')) {
        validateSignupPassword(regPassLive);
      } else {
        const val = regPassLive.value;
        if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) {
          clearFieldError(regPassLive);
        }
      }
      if (regConfirmLive && regConfirmLive.value) {
        if (regConfirmLive.value !== regPassLive.value) {
          setFieldError(regConfirmLive, 'Confirm password must match your chosen password.');
        } else {
          clearFieldError(regConfirmLive);
        }
      }
    });
  }

  // 8. Confirm Password matching clearance
  if (regConfirmLive && regPassLive) {
    regConfirmLive.addEventListener('input', () => {
      if (regConfirmLive.value === regPassLive.value && regConfirmLive.value.length >= 8) {
        clearFieldError(regConfirmLive);
      }
    });
  }
}

/* ==========================================================================
   DYNAMIC APPOINTMENT BOOKING SYSTEM & MODAL STATE MANAGEMENT
   ========================================================================== */

const CLINICAL_SERVICES_DATA = [
  {
    id: 'prostate',
    matchKeys: ['prostate & bph laser care', 'prostate care & bph relief', 'prostate care & bph treatment', 'prostate & bph', 'prostate care', 'prostate', 'bph', 'laser lithotripsy', 'rezum', 'holep'],
    serviceName: 'Prostate & BPH Laser Care',
    doctorName: 'Dr. Anthony Rossi, MD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'trt',
    matchKeys: ['testosterone therapy (trt)', 'testosterone therapy', 'trt', 'testosterone optimization', 'testosterone', 'hormone optimization'],
    serviceName: 'Testosterone Therapy (TRT)',
    doctorName: 'Dr. David Chen, MD, PhD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'ed',
    matchKeys: ['acoustic wave ed therapy', 'erectile vitality & shockwave', 'erectile dysfunction & shockwave', 'acoustic wave', 'shockwave ed', 'shockwave therapy', 'shockwave', 'ed therapy', 'ed', 'erectile vitality'],
    serviceName: 'Acoustic Wave ED Therapy',
    doctorName: 'Dr. Marcus Sterling, MD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'kidney',
    matchKeys: ['kidney stone laser removal', 'kidney stone laser care', 'kidney stone', 'kidney stones', 'kidney', 'laser lithotripsy', 'stone removal', 'stones'],
    serviceName: 'Kidney Stone Laser Removal',
    doctorName: 'Dr. Sarah Jenkins, MD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'vasectomy',
    matchKeys: ['no-scalpel vasectomy', 'no-scalpel vasectomy & reversal', 'vasectomy & reversal', 'vasectomy reversal', 'vasectomy', 'microsurgery'],
    serviceName: 'No-Scalpel Vasectomy',
    doctorName: 'Dr. Marcus Sterling, MD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'fertility',
    matchKeys: ['male reproductive medicine', 'male fertility & reproductive health', 'male fertility', 'reproductive medicine', 'male infertility', 'fertility', 'varicocele', 'andrology & microsurgery', 'andrology'],
    serviceName: 'Male Reproductive Medicine',
    doctorName: 'Dr. Marcus Sterling, MD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'executive',
    matchKeys: ['executive male health screening', 'complete executive screen', 'executive screen', 'executive vip', 'executive screening', 'health screening', 'executive wellness'],
    serviceName: 'Executive Male Health Screening',
    doctorName: 'Dr. Anthony Rossi, MD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  },
  {
    id: 'vitality',
    matchKeys: ["men's vitality check", 'vitality check', 'essential vitality', 'mens vitality'],
    serviceName: "Men's Vitality Check",
    doctorName: 'Dr. David Chen, MD, PhD',
    timeSlots: ['Morning (8:00 AM - 12:00 PM)', 'Afternoon (12:00 PM - 4:00 PM)', 'Late Afternoon (4:00 PM - 7:00 PM)']
  }
];

const CLINICAL_DOCTORS_DATA = [
  {
    matchKeys: ['dr. anthony rossi', 'anthony rossi', 'rossi'],
    doctorName: 'Dr. Anthony Rossi, MD',
    primaryService: 'Prostate & BPH Laser Care'
  },
  {
    matchKeys: ['dr. david chen', 'david chen', 'chen'],
    doctorName: 'Dr. David Chen, MD, PhD',
    primaryService: 'Testosterone Therapy (TRT)'
  },
  {
    matchKeys: ['dr. sarah jenkins', 'sarah jenkins', 'jenkins'],
    doctorName: 'Dr. Sarah Jenkins, MD',
    primaryService: 'Kidney Stone Laser Removal'
  },
  {
    matchKeys: ['dr. marcus sterling', 'marcus sterling', 'sterling'],
    doctorName: 'Dr. Marcus Sterling, MD',
    primaryService: 'No-Scalpel Vasectomy'
  }
];

function findServiceData(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  for (const item of CLINICAL_SERVICES_DATA) {
    if (item.matchKeys.some(k => k === q || q.includes(k) || k.includes(q))) {
      return item;
    }
  }
  return null;
}

function findDoctorData(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  for (const item of CLINICAL_DOCTORS_DATA) {
    if (item.matchKeys.some(k => k === q || q.includes(k) || k.includes(q))) {
      return item;
    }
  }
  return null;
}

function setSelectValueFuzzy(selectEl, rawValue) {
  if (!selectEl || !rawValue) return false;
  const target = rawValue.toLowerCase().trim();
  const options = Array.from(selectEl.options);

  // 1. Exact value match
  let matchedOpt = options.find(opt => opt.value.toLowerCase() === target);
  // 2. Exact text match
  if (!matchedOpt) {
    matchedOpt = options.find(opt => opt.text.toLowerCase() === target);
  }
  // 3. Substring in value or text
  if (!matchedOpt) {
    matchedOpt = options.find(opt => {
      const val = opt.value.toLowerCase();
      const txt = opt.text.toLowerCase();
      return (val && (val.includes(target) || target.includes(val))) ||
             (txt && (txt.includes(target) || target.includes(txt)));
    });
  }

  if (matchedOpt) {
    selectEl.value = matchedOpt.value;
    return true;
  }

  // Dynamically append option if not found in list so nothing is ever dropped
  const newOpt = document.createElement('option');
  newOpt.value = rawValue;
  newOpt.textContent = rawValue;
  selectEl.appendChild(newOpt);
  selectEl.value = rawValue;
  return true;
}

function initAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  if (!modal) return;

  const modalBody = modal.querySelector('.modal-body');
  const initialModalBodyHTML = modalBody ? modalBody.innerHTML : '';

  // Setup form submission and sync handlers
  function bindModalFormEvents() {
    const form = modal.querySelector('#appointment-form');
    if (!form) return;

    const servSelect = form.querySelector('#modal-service');
    const docSelect = form.querySelector('#modal-doctor');
    const dateInput = form.querySelector('#modal-date');
    const timeSelect = form.querySelector('#modal-time');

    // Date picker minimum
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateInput) {
      dateInput.min = todayStr;
      dateInput.addEventListener('click', () => {
        try {
          if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
          }
        } catch (e) {}
      });
    }

    // Bidirectional Live Sync: Changing Service updates Doctor
    if (servSelect && docSelect) {
      servSelect.addEventListener('change', () => {
        const val = servSelect.value;
        if (val) {
          clearFieldError(servSelect);
          const sData = findServiceData(val);
          if (sData && sData.doctorName) {
            setSelectValueFuzzy(docSelect, sData.doctorName);
            clearFieldError(docSelect);
          }
        }
      });

      // Changing Doctor updates Service (if service unselected or mismatched)
      docSelect.addEventListener('change', () => {
        const val = docSelect.value;
        if (val && val !== 'First Available Specialist') {
          clearFieldError(docSelect);
          const dData = findDoctorData(val);
          if (dData && dData.primaryService && !servSelect.value) {
            setSelectValueFuzzy(servSelect, dData.primaryService);
            clearFieldError(servSelect);
          }
        }
      });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const serviceEl = form.querySelector('#modal-service');
      const doctorEl = form.querySelector('#modal-doctor');
      const dateEl = form.querySelector('#modal-date');
      const timeEl = form.querySelector('#modal-time');
      const nameEl = form.querySelector('#modal-name');
      const phoneEl = form.querySelector('#modal-phone');
      const emailEl = form.querySelector('#modal-email');
      const notesEl = form.querySelector('#modal-notes');

      // Clear previous invalid markings
      [serviceEl, doctorEl, dateEl, timeEl, nameEl, phoneEl, emailEl, notesEl].forEach(el => {
        if (el) clearFieldError(el);
      });

      let isValid = true;
      let firstInvalidEl = null;

      // Validate Service
      if (!validateSelectField(serviceEl, 'Clinical department / service')) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = serviceEl;
      }

      // Validate Doctor
      if (!validateSelectField(doctorEl, 'Preferred specialist')) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = doctorEl;
      }

      // Validate Date
      if (!validateDateField(dateEl, true)) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = dateEl;
      }

      // Validate Time Slot
      if (!validateSelectField(timeEl, 'Preferred time slot')) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = timeEl;
      }

      // Validate Full Name
      if (!validateNameField(nameEl, true, 'Full name')) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = nameEl;
      }

      // Validate Phone Number
      if (!validatePhoneField(phoneEl, true)) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = phoneEl;
      }

      // Validate Email Address
      if (!validateEmailField(emailEl, true)) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = emailEl;
      }

      // Validate Notes (optional)
      if (notesEl && !validateMessageField(notesEl, 0, 1000, false)) {
        isValid = false;
        if (!firstInvalidEl) firstInvalidEl = notesEl;
      }

      if (!isValid) {
        if (firstInvalidEl) firstInvalidEl.focus();
        showToast('Please correct the highlighted form errors to continue.', 'error');
        return;
      }

      const patientName = nameEl.value.trim();
      const patientPhone = phoneEl.value.trim();
      const patientEmail = emailEl.value.trim();
      const refId = 'VMH-' + Math.floor(100000 + Math.random() * 900000);
      
      const selectedService = serviceEl.options[serviceEl.selectedIndex]?.text || serviceEl.value;
      const selectedDoctor = doctorEl.options[doctorEl.selectedIndex]?.text || doctorEl.value;
      const rawDate = dateEl.value;
      const selectedTime = timeEl.options[timeEl.selectedIndex]?.text || timeEl.value;

      // Format date for display
      let formattedDate = rawDate;
      try {
        const dateObj = new Date(rawDate + 'T00:00:00');
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        }
      } catch (err) {}

      // Render Dynamic Confirmation View
      if (modalBody) {
        modalBody.innerHTML = `
          <div class="text-center" style="padding: 1.25rem 0.5rem;" role="status" aria-live="polite">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(56, 189, 248, 0.15); color: #38BDF8; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.15rem;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="margin-bottom: 0.45rem; font-size: 1.35rem; color: var(--text-heading);">Consultation Reserved</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.25rem; font-size: 0.95rem; line-height: 1.5;">
              Thank you, <strong>${patientName}</strong>. Your confidential consultation slot has been reserved under confirmation <strong>#${refId}</strong>.
            </p>
            <div style="background: var(--bg-alt); border: 1px solid var(--border-color); padding: 1.15rem; border-radius: 14px; margin-bottom: 1.35rem; text-align: left; font-size: 0.875rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.75rem;">
                <div>
                  <span style="color: var(--text-muted); font-size: 0.8rem; display: block; margin-bottom: 0.15rem;">Treatment / Service</span>
                  <strong style="color: var(--text-heading); font-size: 0.92rem;">${selectedService}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); font-size: 0.8rem; display: block; margin-bottom: 0.15rem;">Assigned Specialist</span>
                  <strong style="color: var(--text-heading); font-size: 0.92rem;">${selectedDoctor}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); font-size: 0.8rem; display: block; margin-bottom: 0.15rem;">Date</span>
                  <strong style="color: var(--text-heading); font-size: 0.92rem;">${formattedDate}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); font-size: 0.8rem; display: block; margin-bottom: 0.15rem;">Time Slot</span>
                  <strong style="color: var(--text-heading); font-size: 0.92rem;">${selectedTime}</strong>
                </div>
              </div>
              <hr style="border: none; border-top: 1px solid var(--border-color); margin: 0.75rem 0;">
              <p style="margin-bottom: 0; font-size: 0.825rem; color: var(--text-muted); line-height: 1.45;">
                🔒 <strong>Discreet Check-in:</strong> Our patient coordinator will contact you privately at <strong>${patientPhone || patientEmail}</strong> within 2 business hours to finalize arrival details.
              </p>
            </div>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" id="btn-close-appointment-confirmed" style="flex: 1; min-width: 160px; padding-block: 0.85rem;">
                Done & Return to Clinic
              </button>
              <button type="button" class="btn btn-outline" id="btn-book-another-appointment" style="flex: 1; min-width: 160px; padding-block: 0.85rem;">
                Book Another Service
              </button>
            </div>
          </div>
        `;

        // Handle Return / Close
        const closeConfirmBtn = modal.querySelector('#btn-close-appointment-confirmed');
        if (closeConfirmBtn) {
          closeConfirmBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          });
        }

        // Handle Book Another Service (clean reset)
        const bookAnotherBtn = modal.querySelector('#btn-book-another-appointment');
        if (bookAnotherBtn) {
          bookAnotherBtn.addEventListener('click', () => {
            resetModalForm('', '');
          });
        }
      }

      showToast('Consultation reserved successfully! Ref: ' + refId, 'success');
    });
  }

  // Restore pristine form and populate dynamic service/doctor data
  function resetModalForm(preselectedService, preselectedDoctor) {
    if (!modalBody) return;

    // If confirmation screen is currently displayed, restore pristine form HTML
    if (!modalBody.querySelector('#appointment-form') && initialModalBodyHTML) {
      modalBody.innerHTML = initialModalBodyHTML;
    }

    bindModalFormEvents();

    const form = modal.querySelector('#appointment-form');
    if (!form) return;

    const servSelect = form.querySelector('#modal-service');
    const docSelect = form.querySelector('#modal-doctor');
    const dateInput = form.querySelector('#modal-date');
    const timeSelect = form.querySelector('#modal-time');
    const nameInput = form.querySelector('#modal-name');
    const phoneInput = form.querySelector('#modal-phone');
    const emailInput = form.querySelector('#modal-email');
    const notesInput = form.querySelector('#modal-notes');

    // Clear previous input values for a clean new booking
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (emailInput) emailInput.value = '';
    if (notesInput) notesInput.value = '';
    if (dateInput) {
      dateInput.value = '';
      dateInput.min = new Date().toISOString().split('T')[0];
    }
    if (timeSelect) {
      timeSelect.selectedIndex = 0;
    }

    // Clear field error highlights
    [servSelect, docSelect, dateInput, timeSelect, nameInput, phoneInput, emailInput, notesInput].forEach(el => {
      if (el) clearFieldError(el);
    });

    // Dynamic resolution of Service & Doctor
    if (preselectedService) {
      const sData = findServiceData(preselectedService);
      if (sData) {
        setSelectValueFuzzy(servSelect, sData.serviceName);
        if (!preselectedDoctor && sData.doctorName) {
          setSelectValueFuzzy(docSelect, sData.doctorName);
        }
      } else {
        setSelectValueFuzzy(servSelect, preselectedService);
      }
    }

    if (preselectedDoctor) {
      const dData = findDoctorData(preselectedDoctor);
      if (dData) {
        setSelectValueFuzzy(docSelect, dData.doctorName);
        if (!preselectedService && dData.primaryService) {
          setSelectValueFuzzy(servSelect, dData.primaryService);
        }
      } else {
        setSelectValueFuzzy(docSelect, preselectedDoctor);
      }
    }

    if (!preselectedService && !preselectedDoctor) {
      if (servSelect) servSelect.selectedIndex = 0;
      if (docSelect) docSelect.selectedIndex = 0;
    }

    setupInputMasks();
  }

  // Initial binding
  bindModalFormEvents();

  // Global open modal trigger handlers for all cards and buttons
  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.btn-book-appointment, [data-open-modal="appointment"]');
    if (bookBtn) {
      e.preventDefault();

      let preselectedDoctor = bookBtn.getAttribute('data-doctor') || '';
      let preselectedService = bookBtn.getAttribute('data-service') || '';

      // Fallback: check parent service card heading if attribute omitted
      if (!preselectedService && !preselectedDoctor) {
        const serviceCard = bookBtn.closest('.service-card, .procedure-card, .pricing-card');
        if (serviceCard) {
          const heading = serviceCard.querySelector('h3, h4, .service-title, .card-title');
          if (heading) preselectedService = heading.textContent.trim();
        }
      }

      // Fallback: check parent doctor card heading if attribute omitted
      if (!preselectedDoctor) {
        const doctorCard = bookBtn.closest('.doctor-card, .specialist-card');
        if (doctorCard) {
          const heading = doctorCard.querySelector('h4, h3, .doctor-name');
          if (heading) preselectedDoctor = heading.textContent.trim();
        }
      }

      resetModalForm(preselectedService, preselectedDoctor);

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Privacy Policy trigger
    const privacyBtn = e.target.closest('[data-open-modal="privacy"], a[href="#privacy-modal"], a[href="#privacy"]');
    if (privacyBtn) {
      e.preventDefault();
      openPolicyModal('privacy');
    }

    // HIPAA Statement trigger
    const hipaaBtn = e.target.closest('[data-open-modal="hipaa"], a[href="#hipaa-modal"], a[href="#hipaa"]');
    if (hipaaBtn) {
      e.preventDefault();
      openPolicyModal('hipaa');
    }

    // Close button trigger
    const closeBtn = e.target.closest('.modal-close-btn, [data-close-modal]');
    if (closeBtn) {
      const activeModal = closeBtn.closest('.modal-backdrop');
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // Close when clicking modal backdrop
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) {
        m.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => {
        m.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}

/* Helper to Open Privacy / HIPAA Policy Modals dynamically */
function openPolicyModal(type) {
  let modalId = type === 'privacy' ? 'privacy-modal' : 'hipaa-modal';
  let modal = document.getElementById(modalId);

  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = modalId;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    if (type === 'privacy') {
      modal.innerHTML = `
        <div class="modal-card" style="max-width: 680px;">
          <div class="modal-header">
            <div>
              <h3>Patient Privacy & Data Protection Policy</h3>
              <p>Strict Clinical Confidentiality, GDPR & CCPA Compliance Standards</p>
            </div>
            <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body" style="font-size: 0.925rem; line-height: 1.7; color: var(--text-main);">
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">1. Confidential Medical Information</h4>
              <p style="color: var(--text-muted);">All consultations, medical histories, lab biomarker diagnostics, and treatment plans are governed by physician-patient privilege. No health information is ever shared with third parties, employers, or marketers.</p>
            </div>
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">2. 256-Bit Cryptographic Security</h4>
              <p style="color: var(--text-muted);">Electronic medical records (EMR), patient portal communications, and telehealth video sessions are encrypted end-to-end with bank-grade 256-bit AES encryption.</p>
            </div>
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">3. Discrete Billing Descriptors</h4>
              <p style="color: var(--text-muted);">To protect your personal privacy, all credit card and banking transactions utilize discreet corporate billing descriptors without medical specialty references.</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">4. Your Privacy Rights</h4>
              <p style="color: var(--text-muted);">You retain the unconditional right to review, download, transfer, or request the permanent deletion of your electronic records at any time by contacting our Privacy Officer at <strong style="color: var(--text-heading);">privacy@vanguardmenshealth.com</strong>.</p>
            </div>
            <button type="button" class="btn btn-primary" style="width: 100%; margin-top: 1rem;" data-close-modal>Understood & Close</button>
          </div>
        </div>
      `;
    } else {
      modal.innerHTML = `
        <div class="modal-card" style="max-width: 680px;">
          <div class="modal-header">
            <div>
              <h3>HIPAA Compliance & Notice of Privacy Practices</h3>
              <p>Federal Health Insurance Portability and Accountability Act Standards</p>
            </div>
            <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body" style="font-size: 0.925rem; line-height: 1.7; color: var(--text-main);">
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">1. Protected Health Information (PHI)</h4>
              <p style="color: var(--text-muted);">Vanguard Urology & Men's Health Clinic strictly complies with federal HIPAA Privacy, Security, and Breach Notification Rules (45 CFR Parts 160 & 164). Your PHI is safeguarded across all physical and digital channels.</p>
            </div>
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">2. Permitted Uses & Disclosures</h4>
              <p style="color: var(--text-muted);">Your medical records are used exclusively for direct treatment coordination, necessary prescription fulfillment, and authorized healthcare operations with your explicit written consent.</p>
            </div>
            <div style="margin-bottom: 1.25rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">3. Telehealth & Digital Security</h4>
              <p style="color: var(--text-muted);">All remote video appointments and digital lab transmissions operate over SOC-2 Type II certified, HIPAA-compliant encrypted channels with multi-factor authentication.</p>
            </div>
            <div style="margin-bottom: 1rem;">
              <h4 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.4rem;">4. HIPAA Privacy Officer</h4>
              <p style="color: var(--text-muted);">For questions or formal HIPAA requests, contact our Compliance Director at <strong style="color: var(--text-heading);">hipaa-officer@vanguardmenshealth.com</strong> or call <strong style="color: var(--text-heading);">+1 (800) 555-8765</strong>.</p>
            </div>
            <button type="button" class="btn btn-primary" style="width: 100%; margin-top: 1rem;" data-close-modal>I Acknowledge</button>
          </div>
        </div>
      `;
    }
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    const acknowledgeBtn = modal.querySelector('[data-close-modal]');
    if (acknowledgeBtn) {
      acknowledgeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   5. Interactive FAQ Accordions
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. Live Category Filters & Search
   ========================================================================== */
function initFilterAndSearch() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('search-filter-input');
  const filterableCards = document.querySelectorAll('.filterable-card');
  const noResultsMsg = document.getElementById('no-results-message');

  if (filterPills.length > 0 && filterableCards.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        applyFilterAndSearch();
      });
    });
  }

  if (searchInput && filterableCards.length > 0) {
    searchInput.addEventListener('input', applyFilterAndSearch);
  }

  function applyFilterAndSearch() {
    const activePill = document.querySelector('.filter-pill.active');
    const selectedCategory = activePill ? activePill.getAttribute('data-category') : 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let matchCount = 0;

    filterableCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardText = card.innerText.toLowerCase();

      const matchesCategory = (selectedCategory === 'all' || cardCategory.includes(selectedCategory));
      const matchesSearch = (searchQuery === '' || cardText.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }
}

/* ==========================================================================
   7. Form Handlers & Toast Alerts
   ========================================================================== */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  const notifyForm = document.getElementById('maintenance-notify-form');
  const blogInquiryForm = document.getElementById('blog-inquiry-form');

  // Contact / Appointment Form Validation
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fName = document.getElementById('contact-first-name');
      const lName = document.getElementById('contact-last-name');
      const phone = document.getElementById('contact-phone');
      const email = document.getElementById('contact-email');
      const dept = document.getElementById('contact-department');
      const date = document.getElementById('contact-date');
      const msg = document.getElementById('contact-message');

      [fName, lName, phone, email, dept, date, msg].forEach(el => {
        if (el) clearFieldError(el);
      });

      let isValid = true;
      let firstInvalid = null;

      if (!validateNameField(fName, true, 'First name')) {
        isValid = false;
        if (!firstInvalid) firstInvalid = fName;
      }
      if (!validateNameField(lName, true, 'Last name')) {
        isValid = false;
        if (!firstInvalid) firstInvalid = lName;
      }
      if (!validatePhoneField(phone, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = phone;
      }
      if (!validateEmailField(email, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = email;
      }
      if (!validateSelectField(dept, 'Department / service')) {
        isValid = false;
        if (!firstInvalid) firstInvalid = dept;
      }
      if (!validateDateField(date, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = date;
      }
      if (msg && !validateMessageField(msg, 5, 1000, false)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = msg;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        showToast('Please correct the highlighted fields in your confidential appointment request.', 'error');
        return;
      }

      showToast('Thank you! Your confidential appointment request has been dispatched securely.', 'success');
      contactForm.reset();
    });
  }

  // Blog Medical Inquiry Form
  if (blogInquiryForm) {
    blogInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inqName = document.getElementById('inquiry-name');
      const inqEmail = document.getElementById('inquiry-email');
      const inqMsg = document.getElementById('inquiry-message');

      [inqName, inqEmail, inqMsg].forEach(el => { if (el) clearFieldError(el); });

      let isValid = true;
      let firstInvalid = null;

      if (!validateNameField(inqName, true, 'Your name')) {
        isValid = false;
        if (!firstInvalid) firstInvalid = inqName;
      }
      if (!validateEmailField(inqEmail, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = inqEmail;
      }
      if (!validateMessageField(inqMsg, 5, 1000, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = inqMsg;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        showToast('Please correct the highlighted inquiry fields.', 'error');
        return;
      }

      showToast('Your confidential inquiry has been submitted for physician review.', 'success');
      
      // Dynamically display the new enquiry in the patient comments & enquiries list
      const commentsList = document.getElementById('blog-comments-list');
      const commentsCount = document.getElementById('blog-comments-count');
      if (commentsList) {
        const newName = inqName.value.trim();
        const newMsg = inqMsg.value.trim();
        const initials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PT';
        const newCard = document.createElement('div');
        newCard.className = 'blog-comment-card';
        newCard.style.animation = 'fadeInUp 0.4s ease';
        newCard.innerHTML = `
          <div class="blog-comment-header">
            <div class="blog-comment-author-wrap">
              <div class="patient-avatar-badge" style="width: 38px; height: 38px; min-width: 38px; min-height: 38px; font-size: 0.85rem;">${initials}</div>
              <div>
                <h5 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-heading);">${newName}</h5>
                <span style="font-size: 0.75rem; color: var(--emerald); font-weight: 600;">Patient Enquiry • Just now</span>
              </div>
            </div>
          </div>
          <p class="blog-comment-text">${newMsg}</p>
        `;
        commentsList.prepend(newCard);
        if (commentsCount) {
          commentsCount.textContent = String(parseInt(commentsCount.textContent || '0', 10) + 1);
        }
      }

      blogInquiryForm.reset();
    });
  }

  // Newsletter Subscription Forms
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        if (!validateEmailField(emailInput, true)) {
          showToast('Please enter a valid email address to subscribe.', 'error');
          if (emailInput) emailInput.focus();
          return;
        }
      }
      showToast('Subscribed! You will receive our monthly men\'s health digest.', 'success');
      form.reset();
    });
  });

  // Maintenance Notification Form
  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = notifyForm.querySelector('input[type="email"]');
      if (emailInput) {
        if (!validateEmailField(emailInput, true)) {
          showToast('Please enter a valid email address for notifications.', 'error');
          if (emailInput) emailInput.focus();
          return;
        }
      }
      showToast('Thank you! We will notify you immediately once system maintenance concludes.', 'success');
      notifyForm.reset();
    });
  }
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const isError = type === 'error';
  toast.className = `toast-message ${isError ? 'toast-error' : 'toast-success'}`;

  const iconHtml = isError
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

  toast.innerHTML = `
    ${iconHtml}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   8. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('active');
    } else {
      backBtn.classList.remove('active');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   9. Interactive Men's Health Symptom Self-Assessment (Home 2)
   ========================================================================== */
function initSymptomChecker() {
  const checkerForm = document.getElementById('symptom-checker-form');
  const resultCard = document.getElementById('symptom-result-card');

  if (!checkerForm || !resultCard) return;

  checkerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const age = checkerForm.querySelector('select[name="age"]')?.value || '40-49';
    const primaryConcern = checkerForm.querySelector('select[name="concern"]')?.value || 'energy';
    
    let recommendation = '';
    let doctorName = 'Dr. David Chen';
    let serviceLink = 'service-details.html#trt';

    if (primaryConcern === 'energy' || primaryConcern === 'libido') {
      recommendation = 'Hormonal & Comprehensive Testosterone Panel (TRT Assessment)';
      doctorName = 'Dr. David Chen (Andrology & Endocrine Lead)';
      serviceLink = 'service-details.html#trt';
    } else if (primaryConcern === 'urinary' || primaryConcern === 'prostate') {
      recommendation = 'Non-Invasive Urological Prostate & Flow Diagnostics';
      doctorName = 'Dr. Anthony Rossi (Senior Consultant Urologist)';
      serviceLink = 'service-details.html#prostate';
    } else if (primaryConcern === 'performance') {
      recommendation = 'Regenerative Focused Acoustic Shockwave Therapy';
      doctorName = 'Dr. Marcus Sterling (Microsurgeon & Vitality Specialist)';
      serviceLink = 'service-details.html#ed';
    } else {
      recommendation = 'Comprehensive Executive Men\'s Health Screening';
      doctorName = 'Dr. Sarah Jenkins (Urological Surgeon)';
      serviceLink = 'service-details.html';
    }

    resultCard.innerHTML = `
      <div style="padding: 1.5rem; background: var(--bg-card); border-radius: 16px; border: 1.5px solid var(--accent); box-shadow: var(--shadow-lg);">
        <div class="badge" style="background: var(--accent-soft); color: var(--accent); padding: 0.35rem 0.75rem; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; display: inline-block; margin-bottom: 0.75rem;">CONFIDENTIAL CLINICAL ASSESSMENT</div>
        <h4 style="margin-bottom: 0.5rem; font-size: 1.15rem;">Recommended Care Pathway</h4>
        <p style="color: var(--text-main); font-weight: 600; font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--accent);">🔬 ${recommendation}</p>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem;">Based on age group <strong>${age}</strong> and primary focus area. Recommended Specialist: <strong>${doctorName}</strong>.</p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="${serviceLink}" class="btn btn-sm btn-primary">Learn About Treatment</a>
          <button type="button" class="btn btn-sm btn-secondary btn-book-appointment" data-doctor="${doctorName}" data-service="${recommendation}">Book Priority Consultation</button>
        </div>
      </div>
    `;
    resultCard.style.display = 'block';
    initAppointmentModal();
  });
}

/* ==========================================================================
   10. Authentication Tabs (Login / Register / Forgot Password)
   ========================================================================== */
function initAuthTabs() {
  const authTabs = document.querySelectorAll('.auth-tab-btn');
  const authForms = document.querySelectorAll('.auth-form-panel');

  if (authTabs.length > 0) {
    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        authTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const targetId = tab.getAttribute('data-target');
        authForms.forEach(form => {
          if (form.id === targetId) {
            form.style.display = 'block';
          } else {
            form.style.display = 'none';
          }
        });
      });
    });

    // Check URL hash or search parameter for tab activation
    const currentHash = window.location.hash.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (currentHash === '#register' || currentHash === '#signup' || tabParam === 'register' || tabParam === 'signup') {
      const regTab = document.querySelector('[data-target="panel-register"]');
      if (regTab) regTab.click();
    } else if (currentHash === '#forgot' || currentHash === '#recovery' || tabParam === 'forgot') {
      const forgotTab = document.querySelector('[data-target="panel-forgot"]');
      if (forgotTab) forgotTab.click();
    }
  }

  // Password toggle
  const pwdToggles = document.querySelectorAll('.password-toggle-btn');
  pwdToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.password-input-group').querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });

  // Auth Forms Submission Handlers with Strict Validation
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const forgotForm = document.getElementById('form-forgot');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginEmail = document.getElementById('login-email');
      const loginPass = document.getElementById('login-password');

      [loginEmail, loginPass].forEach(el => { if (el) clearFieldError(el); });

      let isValid = true;
      let firstInvalid = null;

      if (!loginEmail || loginEmail.value.trim().length < 3) {
        setFieldError(loginEmail, 'Please enter your Patient ID or registered email.');
        isValid = false;
        if (!firstInvalid) firstInvalid = loginEmail;
      }
      if (!validateLoginPassword(loginPass, 6)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = loginPass;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        showToast('Please provide valid login credentials.', 'error');
        return;
      }

      showToast('Authentication successful! Loading Patient Portal...', 'success');
      setTimeout(() => { window.location.href = 'admin.html'; }, 1000);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const regName = document.getElementById('reg-name');
      const regDob = document.getElementById('reg-dob');
      const regPhone = document.getElementById('reg-phone');
      const regEmail = document.getElementById('reg-email');
      const regPass = document.getElementById('reg-password');
      const regConfirmPass = document.getElementById('reg-confirm-password');
      const consentCheck = registerForm.querySelector('input[type="checkbox"]');

      [regName, regDob, regPhone, regEmail, regPass, regConfirmPass, consentCheck].forEach(el => {
        if (el) clearFieldError(el);
      });

      let isValid = true;
      let firstInvalid = null;

      if (!validateNameField(regName, true, 'Legal full name')) {
        isValid = false;
        if (!firstInvalid) firstInvalid = regName;
      }
      if (!validateDateField(regDob, false)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = regDob;
      }
      if (!validatePhoneField(regPhone, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = regPhone;
      }
      if (!validateEmailField(regEmail, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = regEmail;
      }
      if (!validateSignupPassword(regPass)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = regPass;
      }
      if (regConfirmPass && regConfirmPass.value !== regPass.value) {
        setFieldError(regConfirmPass, 'Confirm password must match your chosen password.');
        isValid = false;
        if (!firstInvalid) firstInvalid = regConfirmPass;
      }
      if (consentCheck && !consentCheck.checked) {
        setFieldError(consentCheck, 'You must agree to HIPAA electronic record communications.');
        isValid = false;
        if (!firstInvalid) firstInvalid = consentCheck;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        showToast('Please correct the highlighted registration errors.', 'error');
        return;
      }

      showToast('Registration successful! Verification email dispatched.', 'success');
      setTimeout(() => { window.location.href = 'admin.html'; }, 1000);
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const forgotInput = document.getElementById('forgot-email');
      if (forgotInput) clearFieldError(forgotInput);

      const val = forgotInput ? forgotInput.value.trim() : '';
      const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
      const isPhone = val.replace(/\D/g, '').length >= 7;

      if (!val || (!isEmail && !isPhone)) {
        setFieldError(forgotInput, 'Please enter a valid registered email address or phone number.');
        showToast('Please enter a valid registered email or phone.', 'error');
        if (forgotInput) forgotInput.focus();
        return;
      }

      showToast('Password recovery instructions sent! Please check your messages.', 'success');
      forgotForm.reset();
    });
  }
}

/* ==========================================================================
   11. Admin Dashboard Interactive Tabs & Actions
   ========================================================================== */
function initAdminDashboard() {
  const panelTriggers = document.querySelectorAll('[data-panel]');
  const adminPanels = document.querySelectorAll('.admin-panel-section');

  if (panelTriggers.length > 0) {
    panelTriggers.forEach(item => {
      item.addEventListener('click', () => {
        const targetPanel = item.getAttribute('data-panel');
        if (!targetPanel) return;

        panelTriggers.forEach(trigger => {
          if (trigger.getAttribute('data-panel') === targetPanel) {
            trigger.classList.add('active');
          } else {
            trigger.classList.remove('active');
          }
        });

        adminPanels.forEach(panel => {
          if (panel.id === targetPanel) {
            panel.style.display = 'block';
          } else {
            panel.style.display = 'none';
          }
        });
      });
    });
  }

  // Appointment Status Buttons
  const statusActionBtns = document.querySelectorAll('.btn-status-action');
  statusActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const row = btn.closest('tr');
      const badge = row.querySelector('.status-badge');

      if (action === 'confirm' && badge) {
        badge.className = 'status-badge status-confirmed';
        badge.textContent = 'Confirmed';
        showToast('Appointment status updated to Confirmed.');
      } else if (action === 'cancel' && badge) {
        badge.className = 'status-badge status-cancelled';
        badge.textContent = 'Cancelled';
        showToast('Appointment status updated to Cancelled.');
      }
    });
  });

  // Admin Settings Form submission handler
  const adminSettingsForm = document.getElementById('admin-settings-form');
  if (adminSettingsForm) {
    adminSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const locationInput = document.getElementById('admin-location');
      const phoneInput = document.getElementById('admin-phone');
      const doctorSelect = document.getElementById('admin-doctor');

      [locationInput, phoneInput, doctorSelect].forEach(el => {
        if (el) clearFieldError(el);
      });

      let isValid = true;
      let firstInvalid = null;

      if (!locationInput || locationInput.value.trim().length < 5) {
        setFieldError(locationInput, 'Please enter a valid clinic address.');
        isValid = false;
        if (!firstInvalid) firstInvalid = locationInput;
      }

      if (!validatePhoneField(phoneInput, true)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = phoneInput;
      }

      if (!validateSelectField(doctorSelect, 'On-call attending physician')) {
        isValid = false;
        if (!firstInvalid) firstInvalid = doctorSelect;
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        showToast('Please correct the settings configuration errors.', 'error');
        return;
      }

      showToast('Practice configuration saved successfully!', 'success');
    });
  }
}

/* ==========================================================================
   12. Maintenance Countdown Timer
   ========================================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 6);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   13. Dynamic Specialized Care Details Controller
   ========================================================================== */
const SERVICES_DATA = {
  prostate: {
    badgeTitle: "Prostate & BPH Laser Care",
    pageTitle: "Prostate & BPH Laser Care & Rezūm™ Therapy | Vanguard Urology",
    heroTitle: "Prostate & BPH Laser Care & Rezūm™ Therapy",
    heroDesc: "State-of-the-art water vapor thermal therapy and laser enucleation designed to permanently relieve enlarged prostate symptoms without pills, cuts, or sexual side effects.",
    metrics: [
      { label: "PROCEDURE TIME", val: "20 - 30 Minutes" },
      { label: "ANESTHESIA", val: "Local / Light Sedation" },
      { label: "RECOVERY DOWNTIME", val: "24 - 48 Hours" },
      { label: "SEXUAL FUNCTION", val: "100% Preserved" }
    ],
    mechanismBadge: "Treatment Mechanism",
    mechanismTitle: "How Rezūm™ Water Vapor Technology Works",
    desc1: "Benign Prostatic Hyperplasia (BPH) affects over 50% of men in their 50s and up to 90% of men over 70. When the prostate gland enlarges, it compresses the urethra, leading to frequent waking at night, weak stream, urgency, and incomplete emptying.",
    desc2: "Rezūm™ is an innovative, FDA-approved, natural in-office treatment that utilizes convective water vapor (steam) energy. A tiny delivery device introduces sterile water vapor directly into the obstructive prostate tissue for only 9 seconds per treatment site. The steam condenses, releasing thermal energy that gently disrupts the excess cells. Over the following weeks, your body naturally resorbs the treated tissue, reopening the urinary channel permanently.",
    features: [
      { title: "No Permanent Implants or Foreign Materials", desc: "Unlike UroLift clips or stents, Rezūm leaves zero metal or foreign hardware inside your body." },
      { title: "Freedom From Daily Medications", desc: "Eliminates the need for alpha-blockers and 5-ARIs which cause chronic fatigue and sexual dysfunction." }
    ],
    image: "assets/images/service-prostate.jpg",
    imageAlt: "Minimally invasive prostate laser procedure room",
    doctor: {
      name: "Dr. Anthony Rossi, MD",
      role: "Lead Robotic & Laser Urologist",
      exp: "Over 1,200 successful minimally invasive BPH procedures performed.",
      image: "assets/images/dr-anthony-rossi.jpg"
    },
    roadmap: [
      { num: "Step 1", title: "Pre-Procedure Mapping", desc: "Non-invasive flow velocity testing and transrectal ultrasound to measure exact prostate dimensions and plan vapor delivery angles." },
      { num: "Step 2", title: "Same-Day In-Office Treatment", desc: "Performed under light sedation in our private clinic suite. You remain comfortable while water vapor is delivered in under 25 minutes." },
      { num: "Step 3", title: "Days 1–3: Weekend Rest", desc: "Mild swelling is managed with medication. Most patients return to desk work and normal routines within 48 hours." },
      { num: "Step 4", title: "Weeks 2–6: Full Stream Return", desc: "Significant, noticeable improvement in urinary flow, zero nighttime awakenings, and complete bladder emptying." }
    ],
    faqs: [
      { q: "Is the Rezūm procedure painful? What anesthesia is used?", a: "The procedure is performed under gentle local anesthesia or light oral sedation. Most patients report minimal discomfort during the brief 20-minute procedure and require only mild over-the-counter pain relievers for 24-48 hours post-treatment." },
      { q: "Will this treatment affect my sexual function or fertility?", a: "No. Clinical trials show that modern minimally invasive treatments like Rezūm preserve erectile and ejaculatory function with zero impairment compared to traditional TURP surgeries." },
      { q: "How soon can I return to normal work and exercise?", a: "Most men return to desk work and light daily activities within 24 to 48 hours. Strenuous exercise, heavy lifting, and sexual activity are typically resumed after 7 to 10 days." }
    ],
    ctaTitle: "Ready to Discuss Your Care with Dr. Anthony Rossi?",
    ctaDesc: "Schedule a confidential, direct consultation with our Chief Urologist. Private in-clinic and telehealth appointments available."
  },
  trt: {
    badgeTitle: "Testosterone Therapy (TRT)",
    pageTitle: "Testosterone Therapy (TRT) & Hormone Optimization | Vanguard Urology",
    heroTitle: "Testosterone Therapy (TRT) & Hormone Optimization",
    heroDesc: "Precision bioidentical hormone protocols, comprehensive 32-biomarker monitoring, and vitality restoration engineered specifically for men experiencing fatigue, low libido, and muscle loss.",
    metrics: [
      { label: "CONSULTATION TIME", val: "45 Minutes" },
      { label: "PROTOCOL TYPE", val: "Bioidentical Micro-Dosing" },
      { label: "FIRST RESULTS", val: "2 - 3 Weeks" },
      { label: "SAFETY TRACKING", val: "Quarterly Blood Panels" }
    ],
    mechanismBadge: "Endocrine Science",
    mechanismTitle: "Precision Biomarker & Bioidentical Hormone Balancing",
    desc1: "After age 30, testosterone levels decline at an average rate of 1-2% per year. Hypogonadism and endocrine imbalance contribute to persistent physical exhaustion, mental fog, loss of lean muscle, stubborn abdominal fat, and diminished libido.",
    desc2: "Our clinical approach goes far beyond generic testosterone prescriptions. We perform exhaustive 32-biomarker blood diagnostics examining free and total testosterone, estradiol, SHBG, prolactin, lipid sub-fractions, and hematocrit. We then formulate an individualized bioidentical protocol that restores peak youthful vigor while rigorously safeguarding cardiovascular and prostate health.",
    features: [
      { title: "Targeted Micro-Dosing Protocols", desc: "Subcutaneous or intramuscular micro-dosing prevents sudden hormonal spikes and emotional rollercoasters." },
      { title: "Proactive Organ & Biomarker Protection", desc: "Includes aromatase modulation and fertility preservation (hCG / enclomiphene) when clinically appropriate." }
    ],
    image: "assets/images/service-trt.jpg",
    imageAlt: "Hormone analysis and testosterone replacement therapy clinic",
    doctor: {
      name: "Dr. David Chen, MD, PhD",
      role: "Director of Andrology & Male Endocrinology",
      exp: "Harvard-trained specialist in endocrine optimization and metabolic longevity.",
      image: "assets/images/dr-david-chen.jpg"
    },
    roadmap: [
      { num: "Step 1", title: "32-Biomarker Blood Panel", desc: "Comprehensive diagnostic blood draw evaluating total/free T, PSA, metabolic profile, and endocrine markers." },
      { num: "Step 2", title: "Physician Consultation", desc: "In-depth 45-minute clinical review with Dr. Chen to map out symptoms, biomarkers, and personal goals." },
      { num: "Step 3", title: "Customized Protocol Delivery", desc: "Discreet delivery of prescribed bioidentical hormones, premium medical supplies, and administration guides." },
      { num: "Step 4", title: "Quarterly Lab Calibration", desc: "Regular blood panel tracking to ensure optimal ranges, maximum energy, and complete cardiovascular protection." }
    ],
    faqs: [
      { q: "How quickly will I feel the benefits of TRT?", a: "Most patients experience improved sleep quality, mood stabilization, and enhanced mental focus within 2 to 3 weeks. Increases in physical energy, strength gains, and libido typically manifest between weeks 4 and 6." },
      { q: "Is testosterone therapy safe for my heart and prostate?", a: "Yes. Extensive modern clinical trials demonstrate that medically supervised TRT in men with deficient baseline levels does not cause prostate cancer and supports healthy cardiovascular function when hematocrit and PSA are monitored quarterly." },
      { q: "Can TRT be customized if I want to maintain fertility?", a: "Absolutely. For men wishing to preserve future fertility or natural sperm production, we incorporate adjunctive therapies like hCG (Human Chorionic Gonadotropin) or enclomiphene alongside testosterone therapy." }
    ],
    ctaTitle: "Ready to Restore Your Peak Energy with Dr. David Chen?",
    ctaDesc: "Schedule an in-depth hormonal consultation and comprehensive biomarker panel today. Private telemedicine options available."
  },
  ed: {
    badgeTitle: "Acoustic Wave ED Therapy",
    pageTitle: "Acoustic Wave ED Therapy & Regenerative Vitality | Vanguard Urology",
    heroTitle: "Acoustic Wave ED Therapy & Regenerative Vitality",
    heroDesc: "Non-invasive low-intensity extracorporeal shockwave therapy (Li-ESWT) that stimulates micro-vascular angiogenesis, dissolves micro-plaques, and restores spontaneous natural performance without medications.",
    metrics: [
      { label: "SESSION DURATION", val: "15 - 20 Minutes" },
      { label: "TREATMENT COURSE", val: "6 - 12 Sessions" },
      { label: "SENSATION", val: "Painless / Non-Invasive" },
      { label: "VASCULAR RESTORATION", val: "Clinically Proven" }
    ],
    mechanismBadge: "Regenerative Angiogenesis",
    mechanismTitle: "How Low-Intensity Shockwaves Rebuild Natural Blood Flow",
    desc1: "Over 80% of erectile difficulties in men over 40 stem from vascular insufficiency—the gradual narrowing of penile micro-capillaries and microscopic arterial plaque accumulation that restricts blood inflow.",
    desc2: "Focused Acoustic Wave Therapy delivers calibrated acoustic sound pulses directly into the cavernous tissue. These gentle pulses trigger a biological cascade: releasing endothelial growth factors, breaking down micro-calcifications, and stimulating angiogenesis (the growth of brand-new, healthy micro-blood vessels). The result is genuine tissue rejuvenation and spontaneous, dependable natural rigidity.",
    features: [
      { title: "Treats the Root Cause, Not Symptoms", desc: "Unlike temporary PDE5 pills that merely mask vascular decline, shockwave restores underlying tissue health." },
      { title: "Zero Downtime & Zero Needles", desc: "Walk in and walk out in 20 minutes with zero soreness, anesthesia, or restrictions on intimacy." }
    ],
    image: "assets/images/service-ed.jpg",
    imageAlt: "Acoustic wave erectile dysfunction treatment suite",
    doctor: {
      name: "Dr. Marcus Sterling, MD",
      role: "Microsurgeon & Male Vitality Lead",
      exp: "Pioneer in non-invasive restorative therapies and micro-vascular andrology.",
      image: "assets/images/dr-marcus-sterling.jpg"
    },
    roadmap: [
      { num: "Step 1", title: "Confidential Vascular Exam", desc: "Private diagnostic evaluation assessing vascular blood flow and establishing tailored energy protocols." },
      { num: "Step 2", title: "Focused Acoustic Treatment", desc: "Relax comfortably in a private suite while acoustic pulses are applied over 15 to 20 minutes." },
      { num: "Step 3", title: "Cellular Angiogenesis", desc: "Over the next 48-72 hours, your body naturally releases growth factors and forms new micro-capillaries." },
      { num: "Step 4", title: "Sustained Natural Rigidity", desc: "Cumulative improvements compound across 6 to 12 sessions, restoring spontaneous lasting vitality." }
    ],
    faqs: [
      { q: "Does acoustic shockwave therapy hurt?", a: "No. The treatment is non-invasive and painless. Patients describe feeling a gentle tapping or buzzing sensation. No numbing creams, needles, or local anesthesia are required." },
      { q: "How long do the regenerative results last?", a: "Because acoustic shockwave stimulates genuine new blood vessel formation and tissue regeneration, results are long-lasting—typically enduring for 18 to 24 months or more with occasional maintenance." },
      { q: "Can this help if medications like Viagra or Cialis stopped working?", a: "Yes. Many patients with diminished response to oral PDE5 inhibitors experience significant improvement because acoustic wave therapy restores the vascular responsiveness needed for medications to work effectively, or enables them to stop pills entirely." }
    ],
    ctaTitle: "Ready to Reclaim Spontaneous Vitality with Dr. Marcus Sterling?",
    ctaDesc: "Book a private, discreet consultation in our confidential executive clinic suite today."
  },
  vasectomy: {
    badgeTitle: "No-Scalpel Vasectomy",
    pageTitle: "No-Scalpel Vasectomy & Microsurgical Care | Vanguard Urology",
    heroTitle: "No-Scalpel Vasectomy & Microsurgical Care",
    heroDesc: "A modern 15-minute in-office procedure using micro-puncture technology with no incisions, no stitches, and faster recovery than traditional surgical methods.",
    metrics: [
      { label: "PROCEDURE TIME", val: "15 Minutes" },
      { label: "INCISION", val: "None (Micro-Puncture)" },
      { label: "ANESTHESIA", val: "Local 'No-Needle' Delivery" },
      { label: "BACK TO DESK WORK", val: "24 Hours" }
    ],
    mechanismBadge: "Microsurgical Technique",
    mechanismTitle: "The Advanced No-Scalpel Micro-Puncture Technique",
    desc1: "Traditional vasectomy historically involved scalpels, wide incisions, and painful sutures that caused days of severe bruising and swelling. Vanguard Clinic has modernized this procedure into an effortless outpatient experience.",
    desc2: "Using advanced No-Scalpel technique with jet-spray local anesthesia, a microscopic 2mm opening is created in the scrotal skin without cutting. The vas deferens is gently accessed, divided, and sealed with microsurgical precision. The micro-opening closes naturally within hours without stitches or visible scarring.",
    features: [
      { title: "No Needle & No Scalpel", desc: "Advanced pneumatic jet injector delivers rapid local anesthesia without needles, followed by micro-puncture." },
      { title: "Single Weekend Recovery", desc: "Perform the procedure on Friday afternoon and return to ordinary desk work comfortably by Monday morning." }
    ],
    image: "assets/images/service-vasectomy.jpg",
    imageAlt: "No scalpel vasectomy procedure suite and micro instruments",
    doctor: {
      name: "Dr. Marcus Sterling, MD",
      role: "Microsurgeon & Reconstructive Urologist",
      exp: "Over 2,000 successful no-scalpel vasectomies and complex micro-reversals.",
      image: "assets/images/dr-marcus-sterling.jpg"
    },
    roadmap: [
      { num: "Step 1", title: "Private Consultation", desc: "Brief confidential exam and procedural orientation to answer all questions with Dr. Sterling." },
      { num: "Step 2", title: "15-Minute Procedure", desc: "Gentle in-office procedure with relaxing music in our private executive suite." },
      { num: "Step 3", title: "Weekend Relaxation", desc: "Rest at home with an ice pack for 24-48 hours. Minimal soreness easily managed with mild pain relievers." },
      { num: "Step 4", title: "Sperm Clearance Verification", desc: "Complimentary at-home or in-clinic semen analysis at 12 weeks to certify 100% sterile success." }
    ],
    faqs: [
      { q: "Will a vasectomy change my ejaculation, testosterone, or sensation?", a: "No. Sperm comprises only about 2% of total semen volume. Your testosterone production, volume of ejaculation, sensation, and climax remain 100% identical." },
      { q: "How soon can I return to sexual activity?", a: "Most men can safely resume sexual activity after 7 days, using alternative birth control until post-procedure semen verification confirms complete sperm clearance." },
      { q: "Can a no-scalpel vasectomy be reversed in the future?", a: "Yes. Because our microsurgical technique minimizes scarring and tissue trauma, future microsurgical vasectomy reversal (vasovasostomy) maintains high patency success rates." }
    ],
    ctaTitle: "Schedule Your Gentle No-Scalpel Procedure with Dr. Sterling",
    ctaDesc: "Private, discreet, and seamless care. Friday appointments designed for weekend recovery available."
  },
  kidney: {
    badgeTitle: "Kidney Stone Laser Removal",
    pageTitle: "Kidney Stone Laser Removal & Laser Dusting | Vanguard Urology",
    heroTitle: "Kidney Stone Laser Removal & Laser Dusting",
    heroDesc: "Urgent and elective relief for kidney stones utilizing flexible digital ureteroscopy and holmium laser technology to safely pulverize stones into dust with same-day discharge.",
    metrics: [
      { label: "PROCEDURE TIME", val: "30 - 45 Minutes" },
      { label: "INCISION", val: "None (Natural Lumen)" },
      { label: "TECHNOLOGY", val: "Holmium / Thulium Laser" },
      { label: "HOSPITAL STAY", val: "Same-Day Discharge" }
    ],
    mechanismBadge: "Laser Endourology",
    mechanismTitle: "High-Definition Laser Dusting & Digital Ureteroscopy",
    desc1: "Kidney stone attacks produce some of the most excruciating pain in medicine when a crystal calcification blocks the ureter, triggering severe flank pain, nausea, and hematuria.",
    desc2: "Our surgical suite utilizes ultra-flexible digital ureteroscopes that navigate along the natural urinary tract directly to the stone without making any external incisions. High-frequency laser pulses fragment the stone into micro-dust that washes out effortlessly, providing rapid decompression and complete stone clearance.",
    features: [
      { title: "No Cuts or External Scars", desc: "The hair-thin scope navigates natural urinary pathways directly to the kidney or ureter." },
      { title: "Metabolic Stone Prevention", desc: "Every treated stone undergoes compositional analysis alongside 24-hour urine testing to prevent future recurrences." }
    ],
    image: "assets/images/service-kidney.jpg",
    imageAlt: "Kidney stone laser lithotripsy operating equipment",
    doctor: {
      name: "Dr. Sarah Jenkins, MD",
      role: "Urological Surgeon & Endourology Specialist",
      exp: "Fellowship-trained in complex laser lithotripsy and robotic kidney stone reconstruction.",
      image: "assets/images/dr-sarah-jenkins.jpg"
    },
    roadmap: [
      { num: "Step 1", title: "Urgent Low-Dose CT Scan", desc: "Pinpoint exact stone dimensions, density, and location with high-definition digital imaging." },
      { num: "Step 2", title: "Same-Day Laser Dusting", desc: "Outpatient laser procedure under gentle anesthesia to pulverize the obstructing stone into powder." },
      { num: "Step 3", title: "Rapid Recovery & Hydration", desc: "Return home the same afternoon. Gentle temporary stent allows smooth healing without colic pain." },
      { num: "Step 4", title: "Metabolic Prevention Plan", desc: "Personalized dietary and medical protocols formulated to prevent recurrent stone formation." }
    ],
    faqs: [
      { q: "How quickly can I be treated if I am experiencing acute stone pain?", a: "We offer expedited same-day diagnostic workups and urgent surgical slots for patients experiencing acute obstructive stone symptoms." },
      { q: "Will I need a stent after laser stone removal?", a: "In cases with ureteral swelling, a temporary soft internal stent is placed for a few days to ensure urine drains freely and prevent post-op spasms. It is removed easily and painlessly in-office." },
      { q: "How can I prevent kidney stones from forming again?", a: "Following treatment, we analyze your stone composition and perform a 24-hour metabolic urine test to identify chemical triggers (e.g. oxalate, calcium, uric acid) and design an individualized prevention diet." }
    ],
    ctaTitle: "Need Rapid Kidney Stone Relief? Consult Dr. Sarah Jenkins",
    ctaDesc: "Immediate diagnostic appointments and minimally invasive laser scheduling available."
  },
  fertility: {
    badgeTitle: "Male Reproductive Medicine",
    pageTitle: "Male Reproductive Medicine & Microsurgical Andrology | Vanguard Urology",
    heroTitle: "Male Reproductive Medicine & Microsurgical Andrology",
    heroDesc: "Fellowship-trained andrology care diagnosing and treating male factor fertility, varicoceles, hormonal deficiencies, and optimizing sperm parameters through advanced microsurgery.",
    metrics: [
      { label: "DIAGNOSTIC WORKUP", val: "Comprehensive Semen / DNA" },
      { label: "SURGICAL METHOD", val: "Sub-Inguinal Microsurgery" },
      { label: "SUCCESS RATE", val: "85%+ Significant Increase" },
      { label: "DOWNTIME", val: "48 Hours" }
    ],
    mechanismBadge: "Andrology & Microsurgery",
    mechanismTitle: "Microsurgical Varicocele Repair & Fertility Optimization",
    desc1: "Male factor contributes to over 50% of all couple fertility challenges. Varicoceles (abnormally dilated veins in the scrotum) increase testicular temperature and oxidative stress, causing decreased sperm count, motility, and elevated DNA fragmentation.",
    desc2: "Under 15x-20x magnification surgical operating microscopes, our andrologists perform sub-inguinal micro-ligation. We selectively isolate and tie off the malfunctioning veins while meticulously preserving the delicate testicular arteries, nerves, and lymphatic vessels to maximize spermatogenesis and boost natural conception odds.",
    features: [
      { title: "High-Magnification Microscope Precision", desc: "Prevents testicular artery injury and eliminates hydrocele risk by preserving lymphatic channels." },
      { title: "Holistic Hormonal & DNA Balancing", desc: "Combines surgical excellence with targeted antioxidant and endocrine protocols to enhance sperm DNA integrity." }
    ],
    image: "assets/images/service-fertility.jpg",
    imageAlt: "Male reproductive medicine consultation and diagnostic laboratory",
    doctor: {
      name: "Dr. David Chen, MD, PhD",
      role: "Andrologist & Male Fertility Specialist",
      exp: "Published researcher in male reproductive biology and microsurgical andrology.",
      image: "assets/images/dr-david-chen.jpg"
    },
    roadmap: [
      { num: "Step 1", title: "Advanced Semen Analysis", desc: "High-resolution testing of volume, count, motility, morphology, and sperm DNA fragmentation index." },
      { num: "Step 2", title: "Micro-Ultrasound Doppler", desc: "Diagnostic Doppler ultrasound identifying subclinical varicoceles and testicular blood flow patterns." },
      { num: "Step 3", title: "Microsurgical Ligation", desc: "Gentle outpatient sub-inguinal repair under operating microscope with same-day recovery." },
      { num: "Step 4", title: "Sperm Optimization Follow-Up", desc: "Repeat semen analysis at 3 and 6 months tracking substantial increases in fertile parameters." }
    ],
    faqs: [
      { q: "How long after varicocele surgery before sperm parameters improve?", a: "Because the full cycle of sperm production (spermatogenesis) takes approximately 72 to 90 days, noticeable improvements in count, motility, and DNA fragmentation are observed at the 3-month mark." },
      { q: "Can treating a varicocele improve testosterone levels?", a: "Yes. Clinical studies consistently demonstrate that repairing a varicocele relieves testicular thermal stress and increases Leydig cell testosterone production by an average of 100-140 ng/dL." },
      { q: "Is the procedure covered by health insurance?", a: "Yes, diagnostic evaluation of male subfertility and microsurgical varicocele repair are medical conditions eligible for insurance coverage and superbill reimbursement." }
    ],
    ctaTitle: "Consult with Dr. David Chen on Male Fertility & Vitality",
    ctaDesc: "Schedule a confidential evaluation in our private andrology clinic suite today."
  }
};

// Aliases for seamless hash routing
SERVICES_DATA['reproduction'] = SERVICES_DATA['fertility'];
SERVICES_DATA['male-reproductive-medicine'] = SERVICES_DATA['fertility'];
SERVICES_DATA['bph'] = SERVICES_DATA['prostate'];
SERVICES_DATA['prostate-care'] = SERVICES_DATA['prostate'];
SERVICES_DATA['testosterone'] = SERVICES_DATA['trt'];
SERVICES_DATA['erectile-dysfunction'] = SERVICES_DATA['ed'];
SERVICES_DATA['shockwave'] = SERVICES_DATA['ed'];
SERVICES_DATA['vasectomy-reversal'] = SERVICES_DATA['vasectomy'];
SERVICES_DATA['kidney-stones'] = SERVICES_DATA['kidney'];

function initServiceDetailsDynamic() {
  const heroTitleEl = document.getElementById('service-hero-title');
  if (!heroTitleEl) return;

  function loadService(serviceKey) {
    const data = SERVICES_DATA[serviceKey] || SERVICES_DATA['prostate'];

    // Update active tab pill
    const pills = document.querySelectorAll('[data-service-id]');
    pills.forEach(pill => {
      if (pill.getAttribute('data-service-id') === serviceKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Page title & breadcrumb
    const pageTitleEl = document.getElementById('page-head-title');
    if (pageTitleEl) pageTitleEl.textContent = data.pageTitle;
    document.title = data.pageTitle;

    const breadcrumbEl = document.getElementById('service-breadcrumb-title');
    if (breadcrumbEl) breadcrumbEl.textContent = data.badgeTitle;

    // Hero content
    heroTitleEl.textContent = data.heroTitle;
    const heroDescEl = document.getElementById('service-hero-desc');
    if (heroDescEl) heroDescEl.textContent = data.heroDesc;

    // Metrics
    const m1l = document.getElementById('metric-1-label');
    const m1v = document.getElementById('metric-1-val');
    if (m1l && m1v && data.metrics[0]) { m1l.textContent = data.metrics[0].label; m1v.textContent = data.metrics[0].val; }

    const m2l = document.getElementById('metric-2-label');
    const m2v = document.getElementById('metric-2-val');
    if (m2l && m2v && data.metrics[1]) { m2l.textContent = data.metrics[1].label; m2v.textContent = data.metrics[1].val; }

    const m3l = document.getElementById('metric-3-label');
    const m3v = document.getElementById('metric-3-val');
    if (m3l && m3v && data.metrics[2]) { m3l.textContent = data.metrics[2].label; m3v.textContent = data.metrics[2].val; }

    const m4l = document.getElementById('metric-4-label');
    const m4v = document.getElementById('metric-4-val');
    if (m4l && m4v && data.metrics[3]) { m4l.textContent = data.metrics[3].label; m4v.textContent = data.metrics[3].val; }

    // Mechanism section
    const badgeText = document.getElementById('service-badge-text');
    if (badgeText) badgeText.textContent = data.mechanismBadge;

    const mechTitle = document.getElementById('service-mechanism-title');
    if (mechTitle) mechTitle.textContent = data.mechanismTitle;

    const desc1 = document.getElementById('service-mechanism-desc1');
    if (desc1) desc1.textContent = data.desc1;

    const desc2 = document.getElementById('service-mechanism-desc2');
    if (desc2) desc2.textContent = data.desc2;

    const f1t = document.getElementById('feature-1-title');
    const f1d = document.getElementById('feature-1-desc');
    if (f1t && f1d && data.features[0]) { f1t.textContent = data.features[0].title; f1d.textContent = data.features[0].desc; }

    const f2t = document.getElementById('feature-2-title');
    const f2d = document.getElementById('feature-2-desc');
    if (f2t && f2d && data.features[1]) { f2t.textContent = data.features[1].title; f2d.textContent = data.features[1].desc; }

    // Media & Doctor
    const mainImg = document.getElementById('service-main-image');
    if (mainImg) {
      mainImg.style.opacity = '0.5';
      setTimeout(() => {
        mainImg.src = data.image;
        mainImg.alt = data.imageAlt;
        mainImg.style.opacity = '1';
      }, 150);
    }

    const docImg = document.getElementById('service-doctor-image');
    if (docImg) docImg.src = data.doctor.image;

    const docName = document.getElementById('service-doctor-name');
    if (docName) docName.textContent = data.doctor.name;

    const docRole = document.getElementById('service-doctor-role');
    if (docRole) docRole.textContent = data.doctor.role;

    const docExp = document.getElementById('service-doctor-exp');
    if (docExp) docExp.textContent = data.doctor.exp;

    // Roadmap
    for (let i = 1; i <= 4; i++) {
      const rnum = document.getElementById(`roadmap-${i}-num`);
      const rt = document.getElementById(`roadmap-${i}-title`);
      const rd = document.getElementById(`roadmap-${i}-desc`);
      if (data.roadmap && data.roadmap[i - 1]) {
        if (rnum) rnum.textContent = data.roadmap[i - 1].num || `Step ${i}`;
        if (rt) rt.textContent = data.roadmap[i - 1].title;
        if (rd) rd.textContent = data.roadmap[i - 1].desc;
      }
    }

    // FAQs
    const faqContainer = document.getElementById('service-faq-accordion');
    if (faqContainer && data.faqs) {
      faqContainer.innerHTML = data.faqs.map((faq, idx) => `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <button type="button" class="faq-question">
            <span>${faq.q}</span>
            <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="faq-answer">
            <p>${faq.a}</p>
          </div>
        </div>
      `).join('');
      initFaqAccordions();
    }

    // CTA
    const ctaTitle = document.getElementById('service-cta-title');
    if (ctaTitle) ctaTitle.textContent = data.ctaTitle;

    const ctaDesc = document.getElementById('service-cta-desc');
    if (ctaDesc) ctaDesc.textContent = data.ctaDesc;

    const ctaBookBtn = document.getElementById('service-cta-book-btn');
    if (ctaBookBtn) {
      ctaBookBtn.setAttribute('data-service', data.badgeTitle);
      ctaBookBtn.setAttribute('data-doctor', data.doctor.name);
    }
  }

  // Check initial hash
  function getHashService() {
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    if (SERVICES_DATA[rawHash]) return rawHash;
    return 'prostate';
  }

  const initialService = getHashService();
  loadService(initialService);
  if (window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  // Listen to hash changes (e.g. from browser back/forward or navigation)
  window.addEventListener('hashchange', () => {
    loadService(getHashService());
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  // Intercept all service detail links across the page (pills, footer, etc.)
  document.querySelectorAll('a[href*="service-details.html#"], a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const serviceKey = href.substring(hashIndex + 1).toLowerCase();
      if (SERVICES_DATA[serviceKey]) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          history.pushState(null, null, `#${serviceKey}`);
          loadService(serviceKey);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
      }
    }
  });
}

/* ==========================================================================
   14. Dynamic Blog Details Controller & Knowledge Hub
   ========================================================================== */
const BLOGS_DATA = {
  trt: {
    id: "trt",
    pageTitle: "Guide to Testosterone Replacement Therapy: Science vs. Myths | Vanguard Blog",
    category: "Hormone Medicine",
    breadcrumb: "Testosterone Therapy Guide",
    readTime: "6 Min Read",
    date: "October 2026",
    title: "The Complete Guide to Testosterone Replacement Therapy: Science vs. Myths",
    subtitle: "An authoritative, evidence-based breakdown of male hypogonadism, precision micro-dosing protocols, biomarker tracking, and debunking outdated misconceptions.",
    image: "assets/images/blog-trt.jpg",
    imageAlt: "Doctor reviewing hormone levels with patient on digital screen",
    author: {
      name: "Dr. David Chen, MD, PhD",
      role: "Director of Andrology & Reproductive Medicine",
      bio: "Director of Andrology & Reproductive Medicine. Fellowship-trained at Harvard Medical School with over 16 years of specialized male hormone therapy experience.",
      image: "assets/images/dr-david-chen.jpg"
    },
    takeaways: [
      "Total vs. Free Testosterone: Total T alone is misleading; free and bioavailable testosterone dictate true physiological cellular response.",
      "Cardiovascular Safety: Major clinical trials (including the TRAVERSE trial) demonstrate that properly monitored TRT does not increase adverse cardiovascular events.",
      "Micro-Dosing Advantage: Twice-weekly subcutaneous administration avoids roller-coaster hormonal peaks and minimizes estrogen conversion."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. Understanding the Andropause Phenomenon</h2>
      <p>
        Unlike menopause in women, which occurs abruptly, male hormone decline is gradual and insidious. Beginning around age 30, a man's testosterone levels decrease by approximately 1% to 2% each year. Simultaneously, Sex Hormone-Binding Globulin (SHBG) increases with age, sequestering available testosterone and drastically reducing the active, free hormone reaching cellular receptors.
      </p>
      <p>
        Common symptoms such as persistent afternoon fatigue, loss of lean muscle mass, brain fog, reduced workout recovery, and waning libido are frequently misattributed to normal aging or stress.
      </p>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. Why Standard Lab Testing Often Fails Men</h2>
      <p>
        Most primary care providers only check <em>Total Testosterone</em> against arbitrary "normal reference ranges" (e.g., 250 to 900 ng/dL). A man with a total level of 310 ng/dL may be told he is "normal," despite experiencing severe hypogonadal symptoms due to elevated SHBG or high estradiol conversion.
      </p>
      <p>
        At Vanguard Clinic, our comprehensive endocrine panel analyzes over 20 specific biomarkers:
      </p>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li>Free and Bioavailable Testosterone (Direct Equilibrium Dialysis)</li>
        <li>Sex Hormone-Binding Globulin (SHBG) & Albumin</li>
        <li>Sensitive Estradiol (LC/MS-MS)</li>
        <li>Luteinizing Hormone (LH) & Follicle-Stimulating Hormone (FSH)</li>
        <li>Complete Blood Count (CBC) with Hematocrit & Hemoglobin</li>
        <li>Comprehensive Metabolic Panel & Lipid Subfractions</li>
        <li>Prostate-Specific Antigen (PSA) & Free PSA Ratio</li>
      </ul>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "Testosterone therapy is not about supraphysiological bodybuilding doses; it is precision restorative endocrinology designed to return your biological clock to its optimal peak."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. David Chen, MD, PhD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. Safe Protocol Design & Ongoing Monitoring</h2>
      <p>
        Under board-certified physician supervision, modern TRT protocols utilize bio-identical testosterone cypionate or enanthate administered via shallow subcutaneous micro-injections. This maintains steady-state blood concentrations without the aromatization spikes seen with infrequent bi-weekly intramuscular injections.
      </p>
      <p>
        Regular quarterly blood panels ensure hematocrit levels remain within safe parameters and cardiovascular markers are continuously optimized.
      </p>
    `,
    comments: [
      {
        author: "Michael B.",
        time: "2 days ago",
        text: "Does micro-dosing subcutaneously really keep estrogen levels in check without taking anastrozole?",
        reply: {
          author: "Dr. David Chen (Author)",
          text: "Yes, in over 85% of our patients, dividing doses into 2-3 smaller weekly administrations prevents the large testosterone surges that trigger excessive aromatase enzyme conversion, eliminating the need for AI medication."
        }
      },
      {
        author: "Edward K.",
        time: "5 days ago",
        text: "Great article. Finally someone explained the difference between total and free testosterone clearly."
      }
    ],
    testimonial: {
      quote: "Dr. Chen's TRT protocol changed my life. I went from constant brain fog and fatigue to feeling energized and sharp like I was in my 20s. The blood monitoring and care are second to none.",
      name: "James S., 46",
      treatment: "Hormone Optimization Patient"
    },
    ctaTitle: "Ready to Optimize Your Vitality?",
    ctaDesc: "Schedule your confidential hormone and vitality assessment with Dr. David Chen today. Direct in-house lab panels and tailored medical protocols.",
    ctaBtnText: "Book Vitality Consultation",
    ctaDoctor: "Dr. David Chen, MD, PhD",
    ctaService: "Testosterone Therapy (TRT)"
  },
  rezum: {
    id: "rezum",
    pageTitle: "Understanding Rezūm Water Vapor vs. Traditional TURP Surgery | Vanguard Urology",
    category: "Prostate Care",
    breadcrumb: "Rezūm vs. TURP Guide",
    readTime: "5 Min Read",
    date: "Sep 28, 2026",
    title: "Understanding Rezūm Water Vapor vs. Traditional TURP Surgery",
    subtitle: "Why modern minimally invasive water vapor therapy is rapidly replacing surgical resection for men seeking rapid BPH relief without sexual side effects.",
    image: "assets/images/blog-prostate.jpg",
    imageAlt: "Dr. Anthony Rossi explaining minimally invasive Rezūm water vapor procedure",
    author: {
      name: "Dr. Anthony Rossi, MD",
      role: "Chief Urologist & Robotic Surgeon",
      bio: "Board Certified in Urology. Former Chief of Urological Surgery at Columbia Presbyterian with over 24 years of experience and 1,200+ minimally invasive BPH procedures.",
      image: "assets/images/dr-anthony-rossi.jpg"
    },
    takeaways: [
      "Targeted Convective Steam: Sterile convective water vapor delivers thermal energy in precise 9-second pulses, naturally disrupting obstructive prostate adenoma cells without mechanical cutting.",
      "100% Sexual Function Preservation: Unlike TURP which causes retrograde ejaculation in up to 75% of patients, clinical trials show Rezūm preserves normal ejaculation and erectile rigidity.",
      "Rapid In-Office Recovery: Completed in under 30 minutes under local anesthesia or light oral sedation, allowing men to return to desk work and normal routines within 48 hours."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. The Burden of Benign Prostatic Hyperplasia (BPH)</h2>
      <p>
        Benign Prostatic Hyperplasia (BPH) is an almost universal condition of aging men. By age 60, over 50% of men experience urinary obstruction, rising to 90% by age 80. As the central transition zone of the prostate grows, it pinches the urethra like a clamp on a garden hose, leading to debilitating nocturia (waking 3–6 times nightly), weak flow stream, hesitancy, and urinary urgency.
      </p>
      <p>
        Historically, men faced an agonizing dilemma: either take daily medications (alpha-blockers and 5-ARIs) with chronic dizziness, brain fog, and loss of libido, or undergo invasive surgical resection (TURP).
      </p>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. How Rezūm™ Convective Water Vapor Works</h2>
      <p>
        Rezūm™ is an innovative, FDA-approved, natural in-office treatment that utilizes thermodynamic convective steam energy. A slender delivery device introduces micro-bursts of sterile water vapor directly into the obstructive prostate tissue for only 9 seconds per treatment site.
      </p>
      <p>
        As the vapor condenses back into water, it releases stored thermal energy directly into the cell membranes of the excess adenoma. Over the following weeks, your body naturally and harmlessly resorbs the disrupted tissue cells through macrophage clearance, permanently reopening the urinary channel without leaving behind any foreign clips, metal implants, or surgical scarring.
      </p>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "For decades, men had to choose between lifelong daily medications or invasive surgical resection with high sexual risks. Rezūm gives men permanent flow relief with zero foreign hardware and total preservation of sexual intimacy."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. Anthony Rossi, MD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. Head-to-Head Comparison: Rezūm vs. Traditional TURP</h2>
      <p>
        Transurethral Resection of the Prostate (TURP) has long been the surgical gold standard, but it requires hospital admission, general or spinal anesthesia, and electrical loop electrocautery scraping. Compare the critical differences:
      </p>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li><strong>Anesthesia:</strong> Rezūm uses gentle in-office local anesthesia; TURP requires deep general or spinal anesthesia.</li>
        <li><strong>Ejaculatory & Sexual Health:</strong> TURP results in permanent retrograde ejaculation in 65%–75% of men. Rezūm preserves 100% natural antegrade ejaculation and erectile function.</li>
        <li><strong>Hardware:</strong> Zero permanent clips, stents, or foreign material left inside the body.</li>
        <li><strong>Downtime:</strong> 24–48 hours for Rezūm vs. 3–6 weeks of bleeding and recovery for TURP.</li>
      </ul>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">4. Recovery Timeline & What to Expect</h2>
      <p>
        The procedure takes approximately 20 to 25 minutes in our private Vanguard clinic suite. A temporary catheter is placed for 3 to 5 days while initial tissue edema subsides. By week 2, patients notice substantial increases in flow velocity, and by weeks 4 to 6, nighttime waking drops to zero with complete bladder emptying.
      </p>
    `,
    comments: [
      {
        author: "Richard G.",
        time: "3 days ago",
        text: "How long is the temporary catheter required following the Rezūm procedure?",
        reply: {
          author: "Dr. Anthony Rossi (Author)",
          text: "Because the water vapor causes mild localized tissue swelling before cellular resorption begins, a gentle temporary urinary catheter is typically worn for only 3 to 5 days, after which natural urination resumes with rapid daily improvement."
        }
      },
      {
        author: "Arthur P.",
        time: "1 week ago",
        text: "Had the procedure with Dr. Rossi 6 months ago. Waking up zero times a night now after waking up 4-5 times every single night for five years. Truly life changing."
      }
    ],
    testimonial: {
      quote: "After struggling with BPH for 4 years, Dr. Rossi performed the Rezūm procedure. Within 3 weeks my symptoms vanished completely. Absolute professionalism and total discretion throughout.",
      name: "Robert M., 58",
      treatment: "Prostate Care Patient"
    },
    ctaTitle: "Ready for Lasting Relief from Prostate Symptoms?",
    ctaDesc: "Schedule a direct clinical consultation with Chief Urologist Dr. Anthony Rossi to evaluate whether Rezūm water vapor therapy is right for you.",
    ctaBtnText: "Book Prostate Consultation",
    ctaDoctor: "Dr. Anthony Rossi, MD",
    ctaService: "Prostate Care & BPH Relief"
  },
  shockwave: {
    id: "shockwave",
    pageTitle: "The Vascular Science Behind Focused Acoustic Shockwave Therapy | Vanguard Blog",
    category: "Sexual Vitality",
    breadcrumb: "Acoustic Shockwave Science",
    readTime: "4 Min Read",
    date: "Sep 15, 2026",
    title: "The Vascular Science Behind Focused Acoustic Shockwave Therapy",
    subtitle: "How targeted low-intensity acoustic pulses stimulate angiogenisis, dissolve micro-plaques, and clear vascular pathways to restore spontaneous male function naturally.",
    image: "assets/images/service-ed.jpg",
    imageAlt: "Shockwave therapy for vascular vitality",
    author: {
      name: "Dr. Marcus Sterling, MD",
      role: "Microsurgeon & Male Vitality Lead",
      bio: "Stanford Fellowship in Urological Microsurgery with 15+ years specializing in micro-vascular restoration and non-invasive regenerative vitality protocols.",
      image: "assets/images/dr-marcus-sterling.jpg"
    },
    takeaways: [
      "Vascular Root Cause Restoration: Focused Low-Intensity Extracorporeal Shockwave Therapy (Li-ESWT) treats underlying micro-vascular insufficiency rather than providing temporary drug-induced dilation.",
      "Stimulates Cellular Angiogenesis: Acoustic sound waves trigger Vascular Endothelial Growth Factor (VEGF) and endothelial nitric oxide synthase (eNOS) to generate new, healthy micro-arteries.",
      "Non-Invasive with Zero Downtime: 15-minute outpatient sessions with zero needles, zero anesthesia, no pills, and no restrictions on normal daily activity."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. The Micro-Vascular Root Cause of Age-Related Decline</h2>
      <p>
        Over 80% of erectile difficulties in men over 40 are vascular in nature. The pudendal and cavernosal arteries are microscopic—roughly 1 to 2 millimeters in diameter, less than half the size of coronary arteries. Over decades, micro-atherosclerotic plaque deposits and endothelial dysfunction restrict arterial inflow and reduce spontaneous nitric oxide release.
      </p>
      <p>
        While PDE5 inhibitors (like sildenafil or tadalafil) force temporary chemical vasodilation for a few hours, they do nothing to repair damaged capillaries or reverse micro-arterial blockages.
      </p>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. The Biomechanical Physics of Focused Shockwave Pulses</h2>
      <p>
        Focused Low-Intensity Extracorporeal Shockwave Therapy (Li-ESWT) utilizes acoustic sound waves that travel faster than the speed of sound, delivering gentle mechanical shear stress into the deep vascular tissues.
      </p>
      <p>
        This micro-trauma triggers a powerful biological healing cascade (cellular mechanotransduction):
      </p>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li><strong>Angiogenesis:</strong> Rapid upregulation of Vascular Endothelial Growth Factor (VEGF) causing the budding of brand-new capillary beds.</li>
        <li><strong>eNOS Activation:</strong> Upregulation of endothelial Nitric Oxide Synthase, restoring healthy arterial vasodilation.</li>
        <li><strong>Micro-Plaque Clearing:</strong> Sonic acoustic cavitation breaks down microscopic calcium and lipid calcifications in vessel walls.</li>
        <li><strong>Stem Cell Recruitment:</strong> Endogenous mesenchymal stem cell migration to rejuvenate smooth muscle tissue.</li>
      </ul>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "Pills only provide temporary vasodilation for a few hours. Acoustic wave therapy is true regenerative medicine—it rebuilds the actual micro-arterial vasculature so spontaneous intimacy returns naturally."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. Marcus Sterling, MD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. Clinical Protocol & Long-Term Durability</h2>
      <p>
        A standard protocol consists of 6 to 12 sessions delivered twice weekly. Each session lasts just 15 to 20 minutes in our discreet private suite. Because the acoustic pulses stimulate genuine organic tissue remodeling, results typically endure for 18 to 24 months or longer with occasional maintenance.
      </p>
    `,
    comments: [
      {
        author: "Gregory T.",
        time: "4 days ago",
        text: "Is there any discomfort during the acoustic wave session?",
        reply: {
          author: "Dr. Marcus Sterling (Author)",
          text: "Not at all. The calibrated energy pulses produce only a gentle tapping sensation. No topical numbing agents or local anesthetics are needed, and you can resume work or exercise immediately afterward."
        }
      },
      {
        author: "David M.",
        time: "2 weeks ago",
        text: "After finishing my 6-session protocol, I noticed a dramatic difference in spontaneous firmness. Highly recommend consulting Dr. Sterling."
      }
    ],
    testimonial: {
      quote: "After finishing my 6-session protocol with Dr. Sterling, I noticed a dramatic difference in spontaneous firmness. Discretion and clinical excellence from day one.",
      name: "David M., 51",
      treatment: "Vascular ED Rejuvenation Patient"
    },
    ctaTitle: "Reclaim Spontaneous Natural Vitality",
    ctaDesc: "Book a private, discreet consultation with Dr. Marcus Sterling in our confidential executive clinic suite.",
    ctaBtnText: "Book Vitality Evaluation",
    ctaDoctor: "Dr. Marcus Sterling, MD",
    ctaService: "Erectile Vitality & Shockwave"
  },
  "kidney-stones": {
    id: "kidney-stones",
    pageTitle: "Preventing Recurrent Kidney Stones: A Urologist's Metabolic Protocol | Vanguard Blog",
    category: "Kidney Health",
    breadcrumb: "Kidney Stone Prevention",
    readTime: "5 Min Read",
    date: "Sep 04, 2026",
    title: "Preventing Recurrent Kidney Stones: A Urologist's Metabolic Protocol",
    subtitle: "Analyzing 24-hour urine chemistry, dietary oxalate regulation, hydration strategies, and Thulium fiber laser ablation advances.",
    image: "assets/images/blog-kidney.jpg",
    imageAlt: "Laser lithotripsy breakthroughs and kidney stone diagnostics",
    author: {
      name: "Dr. Sarah Jenkins, MD",
      role: "Senior Urological & Pelvic Surgeon",
      bio: "Johns Hopkins Fellowship in Endourology and minimally invasive stone treatment with over 18 years of clinical and surgical experience.",
      image: "assets/images/dr-sarah-jenkins.jpg"
    },
    takeaways: [
      "24-Hour Metabolic Profiling: Comprehensive urine chemistry testing is required to identify exact chemical super-saturations (calcium, oxalate, uric acid, citrate, and pH).",
      "The Calcium-Oxalate Pairing Strategy: Restricting dietary calcium actually increases stone risk; pairing calcium with meals binds oxalate in the digestive tract before it reaches the kidneys.",
      "Ultra-Precision Thulium Laser Dusting: Vaporizes hard calcium oxalate monohydrate stones into microscopic dust that washes out effortlessly without large fragments."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. Why 50% of Stone Formers Recur Within 5 Years</h2>
      <p>
        Passing a kidney stone is notorious for causing some of the most excruciating pain in human medicine. Yet after the emergency room visit or surgical extraction, most patients receive only generic advice: "Drink more water."
      </p>
      <p>
        Without identifying the underlying biochemical drivers, approximately 50% of stone patients suffer another debilitating attack within 5 years. Nephrolithiasis is not just an acute surgical event; it is a metabolic disorder that requires precision biochemical correction.
      </p>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. The 24-Hour Urine Metabolic Profile Blueprint</h2>
      <p>
        At Vanguard Clinic, every stone patient undergoes complete stone crystal compositional analysis alongside a 24-hour urine metabolic panel. We evaluate:
      </p>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li><strong>Volume & Specific Gravity:</strong> Quantifying actual daily urinary output (goal >2.5 liters/day).</li>
        <li><strong>Urinary Calcium & Sodium:</strong> High sodium intake directly forces calcium excretion into the urine.</li>
        <li><strong>Urinary Oxalate:</strong> Derived from metabolic production and dietary absorption (spinach, nuts, chocolate).</li>
        <li><strong>Citrate Levels:</strong> Citrate is nature's primary crystal inhibitor; deficient citrate allows crystals to aggregate rapidly.</li>
        <li><strong>Uric Acid & pH Kinetics:</strong> Overly acidic urine (pH <5.5) precipitates insoluble uric acid stones.</li>
      </ul>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "Treating an acute kidney stone is only half the battle. Our metabolic prevention protocol identifies the exact chemical imbalance in your urine to ensure you never endure another stone attack."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. Sarah Jenkins, MD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. Modern Thulium Fiber Laser Dusting Technology</h2>
      <p>
        When active stones require removal, traditional shockwave lithotripsy (ESWL) often leaves painful fragments behind. Our suite uses ultra-flexible digital ureteroscopes and high-frequency Thulium laser fibers that pulverize even 20mm stones directly into sub-millimeter microscopic dust that washes out painlessly with same-day discharge.
      </p>
    `,
    comments: [
      {
        author: "Kenneth L.",
        time: "1 day ago",
        text: "Does adding fresh lemon juice to water really help prevent calcium oxalate stones?",
        reply: {
          author: "Dr. Sarah Jenkins (Author)",
          text: "Yes, lemons are rich in natural citrate. Citrate binds with urinary calcium, preventing it from combining with oxalate to form crystals, while also raising urine pH to prevent uric acid crystallization."
        }
      },
      {
        author: "Brian W.",
        time: "6 days ago",
        text: "The 24-hour urine testing completely solved my stone issues. Found out my urinary citrate was near zero. Haven't had a stone in 3 years now."
      }
    ],
    testimonial: {
      quote: "The 24-hour urine metabolic testing completely solved my stone issues. Found out my urinary citrate was near zero. Haven't had a stone in 3 years now thanks to Dr. Jenkins.",
      name: "Brian W., 52",
      treatment: "Kidney Stone & Metabolic Patient"
    },
    ctaTitle: "Stop Painful Kidney Stones for Good",
    ctaDesc: "Schedule a comprehensive metabolic workup or expedited stone evaluation with Dr. Sarah Jenkins today.",
    ctaBtnText: "Book Stone Consultation",
    ctaDoctor: "Dr. Sarah Jenkins, MD",
    ctaService: "Kidney Stone Laser Care"
  },
  andropause: {
    id: "andropause",
    pageTitle: "5 Early Warning Signs of Andropause Men Frequently Ignore | Vanguard Blog",
    category: "Hormone Health",
    breadcrumb: "Andropause Warning Signs",
    readTime: "6 Min Read",
    date: "Aug 22, 2026",
    title: "5 Early Warning Signs of Andropause Men Frequently Ignore",
    subtitle: "From subtle cognitive fatigue to persistent visceral belly fat, recognize early endocrine signals before significant metabolic decline occurs.",
    image: "assets/images/service-trt.jpg",
    imageAlt: "Hormone optimization and muscle health",
    author: {
      name: "Dr. David Chen, MD, PhD",
      role: "Director of Andrology & TRT",
      bio: "Harvard Fellowship in Male Reproductive Medicine. Pioneer in hormonal micro-dosing and metabolic vitality protocols.",
      image: "assets/images/dr-david-chen.jpg"
    },
    takeaways: [
      "Insidious Onset: Unlike female menopause, andropause occurs as a gradual 1-2% annual decline in testosterone compounded by rising SHBG levels.",
      "Visceral Adiposity Feedback: Deep abdominal fat contains aromatase enzyme, which actively converts scarce testosterone into estrogen, creating a vicious cycle of fatigue and weight gain.",
      "Beyond Total Testosterone: Standard blood panels checking total T alone miss up to 40% of symptomatic men; free testosterone and bioavailable fractions are essential."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. The 5 Warning Signs Men Frequently Overlook</h2>
      <p>
        Because male hormone decline occurs slowly over years, men gradually adapt to feeling suboptimal, assuming exhaustion and physical decline are merely "part of getting older."
      </p>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li><strong>1. The 2:00 PM Energy Crash:</strong> Persistent severe afternoon fatigue despite 7–8 hours of sleep.</li>
        <li><strong>2. Loss of Morning Vascular Tone:</strong> Waning spontaneous nitric oxide release and nocturnal erections indicate early endothelial-hormonal decoupling.</li>
        <li><strong>3. Stubborn Visceral Belly Fat:</strong> Inability to lose abdominal fat despite consistent dieting and gym workouts due to low androgen-driven lipolysis.</li>
        <li><strong>4. Executive Brain Fog & Delayed Recovery:</strong> Slower decision making, mental sluggishness, and taking days to recover from ordinary exercise.</li>
        <li><strong>5. Sub-Clinical Mood Flattening & Irritability:</strong> Loss of enthusiasm, passive irritability, and decreased competitive drive.</li>
      </ul>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. The Visceral Fat & Aromatase Trap</h2>
      <p>
        Visceral adipose tissue is not inert; it is an active endocrine organ rich in the <em>aromatase enzyme</em>. Aromatase converts circulating testosterone into estradiol. As testosterone declines, visceral fat increases, accelerating aromatase activity and depleting free testosterone further in an aggressive hormonal downward spiral.
      </p>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "Men are conditioned to accept fatigue and slowing metabolism as unavoidable consequences of aging. In reality, early endocrine intervention can preserve mental clarity, lean muscle, and cardiovascular health for decades."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. David Chen, MD, PhD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. Clinical Restoration Framework</h2>
      <p>
        Comprehensive hormone optimization combines bioidentical micro-dosing protocols with targeted micronutrients (zinc, magnesium glycinate, vitamin D3/K2), resistance exercise programming, and strict sleep architecture optimization to re-establish peak youthful vitality safely.
      </p>
    `,
    comments: [
      {
        author: "Thomas R.",
        time: "5 days ago",
        text: "At what age should men start getting their baseline hormone panel checked?",
        reply: {
          author: "Dr. David Chen (Author)",
          text: "We recommend all men establish a baseline biomarker panel by age 30 to 35. Having your personal baseline numbers makes it far easier to diagnose subtle hormonal drops when symptoms appear in your 40s or 50s."
        }
      }
    ],
    testimonial: {
      quote: "Addressing the early warning signs of andropause with Dr. Chen restored my focus and vitality. I've dropped 18 lbs of visceral fat and feel 15 years younger.",
      name: "Thomas R., 49",
      treatment: "Andropause & Vitality Patient"
    },
    ctaTitle: "Take Proactive Control of Your Hormonal Health",
    ctaDesc: "Schedule a 32-biomarker endocrine evaluation with Dr. David Chen to uncover your true hormonal profile.",
    ctaBtnText: "Book Hormone Assessment",
    ctaDoctor: "Dr. David Chen, MD, PhD",
    ctaService: "Testosterone Therapy (TRT)"
  },
  vasectomy: {
    id: "vasectomy",
    pageTitle: "What to Expect During a No-Scalpel Vasectomy Weekend | Vanguard Blog",
    category: "Surgical Advances",
    breadcrumb: "No-Scalpel Vasectomy Guide",
    readTime: "4 Min Read",
    date: "Aug 10, 2026",
    title: "What to Expect During a No-Scalpel Vasectomy Weekend",
    subtitle: "A step-by-step breakdown of jet-injection anesthesia, zero-incision technique, and how men recover fully over a standard 48-hour weekend.",
    image: "assets/images/service-vasectomy.jpg",
    imageAlt: "No-scalpel vasectomy consultation",
    author: {
      name: "Dr. Marcus Sterling, MD",
      role: "Microsurgeon & Male Fertility Lead",
      bio: "Stanford Fellowship in Urological Microsurgery with over 2,000 successful minimally invasive vasectomies and microsurgical reversals.",
      image: "assets/images/dr-marcus-sterling.jpg"
    },
    takeaways: [
      "No-Needle Jet Spray Anesthesia: Pneumatic high-pressure mist numbs the vas deferens in less than a second with zero needle pricks.",
      "Zero-Incision Micro-Puncture: A tiny 2mm skin opening replaces wide scalpel incisions, eliminating sutures and leaving no visible scar.",
      "48-Hour Weekend Recovery: Have the procedure done Friday afternoon, rest comfortably with an ice pack over the weekend, and return to desk work Monday morning."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. Why No-Scalpel Has Replaced Traditional Surgery</h2>
      <p>
        Traditional vasectomy historically involved needles, scalpel incisions on both sides of the scrotum, and stitches that pulled during healing. The modern No-Scalpel Vasectomy (NSV) eliminates incisions entirely using pneumatic jet-spray anesthesia and a specialized micro-puncture instrument.
      </p>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. Inside the Suite: Step-by-Step Procedure</h2>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li><strong>Jet Anesthesia:</strong> A 'No-Needle' injector uses pneumatic air pressure to deliver local anesthetic instantly.</li>
        <li><strong>2mm Micro-Opening:</strong> A microscopic skin separation is made; no cutting or sutures required.</li>
        <li><strong>Triple-Lock Occlusion:</strong> The vas deferens is divided, cauterized intraluminally, and sealed with fascial interposition to ensure 99.9% permanent efficacy.</li>
        <li><strong>Closure:</strong> The tiny puncture contracts naturally and closes within hours.</li>
      </ul>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "The fear of vasectomy is rooted in outdated surgical techniques from decades ago. Modern micro-puncture vasectomy is virtually painless, takes 15 minutes, and allows men to be back on their feet in 48 hours."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. Marcus Sterling, MD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. The 48-Hour Weekend Protocol & Semen Verification</h2>
      <p>
        Patients schedule on Friday afternoon, spend Saturday and Sunday relaxing with an ice pack, and return to desk work Monday. At 12 weeks, a complimentary at-home or clinic semen analysis confirms 100% sperm clearance before discontinuing other contraception.
      </p>
    `,
    comments: [
      {
        author: "Jason H.",
        time: "1 week ago",
        text: "Does a vasectomy change the appearance, volume, or sensation of ejaculation?",
        reply: {
          author: "Dr. Marcus Sterling (Author)",
          text: "Not in the slightest. Sperm accounts for less than 2% of total semen volume. Fluid volume, texture, color, and climax sensation remain 100% unchanged because prostatic and seminal vesicle fluids are untouched."
        }
      }
    ],
    testimonial: {
      quote: "The no-scalpel vasectomy with Dr. Sterling was literally over in 15 minutes with zero pain. The private suite made the experience completely stress-free. Highly recommended!",
      name: "David K., 39",
      treatment: "No-Scalpel Vasectomy Patient"
    },
    ctaTitle: "Schedule Your Gentle No-Scalpel Procedure",
    ctaDesc: "Private, discreet, and seamless care with Dr. Marcus Sterling. Friday afternoon appointment slots available.",
    ctaBtnText: "Book Vasectomy Consult",
    ctaDoctor: "Dr. Marcus Sterling, MD",
    ctaService: "No-Scalpel Vasectomy & Reversal"
  },
  psa: {
    id: "psa",
    pageTitle: "PSA Screening Guidelines: Why Velocity and Free PSA Matter More | Vanguard Blog",
    category: "Prostate Care",
    breadcrumb: "PSA Screening Guidelines",
    readTime: "7 Min Read",
    date: "Jul 28, 2026",
    title: "PSA Screening Guidelines: Why Velocity and Free PSA Matter More Than Ever",
    subtitle: "How multi-parametric MRI and refined PSA kinetics prevent unnecessary biopsies while catching early aggressive urological conditions.",
    image: "assets/images/blog-robotics.jpg",
    imageAlt: "Robotic prostate surgical console",
    author: {
      name: "Dr. Anthony Rossi, MD",
      role: "Chief Urologist & Robotic Surgeon",
      bio: "Board Certified in Urology with 24+ years experience in robotic urological oncology and prostate diagnostics.",
      image: "assets/images/dr-anthony-rossi.jpg"
    },
    takeaways: [
      "PSA Velocity Over Absolute Numbers: The trajectory and rate of rise over 12 to 24 months is far more informative than an isolated snapshot value.",
      "Free vs. Total PSA Ratio: High free PSA (>25%) typically indicates benign enlargement (BPH), while low free PSA (<10%) signals the need for further precision imaging.",
      "3T Multiparametric MRI: Eliminates blind random biopsies by visualizing suspicious prostate lesions with PI-RADS scoring and targeted fusion guidance."
    ],
    content: `
      <h2 style="font-size: 1.6rem; margin-top: 2rem; margin-bottom: 1rem;">1. The Myth of the Rigid 4.0 ng/dL PSA Threshold</h2>
      <p>
        For decades, a single Prostate-Specific Antigen (PSA) reading of 4.0 ng/dL was used as an arbitrary trigger for invasive 12-core needle biopsies. Modern urological science recognizes that PSA is organ-specific, not cancer-specific. Benign enlargement (BPH), prostatitis, vigorous cycling, and recent ejaculation can all temporarily elevate PSA without cancer.
      </p>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">2. Advanced Biomarkers: Free PSA, Density & Velocity</h2>
      <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">
        <li><strong>Free-to-Total PSA Ratio:</strong> Cancer cells produce PSA bound to proteins. A high free PSA percentage (>25%) strongly points to benign hyperplasia.</li>
        <li><strong>PSA Density (PSAD):</strong> Calculated by dividing PSA by prostate volume (via MRI/ultrasound). A density <0.15 ng/mL/cc usually indicates enlargement rather than malignancy.</li>
        <li><strong>PSA Velocity:</strong> An increase >0.75 ng/dL per year indicates dynamic activity requiring investigation.</li>
      </ul>

      <blockquote style="background: var(--bg-card); border-left: 4px solid var(--accent); padding: 1.5rem; margin: 2rem 0; font-style: italic; border-radius: 8px; box-shadow: var(--shadow-sm);">
        "A high PSA reading is not a diagnosis of cancer—it is a signal that requires refined biomarker and imaging analysis. With multiparametric MRI, we prevent unnecessary biopsies while catching clinically significant conditions early."
        <footer style="margin-top: 0.5rem; font-style: normal; font-weight: 700; font-size: 0.9rem; color: var(--accent);">— Dr. Anthony Rossi, MD</footer>
      </blockquote>

      <h2 style="font-size: 1.6rem; margin-top: 2.5rem; margin-bottom: 1rem;">3. Non-Invasive 3T Multiparametric MRI (PI-RADS)</h2>
      <p>
        Before any biopsy is considered, we perform high-resolution 3T mpMRI. Radiologists grade areas on a 1-to-5 PI-RADS scale. Only high-risk PI-RADS 4 or 5 lesions undergo targeted MRI-Ultrasound fusion biopsy, eliminating blind needle sampling entirely.
      </p>
    `,
    comments: [
      {
        author: "Donald S.",
        time: "2 weeks ago",
        text: "Can intense bicycling or exercise before a blood test cause a temporary spike in PSA?",
        reply: {
          author: "Dr. Anthony Rossi (Author)",
          text: "Yes. Vigorous cycling, recent ejaculation, or mild urinary tract inflammation can cause transient mechanical PSA spikes. We always recommend 48 hours of pelvic rest prior to drawing diagnostic PSA panels."
        }
      }
    ],
    testimonial: {
      quote: "My local clinic rushed me to get an immediate random needle biopsy after an elevated PSA. Dr. Rossi recommended 3T MRI first, which proved my elevation was simply moderate benign inflammation. Avoided invasive procedures completely.",
      name: "Donald S., 61",
      treatment: "3T MRI Prostate Screening"
    },
    ctaTitle: "Get an Expert Second Opinion on Your Prostate Health",
    ctaDesc: "Schedule a confidential consultation and comprehensive PSA review with Dr. Anthony Rossi.",
    ctaBtnText: "Book Prostate Screening",
    ctaDoctor: "Dr. Anthony Rossi, MD",
    ctaService: "Prostate Care & BPH Relief"
  }
};

// Aliases for seamless routing
BLOGS_DATA['prostate-rezum'] = BLOGS_DATA['rezum'];
BLOGS_DATA['understanding-rezum-water-vapor-vs-traditional-turp-surgery'] = BLOGS_DATA['rezum'];
BLOGS_DATA['rezum-water-vapor'] = BLOGS_DATA['rezum'];
BLOGS_DATA['bph'] = BLOGS_DATA['rezum'];
BLOGS_DATA['testosterone'] = BLOGS_DATA['trt'];
BLOGS_DATA['testosterone-replacement-therapy'] = BLOGS_DATA['trt'];
BLOGS_DATA['the-complete-guide-to-testosterone-replacement-therapy-science-vs-myths'] = BLOGS_DATA['trt'];
BLOGS_DATA['testosterone-guide'] = BLOGS_DATA['trt'];
BLOGS_DATA['vascular-science'] = BLOGS_DATA['shockwave'];
BLOGS_DATA['the-vascular-science-behind-focused-acoustic-shockwave-therapy'] = BLOGS_DATA['shockwave'];
BLOGS_DATA['ed-shockwave'] = BLOGS_DATA['shockwave'];
BLOGS_DATA['ed'] = BLOGS_DATA['shockwave'];
BLOGS_DATA['kidney'] = BLOGS_DATA['kidney-stones'];
BLOGS_DATA['metabolic-protocol'] = BLOGS_DATA['kidney-stones'];
BLOGS_DATA['preventing-recurrent-kidney-stones-a-urologists-metabolic-protocol'] = BLOGS_DATA['kidney-stones'];
BLOGS_DATA['stone-prevention'] = BLOGS_DATA['kidney-stones'];
BLOGS_DATA['andropause-warning-signs'] = BLOGS_DATA['andropause'];
BLOGS_DATA['5-early-warning-signs-of-andropause-men-frequently-ignore'] = BLOGS_DATA['andropause'];
BLOGS_DATA['vasectomy-weekend'] = BLOGS_DATA['vasectomy'];
BLOGS_DATA['what-to-expect-during-a-no-scalpel-vasectomy-weekend'] = BLOGS_DATA['vasectomy'];
BLOGS_DATA['no-scalpel-vasectomy'] = BLOGS_DATA['vasectomy'];
BLOGS_DATA['psa-screening-guidelines'] = BLOGS_DATA['psa'];
BLOGS_DATA['psa-screening-guidelines-why-velocity-and-free-psa-matter-more-than-ever'] = BLOGS_DATA['psa'];

function initBlogDetailsDynamic() {
  const heroTitleEl = document.getElementById('blog-hero-title');
  if (!heroTitleEl) return;

  function getActiveBlogKey() {
    // 1. Search param: ?id=xxx or ?post=xxx or ?article=xxx
    const urlParams = new URLSearchParams(window.location.search);
    const paramKey = (urlParams.get('id') || urlParams.get('post') || urlParams.get('article') || '').toLowerCase().trim();
    if (paramKey && BLOGS_DATA[paramKey]) return paramKey;

    // 2. Hash: #xxx
    const rawHash = window.location.hash.replace('#', '').toLowerCase().trim();
    if (rawHash && BLOGS_DATA[rawHash]) return rawHash;

    // 3. Fallback
    return 'trt';
  }

  function loadBlog(blogKey) {
    const data = BLOGS_DATA[blogKey] || BLOGS_DATA['trt'];

    // Page title & Meta Description
    const pageTitleEl = document.getElementById('page-head-title') || document.querySelector('title');
    if (pageTitleEl) pageTitleEl.textContent = data.pageTitle;
    document.title = data.pageTitle;

    const metaDescEl = document.getElementById('page-meta-desc') || document.querySelector('meta[name="description"]');
    if (metaDescEl && data.subtitle) metaDescEl.setAttribute('content', data.subtitle);

    // Breadcrumb
    const breadcrumbEl = document.getElementById('blog-breadcrumb-title');
    if (breadcrumbEl) breadcrumbEl.textContent = data.breadcrumb || data.title;

    // Hero metadata
    const categoryEl = document.getElementById('blog-hero-category');
    if (categoryEl) categoryEl.textContent = data.category;

    const dateEl = document.getElementById('blog-hero-date');
    if (dateEl) dateEl.textContent = `Published: ${data.date}`;

    const readtimeEl = document.getElementById('blog-hero-readtime');
    if (readtimeEl) readtimeEl.textContent = `• ${data.readTime}`;

    // Hero title & Subtitle
    heroTitleEl.textContent = data.title;
    const heroDescEl = document.getElementById('blog-hero-desc');
    if (heroDescEl) heroDescEl.textContent = data.subtitle;

    // Featured Image with smooth transition
    const mainImg = document.getElementById('blog-main-image');
    if (mainImg) {
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = data.image;
        mainImg.alt = data.imageAlt || data.title;
        mainImg.style.opacity = '1';
      }, 100);
    }

    // Key Takeaways List (Properly aligned with dedicated flex layout)
    const takeawaysList = document.getElementById('blog-takeaways-list');
    if (takeawaysList && data.takeaways) {
      takeawaysList.className = 'blog-takeaways-list';
      takeawaysList.innerHTML = data.takeaways.map(t => {
        const parts = t.split(':');
        if (parts.length > 1) {
          return `<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><div class="takeaway-text"><strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}</div></li>`;
        }
        return `<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><div class="takeaway-text">${t.trim()}</div></li>`;
      }).join('');
    }

    // Main Content
    const fullContentEl = document.getElementById('blog-full-content');
    if (fullContentEl && data.content) {
      fullContentEl.innerHTML = data.content;
    }

    // Testimonial Bar Section (Consistent with website testimonial-card)
    const testimonialContainer = document.getElementById('blog-testimonial-container');
    if (testimonialContainer && data.testimonial) {
      const initials = data.testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      testimonialContainer.innerHTML = `
        <div class="testimonial-card">
          <div class="stars-row">★★★★★</div>
          <p class="testimonial-quote">"${data.testimonial.quote}"</p>
          <div class="patient-profile">
            <div class="patient-avatar-badge">${initials}</div>
            <div class="patient-details">
              <h5 class="patient-name">${data.testimonial.name}</h5>
              <p class="patient-treatment">${data.testimonial.treatment}</p>
              <span class="verified-tag"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified Patient</span>
            </div>
          </div>
        </div>
      `;
    }

    // Author card
    const authorImg = document.getElementById('blog-author-image');
    if (authorImg && data.author) {
      authorImg.src = data.author.image;
      authorImg.alt = data.author.name;
    }

    const authorName = document.getElementById('blog-author-name');
    if (authorName && data.author) authorName.textContent = data.author.name;

    const authorRole = document.getElementById('blog-author-role');
    if (authorRole && data.author) authorRole.textContent = data.author.bio || data.author.role;

    // Comments & Enquiries Section
    const commentsList = document.getElementById('blog-comments-list');
    const commentsHeading = document.getElementById('blog-comments-heading');
    if (commentsList && data.comments) {
      if (commentsHeading) commentsHeading.innerHTML = `Patient Comments (<span id="blog-comments-count">${data.comments.length}</span>)`;
      commentsList.innerHTML = data.comments.map(c => {
        const initials = c.author ? c.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'PT';
        return `
        <div class="blog-comment-card">
          <div class="blog-comment-header">
            <div class="blog-comment-author-wrap">
              <div class="patient-avatar-badge" style="width: 38px; height: 38px; min-width: 38px; min-height: 38px; font-size: 0.85rem;">${initials}</div>
              <div>
                <h5 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-heading);">${c.author}</h5>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${c.time}</span>
              </div>
            </div>
          </div>
          <p class="blog-comment-text">${c.text}</p>
          ${c.reply ? `
            <div class="blog-comment-reply">
              <div class="blog-comment-reply-author">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                <span>${c.reply.author}:</span>
              </div>
              <p class="blog-comment-reply-text">${c.reply.text}</p>
            </div>
          ` : ''}
        </div>
      `;
      }).join('');
    }

    // Bottom CTA
    const ctaTitle = document.getElementById('blog-cta-title');
    if (ctaTitle && data.ctaTitle) ctaTitle.textContent = data.ctaTitle;

    const ctaDesc = document.getElementById('blog-cta-desc');
    if (ctaDesc && data.ctaDesc) ctaDesc.textContent = data.ctaDesc;

    const ctaBtn = document.getElementById('blog-cta-btn');
    if (ctaBtn) {
      if (data.ctaBtnText) ctaBtn.textContent = data.ctaBtnText;
      if (data.ctaDoctor) ctaBtn.setAttribute('data-doctor', data.ctaDoctor);
      if (data.ctaService) ctaBtn.setAttribute('data-service', data.ctaService);
    }

    // Dynamic Related Articles: show 3 other articles
    const relatedGrid = document.getElementById('blog-related-grid');
    if (relatedGrid) {
      const allKeys = ['rezum', 'shockwave', 'kidney-stones', 'andropause', 'vasectomy', 'psa', 'trt'];
      const activePrimaryId = data.id || 'trt';
      const relatedKeys = allKeys.filter(k => k !== activePrimaryId).slice(0, 3);

      relatedGrid.innerHTML = relatedKeys.map(k => {
        const item = BLOGS_DATA[k];
        return `
          <article class="service-card blog-related-card">
            <div class="service-card-media">
              <a href="blog-details.html#${item.id}">
                <img src="${item.image}" alt="${item.title}">
              </a>
            </div>
            <div class="service-card-body">
              <span class="blog-category-tag" style="position:static; display:inline-block; margin-bottom:0.5rem; width:fit-content;">${item.category}</span>
              <h3><a href="blog-details.html#${item.id}">${item.title}</a></h3>
              <p>${item.subtitle ? (item.subtitle.length > 110 ? item.subtitle.substring(0, 107) + '...' : item.subtitle) : ''}</p>
              <div class="service-card-footer">
                <a href="blog-details.html#${item.id}" class="service-link">Read Guide <svg class="svg-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></a>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  // Initial load
  loadBlog(getActiveBlogKey());

  // Listen to hash changes (e.g. clicking related articles or browser back/forward)
  window.addEventListener('hashchange', () => {
    loadBlog(getActiveBlogKey());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   16. Modern Dynamic Scroll Reveal Animations Suite
   ========================================================================== */
function initScrollAnimations() {
  const animatedSelectors = [
    '.service-card',
    '.treatment-card',
    '.blog-card',
    '.pricing-card',
    '.doctor-card',
    '.feature-card',
    '.highlight-item',
    '.faq-item',
    '.timeline-item',
    '.contact-card-box',
    '.stat-card',
    '.service-metric-card',
    '.cta-banner'
  ];

  const elementsToAnimate = document.querySelectorAll(animatedSelectors.join(', '));
  if (!elementsToAnimate.length) return;

  if (!('IntersectionObserver' in window)) {
    // Graceful fallback for environments without IntersectionObserver
    elementsToAnimate.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}



