import express from 'express';
const router = express.Router();

// csrfトークン取得
router.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
