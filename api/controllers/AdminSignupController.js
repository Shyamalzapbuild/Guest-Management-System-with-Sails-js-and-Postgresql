/**
 * AdminSignupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createAdmin: async (req,res)=>{
        const {name,email,password} = req.allParams();
        sails.log(name,email,password,'hjhjbhb');
        if(!email){
            return res.badRequest({
                err:'Email is required'
            });
        }
        if(!password){
            return res.badRequest({
                err:'Password is required'
            });
        }
        const role = await Role.findOne({where:{name:"admin"}});
        sails.log(role.role_id);
        const encryptedPassword = await UtilService.hashPassword(password);
        const auth = await Auth.create({
            email:email,password:encryptedPassword,roleId:role.role_id
        });
        sails.log(auth,'jjk');
        const admin = await Admin.create({
            name,authId:1
        });
        return res.ok(admin);
    }
};

