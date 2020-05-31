/**
 * ManagerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createManager: async(req,res)=>{
        try{
        const {name,phoneNo, address, email, password} = req.allParams();
        if(!name){
            return res.status(400).json({
                response_code:400,
                error:'name is required'
            });
        }
        if(!phoneNo){
            return res.status(400).json({
                response_code:400,
                error:'phoneNo is required'
            });
        }
        if(!address){
            return res.status(400).json({
                response_code:400,
                error:'address is required'
            });
        }
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
        if(!name.match(/^[A-Za-z]+$/)){
            return res.status(400).json({
                response_code:400,
                error:'Invalid Name'
            });
        }
        if(!phoneNo.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
            return res.status(400).json({
                response_code:400,
                error:'Phone Number is not valid'
            });
        }
        const role = await Role.findOne({name:"manager"});
        if(!role){
            return res.status(400).json({
                response_code:400,
                error:"Manager's role is not defined"
            });
        }
        const searchEmail = await Auth.findOne({
            email:email
        });
        if(searchEmail){
            return res.status(400).json({
                response_code:400,
                error:'Email already exist'
            });
        }
        const searchPhone = await Manager.findOne({phoneNo:phoneNo});
        if(searchPhone){
            return res.status(400).json({
                response_code:400,
                error:'Phone Number already exist'
            });
        }
        const encryptedPassword = await UtilService.hashPassword(password);
        const auth = await Auth.create({
            email,password:encryptedPassword,roleId:role.role_id
        }).fetch();
        const manager = await Manager.create({
            name,phoneNo, address, emailInfo:auth.id
        }).fetch();
        return res.status(200).json({
            response_code:200,
            status:'Manager created successfully',
            result:manager
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err
        });
    }
    },
    
    managerLogin: async(req,res)=>{
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
            const searchManager = await Manager.findOne({emailInfo:searchAuth.id});
            const token = JWTService.issuer({user: searchManager.id}, '1 day');
            return res.status(200).json({
                response_code:200,
                status:'Manager is Authorized',
                profile:searchManager,
                result:token
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err.cause
            });
        }
    },

    getManagers: async(req,res)=>{
        try{
        const manager = await Manager.find().populate('emailInfo');
        return res.status(200).json({
            response_code:200,
            result:manager
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err.cause.details
        });
    }
    },

    getManagerID: async(req,res)=>{
        try{
        const id = req.params.id;
        const manager = await Manager.findOne({where:{id:id}}).populate('emailInfo');
        if(!manager){
            return res.status(400).json({
                response_code:400,
                error:'Manager with Given Id is not present'
            });
        }
        return res.status(200).json({
            response_code:200,
            result:manager
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err.cause.details
        });
    }
    },

    updateManager: async(req,res)=>{
        try{
        const id = req.params.id;
        const searchManager = await Manager.findOne({id:id});
        if(!searchManager){
            return res.status(400).json({
                err:'Manager With Given Id is not present'
            });
        }
        const {name, address} = req.allParams();
        if(!name){
            return res.status(400).json({
                response_code:400,
                error:'name is required'
            });
        }
        if(!address){
            return res.status(400).json({
                response_code:400,
                error:'address is required'
            });
        }
        if(!name.match(/^[A-Za-z]+$/)){
            return res.status(400).json({
                response_code:400,
                error:'Invalid Name'
            });
        }
        const updatemanager = await Manager.updateOne({id:id})
        .set({
            name, address
        });
        return res.status(200).json({
            response_code:200,
            status:"Manager's Information is updated",
            result:updatemanager
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err.cause.details
        });
    }
    },

    deleteManager: async (req,res)=>{
        try{
        const id = req.params.id;
        const searchManager = await Manager.findOne({id:id});
        if(!searchManager){
            return res.status(400).json({
                response_code:400,
                error:'Manager With Given Id is not present'
            });
        }
        const deletemanager = await Manager.destroyOne({where:{id:id}});
        return res.status(200).json({
            response_code:200,
            status:'Manager is deleted',
            result:deletemanager
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err.cause.details
        });
    }
    },

    
};

