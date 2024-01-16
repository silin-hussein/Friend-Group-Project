const express = require('express');
const router = express.Router();
const fs = require('fs').promises; // Import fs.promises to use async file operation

router.get('/', async (req, res, next) => {
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

router.post('/add', async (req, res) => {
    try {
        const data = await fs.readFile('./messages.json', 'utf8');
        const messages = JSON.parse(data);

        console.log(req.body);

        messages.messages.push(req.body);

        await fs.writeFile('./messages.json', JSON.stringify(messages, null, 2));
        
        res.json({ 
            message: 'Message added successfully',
            messages
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error adding message!'
        });

        console.log(error);
    }
});

/*router.post('/remove/:id', async (req, res) => {
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
});*/

// (Optional/Extra)
/*router.patch('/update/:id', async (req, res) => {
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
});*/

module.exports = router;