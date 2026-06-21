import os
import shutil

SOURCE_DIR = "."
DEST_DIR = "docs"
EXCLUDE_DIRS = {".git", "scripts", "docs", "node_modules", ".github", "venv", "temp_sync_mcp"}
EXCLUDE_PILLARS = os.environ.get("EXCLUDE_PILLARS", "").split(",")

def build_docs():
    print("🧹 Cleaning old docs...")
    if os.path.exists(DEST_DIR):
        shutil.rmtree(DEST_DIR)
    os.makedirs(DEST_DIR, exist_ok=True)
    
    print("🏠 Copying homepage...")
    if os.path.exists("README.md"):
        shutil.copy("README.md", os.path.join(DEST_DIR, "index.md"))
        
    print("🚀 Extracting READMEs...")
    count = 0
    for root, dirs, files in os.walk(SOURCE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]
        
        rel_root = os.path.relpath(root, SOURCE_DIR)
        if rel_root == ".":
            continue
            
        # Check exclusion for takedown risk folders
        if any(p in rel_root for p in EXCLUDE_PILLARS if p):
            continue
            
        for file in files:
            if file.lower() == "readme.md":
                dest_path = os.path.join(DEST_DIR, rel_root)
                os.makedirs(dest_path, exist_ok=True)
                shutil.copy(os.path.join(root, file), os.path.join(dest_path, "index.md"))
                count += 1
                
    print(f"✅ Extracted {count} documentation pages!")

if __name__ == "__main__":
    build_docs()
