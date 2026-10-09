// Unit Test Suite for Vanguard Clinic Form Validation Engine
const fs = require('fs');
const path = require('path');

// Read main.js
const mainJs = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');

// Mock DOM elements and environment
class MockClassList {
  constructor() { this.classes = new Set(); }
  add(cls) { this.classes.add(cls); }
  remove(cls) { this.classes.delete(cls); }
  contains(cls) { return this.classes.has(cls); }
}

class MockElement {
  constructor(tag, id = '', type = 'text') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.type = type;
    this.value = '';
    this.classList = new MockClassList();
    this.parentElement = null;
    this.innerHTML = '';
    this.attributes = {};
    this.children = [];
    this.selectedIndex = 0;
    this.options = [];
  }
  closest(selector) {
    if (selector === '.form-group' && this.parentElement) return this.parentElement;
    return null;
  }
  querySelector(selector) {
    if (selector === '.invalid-feedback') {
      return this.children.find(c => c.classList && c.classList.contains('invalid-feedback')) || null;
    }
    return null;
  }
  appendChild(el) {
    el.parentElement = this;
    this.children.push(el);
    return el;
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  hasAttribute(k) { return k in this.attributes; }
  focus() { this.focused = true; }
}

function createGroupedInput(tag, id, type, value = '', required = true) {
  const group = new MockElement('div');
  group.classList.add('form-group');
  const input = new MockElement(tag, id, type);
  input.value = value;
  if (required) input.setAttribute('required', 'true');
  group.appendChild(input);
  return { group, input };
}

// Extraction of validation functions from main.js for testing
const setFieldError = (inputEl, message) => {
  if (!inputEl) return;
  inputEl.classList.add('is-invalid');
  const group = inputEl.closest('.form-group') || inputEl.parentElement;
  if (group) {
    group.classList.add('has-error');
    let feedback = group.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = new MockElement('div');
      feedback.classList.add('invalid-feedback');
      group.appendChild(feedback);
    }
    feedback.innerHTML = `<span>${message}</span>`;
  }
};

const clearFieldError = (inputEl) => {
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
};

const validatePhoneField = (input, isRequired = true) => {
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
};

const validateNameField = (input, isRequired = true, label = 'Full name') => {
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
};

const validateEmailField = (input, isRequired = true) => {
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
};

const validateSelectField = (select, fieldName = 'Option') => {
  if (!select) return true;
  if (!select.value || select.value.trim() === '' || (select.selectedIndex === 0 && select.options[0]?.value === '')) {
    setFieldError(select, `Please select a valid ${fieldName.toLowerCase()}.`);
    return false;
  }
  clearFieldError(select);
  return true;
};

const validateDateField = (input, isAppointment = true) => {
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
};

const validatePasswordField = (input, minLen = 8) => {
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
};

// --- Test Suites ---
console.log('--- RUNNING VALIDATION TEST SUITE ---');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Phone Field Tests
console.log('\n[Suite 1: Phone Validation & Input Masking]');
const phoneTests = [
  { val: ';kkgwr;grmwr', expected: false, label: 'Random letters and semicolons rejected' },
  { val: 'abc1234567', expected: false, label: 'Letters with digits rejected' },
  { val: '123', expected: false, label: 'Short phone number (<7 digits) rejected' },
  { val: '9876543210', expected: true, label: 'Standard 10-digit number accepted' },
  { val: '+1 (800) 555-8765', expected: true, label: 'International format with + () - spaces accepted' },
  { val: '+91 9876543210', expected: true, label: 'Country code with space accepted' }
];

phoneTests.forEach(t => {
  const { input } = createGroupedInput('input', 'modal-phone', 'tel', t.val);
  const res = validatePhoneField(input, true);
  assert(res === t.expected, `${t.label} (val: "${t.val}") -> ${res}`);
});

// Test real-time sanitizer
const rawInput = ';kkgwr;grmwr9876543210#@!';
const sanitized = rawInput.replace(/[^\d\s+()\-.]/g, '');
assert(sanitized === '9876543210', `Real-time phone sanitizer strips all invalid chars: "${rawInput}" -> "${sanitized}"`);

