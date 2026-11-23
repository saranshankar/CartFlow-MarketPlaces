import os
import zipfile
import hashlib

ZIP_FILENAME = "CartFlow_3.0_Final_Submission.zip"

def verify_archive():
    if not os.path.exists(ZIP_FILENAME):
        print(f"ERROR: {ZIP_FILENAME} not found!")
        return False

    print(f"Verifying integrity of: {ZIP_FILENAME}")
    size = os.path.getsize(ZIP_FILENAME)
    print(f"Archive size: {size:,} bytes")

    # Check SHA-256
    sha256 = hashlib.sha256()
    with open(ZIP_FILENAME, 'rb') as f:
        while chunk := f.read(65536):
            sha256.update(chunk)
    checksum = sha256.hexdigest()
    print(f"SHA-256: {checksum}")

    # Inspect contents
    with zipfile.ZipFile(ZIP_FILENAME, 'r') as z:
        # Test CRC
        test_crc = z.testzip()
        if test_crc is not None:
            print(f"ERROR: Corrupted file in archive: {test_crc}")
            return False
        print("CRC verification: PASS (Zero corrupted files)")

        namelist = z.namelist()
        print(f"Total entries in archive: {len(namelist)}")

        # Check for forbidden entries
        forbidden = [".env", ".git/", "node_modules/", ".tsbuildinfo", ".DS_Store"]
        violations = []
        for name in namelist:
            for forb in forbidden:
                if forb in name:
                    violations.append((name, forb))

        if violations:
            print(f"ERROR: Forbidden files found: {violations}")
            return False
        print("Forbidden items audit: PASS (Zero .env, .git, node_modules, or cache files)")

        # Check required files
        mandatory = [
            "src/App.tsx",
            "src/pages/LandingPage.tsx",
            "src/pages/CartPage.tsx",
            "src/pages/CheckoutPage.tsx",
            "src/pages/ConfirmationPage.tsx",
            "tests/e2e/checkout.spec.ts",
            "tests/e2e/accessibility.spec.ts",
            "tests/e2e/discovery.spec.ts",
            "tests/e2e/pdp.spec.ts",
            "tests/e2e/quality-engineering.spec.ts",
            "package.json",
            "package-lock.json",
            "playwright.config.ts",
            "README.md",
            "docs/FINAL_RELEASE_MANIFEST.md",
            "docs/TEST_PLAN.md",
            "docs/TEST_EXECUTION_REPORT.md",
            "docs/ACCESSIBILITY_REPORT.md",
            "docs/ARCHITECTURE.md",
            "docs/REQUIREMENT_TRACEABILITY_MATRIX.md",
            "docs/PRE_SUBMISSION_VERIFICATION.md",
            "artifacts/security/npm-audit-raw.json",
            "evidence/security/npm-audit-raw.json"
        ]

        missing = []
        for req in mandatory:
            if req not in namelist:
                missing.append(req)

        if missing:
            print(f"ERROR: Missing mandatory files: {missing}")
            return False
        print("Mandatory file checklist: PASS (All 23 sample key files verified present)")

    print("\n--- ARCHIVE VERIFICATION COMPLETE: ALL CHECKS PASSED ---")
    return True

if __name__ == '__main__':
    verify_archive()
