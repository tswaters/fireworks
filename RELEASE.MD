# Releases

Publishes to npm occur from the `dist` directory.

`gh-pages` is used for publishing to https://tswaters.github.io/fireworks

## Initial setup

```
npx rimraf dist gh-pages

# if these are already setup?
# git worktree remove gh-pages
# git worktree remove dist

git branch -D gh-pages dist
git worktree add --track -b gh-pages gh-pages origin/gh-pages
git worktree add --track -b dist dist origin/dist
```

## Doing a release

```
# update package/package-lock with latest version
# populate CHANGES.MD with latest version
# git commit -m "Release v0.0.0"
npm run build  # will send artifacts to both dist/gh-pages
cd dist
git add . --all
git commit -am "Release v0.0.0"
git push
cd ../gh-pages
git add . --all
git commit -am "Release v0.0.0"
git push
```
