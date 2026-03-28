# Local Development Scripts

These scripts help you work with local versions of dependencies during development while keeping GitHub Packages references in `package.json`.

## npm link for AssistantCommon

### Link Local Version (for development)

When you want to develop both `PromptRepository` and `AssistantCommon` together:

```bash
npm run link-local
```

**What this does:**
1. Creates a global npm link for `@jonverrier/assistant-common` from `../AssistantCommon`
2. Links that package into this project's `node_modules`
3. Changes in `../AssistantCommon` are immediately available without rebuilding

**Use when:**
- You're actively developing both packages
- You want instant feedback on AssistantCommon changes
- Testing changes before publishing

### Check Link Status

See if you're using local or GitHub package:

```bash
npm run link-status
```

**Output:**
- `✅ LINKED to local` - Using local AssistantCommon
- `📦 Using GitHub Package` - Using published version

### Unlink (restore GitHub package)

When you're done with local development:

```bash
npm run unlink-local
```

**What this does:**
1. Removes the local link
2. Reinstalls `@jonverrier/assistant-common` from GitHub Packages
3. Restores to the version specified in `package.json`

**Use when:**
- Finished development on both packages
- Ready to test with published versions
- **Before merging to main branch**
- **Before pushing to CI/CD**

## Branch Strategy

### Main Branch (Production)
- ✅ **Always unlinked** - Uses GitHub Packages only
- ✅ **Always buildable** - Works in CI/CD
- ✅ **Reproducible** - Same dependencies everywhere

### Development Branches
- 🔗 **Can use links** - For active development
- ✅ **Unlink before merging** - Ensure main stays clean

## Development Workflow

### Typical workflow when changing both packages:

```bash
# 1. Create/checkout development branch
git checkout -b feature/my-feature
# or
git checkout develop

# 2. Link local for development
npm run link-local

# 3. Make changes in ../AssistantCommon
cd ../AssistantCommon
# edit files...
npm run build  # if needed
cd ../PromptRepository

# 4. Changes are immediately available
npm run build
npm test

# 5. When ready to merge to main:
#    - Unlink first
npm run unlink-local

#    - Verify it works with published version
npm run build
npm test

#    - Commit and push
git commit -am "My changes"
git push

#    - Merge to main (which will use GitHub Packages)
```

### Pre-commit Checklist

**Before committing to main branch:**

```bash
# 1. Check link status
npm run link-status

# 2. If linked, unlink first
npm run unlink-local

# 3. Verify build works
npm run build
npm test

# 4. Commit
git commit -am "My changes"
```

## Enforcement Mechanisms

### Automatic Git Hooks (Recommended)

Install git hooks to automatically prevent committing/pushing to main with linked packages:

```bash
# One-time setup (run from repository root)
bash scripts/install-git-hooks.sh
```

This installs:
- **pre-commit hook**: Blocks commits to main if packages are linked
- **pre-push hook**: Blocks pushes to main if packages are linked

These hooks only run on `main`/`master` branches - development branches are unaffected.

### Manual Verification

Before merging to main, always verify:

```bash
npm run verify-main
```

This checks that:
- You're on main branch (if applicable)
- No packages are linked
- Packages are installed from GitHub Packages

### Manual Pre-commit/Pre-push Checks

You can also run the checks manually:

```bash
npm run pre-commit-check  # Check before committing
npm run pre-push-check   # Check before pushing
```

## Important Notes

⚠️ **The link is local only** - CI/CD always uses the GitHub package from `package.json`

⚠️ **Remember to unlink** - If you forget, your local builds work but CI/CD might fail if you haven't published AssistantCommon changes

✅ **package.json never changes** - The GitHub package reference stays clean, no merge conflicts

✅ **node_modules is gitignored** - Symlinks never get committed, so each branch can have different link states

✅ **Main branch discipline** - Always keep main unlinked to ensure it's always buildable

✅ **Enforcement** - Git hooks prevent accidentally committing/pushing to main with links

## Troubleshooting

**"Module not found" after linking:**
```bash
cd ../AssistantCommon
npm run build  # Build the package first
cd ../PromptRepository
npm run link-local
```

**Want to verify it's working:**
```bash
npm run link-status
ls -la node_modules/@jonverrier/assistant-common  # Should show symlink
```

**To reset everything:**
```bash
npm run unlink-local
rm -rf node_modules package-lock.json
npm install
```

**Check before merging to main:**
```bash
# Always verify main branch strategy
git checkout main
npm run link-status  # Should show "Using GitHub Package"
npm run build        # Should work
npm test            # Should pass
```

