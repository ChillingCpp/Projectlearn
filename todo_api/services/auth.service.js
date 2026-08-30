import * as db from '../repository/user.repo.js'
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto'
import { authenticationError, ConflictError, NotFoundError } from '../error/error.js';

function chk(obj)
{
    return obj || Object.keys(obj).length > 0;
}
function nchk(obj) {
    return !obj || Object.keys(obj).length === 0;
}
export async function register(email, username, password)
{

    /// check username exist
    email = email.trim();
    username = username.trim();
    password = password.trim();
    const user = await db.findByEmail(email);
    if (chk(user)) throw new ConflictError('User existed', 'USER_EXISTED');
    const obj = {
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
        id: crypto.randomUUIDv7(),
    }
    await db.addUser(obj);
    return { msg : 'Register Successfully'};
}
export async function login(email, password)
{
    const user = await db.findByEmail(email);

    if (nchk(user)) throw new NotFoundError('User not found', 'USER_NOT_FOUND');
    const ok = await bcrypt.compare(password, user.password);
    if (ok === false) throw new authenticationError('Wrong password', 'AUTHENTICATION_ERROR');
    return user;
}
