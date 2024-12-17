# smart_calculator

# Add the files to the Git index
git add -A

The git add command is used to tell git which files to include in a commit, and the -A (or --all) argument means “include all”.

# Commit Added Files
git commit -m "Message"

The git commit command creates a new commit with all files that have been “added”. The -m (or --message) sets the message that will be included alongside the commit, used for future reference to understand the commit

# Push to GitHub
git push -u origin main

The -u (or --set-upstream) flag sets the remote origin as the upstream reference. This allows you to later perform git push and git pull commands without having to specify an origin since we always want GitHub in this case.

The -f (or --force) flag stands for force. This will automatically overwrite everything in the remote directory. We’re using it here to overwrite the default README that GitHub automatically initialized.
