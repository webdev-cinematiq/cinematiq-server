// import CommentRoutes from './controllers/commentRoutes.js';

import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import mongoose from 'mongoose';
import CollectionRoutes from './Collections/routes.js';
import MovieRoutes from './Movies/routes.js';
import GenreRoutes from './Genres/routes.js';
import UserRoutes from './Users/routes.js';
import CommentRoutes from './Comments/routes.js';
import ReviewRoutes from './Reviews/routes.js';
import CriticRoutes from './Critics/routes.js';

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/cinematiq';

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB', CONNECTION_STRING))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const app = express();

// TODO: uncomment to start implementing sessions

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.NETLIFY_URL || 'http://localhost:3000',
//   })
// );
// app.use(express.json());

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || 'kanbas',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     httpOnly: true,
//   },
// };

// if (process.env.NODE_ENV !== 'development') {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
// }

// app.use(session(sessionOptions));

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Cinematiq!');
});

/* routes for each feature */
GenreRoutes(app);
MovieRoutes(app);
CollectionRoutes(app);
CommentRoutes(app);
ReviewRoutes(app);
UserRoutes(app);
CriticRoutes(app);

process.on('SIGINT', () => {
  server.close();
  mongoose.disconnect();
  console.log('Server closed. Database instance disconnected');
  process.exit(0);
});

app.listen(process.env.PORT || 4000);
