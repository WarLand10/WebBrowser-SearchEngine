import express, { Router, Request, Response } from 'express';
import axios from 'axios';

const router: Router = express.Router();

const SEARCH_ENGINE_URL = process.env.SEARCH_ENGINE_URL || 'http://localhost:8000';

// Search
router.get('/', async (req: Request, res: Response) => {
  try {
    const { q, page = 1 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Forward search to Python search engine
    const response = await axios.get(`${SEARCH_ENGINE_URL}/search`, {
      params: { q, page }
    });

    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get suggestions
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const response = await axios.get(`${SEARCH_ENGINE_URL}/suggestions`, {
      params: { q }
    });

    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
