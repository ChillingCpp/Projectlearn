import session from 'express-session'

export default session({
    secret: process.env.SESSION_SECRET || "dmmm",
    resave:false,
    saveUninitialized:false,
    rolling:true,
    // store: : session store : redis ( best ), postgres
    cookie:
    {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:1000 * 60 * 60
    }
});
