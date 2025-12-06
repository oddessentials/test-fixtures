You are a senior developer.

## Task
Implement the React 18 upgrade and migration.
1. Update `package.json` dependencies for `react` and `react-dom` to `^18.0.0`.
2. Update `src/index.js` to use `ReactDOM.createRoot` instead of `ReactDOM.render`.

## Files
`package.json`:
```json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

`src/index.js`:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Constraints
- Return a unified diff.