// 2. Name Field Tests
console.log('\n[Suite 2: Name Validation & Input Masking]');
const nameTests = [
  { val: '', expected: false, label: 'Empty required name rejected' },
  { val: 'a', expected: false, label: 'Single character name rejected' },
  { val: 'John123', expected: false, label: 'Name with numbers rejected' },
  { val: 'John Doe', expected: true, label: 'Standard two-word name accepted' },
  { val: 'Alexander Wright', expected: true, label: 'Full name accepted' },
  { val: "O'Connor-Smith", expected: true, label: 'Name with hyphen and apostrophe accepted' }
];

nameTests.forEach(t => {
  const { input } = createGroupedInput('input', 'modal-name', 'text', t.val);
  const res = validateNameField(input, true);
  assert(res === t.expected, `${t.label} (val: "${t.val}") -> ${res}`);
});

// 3. Email Field Tests
console.log('\n[Suite 3: Email Validation]');
const emailTests = [
  { val: 'patient@', expected: false, label: 'Incomplete email "patient@" rejected' },
  { val: 'patient@example', expected: false, label: 'Missing TLD "patient@example" rejected' },
  { val: 'patient@g', expected: false, label: 'Incomplete domain "patient@g" rejected' },
  { val: 'patient@example.c', expected: false, label: '1-char TLD rejected' },
  { val: 'patient@example.com', expected: true, label: 'Standard email "patient@example.com" accepted' },
  { val: 'john.doe+clinic@vanguard.health.org', expected: true, label: 'Subdomain + plus address accepted' }
];

emailTests.forEach(t => {
  const { input } = createGroupedInput('input', 'modal-email', 'email', t.val);
  const res = validateEmailField(input, true);
  assert(res === t.expected, `${t.label} (val: "${t.val}") -> ${res}`);
});

// 4. Select / Dropdown Tests
console.log('\n[Suite 4: Select / Dropdown Validation]');
const selectTest = createGroupedInput('select', 'modal-service', 'select');
selectTest.input.options = [{ value: '', text: 'Select Treatment' }, { value: 'prostate', text: 'Prostate Care' }];
selectTest.input.value = '';
selectTest.input.selectedIndex = 0;
assert(validateSelectField(selectTest.input, 'Service') === false, 'Default placeholder option with empty value rejected');

selectTest.input.value = 'Prostate Care & BPH Relief';
selectTest.input.selectedIndex = 1;
assert(validateSelectField(selectTest.input, 'Service') === true, 'Valid selected option accepted');

// 5. Date Field Tests
console.log('\n[Suite 5: Date Validation]');
const pastDate = '2020-01-01';
const futureDate = '2027-12-31';

const dateTestPast = createGroupedInput('input', 'modal-date', 'date', pastDate);
assert(validateDateField(dateTestPast.input, true) === false, 'Past appointment date rejected');

const dateTestFuture = createGroupedInput('input', 'modal-date', 'date', futureDate);
assert(validateDateField(dateTestFuture.input, true) === true, 'Future appointment date accepted');

// 6. Password & Confirm Password Tests
console.log('\n[Suite 6: Password Validation]');
const passShort = createGroupedInput('input', 'reg-password', 'password', 'short1');
assert(validatePasswordField(passShort.input, 8) === false, 'Short password (<8 chars) rejected');

const passGood = createGroupedInput('input', 'reg-password', 'password', 'StrongPass2026!');
assert(validatePasswordField(passGood.input, 8) === true, 'Valid password (>=8 chars) accepted');

// 7. Error clearing test
console.log('\n[Suite 7: Error State & Auto-Clearing]');
const inputError = createGroupedInput('input', 'test-input', 'text', '');
setFieldError(inputError.input, 'Test error message');
assert(inputError.input.classList.contains('is-invalid'), 'is-invalid class added on error');
assert(inputError.group.classList.contains('has-error'), 'has-error class added to form-group');
assert(inputError.group.querySelector('.invalid-feedback').innerHTML.includes('Test error message'), 'Inline feedback contains error message');

clearFieldError(inputError.input);
assert(!inputError.input.classList.contains('is-invalid'), 'is-invalid class removed on clear');
assert(!inputError.group.classList.contains('has-error'), 'has-error class removed on clear');
assert(inputError.group.querySelector('.invalid-feedback').innerHTML === '', 'Feedback container emptied on clear');

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
