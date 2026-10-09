import os
import re

workspace_dir = r"c:\Users\ELCOT\OneDrive\Documents\Men's Health Clinic"

new_footer_legal = """          <div class="footer-legal-links">
            <a href="login.html">Patient Portal</a>
            <a href="#privacy-modal" data-open-modal="privacy">Privacy Policy</a>
            <a href="#hipaa-modal" data-open-modal="hipaa">HIPAA Statement</a>
          </div>"""

html_files = [f for f in os.listdir(workspace_dir) if f.endswith(".html")]

for fname in html_files:
    fpath = os.path.join(workspace_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update footer legal links (remove Pricing)
    content = re.sub(
        r'<div class="footer-legal-links">.*?</div>',
        new_footer_legal.strip(),
        content,
        flags=re.DOTALL
    )

    # 2. Remove Pricing from footer navigation lists if present
    content = re.sub(
        r'\s*<li class="footer-link-item"><a href="pricing\.html">Pricing & Packages</a></li>',
        '',
        content
    )
    content = re.sub(
        r'\s*<li class="footer-link-item"><a href="pricing\.html">Pricing</a></li>',
        '',
        content
    )

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {fname}")

print("Successfully removed Pricing link from footer across all HTML files!")
