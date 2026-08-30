import { object } from 'zod';
import * as e from '../error/error.js' 


export function validateAuth(schema)
{
    /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success)
            throw new e.authenticationError('Unauthenticated request', 'AUTHENTICATION_ERROR', result.error.issues);
        req.body = result.data;
        next();
    }
}
export function validateQuery(schema)
{
    /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
    return (req, res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success)
            throw new e.badRequestError('Invalid query parameters', 'INVALID_QUERY', result.error.issues);
        /** @type {Record<string, Array<string>>} */

        req.filterquery = result.data;
        next();
    }
}
export function validateTodo(schema)
{
    /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
    return (req, res, next) => {
        const result = schema.safeParse(req.body.todo);
        if (!result.success)
            throw new e.badRequestError('Invalid Todo', 'INVALID_TODO', result.error.issues);

        req.body.todo = result.data;
        next();
    }
}