import express, { Router } from 'express';
import History from '../models/History';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { Response } from 'express';

const router: Router = express.Router();

// Get all history
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 50, skip = 0 } = req.query;
    const history = await History.find({ userId: req.userId })
      .sort({ visitedAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));
    
    const total = await History.countDocuments({ userId: req.userId });
    res.json({ history, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add to history
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { url, title, description, favicon } = req.body;
    
    const history = new History({
      userId: req.userId,
      url,
      title,
      description,
      favicon,
      visitedAt: new Date()
    });

    await history.save();
    res.status(201).json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete history item
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await History.findByIdAndDelete(id);
    res.json({ message: 'History item deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Clear all history
router.delete('/clear/all', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await History.deleteMany({ userId: req.userId });
    res.json({ message: 'All history cleared' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
