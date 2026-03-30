#!/usr/bin/env python3
import os
import sys
import argparse

def simple_search(query, directory):
    # Searchable extensions across the 180,000+ file archive
    target_exts = {'.md', '.yaml', '.yml', '.json', '.txt', '.cursorrules', '.clinerules', '.ts', '.py'}
    target_dirs = {'ai_skills', 'ide_rules', 'mcps', 'system_prompts'}
    
    print(f"\n🔍 Searching for '{query}' in {directory}...\n")
    matches = []
    
    for root, dirs, files in os.walk(directory):
        # Ignore git, cache, and automation dirs
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('_archive', '_tmp', 'vps_pushing2', 'node_modules')]
        
        # Only search deep into approved pillar directories if we are at root
        if root == directory:
            dirs[:] = [d for d in dirs if d in target_dirs]

        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in target_exts or file.endswith('rules'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        for i, line in enumerate(lines, 1):
                            if query.lower() in line.lower():
                                matches.append((filepath, i, line.strip()))
                except Exception:
                    pass

    if not matches:
        print(f"❌ No matches found for '{query}'.")
        return

    # Group matches by file
    grouped = {}
    for fp, line_num, snippet in matches:
        rel_path = os.path.relpath(fp, directory)
        if rel_path not in grouped:
            grouped[rel_path] = []
        grouped[rel_path].append((line_num, snippet))

    print(f"✅ Found {len(matches)} matches across {len(grouped)} files:\n")
    for file, lines in grouped.items():
        print(f"📁 \033[94m{file}\033[0m")
        for num, snip in lines[:3]: # limit to 3 snippets per file
            clean_snip = snip[:100] + '...' if len(snip) > 100 else snip
            print(f"   Line {num}: \033[36m{clean_snip}\033[0m")
        if len(lines) > 3:
            print(f"   ... and {len(lines) - 3} more matches")
        print()

def main():
    parser = argparse.ArgumentParser(description="AI Workspace Archive Search Tool")
    parser.add_argument("query", help="The keyword or phrase to search for")
    parser.add_argument("--dir", default=os.getcwd(), help="Directory to search (default: current)")
    args = parser.parse_args()
    
    simple_search(args.query, args.dir)

if __name__ == "__main__":
    main()
