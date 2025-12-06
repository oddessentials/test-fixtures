You are a tech lead planning a refactor.

## Context
Architect's Summary: "Refactor `getData` in `src/api.js` to use `async/await` syntax instead of `.then()` chains."

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
Plan the refactoring.
