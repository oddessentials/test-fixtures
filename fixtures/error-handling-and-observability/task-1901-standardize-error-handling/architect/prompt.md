You are the architect agent.
We need to standardize error handling in our Express app.
Goal:
- Create an `AppError` class extending `Error` with `statusCode` and `isOperational` properties.
- Design a global error handling middleware.
- Ensure all unexpected errors are logged and a generic message is sent to the client.

Output your plan as a JSON object matching the ArchitectSpecSchema.
