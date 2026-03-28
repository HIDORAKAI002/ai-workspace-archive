import os
import shutil
import glob
import re

source_dir = r"c:\Users\josep\OneDrive\Desktop\ai_skills\sources"
target_dir = r"c:\Users\josep\OneDrive\Desktop\ai_skills\skills"

# 1. Clean up target dir completely
if os.path.exists(target_dir):
    print("🧹 Cleaning old flat skills directory...")
    shutil.rmtree(target_dir, ignore_errors=True)
os.makedirs(target_dir, exist_ok=True)

# 2. Advanced Multi-Level Taxonomy
taxonomy = {
    "development": {
        "frontend": ["react", "vue", "angular", "css", "html", "ui", "tailwind", "frontend", "web design"],
        "backend": ["python", "node", "java ", "c#", "go ", "api", "backend", "express", "django", "server"],
        "devops": ["docker", "aws", "azure", "ci/cd", "kubernetes", "terraform", "pipeline", "cloud", "serverless"],
        "database": ["sql", "postgres", "mongodb", "database", "mysql", "redis", "query", "nosql"],
        "security": ["security", "pentest", "vulnerability", "auth", "audit", "cyber", "iam", "owasp"],
        "mobile": ["ios", "android", "react native", "swift", "kotlin", "flutter"],
        "ai-ml": ["llm", "langchain", "pytorch", "openai", "prompt", "agent", "machine learning", "tensor", "claude"]
    },
    "productivity": {
        "writing": ["write", "email", "blog", "story", "copywriting", "doc", "draft", "article"],
        "planning": ["plan", "schedule", "task", "scrum", "agile", "breakdown", "todo", "calendar"],
        "analysis": ["analyze", "data ", "report", "viz", "business analyst", "chart", "metrics"],
        "finance": ["cost", "budget", "finance", "trading", "crypto", "economy", "money", "price"],
        "communication": ["meeting", "presentation", "hr ", "support", "talk", "speaker", "interview"]
    },
    "creative": {
        "design": ["figma", "canvas", "3d ", "ux", "logo", "color", "graphic", "layout"],
        "marketing": ["seo", "ad ", "brand", "social media", "market", "campaign", "tweet"],
        "multimedia": ["video", "audio", "music", "art ", "generate", "image", "sound"]
    }
}

# Create deep directories
for domain, subdomains in taxonomy.items():
    for sub in subdomains.keys():
        os.makedirs(os.path.join(target_dir, domain, sub), exist_ok=True)
os.makedirs(os.path.join(target_dir, "other", "uncategorized"), exist_ok=True)

def deep_categorize(name, content):
    text = (name + " " + content).lower()
    for domain, subdomains in taxonomy.items():
        for sub, keywords in subdomains.items():
            if any(k in text for k in keywords):
                return os.path.join(domain, sub)
    return os.path.join("other", "uncategorized")

template = """---
name: "{name}"
source_repo: "{repo}"
category: "{category}"
---

# {name}

{content}
"""

count = 0
print(f"🚀 Started parsing {source_dir}...")

for root, dirs, files in os.walk(source_dir):
    for file in files:
        if file.endswith(".md") and file.lower() not in ["readme.md", "README", "license.md", "contributing.md", "catalog.md", "security.md", "third_party_notices.md", "code_of_conduct.md"]:
            file_path = os.path.join(root, file)
            # Find which repo this file came from
            rel_path = os.path.relpath(file_path, source_dir)
            repo_name = rel_path.split(os.sep)[0]
            
            # Extract folder name as skill name
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
                
            # Run Deep Categorization
            cat_path = deep_categorize(skill_name, content)
            
            safe_name = "".join(c for c in skill_name if c.isalnum() or c in ("-", "_")).strip()
            if not safe_name:
                safe_name = f"skill_{count}"
                
            # Generate the file name
            target_file_name = f"{safe_name}_{repo_name}.md"
            target_path = os.path.join(target_dir, cat_path, target_file_name)
            
            idx = 1
            while os.path.exists(target_path):
                target_path = os.path.join(target_dir, cat_path, f"{safe_name}_{repo_name}_{idx}.md")
                idx += 1
            
            formatted = template.format(name=skill_name, repo=repo_name, category=cat_path.replace("\\", "/"), content=content)
                
            try:
                with open(target_path, "w", encoding="utf-8") as f:
                    f.write(formatted)
                count += 1
            except Exception as e:
                print(f"Failed to process {file_path}: {e}")

print(f"✅ Successfully extracted, and deeply-categorized {count} skills!")
