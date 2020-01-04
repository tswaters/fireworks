# Releases

The `dist` directory is not version controlled in master branch... use `--work-tree` flag in git to trick it into adding the `dist` directory at the root of a given branch (dist or gh-pages). Tags are made against `dist` branch so bower can pick them up.

## dist branch

This is the directory that is published to npm and by way of the tags, bower. In addition to the `dist` directory, the following files are included:

- CHANGES.MD
- LICENSE
- README.MD
- package.json
- bower.json

Note - Can't run `npm version` due to dirty worktree - so manually create the tags, increment package.json and package-lock.json... with that done, `npm publish` as normal.

```sh

#always
npm run build

# initial
git --work-tree "dist" checkout --orphan dist
git --work-tree "dist" add --all
git --work-tree "dist" commit -m "Initial"
git add package.json bower.json README.MD CHANGES.MD LICENSE.MD
git commit --amend
git tag v0.0.0
git push -u origin dist
git reset HEAD fireworks.js fireworks.min.js
npm pack # make sure it's OK
npm publish

# incremental
git checkout dist && git pull && git checkout master # ya never know; better this than divergent branches!
git symbolic-ref HEAD refs/heads/dist
git --work-tree "dist" reset --mixed --quiet
git --work-tree "dist" add --all
git add package.json bower.json README.MD CHANGES.MD LICENSE
git commit -m "Release 0.0.x"
git tag v0.0.x
git push --tags
git checkout fireworks.js fireworks.min.js fireworks.node.js fireworks.mjs # so they show up in filesystem
npm pack # make sure it's OK
npm publish

# go back
git symbolic-ref HEAD refs/heads/master
git reset --mixed
rm fireworks.js fireworks.min.js fireworks.node.js fireworks.mjs

```

## gh-pages branch

This is for the live example. Similar to `dist` branch, but without package/bower/md files and with `gh-pages/index.html`.

```sh

# initial
cp gh-pages/index.html dist/index.html
git --work-tree "dist" checkout --orphan gh-pages
git --work-tree "dist" add --all
git commit -m "Initial gh-pages"
git push -u origin gh-pages

# incremental
cp gh-pages/index.html dist/index.html
git symbolic-ref HEAD refs/heads/gh-pages
git --work-tree "dist" reset --mixed --quiet
git --work-tree "dist" add --all
git commit -m "Latest changes"
git push

# go back
git symbolic-ref HEAD refs/heads/master
git reset --mixed
rm fireworks.js fireworks.min.js
```
