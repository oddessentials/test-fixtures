You are a tech lead planning a major React upgrade.

## Context
Architect's Summary: "Upgrade React and ReactDOM to version 18. Replace legacy `ReactDOM.render` with `ReactDOM.createRoot` in `src/index.js`."

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

## Task
Create a plan to implement these changes.
