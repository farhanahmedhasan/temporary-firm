import fs from 'fs';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 8000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');

app.get('/api', (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } catch (error) {
    res.end(`Error: ${error.message}`);
  }
});

app.get('/api/product/:id', async (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const productId = Number(req.params.id);
    const parsedData = await JSON.parse(data);
    const product = parsedData.find((product) => product.id === productId);

    res.end(product);
  } catch (error) {
    res.end(`Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
