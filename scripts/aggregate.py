import os
import shutil
import glob
import re

source_dir = r"c:\Users\josep\OneDrive\Desktop\ai_skills\sources"
target_dir = r"c:\Users\josep\OneDrive\Desktop\ai_skills\skills"

# Ensure target directories exist
categories = ["development", "productivity", "creative", "other"]
for cat in categories:
    os.makedirs(os.path.join(target_dir, cat), exist_ok=True)

def categorize(name, content):
    content_lower = content.lower()
    if any(k in content_lower for k in ["code", "python", "javascript", "react", "bug", "deploy", "sql", "api", "git", "backend", "frontend", "aws", "docker"]):
        return "development"
    elif any(k in content_lower for k in ["write", "email", "blog", "story", "generate", "art", "music", "design", "creative", "seo", "ui", "ux"]):
        return "creative"
    elif any(k in content_lower for k in ["plan", "schedule", "summarize", "analyze", "data", "report", "productivity", "task"]):
        return "productivity"
    return "other"

template = """---
name: "{name}"
source_repo: "{repo}"
category: "{category}"
---

# {name}

> Source: {repo}

{content}
"""

count = 0

for root, dirs, files in os.walk(source_dir):
    for file in files:
        if file.endswith(".md") and file.lower() not in ["readme.md", "README", "license.md", "contributing.md", "catalog.md", "security.md", "third_party_notices.md", "code_of_conduct.md"]:
            file_path = os.path.join(root, file)
            # Find which repo this file came from
            rel_path = os.path.relpath(file_path, source_dir)
            repo_name = rel_path.split(os.sep)[0]
            
            # Extract folder name as skill name, unless it's just 'skills' or the repo name
            parent_dir = os.path.basename(os.path.dirname(file_path))
            if parent_dir == repo_name or parent_dir.lower() in ["skills", "src", "docs", "templates"]:
                skill_name = os.path.splitext(file)[0]
            else:
                skill_name = parent_dir
                
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception:
                continue
                
            cat = categorize(skill_name, content)
            
            # Formulate safe file name
            safe_name = "".join(c for c in skill_name if c.isalnum() or c in ("-", "_")).strip()
            if not safe_name:
                safe_name = f"skill_{count}"
                
            target_file_name = f"{safe_name}_{repo_name}.md"
            target_path = os.path.join(target_dir, cat, target_file_name)
            
            # Avoid overwriting identically named skills if they exist by appending index
            idx = 1
            while os.path.exists(target_path):
                target_path = os.path.join(target_dir, cat, f"{safe_name}_{repo_name}_{idx}.md")
                idx += 1
            
            formatted = template.format(name=skill_name, repo=repo_name, category=cat, content=content)
                
            try:
                with open(target_path, "w", encoding="utf-8") as f:
                    f.write(formatted)
                count += 1
            except Exception as e:
                print(f"Failed to process {file_path}: {e}")

print(f"Successfully extracted, formatted, and categorized {count} skills!")
