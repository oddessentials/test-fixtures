import { Router } from 'express';

const router = Router();

router.get('/system-stats', (req, res) => {
    // TODO: Add role check
    res.json({
        uptime: process.uptime(),
        cpuUsage: process.cpuUsage()
    });
});

export default router;
