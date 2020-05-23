/**
 * GuestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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

