import { object } from 'zod';
import {pool} from '../database/postgres.js';
import { badRequestError } from '../error/error.js';

export async function getTodo(todo_id, user_id) // uuid 
{
    const sql = 'SELECT * FROM todo WHERE id = $1 AND user_id = $2'; // don't get created_at column;
    const res = await pool.query(sql, [todo_id, user_id]);
    return res.rows[0];
}


// todo : id, userid, title, content, priority, due_date, status
export async function saveTodo(todo) /// object todo
{
    const updateColumn = [];
    const values = [];
    for (const [key, value] of Object.entries(todo))
    {
        if (key.toLowerCase() !== 'id' && key.toLowerCase() !== 'user_id') {
            updateColumn.push(key.toLowerCase()); 
            values.push(value);
        }
    }
    values.push(todo.id);
    values.push(todo.user_id);
    const length = updateColumn.length;
    const sql = `UPDATE todo 
                 SET ${updateColumn.map((value, index) => `${value} = $${index+1}`).join(', ')}, updated_at = NOW() 
                 WHERE id = $${length + 1} AND user_id = $${length + 2}
                 RETURNING *`;
    const res = await pool.query(sql, values);    
    return res.rows[0];
}

//
// todo : id, userid
export async function createTodo(todo) /// object contain information for creating todo
{
    const sql = 'INSERT INTO todo (id, user_id)  VALUES ($1, $2) RETURNING *';
    const res = await pool.query(sql, [todo.id, todo.user_id]);
    return res.rows[0];
}
export async function deleteTodo(todo_id, user_id)
{
    const sql = 'DELETE FROM todo WHERE id = $1 AND user_id = $2 RETURNING *';
    const todos = await pool.query(sql, [todo_id, user_id]);
    return todos.rows[0];
}

export async function deleteAllCompletedTodos(user_id)
{
    const sql = 'DELETE FROM todo WHERE user_id = $1 AND completed = TRUE';
    const todos = await pool.query(sql, [user_id]);
    return todos.rows;
}
export async function getAllTodo(user_id)
{
    return await pool.query('SELECT * FROM todo WHERE user_id = $1', [user_id]).rows; /// don't get created_at column;
}
export async function getTodoList(user_id, params)
{
    // sql builder

    const conditions = [];
    const values = [];
    conditions.push(`user_id = $1`);
    values.push(user_id);
    for (const [key, value] of Object.entries(params)){
        let len = values.length +1;
        switch (key)
        {
            case 'search':
                conditions.push(`LOWER(title) LIKE '%' || LOWER($${len}) || '%' `);
                values.push(value);
                break;
            case 'priority_min':    
                conditions.push(`priority >= $${len}`);
                values.push(value);
                break;
            case 'priority_max':
                conditions.push(`priority <= $${len}`);
                values.push(value);
                break;
            case 'completed':
                conditions.push(`completed = $${len}`);
                values.push(value);
                break;   
        }
    }
    const len = values.length;
    const sql = `SELECT * FROM todo WHERE ${conditions.join(' AND ')}
                ORDER BY ${params.sortby} ${params.order} LIMIT ${len + 1} OFFSET ${len+ 2}`;
    values.push(params.limit);
    values.push(params.offset);
    const todos = await pool.query(sql, values);
    return todos.rows;
}