# Branch Protection Recommendations

To prevent future force push incidents, configure these GitHub settings:

## For `main` branch:

1. Go to Settings → Branches
2. Add rule for `main`
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Include administrators
   - ✅ Restrict who can push to matching branches
   - ✅ Restrict force pushes
   - ✅ Restrict deletions

## Git Configuration:

```bash
# Use force-with-lease instead of force
git config --global alias.pushf "push --force-with-lease"

# Prevent accidental force pushes
git config --global push.default simple
git config --global receive.denyNonFastForwards true
```

## Best Practices:

1. Always create a backup branch before major changes
2. Use `--force-with-lease` instead of `--force`
3. Enable branch protection on important branches
4. Regular backups to secondary remotes

---

*Prevent future git history loss with these protections*