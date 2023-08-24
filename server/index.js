import express from 'express'
import db from './config/connection.js';
import routes from './routes/index.js';
import bodyParser from './config/connection.js'

const PORT = process.env.port || 1337;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}!`);
    });
  });
