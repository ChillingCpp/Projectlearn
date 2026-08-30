export class badRequestError extends Error{
    /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'BAD_REQUEST_ERROR', details = null)
    {
        super(message);
        this.name = 'BadRequestError';
        this.code = code;
        this.statusCode = 400;
        this.details = details;
    }
};
export class validationError extends Error{
        /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'VALIDATION_ERROR', details = null)
    {
        super(message);
        this.name = 'ValidationError';
        this.code = code;
        this.statusCode = 400;
        this.details = details;
    }
};
export class authenticationError extends Error{
        /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'AUTHENTICATION_ERROR', details = null)
    {
        super(message);
        this.name = 'AuthenticationError';
        this.code = code;
        this.statusCode = 401;
        this.details = details;
    }
};
export class authorizationError extends Error{
        /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'AUTHORIZATION_ERROR', details = null)
    {
        super(message);
        this.name = 'AuthorizationError';
        this.code = code;
        this.statusCode = 403;
        this.details = details;
    }
};
export class NotFoundError extends Error{
        /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'NOT_FOUND_ERROR', details = null)
    {
        super(message);
        this.name = 'NotFoundError';
        this.code = code;
        this.statusCode = 404;
        this.details = details;
    }
};
export class ConflictError extends Error{
        /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'Conflict_ERROR', details = null)
    {
        super(message);
        this.name = 'ConflictError';
        this.code = code;
        this.statusCode = 409;
        this.details = details;
    }
};
export class InternalServerError extends Error{
        /**
 * @param {string} message
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code = 'INTERNAL_SERVER_ERROR', details = null)
    {
        super(message);
        this.name = 'InternalServerError';
        this.code = code;
        this.statusCode = 500;
        this.details = details;
    }
};
export class DatabaseError extends Error{
        /**
 * @param {string} message
 * @param {string} code
 * @param {Record<string, string[]> | null} details
 */
    constructor(message, code, details = null)
    {
        super(message);
        this.code = code;
        this.internal_details = details; // do not expose this to client
        this.statusCode = 500;
    }
}

    /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @param {unknown} err
 */
export function errorHandler(err, req, res, next)
{
    res.status(err.statusCode).json({
        error: err.name,
        code: err.code,
        message: err.message,
        details: err.details,
    });
}