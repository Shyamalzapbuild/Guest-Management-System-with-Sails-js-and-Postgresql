/**
 * ManagerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    managerLogin: async(req,res)=>{
        try {
            const {email,password} = req.allParams();
            if (!email) {
                return res.badRequest({
                    err:'email is required'
                });
            }
            if(!password){
                return res.badRequest({
                    err:'password is required'
                });
            }
            const manager = await this.managerLogin.findOne({email:email});
            if(!manager){
                return res.badRequest({
                    err:'email is not registered'
                });
            }
            const matchedPassword = await UtilService.comparePassword(password, manager.password);
            if(!matchedPassword){
                return res.badRequest({
                    err:'password is not matched'
                });
            }
            return res.ok(matchedPassword);
        } catch (err) {
            return res.serverError(err);
        }
    },

    updateManager: async(req,res)=>{
        try{
            const id = req.params.id;
            if(!id){
                return res.badRequest({
                    err:'Id is required'
                });
            }
            const {name,address} = req.allParams();
            if(!name){
                return res.badRequest({
                    err:'name is required'
                });
            }
            if(!address){
                return res.badRequest({
                    err:'address is required'
                });
            }
            const manager = await Manager.updateOne({id:id})
            .set({
                name:name, address:address
            });
            if(!manager){
                return res.badRequest({
                    err:'manager is not present'
                });
            }
            return res.ok(manager);
        }catch(err){
            return res.serverError(err);
        }
    },

    getGuest: async(req,res)=>{
        try{
            const guest = await Guest.find().populate();
        }catch(err){
            return res.serverError(err);
        }
    },

    getGuestId: async(req,res)=>{
        try{
            const id = req.params.id;
            if(!id){
                return res.badRequest({
                    err:'Id is required'
                });
            }
            const guest = await Guest.findOne({id:id});
            if(!guest){
                return res.badRequest({
                    err:'Guest is not found'
                });
            }
            return res.send(guest);
        }catch(err){
            return res.serverError(err);
        }
    },

    
};

