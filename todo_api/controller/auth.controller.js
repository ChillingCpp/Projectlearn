import * as authService from "../services/auth.service.js"

export async function register(req, res, next)
{
    try{
        const {email, username, password} = req.body;
        const msg = await authService.register(email, username, password);

        res.status(201).json(msg);
    }
    catch(err)
    {
        next(err);
    }
}
export async function login(req, res, next)
{
    try{
        const {email, password} = req.body;
        const user = await authService.login(email, password);
        req.session.regenerate(err => {
            if (err) return next(err);
            req.session.userId = user.id;
            req.session.role = 'user';
            res.status(200).json({msg : 'login successfully'});
        });
    }
    catch(err)
    {
        next(err);
    }
}
export async function deleteUser()
{
    
}
export function logout(req, res, next)
{
    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie('connect.sid');
        res.status(200).json({msg : "logout Successfully"});
    });
    
}