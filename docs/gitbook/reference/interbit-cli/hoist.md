
# `hoist`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content. Unfinished feature.</p>
</div>

Hoists an application


// TODO: Make it actually work with lerna (Probably going to have to split it into pre+postinstall)

Installs your covenant and app dependencies into the node_modules folder of your application.

This can optionally be used as a preinstall hook on your application to ensure that your covenant's dependencies are included in your application bundle.

--install-dir can be used if you are running in a monorepo.

hoist works by

creating a copy of your package.json
moving any dependencies from your covenants into the copy that aren't included
warning you about any covenant dependencies that do not match your apps
running npm i in the app directory (or in --install-dir)
deleting the temporary package.json and restoring your original.

Note: Mismatched dependencies may cause strange behaviour if any covenant code that uses those dependencies is called in your application


#### Arguments

1. `install-dir` *(Folderpath)*: npm install directory


#### Example

```js
interbit hoist --install-dir [npm install directory]
```



