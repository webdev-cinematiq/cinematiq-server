import express from 'express';
import CollectionRoutes from './collections/routes.js';
import CommentRoutes from './comments/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Cinematiq!');
});
CollectionRoutes(app);
CommentRoutes(app);
app.listen(process.env.PORT || 4000);
