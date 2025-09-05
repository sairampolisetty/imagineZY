import express from 'express';
const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024`;
    const response = await fetch(apiUrl);
    const arrayBuffer = await response.arrayBuffer(); // Node 18+ syntax
    const imageBase64 = Buffer.from(arrayBuffer).toString('base64');
    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Something went wrong' }); // Always return JSON!
  }
});

export default router;
