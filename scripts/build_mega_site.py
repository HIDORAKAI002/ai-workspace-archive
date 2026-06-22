import os
import shutil

SOURCE_DIR = "."
DEST_DIR = "docs"
EXCLUDE_DIRS = {".git", "scripts", "docs", "node_modules", ".github", "venv", "temp_sync_mcp"}
EXCLUDE_PILLARS = os.environ.get("EXCLUDE_PILLARS", "").split(",")
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}

def build_docs():
    print("?? Cleaning old docs...")
    if os.path.exists(DEST_DIR):
        shutil.rmtree(DEST_DIR)
    os.makedirs(DEST_DIR, exist_ok=True)
    
    print("?? Copying homepage...")
    if os.path.exists("README.md"):
        shutil.copy("README.md", os.path.join(DEST_DIR, "index.md"))
        
    print("?? Extracting READMEs and Images...")
    count = 0
    img_count = 0
    for root, dirs, files in os.walk(SOURCE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]
        
        rel_root = os.path.relpath(root, SOURCE_DIR)
        if rel_root == ".":
            continue
            
        # Check exclusion for takedown risk folders
        if any(p in rel_root for p in EXCLUDE_PILLARS if p):
            continue
            
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if file.lower() == "readme.md":
                dest_path = os.path.join(DEST_DIR, rel_root)
                os.makedirs(dest_path, exist_ok=True)
                src_file = os.path.join(root, file)
                dest_file = os.path.join(dest_path, "index.md")
                try:
                    with open(src_file, "rb") as f:
                        text = f.read().decode("utf-8", errors="replace")
                    with open(dest_file, "w", encoding="utf-8") as out:
                        out.write(text)
                    count += 1
                except:
                    pass
            elif ext in IMAGE_EXTS:
                dest_path = os.path.join(DEST_DIR, rel_root)
                os.makedirs(dest_path, exist_ok=True)
                src_file = os.path.join(root, file)
                dest_file = os.path.join(dest_path, file)
                try:
                    shutil.copy2(src_file, dest_file)
                    img_count += 1
                except:
                    pass
                
    print(f"? Extracted {count} documentation pages and {img_count} images!")

if __name__ == "__main__":
    build_docs()