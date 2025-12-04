// src/server.ts
import express from 'express';

const app = express();
app.use(express.json());

// TODO: Add health endpoint here

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
