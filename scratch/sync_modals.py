import os
import re

MODAL_TEMPLATE = '''  <!-- Global Appointment Wizard Modal -->
  <div class="modal-backdrop" id="appointment-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-card">
      <div class="modal-header">
        <div>
          <h3 id="modal-title">Book a Confidential Consultation</h3>
          <p>Private & direct scheduling with our board-certified specialists.</p>
        </div>
        <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="appointment-form">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="modal-service">Clinical Department / Service <span class="required-star">*</span></label>
              <select class="form-control" id="modal-service" required>
                <option value="">Select Treatment</option>
                <option value="Prostate & BPH Laser Care">Prostate & BPH Laser Care</option>
                <option value="Testosterone Therapy (TRT)">Testosterone Therapy (TRT)</option>
                <option value="Acoustic Wave ED Therapy">Acoustic Wave ED Therapy</option>
                <option value="Kidney Stone Laser Removal">Kidney Stone Laser Removal</option>
                <option value="No-Scalpel Vasectomy">No-Scalpel Vasectomy</option>
                <option value="Male Reproductive Medicine">Male Reproductive Medicine</option>
                <option value="Executive Male Health Screening">Executive Male Health Screening</option>
                <option value="Men's Vitality Check">Men's Vitality Check</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-doctor">Preferred Specialist <span class="required-star">*</span></label>
              <select class="form-control" id="modal-doctor" required>
                <option value="">Select Specialist</option>
                <option value="First Available Specialist">First Available Specialist</option>
                <option value="Dr. Anthony Rossi, MD">Dr. Anthony Rossi, MD (Chief Robotic Urologist)</option>
                <option value="Dr. David Chen, MD, PhD">Dr. David Chen, MD, PhD (Director of Andrology & TRT)</option>
                <option value="Dr. Sarah Jenkins, MD">Dr. Sarah Jenkins, MD (Urological Surgeon)</option>
                <option value="Dr. Marcus Sterling, MD">Dr. Marcus Sterling, MD (Microsurgeon & Andrology)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-date">Preferred Date <span class="required-star">*</span></label>
              <input type="date" class="form-control" id="modal-date" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-time">Preferred Time Slot <span class="required-star">*</span></label>
              <select class="form-control" id="modal-time" required>
                <option value="">Select Time Slot</option>
                <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="Late Afternoon (4:00 PM - 7:00 PM)">Late Afternoon (4:00 PM - 7:00 PM)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-name">Full Name <span class="required-star">*</span></label>
              <input type="text" class="form-control" id="modal-name" placeholder="John Doe" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-phone">Confidential Phone Number <span class="required-star">*</span></label>
              <input type="tel" class="form-control" id="modal-phone" placeholder="(555) 000-0000" required>
            </div>

            <div class="form-group full-width">
              <label class="form-label" for="modal-email">Email Address <span class="required-star">*</span></label>
              <input type="email" class="form-control" id="modal-email" placeholder="patient@example.com" required>
            </div>

            <div class="form-group full-width">
              <label class="form-label" for="modal-notes">Additional Message / Reason for Consultation</label>
              <textarea class="form-control" id="modal-notes" placeholder="Briefly describe your symptoms, primary concerns, or questions..." rows="2"></textarea>
            </div>

            <div class="form-group full-width" style="margin-top: 0.5rem;">
              <button type="submit" id="btn-submit-appointment" class="btn btn-primary" style="width: 100%; padding-block: 0.9rem; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>Confirm & Request Consultation</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>'''

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'admin.html']

modal_pattern = re.compile(r'(\s*<!-- Global Appointment Wizard Modal -->\s*<div class="modal-backdrop" id="appointment-modal".*?</div>\s*</div>\s*</div>)', re.DOTALL)

for fname in html_files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'id="appointment-modal"' in content:
        new_content = modal_pattern.sub('\n\n' + MODAL_TEMPLATE, content)
        if new_content != content:
            with open(fname, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated modal in {fname}")
        else:
            print(f"Modal in {fname} is already identical.")
    else:
        print(f"No modal in {fname}")
