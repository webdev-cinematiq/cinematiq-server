import express from 'express';
import CollectionRoutes from './controllers/collections/routes.js';
import CommentRoutes from './controllers/comments/routes.js';

const session = require('express-session');
const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://127.0.0.1:27017/cinematiq';
const CLIENT_URL = 'http://localhost:3000'; // TODO: update as needed
const PORT = process.env.PORT || 4000;

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Cinematiq!');
});

/* routes for each feature */
CollectionRoutes(app);
CommentRoutes(app);

process.on('SIGINT', () => {
  server.close();
  mongoose.disconnect();
  console.log('Server closed. Database instance disconnected');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
