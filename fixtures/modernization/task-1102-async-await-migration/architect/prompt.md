You are a senior software architect.

## Context
We are migrating our async code from Promise chains to `async/await` for better readability.
Target specific functions in `src/api.js`.

## Files
`src/api.js`:
```js
function getData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
```

## Task
Describe the refactoring of `getData` to use `async/await`.
Preserve error handling semantics.
