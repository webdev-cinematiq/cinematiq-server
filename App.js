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
import AdminRoutes from './Admins/routes.js';
import usersModel from "./Users/model.js";


const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/cinematiq';

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// const userData = await usersModel.find({});
// console.log('All data in the user database:');
// console.log(JSON.stringify(userData, null, 2));

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000' || process.env.NETLIFY_URL,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "cinematiq",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Cinematiq!'); // TODO: implement landing page
});

GenreRoutes(app);
MovieRoutes(app);
CollectionRoutes(app);
CommentRoutes(app);
ReviewRoutes(app);
UserRoutes(app);
CriticRoutes(app);
AdminRoutes(app);

process.on('SIGINT', () => {
  server.close();
  mongoose.disconnect();
  console.log('Server closed. Database instance disconnected');
  process.exit(0);
});

app.listen(process.env.PORT || 4000);
