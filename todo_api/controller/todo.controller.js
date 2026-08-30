import * as todoServices from '../services/todo.services.js';

export async function createTodo(req, res, next) {

    const todo = await todoServices.createTodo(req.user.id);
    res.status(201).json(todo);   
}

export async function readTodo(req, res, next) { 
        const todo = await todoServices.readTodo(req.params.id, req.user);
        res.status(200).json(todo);

}

export async function editTodo(req, res, next) 
{

        const todo = await todoServices.editTodo(req.params.id, req.user);
        res.status(200).json(todo);

}
export async function saveTodo(req, res, next) 
{   
        req.body.todo.id= req.params.id;
        const todo = await todoServices.saveTodo(req.body.todo, req.user);
        res.status(200).json(todo);


}
export async function deleteTodo(req, res, next) {

        const todo = await todoServices.deleteTodo(req.params.id, req.user);
        res.status(200).json(todo);

}   

/// query list todo for user
export async function getTodoList(req, res, next)
{
    // 
    const todos = await todoServices.getTodoList(req.user, req.filterquery);

    res.status(200).json(todos);
}