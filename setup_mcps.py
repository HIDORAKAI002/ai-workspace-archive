import os
import json
import subprocess
import shutil

root_dir = r"C:\Users\josep\OneDrive\Desktop\ai_skills"
json_path = os.path.join(root_dir, "all_mcp_servers.json")
mcps_dir = os.path.join(root_dir, "mcps")

# The ultra-massive repos we want to avoid cloning
massive_repos = ["langchain", "crewai", "llama_index", "crewAI", "langchain-ai", "run-llama"]

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def is_massive(name, url):
    name_lower = name.lower()
    url_lower = url.lower()
    return any(m.lower() in name_lower or m.lower() in url_lower for m in massive_repos)

def is_subdirectory_url(url):
    return "/tree/" in url or "/blob/" in url

def main():
    if not os.path.exists(json_path):
        print(f"Error: Could not find {json_path}")
        return

    data = load_json(json_path)
    os.makedirs(mcps_dir, exist_ok=True)
    
    cloned_count = 0
    linked_count = 0
    failed_count = 0

    print("🤖 Starting massive MCP server cloning pipeline...")

    for category, repos in data.items():
        category_dir = os.path.join(mcps_dir, category)
        os.makedirs(category_dir, exist_ok=True)

        for repo in repos:
            name = repo.get("name", "unknown")
            url = repo.get("url", "")
            desc = repo.get("description", "")
            
            # Use the part after the slash as the folder name
            folder_name = name.split("/")[-1] if "/" in name else name
            # Make it safe for Windows
            folder_name = "".join(c for c in folder_name if c.isalnum() or c in ("-", "_")).strip()
            
            dest_dir = os.path.join(category_dir, folder_name)
            
            link_file_path = dest_dir + "_link.md"
            
            # If it's already cloned or linked, skip
            if os.path.exists(dest_dir) or os.path.exists(link_file_path):
                continue

            # Check if it's massive or a subdirectory link
            if is_massive(name, url) or is_subdirectory_url(url):
                print(f"⏭️ Skipping clone for {name} (Massive or Subdirectory). Creating link instead...")
                with open(link_file_path, "w", encoding="utf-8") as f:
                    f.write(f"# {name}\n\n**Note:** This repository was excluded from full clone because it is ultra-massive or is a subdirectory inside a monorepo.\n\n- **URL:** {url}\n- **Description:** {desc}\n\n*Click the URL to access the source.*")
                linked_count += 1
                continue

            # Standard Git shallow clone
            print(f"📥 Cloning {name}...")
            try:
                # `git clone --depth 1 <url> <dest>`
                # We use --quiet to avoid huge terminal spam
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
                    with open(link_file_path, "w", encoding="utf-8") as f:
                        f.write(f"# {name}\n\n**Error:** Git clone failed.\n\n- **URL:** {url}\n- **Error Log:** {result.stderr.strip()}")
                    failed_count += 1
            except Exception as e:
                print(f"Crash while cloning {name}: {e}")
                failed_count += 1

    print("\n✅ Cloning Pipeline Complete!")
    print(f"Total Cloned: {cloned_count}")
    print(f"Total Linked (Massive/Subdirs): {linked_count}")
    print(f"Total Failed: {failed_count}")

if __name__ == "__main__":
    main()
