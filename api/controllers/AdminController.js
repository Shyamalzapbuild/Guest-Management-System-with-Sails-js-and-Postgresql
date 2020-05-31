/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createRole: async (req,res)=>{
        try{
        const {role_id,name} = req.allParams();
        if(!role_id){
            return res.status(400).json({
                response_code:400,
                error:'role_id is required'
            });
        }
        if(!name){
            return res.status(400).json({
                response_code:400,
                error:'name is required'
            });
        }
        if(!name.match(/^[A-Za-z]+$/)){
            return res.status(400).json({
                response_code:400,
                error:'Invalid Name'
            });
        }
        const searchRole = await Role.findOne({role_id:role_id});
        if(searchRole){
            return res.status(400).json({
                response_code:400,
                error:'Role already exist'
            });
        }
        const role = await Role.create({
            role_id,name
        });
        return res.status(200).json({
            response_code: 200,
            status:'Role created successfully',
            result:role
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err.cause.details
        });
    }
    },

    createAdmin: async (req,res)=>{
        try{
        const {name,email,password} = req.allParams();
        if(!email){
            return res.status(400).json({
                response_code:400,
                error:'Email is required'
            });
        }
        if(!password){
            return res.status(400).json({
                response_code:400,
                error:'Password is required'
            });
        }
        if(!name){
            return res.status(400).json({
                response_code:400,
                error:'Name is required'
            });
        }
        if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            return res.status(400).json({
                response_code:400,
                error:'Invalid Email'
            });
        }
        if(!name.match(/^[A-Za-z]+$/)){
            return res.status(400).json({
                response_code:400,
                error:'Invalid Name'
            });
        }
        const role = await Role.findOne({name:"admin"});
        if(!role){
            return res.status(400).json({
                response_code:400,
                error:"Admin's role is not present"
            });
        }
        const searchAuth = await Auth.findOne({email:email});
        if(searchAuth){
            return res.status(400).json({
                response_code:400,
                error:'Email is already exist'
            });
        }
        const encryptedPassword = await UtilService.hashPassword(password);
        const auth = await Auth.create({
            email:email,password:encryptedPassword,roleId:role.role_id
        }).fetch();
        const admin = await Admin.create({
            name:name,emailInfo:auth.id
        }).fetch();
        return res.status(200).json({
            response_code:200,
            status:'Admin created successfully',
            result:admin
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err
        });
    }
    },

    adminLogin: async(req,res)=>{
        try {
            const {email,password} = req.allParams();
            if(!email){
                return res.status(400).json({
                    response_code:400,
                    error:'email is required'
                });
            }
            if(!password){
                return res.status(400).json({
                    response_code:400,
                    error:'password is required'
                });
            }
            if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
            {
                return res.status(400).json({
                    response_code:400,
                    error:'Invalid Email'
                });
            }
            const searchAuth = await Auth.findOne({email:email});
            if(!searchAuth){
                return res.status(400).json({
                    response_code:400,
                    error:'Email is not registered'
                });
            }
            const matchedPassword = await UtilService.comparePassword(password, searchAuth.password);
            if(!matchedPassword){
                return res.status(400).json({
                    response_code:400,
                    error:'password is not matched'
                });
            }
            const searchAdmin = await Admin.findOne({emailInfo:searchAuth.id});
            const token = JWTService.issuer({user: searchAdmin.id}, '1 day');
            return res.status(200).json({
                response_code:200,
                status:'Admin is Authorized',
                result:token
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },
};