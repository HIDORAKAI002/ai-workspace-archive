import os
import shutil
import subprocess

ROOT_DIR = r"C:\Users\josep\OneDrive\Desktop\ai_skills"
IDE_RULES_DIR = os.path.join(ROOT_DIR, "ide_rules")
CURSOR_DIR = os.path.join(IDE_RULES_DIR, "cursor")
CLINE_DIR = os.path.join(IDE_RULES_DIR, "cline")
TMP_DIR = os.path.join(ROOT_DIR, "tmp_ide_clones")

TARGET_REPOS = [
    ("https://github.com/PatrickJS/awesome-cursorrules.git", "cursor", "awesome-cursorrules"),
    ("https://github.com/sanjeed5/awesome-cursor-rules-mdc.git", "cursor", "awesome-cursorrules-mdc")
]

def ensure_dirs():
    for d in [CURSOR_DIR, CLINE_DIR]:
        os.makedirs(d, exist_ok=True)
    if os.path.exists(TMP_DIR):
        shutil.rmtree(TMP_DIR, ignore_errors=True)
    os.makedirs(TMP_DIR, exist_ok=True)

def clone_repo(url, name):
    print(f"📥 Downloading latest rules from {name}...")
    dest = os.path.join(TMP_DIR, name)
    try:
        subprocess.run(
            ["git", "clone", "--depth", "1", "--quiet", url, dest],
            capture_output=True, text=True, check=True
        )
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to download {name}: {e.stderr}")
        return False

def extract_rules(repo_name, target_subdir):
    repo_path = os.path.join(TMP_DIR, repo_name)
    target_path = CURSOR_DIR if target_subdir == "cursor" else CLINE_DIR
    extracted_count = 0

    print(f"🔍 Scanning {repo_name} for IDE rules...")
    for root, _, files in os.walk(repo_path):
        for file in files:
            file_lower = file.lower()
            
            # Identify valid rule files (. cursorrules, .clinerules, .mdc)
            # Skip readmes as they are usually repo documentations.
            is_rule = False
            if ".cursorrules" in file_lower or file_lower.endswith(".mdc"):
                is_rule = True
                
            if is_rule:
                source_file = os.path.join(root, file)
                
                # Get the name of the folder it was inside to deduce the framework (e.g. NextJS)
                parent_dir = os.path.basename(root)
                
                # If the file is literally named '.cursorrules', rename it so it doesn't vanish as a hidden file
                if file_lower == ".cursorrules":
                    safe_name = f"{parent_dir}.cursorrules"
                else:
                    safe_name = file
                    
                # Ensure no invalid chars for windows
                safe_name = "".join(c for c in safe_name if c.isalnum() or c in ("-", "_", ".")).strip()
                
                if not safe_name or safe_name == ".cursorrules":
                    safe_name = f"rule_{extracted_count}.md"

                dest_file = os.path.join(target_path, safe_name)
                
                # Avoid overwriting
                idx = 1
                base, ext = os.path.splitext(safe_name)
                while os.path.exists(dest_file):
                    dest_file = os.path.join(target_path, f"{base}_{idx}{ext}")
                    idx += 1
                
                try:
                    shutil.copy2(source_file, dest_file)
                    extracted_count += 1
                except Exception as e:
                    print(f"Failed to copy {source_file}: {e}")

    return extracted_count

def cleanup():
    if os.path.exists(TMP_DIR):
        print("🧹 Cleaning up temporary downloads...")
        # Workaround for windows read-only git files
        def on_rm_error(func, path, exc_info):
            import stat
            os.chmod(path, stat.S_IWRITE)
            os.unlink(path)
        shutil.rmtree(TMP_DIR, onerror=on_rm_error)

def main():
    print("🚀 Initializing IDE Rules Extraction Pipeline...")
    ensure_dirs()
    
    total_extracted = 0
    for url, ide_type, name in TARGET_REPOS:
        if clone_repo(url, name):
            count = extract_rules(name, ide_type)
            print(f"✅ Extracted {count} actual rule files from {name}!")
            total_extracted += count
            
    cleanup()
    print(f"\n🎉 IDE RULES EXTRACTION COMPLETE: Successfully extracted {total_extracted} rules to /ide_rules/")

if __name__ == "__main__":
    main()
