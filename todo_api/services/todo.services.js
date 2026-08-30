import * as todoRepo from '../repository/todo.repo.js';
import * as policies from '../auth/policies.js';
import crypto from "node:crypto";
import { objectUtil } from 'zod/v3';
import { authorizationError, badRequestError, NotFoundError } from '../error/error.js';

/// express 5 and beyond dont need try catch block in controller, it will automatically catch the error and pass to next() function
// so we can remove try catch block from controller and handle error in service layer.
/// for this simple project, we will not use try catch block in controller and handle error in service layer, but for complex project
//  we can use try catch block in controller and handle error in service layer.


/// this function not intended to create for any user_id, only for user session
export async function createTodo(user_id) {

    const todo = await todoRepo.createTodo({id: crypto.randomUUIDv7(), user_id: user_id});
    return todo;
}

export async function readTodo(todo_id, user) {
    // return await todoRepo.getTodo(todo_id);
    const todo = await todoRepo.getTodo(todo_id, user.id);
    if (!todo) throw new NotFoundError('Todo not found', 'TODO_NOT_FOUND');
    const owner_id = todo.user_id;
    if (!policies.canRead(user, {ownerid: owner_id})) 
        throw new authorizationError('You do not have permission to access this resource', 'FORBIDDEN');
    return todo;
}

export async function editTodo(todo_id, user) 
{
    const todo = await todoRepo.getTodo(todo_id, user.id);
    if (!todo) throw new NotFoundError('Todo not found', 'TODO_NOT_FOUND')
    const owner_id = todo.user_id;
    if (!policies.canEdit(user, {ownerid: owner_id})) 
        throw new authorizationError('You do not have permission to access this resource', 'FORBIDDEN');
    return todo;
}

export async function saveTodo(todo, user)
{
    const intodo = await todoRepo.getTodo(todo.id, user.id);
    if (!intodo) throw new NotFoundError('Todo not found', 'TODO_NOT_FOUND') /// sometime can be a bug in database, advance problem
    if (!policies.canUpdate(user, {ownerid: intodo.user_id})) throw new authorizationError('You do not have permission to access this resource', 'FORBIDDEN');
    todo.user_id = user.id;
    const todos = await todoRepo.saveTodo(todo);
    return todos;
}
export async function deleteTodo(todo_id, user) 
{
    const todo = await todoRepo.getTodo(todo_id, user.id);
    if (!todo) throw new NotFoundError('Todo not found', 'TODO_NOT_FOUND')
    if (!policies.canDelete(user, {ownerid: todo.user_id})) throw new authorizationError('You do not have permission to access this resource', 'FORBIDDEN');
    const deleted = await todoRepo.deleteTodo(todo.id, user.id);
    return deleted;
}

export async function getTodoList(user, params)
{
    /// validate params value
    params.offset = (params.page-1) * params.limit;
    const todos = await todoRepo.getTodoList(user.id, params);
    return todos;
}
