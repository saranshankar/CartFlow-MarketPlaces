import os
import zipfile
import hashlib

WORKSPACE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZIP_FILENAME = os.path.join(WORKSPACE, "CartFlow_3.0_Final_Submission.zip")

DIRS_TO_INCLUDE = ["src", "tests", "docs", "artifacts", "evidence", "scripts"]
FILES_TO_INCLUDE = [
    "README.md",
    "package.json",
    "package-lock.json",
    "playwright.config.ts",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.node.json",
    "tailwind.config.js",
    "postcss.config.js",
    ".eslintrc.cjs",
    "index.html",
    ".gitignore",
    "TEST_PLAN.md",
    "TEST_RESULTS.md"
]

EXCLUDE_PATTERNS = [
    "node_modules",
    ".git",
    ".env",
    ".tsbuildinfo",
    ".log",
    "__pycache__",
    ".DS_Store"
]

def should_exclude(path):
    for pattern in EXCLUDE_PATTERNS:
        if pattern in path:
            return True
    return False

def package_submission():
    if os.path.exists(ZIP_FILENAME):
        os.remove(ZIP_FILENAME)
        print(f"Removed previous {ZIP_FILENAME}")

    print(f"Creating submission archive: {ZIP_FILENAME}")
    file_count = 0

    with zipfile.ZipFile(ZIP_FILENAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add root files
        for filename in FILES_TO_INCLUDE:
            full_path = os.path.join(WORKSPACE, filename)
            if os.path.exists(full_path):
                zipf.write(full_path, arcname=filename)
                file_count += 1
                print(f"  + Added file: {filename}")

        # Add directories
        for dir_name in DIRS_TO_INCLUDE:
            dir_full_path = os.path.join(WORKSPACE, dir_name)
            if not os.path.exists(dir_full_path):
                continue
            for root, dirs, files in os.walk(dir_full_path):
                for f in files:
                    file_full_path = os.path.join(root, f)
                    rel_path = os.path.relpath(file_full_path, WORKSPACE)
                    if not should_exclude(rel_path):
                        zipf.write(file_full_path, arcname=rel_path)
                        file_count += 1

    file_size_bytes = os.path.getsize(ZIP_FILENAME)
    file_size_mb = file_size_bytes / (1024 * 1024)

    # Calculate SHA-256
    sha256 = hashlib.sha256()
    with open(ZIP_FILENAME, 'rb') as f:
        while chunk := f.read(65536):
            sha256.update(chunk)
    checksum = sha256.hexdigest()

    print("\n--- Archive Packaging Summary ---")
    print(f"Total files archived: {file_count}")
    print(f"Archive file size: {file_size_bytes:,} bytes ({file_size_mb:.2f} MB)")
    print(f"SHA-256 Checksum: {checksum}")
    print("---------------------------------")
    return file_size_bytes, checksum

if __name__ == '__main__':
    package_submission()
