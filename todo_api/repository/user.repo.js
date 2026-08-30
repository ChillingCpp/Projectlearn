import fs from "node:fs/promises"
import {pool} from "../database/postgres.js"


// async function findAll()
// {
//     const sql = 'SELECT * FROM users;';
//     const result = await pool.query(sql);
//     return result.rows;
// }
export async function findByEmail(email)
{
    const sql  = 'SELECT * FROM users WHERE email = $1';
    const res = await pool.query(sql, [email]);
    return res.rows[0];   
}
export async function findById(id){
    
    const sql = 'SELECT * FROM users WHERE id = $1;';
    const res = await pool.query(sql, [id]);
    return res.rows[0];
}
export async function addUser(user)
{
    const sql = 'INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *;';
    const res = await pool.query(sql, [user.id, user.email, user.username, user.password]);
    return res.rows[0];
}
export async function deleteUser(id)
{
    const sql = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const res = await pool.query(sql, [id]);
    return res.rows[0];
}   
