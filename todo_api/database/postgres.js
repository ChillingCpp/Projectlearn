import {Pool} from "pg"
import dotenv from 'dotenv';
import { test } from "vitest";

dotenv.config();

const product_db = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),  
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};
const test_db = {
    host: process.env.DB_TEST_HOST,
    port: Number(process.env.DB_TEST_PORT),  
    database: process.env.DB_TEST_NAME,
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
};
export const pool = new Pool(
    process.env.NODE_ENV === 'test' ? test_db : product_db
);
