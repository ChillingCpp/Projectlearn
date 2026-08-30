import {z} from "zod";

export const register = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
    password: z.string().min(8)
}).strict();
export const login = z.object({
    email: z.string().email(),
    password: z.string().min(8)
}).strict();

export const query = z.object(
{
    search: z.string().optional(),
    priority_min: z.coerce.number().int().min(1).max(5).optional(),
    priority_max: z.coerce.number().int().min(1).max(5).optional(),
    completed: z.enum([
        'true', 'false', true, false
    ]).transform((value => (value === 'true' || value === true))).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(20),
    sortby: z.enum([
        'title', 'created_at', 'priority', 'completed', 'updated_at', 'due_date'
    ]).default('updated_at'),
    order: z.enum([
        'ASC',
        'DESC'
    ]).default('DESC'),
    
}).refine(
    data =>  
        data.priority_min === undefined ||
        data.priority_max === undefined ||
        data.priority_min <= data.priority_max,
    {
        message: "priority_min must less than max",
        path: ['priority_min']
    }
).strict();
export const todo = z.object({
    title: z.coerce.string().nonempty(),
    content: z.coerce.string().optional(),
    priority: z.coerce.number().int().min(1).max(5).optional(),
    due_date: z.coerce.date().optional(),
    completed: z.enum([
        'true', 'false'
    ]).transform((value => value === 'true')).optional(),
}).strict();