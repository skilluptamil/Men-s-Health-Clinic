import os
import re

workspace_dir = r"c:\Users\ELCOT\OneDrive\Documents\Men's Health Clinic"

new_modal_html = """  <!-- Global Appointment Wizard Modal -->
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
                <option value="Prostate Care & BPH Relief">Prostate Care & BPH Relief</option>
                <option value="Testosterone Therapy (TRT)">Testosterone Therapy (TRT)</option>
                <option value="Erectile Vitality & Shockwave">Erectile Vitality & Shockwave</option>
                <option value="Kidney Stone Laser Care">Kidney Stone Laser Care</option>
                <option value="No-Scalpel Vasectomy & Reversal">No-Scalpel Vasectomy & Reversal</option>
                <option value="Executive Male Health Screening">Executive Male Health Screening</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-doctor">Preferred Specialist <span class="required-star">*</span></label>
              <select class="form-control" id="modal-doctor" required>
                <option value="">First Available Specialist</option>
                <option value="Dr. Anthony Rossi, MD">Dr. Anthony Rossi, MD (Chief Urologist)</option>
                <option value="Dr. David Chen, MD, PhD">Dr. David Chen, MD, PhD (Andrology / TRT)</option>
                <option value="Dr. Sarah Jenkins, MD">Dr. Sarah Jenkins, MD (Urological Surgeon)</option>
                <option value="Dr. Marcus Sterling, MD">Dr. Marcus Sterling, MD (Microsurgeon)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-date">Preferred Date <span class="required-star">*</span></label>
              <input type="date" class="form-control" id="modal-date" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="modal-time">Preferred Time Slot <span class="required-star">*</span></label>
              <select class="form-control" id="modal-time" required>
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
  </div>"""

new_footer_legal = """          <div class="footer-legal-links">
            <a href="login.html">Patient Portal</a>
            <a href="pricing.html">Pricing</a>
            <a href="#privacy-modal" data-open-modal="privacy">Privacy Policy</a>
            <a href="#hipaa-modal" data-open-modal="hipaa">HIPAA Statement</a>
          </div>"""

html_files = [f for f in os.listdir(workspace_dir) if f.endswith(".html")]

for fname in html_files:
    fpath = os.path.join(workspace_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update footer legal links
    content = re.sub(
        r'<div class="footer-legal-links">.*?</div>',
        new_footer_legal.strip(),
        content,
        flags=re.DOTALL
    )

    # 2. Update appointment modal if present
    if 'id="appointment-modal"' in content:
        content = re.sub(
            r'<!-- Global Appointment Wizard Modal -->\s*<div class="modal-backdrop" id="appointment-modal".*?</div>\s*</div>\s*</div>',
            new_modal_html.strip(),
            content,
            flags=re.DOTALL
        )

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {fname}")

print("All HTML files updated successfully!")
