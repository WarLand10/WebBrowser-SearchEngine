import express, { Router } from 'express';
import Bookmark from '../models/Bookmark';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { Response } from 'express';

const router: Router = express.Router();

// Get all bookmarks
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { folder } = req.query;
    const query: any = { userId: req.userId };
    if (folder) query.folder = folder;

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create bookmark
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { url, title, description, favicon, folder, tags } = req.body;
    
    const bookmark = new Bookmark({
      userId: req.userId,
      url,
      title,
      description,
      favicon,
      folder: folder || 'General',
      tags: tags || []
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update bookmark
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const bookmark = await Bookmark.findByIdAndUpdate(id, updates, { new: true });
    res.json(bookmark);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete bookmark
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Bookmark.findByIdAndDelete(id);
    res.json({ message: 'Bookmark deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
