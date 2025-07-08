import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for form schema
let formSchema: any = {};

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/forms', (req, res) => {
  try {
    res.json(formSchema);
  } catch (err) {
    console.error('Error fetching form schema:', err);
    res.status(500).json({ error: 'Failed to fetch form schema' });
  }
});

app.post('/forms', (req, res) => {
  try {
    formSchema = req.body;
    res.json({ message: 'Saved successfully' });
  } catch (err) {
    console.error('Error saving form schema:', err);
    res.status(500).json({ error: 'Failed to save form schema' });
  }
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3001, () => console.log('🟢 Backend running at http://localhost:3001'));
