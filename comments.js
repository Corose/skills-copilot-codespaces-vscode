//Create Web Server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('comments.json'));
    const newComment = req.body;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send('Comment added');
});

// Get all comments
app.get('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('comments.json'));
    res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('comments.json'));
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === id);
    res.send(comment);
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('comments.json'));
    const id = req.params.id;
    const updatedComment = req.body;
    const index = comments.findIndex(comment => comment.id === id);
    comments[index] = updatedComment;
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send('Comment updated');
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('comments.json'));
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send('Comment deleted');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
//Create a new file named comments.json
fs.writeFileSync('comments.json', '[]');
//Run the server
//Open Postman and send a POST request to http://localhost:3000/comments with a JSON body
//Open Postman and send a GET request to http://localhost:3000/comments
//Open Postman and send a GET request to http://localhost:3000/comments/1
//Open Postman and send a PUT request to http://localhost:3000/comments/1 with a JSON body
//Open Postman and