export function canRead(user, target){
    return (user.role === 'Admin' || user.id === target.ownerid);

}
export function canEdit(user, target){
    return (user.role === 'Admin' || user.id === target.ownerid);

}
export function canUpdate(user, target){
    return (user.role === 'Admin' || user.id === target.ownerid);

}
export function canDelete(user, target){
    return (user.role === 'Admin' || user.id === target.ownerid);

}
export function canDeleteUser(user, target){
    return (user.role === 'Admin');
}