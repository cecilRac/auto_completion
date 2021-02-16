const express = require('express');
const cors = require('cors');
// core module for handling dictionary operations
const { get_suggestions, load_dictionary } = require('./core/dictionary');

load_dictionary('./src/keywords.txt');
const app = express();
app.use(cors());

app.get('/:q', async (req, res) => {
    const { q } = req.params;
    let suggestions = []
    if (q === ' ' || !q || q === '') return res.json({suggestions})
    suggestions = await get_suggestions(q)
    return res.json({suggestions})
});

app.listen(3000, () => console.log('auto complete server running on 3000'));

