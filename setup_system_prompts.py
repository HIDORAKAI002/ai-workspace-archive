import os
import json
import subprocess
import shutil

root_dir = r"C:\Users\josep\OneDrive\Desktop\ai_skills"
json_path = os.path.join(root_dir, "all_system_prompts_repos.json")
output_dir = os.path.join(root_dir, "system_prompts")

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    if not os.path.exists(json_path):
        print(f"Error: Could not find {json_path}")
        return

    data = load_json(json_path)
    os.makedirs(output_dir, exist_ok=True)
    
    cloned_count = 0
    failed_count = 0

    print("🤖 Starting System Prompts Archive Pipeline...")

    for category, repos in data.items():
        category_dir = os.path.join(output_dir, category)
        os.makedirs(category_dir, exist_ok=True)

        for repo in repos:
            name = repo.get("name", "unknown")
            url = repo.get("url", "")
            
            # Subdir handling for folder name
            folder_name = name.split("/")[-1] if "/" in name else name
            folder_name = "".join(c for c in folder_name if c.isalnum() or c in ("-", "_")).strip()
            
            dest_dir = os.path.join(category_dir, folder_name)
            
            if os.path.exists(dest_dir):
                continue
                
            # Direct websites (not github repos like simonwillison.net) will fail git clone.
            # Convert them to simple markdown links
            if "github.com" not in url:
                print(f"⏭️ Skipping direct URL clone for {name}. Creating link instead...")
                link_file = dest_dir + "_link.md"
                with open(link_file, "w", encoding="utf-8") as f:
                    f.write(f"# {name}\n\n- **URL:** {url}\n- **Description:** {repo.get('description', '')}\n\n*This is an official web link, not a repository. Click to open in browser.*")
                cloned_count += 1
                continue

            print(f"📥 Downloading latest system prompts from {name}...")
            try:
                result = subprocess.run(
                    ["git", "clone", "--depth", "1", "--quiet", url, dest_dir],
                    cwd=category_dir,
                    capture_output=True,
                    text=True
                )
                
                if result.returncode == 0:
                    cloned_count += 1
                else:
                    print(f"❌ Failed to clone {name}: {result.stderr.strip()}")
                    failed_count += 1
            except Exception as e:
                print(f"Crash while cloning {name}: {e}")
                failed_count += 1

    print("\n✅ System Prompts Integration Complete!")
    print(f"Total Successfully Processed: {cloned_count}")
    print(f"Total Failed: {failed_count}")

if __name__ == "__main__":
    main()
