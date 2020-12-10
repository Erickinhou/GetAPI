import express from 'express';
import fs from 'fs';
import axios from 'axios';
const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
  fs.readFile('./public/Text.json', async (err, data) => {
    if (!data) await callApi();
    else {
      console.log('lido com sucesso');
      const JsonData = JSON.parse(data);
      return res.json(JsonData);
    }
  });
  async function callApi() {
    const dataApi = await axios.get(
      'https://jsonplaceholder.typicode.com/comments'
    );
    fs.writeFile(
      './public/Text.json',
      JSON.stringify(dataApi.data),
      { flag: 'wx' },
      (err, data) => {
        if (err) {
          console.log('houve um error');
          return res.json('houve um erro');
        }
        console.log('Json salvo');
        return res.json(dataApi.data);
      }
    );
  }
});
export default app;
