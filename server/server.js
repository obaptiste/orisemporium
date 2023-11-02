const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const Shopify = require('shopify-api-node');


app.use(express.json());

const shopify = new Shopify({
    shopName: 'your-shop-name',
    apiKey: 'your-api-key',
    password: 'XXXXXXXXXXXXX',
    autoLimit: true
});

app.post('/openai', async(req, res) => {

  try{
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: req.body.prompt,
      model: 'text-davinci-003',
      max_tokens: 100,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    res.json(response.data);
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
});

