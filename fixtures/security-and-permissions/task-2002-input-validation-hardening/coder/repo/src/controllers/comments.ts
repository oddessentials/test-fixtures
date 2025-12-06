import { Request, Response } from 'express';

export const createComment = (req: Request, res: Response) => {
    const { content } = req.body;

    // Save to DB (mocked)
    console.log('Saving comment:', content);

    res.status(201).json({ success: true, content });
};
