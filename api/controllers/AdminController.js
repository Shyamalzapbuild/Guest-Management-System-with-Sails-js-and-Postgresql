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
        sails.log(role_id,'  ',name);
        if(!role_id){
            return res.badRequest({
                err:'role_id is required'
            });
        }
        if(!name){
            return res.badRequest({
                err:'name is required'
            });
        }
        const role = await Role.create({
            role_id,name
        });
        return res.ok(role);
    }catch(err){
        return res.serverError(err);
    }
    },

    createManager: async(req,res)=>{
        try{
        const {name,phoneNo, address, email, password} = req.allParams();
        if(!name){
            return res.badRequest({
                err:'name is required'
            });
        }
        if(!phoneNo){
            return res.badRequest({
                err:'phoneNo is required'
            });
        }
        if(!address){
            return res.badRequest({
                err:'address is required'
            });
        }
        if(!email){
            return res.badRequest({
                err:'email is required'
            });
        }
        if(!password){
            return res.badRequest({
                err:'password is required'
            });
        }
        const role = await Role.findOne({name:"manager"});
        if(!role){
            return res.badRequest({
                err:"manager's role is not defined"
            });
        }
        const encryptedPassword = await UtilService.hashPassword(password);
        const emailFound = await Auth.findOne({
            email:email
        });
        if(emailFound){
            return res.badRequest({
                err:'email already exist'
            });
        }
        const auth = await Auth.create({
            email,password:encryptedPassword,roleId:role.role_id
        }).fetch();
        sails.log(auth);
        const manager = await Manager.create({
            name,phoneNo, address, authId:auth.id
        }).fetch();
        return res.ok(manager);
    }catch(err){
        return res.serverError(err);
    }
    },

    getManagers: async(req,res)=>{
        try{
        const manager = await Manager.find().populate('email');
        return res.send(manager);
    }catch(err){
        return res.serverError(err);
    }
    },

    getManagerID: async(req,res)=>{
        try{
        const {id} = req.allParams();
        if(!id){
            return res.badRequest({
                err:'id is not present'
            });
        }
        const manager = await Manager.findOne({where:{id:id}}).populate('email');
        return res.send(manager);
    }catch(err){
        return res.serverError(err);
    }
    },

    updateManager: async(req,res)=>{
        try{
        const id = req.param.id;
        if(!id){
            return res.badRequest({
                err:'Id is not present'
            });
        }
        const {name,phoneNo, address} = req.allParams();
        if(!name){
            return res.badRequest({
                err:'name is required'
            });
        }
        if(!phoneNo){
            return res.badRequest({
                err:'phoneNo is required'
            });
        }
        if(!address){
            return res.badRequest({
                err:'address is required'
            });
        }
        if(!email){
            return res.badRequest({
                err:'email is required'
            });
        }
        if(!password){
            return res.badRequest({
                err:'password is required'
            });
        }
        const email = await Auth.findOne({email:email});
        if(!email){
            return res.badRequest({
                err:'Email not found'
            });
        }
        const updatemanager = await Manager.updateOne({id:id})
        .set({
            name:name, phoneNo:phoneNo, address:address
        });
        return res.ok(updatemanager);
    }catch(err){
        return res.serverError(err);
    }
    },

    deleteManager: async (req,res)=>{
        try{
        const id = req.param.id;
        const deletemanager = await Manager.destroyOne({id:id});
        return res.ok(deletemanager);
    }catch(err){
        return res.serverError(err);
    }
    },

    updateGuest: async (req,res)=>{
        try{
        const id = req.param.id;
        const {name,dob,phoneNo} = req.allParams();
        if(!name){
            return res.badRequest({
                err:'name is required'
            });
        }
        if(!dob){
            return res.badRequest({
                err:'date of birth is required'
            });
        }
        if(!phoneNo){
            return res.badRequest({
                err:'phoneNo is required'
            });
        }
        const updateguest = await Guest.updateOne({id:id})
        .set({
            name:name, dob:dob, phoneNo:phoneNo
        });
        return res.ok(updateguest);
    }catch(err){
        return res.serverError(err);
    }
    },

    deleteGuest: async(req,res)=>{
        try{
        const id = req.param.id;
        const deleteguest = await Guest.destroyOne({id:id});
        return res.ok(deleteguest);
    }catch(err){
        return res.serverError(err);
    }
    }
};