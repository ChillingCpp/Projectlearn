export function authenticate(req, res, next)
{
    if (!req.session.userId)
        return res.sendStatus(401);
    req.user = {
        id:req.session.userId,
        role: req.session.role,
    };
    next();
}