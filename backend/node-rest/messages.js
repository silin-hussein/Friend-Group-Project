const express = require('express');
const router = express.Router();
const fs = require('fs').promises; // Import fs.promises to use async file operations

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /messages"
    });
});

router.get('/messages', async (req, res) => {
    try {
        const data = await fs.readFile('./messages.json', 'utf8');
        const messages = JSON.parse(data);
        res.json(messages);
    } catch (error) {
        res.status(500).json({
            error: 'Error reading messages from file!'
        });
    }
});

router.post('/messages/add', async (req, res) => {
    try {
        const data = await fs.readFile('./messages.json', 'utf8');
        const messages = JSON.parse(data);

        const newMessage = req.body.message;
        messages.push(newMessage);

        await fs.writeFile('./messages.json', JSON.stringify(messages, null, 2));
        res.json({ 
            message: 'Message added successfully',
            messages
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error adding message!' 
        });
    }
});

router.post('/messages/remove/:id', async (req, res) => {
    try {
        const messageId = req.params.id;
        const data = await fs.readFile('./messages.json', 'utf8');
        let messages = JSON.parse(data);

        messages = messages.filter((msg, index) => index != messageId);

        await fs.writeFile('./messages.json', JSON.stringify(messages, null, 2));
        res.json({ 
            message: 'Message removed successfully',
            messages
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error removing message!' 
        });
    }
});

// (Optional/Extra)
router.patch('/messages/update/:id', async (req, res) => {
    try {
        const messageId = req.params.id;
        const data = await fs.readFile('./messages.json', 'utf8');
        let messages = JSON.parse(data);

        const updatedMessage = req.body.message;
        messages[messageId] = updatedMessage;

        await fs.writeFile('./messages.json', JSON.stringify(messages, null, 2));
        res.json({ 
            message: 'Message updated successfully', messages 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error updating message!' 
        });
    }
});

module.exports = router;