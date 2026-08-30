// TODO : expand permission, get permission to work, right now don't needed

export const per = {
    USER_DELETE: 'delete user', 
    TODO_CREATE: 'create todo', 
    TODO_READ: 'read todo',
    TODO_UPDATE: 'update todo', 
    TODO_DELETE: 'delete todo', 
}; 
export const role = {
    user: [per.TODO_CREATE, per.TODO_DELETE, per.TODO_READ, per.TODO_UPDATE],
    Admin: Object.values(per),   
}
export function hasPermission(user, permission)
{
    return role[user.role].includes(permission);
}