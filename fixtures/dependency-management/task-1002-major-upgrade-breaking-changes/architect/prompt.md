You are a senior software architect.

## Context
We need to upgrade our frontend application from React 17 to React 18.
This is a major upgrade with breaking changes, specifically the new Root API for rendering.

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
Describe the necessary changes to upgrade to React 18 and switch to the new Root API.
Do NOT change any application features, only the migration.
