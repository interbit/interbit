
# `start`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content. Unfinished feature.</p>
</div>

Start the Developer mode hypervisor. It will:

start an interbit hypervisor in dev mode
watch the files in your src/interbit/ folder except for config and manifest
deploy covenants to chains using direct file loading so that debugger breakpoints work in covenant reducers
If you change and save your covenant a watcher will bundle and redeploy it. (TODO)

#### Arguments

None

#### Example

```js
interbit start
```
