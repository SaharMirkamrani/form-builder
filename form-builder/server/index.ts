import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storePath = path.join(__dirname, 'schemaStore.json');

app.get('/api/forms', (req, res) => {
  const data = fs.existsSync(storePath) ? fs.readFileSync(storePath, 'utf8') : '{}';
  res.json(JSON.parse(data));
});

app.post('/api/forms', (req, res) => {
  fs.writeFileSync(storePath, JSON.stringify(req.body, null, 2));
  res.json({ message: 'Saved successfully' });
});

app.listen(3001, () => console.log('🟢 Backend running at http://localhost:3001'));
