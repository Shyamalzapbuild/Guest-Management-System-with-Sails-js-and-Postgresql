module.exports = async function (req, res, next) {
    try{
        if (!req.headers || !req.headers.authorization) {
          return res.badRequest({err: 'authorization header is missing'});
        }
        const tokenParam = req.headers.authorization;
        const decodedToken = JWTService.verify(tokenParam);
        const admin = await Admin.findOne({id: decodedToken.user});
        if (!admin) {
          return next({err:'invalid credentials provided'});
        }
        req.adminId = admin.id;
        next();
    }catch(err){
        return res.serverError(err);
    }
};