You are a senior developer.

## Task
Refactor `getData` in `src/api.js` to use `async/await`.

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

## Constraints
- Return a unified diff.
