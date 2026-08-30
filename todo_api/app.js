import http from "node:http";
import express from "express"
import authRouter from './routes/auth.routes.js';
import {pool} from './database/postgres.js';
import todoRouter from './routes/todo.routes.js';
import session from './session/auth.session.js'
import { errorHandler } from "./error/error.js";


await pool.query('SELECT 1');
const app = express();

app.use(express.json());
app.use(session);
app.use('/auth', authRouter);
app.use('/todo', todoRouter);


app.use(errorHandler);

export default app;
/// http://localhost:3000
