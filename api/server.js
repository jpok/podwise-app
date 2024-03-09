require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = process.env.OPENAI_API_KEY;

app.post('/generate-podcast', async (req, res) => {
    try {
        const { data } = await axios.post(openaiEndpoint, {
            model: "gpt-3.5-turbo",
            messages: req.body.messages
        }, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
