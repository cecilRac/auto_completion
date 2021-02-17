import * as express from 'express';
import * as cors from 'cors';

// core module for handling dictionary operations
import { get_suggestions, load_dictionary } from './core/dictionary';

load_dictionary('./src/keywords.txt');
const app = express();
app.use(cors());

app.get('/:q', async (req: express.Request, res: express.Response): Promise <any> => {
    const { q } = req.params;
    let suggestions = []
    if (q === ' ' || !q || q === '') return res.json({suggestions})
    suggestions = await get_suggestions(q)
    return res.json({suggestions})
});

app.listen(3000, () => console.log('auto complete server running on 3000'));

