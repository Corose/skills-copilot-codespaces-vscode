// Create web server
// Create new comments
// Read all comments
// Read one comment
// Update one comment
// Delete one comment
// Export router

// Load express
const express = require('express');
const router = express.Router();

// Load data
const data = require('../data');
const commentsData = data.comments;

// Load error
const errors = require('../errors');

// Load middleware
const middleware = require('../middleware');

// GET /comments
router.get('/', middleware.auth, async (req, res) => {
    try {
        const commentsList = await commentsData.getAllComments();
        res.status(200).json(commentsList);
    } catch (e) {
        res.status(500).json({ error: errors.internalError });
    }
});

// GET /comments/:id
router.get('/:id', middleware.auth, async (req, res) => {
    try {
        const comment = await commentsData.getCommentById(req.params.id);
        res.status(200).json(comment);
    } catch (e) {
        res.status(404).json({ error: errors.commentNotFound });
    }
});

// POST /comments
router.post('/', middleware.auth, async (req, res) => {
    const commentInfo = req.body;
    if (!commentInfo) {
        res.status(400).json({ error: errors.commentNotProvided });
        return;
    }
    if (!commentInfo.poster) {
        res.status(400).json({ error: errors.posterNotProvided });
        return;
    }
    if (!commentInfo.comment) {
        res.status(400).json({ error: errors.commentNotProvided });
        return;
    }
    try {
        const newComment = await commentsData.addComment(
            commentInfo.poster,
            commentInfo.comment
        );
        res.status(200).json(newComment);
    } catch (e) {
        res.status(500).json({ error: errors.internalError });
    }
});

// PUT /comments/:id
router.put('/:id', middleware.auth, async (req, res) => {
    const updatedData = req.body;
    if (!updatedData) {
        res.status(400).json({ error: errors.commentNotProvided });
        return;
    }
    try {
        await commentsData.getCommentById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: errors.commentNotFound });
        return;
    }});