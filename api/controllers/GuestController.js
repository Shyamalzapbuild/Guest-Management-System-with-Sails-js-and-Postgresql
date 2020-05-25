/**
 * GuestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createGuest: async(req,res)=>{
        try{
            const {name, dob, address, phoneNo, email, password} = req.allParams();
            if(!name){
                return res.status(400).json({
                    response_code:400,
                    error:'Name is required'
                });
            }
            if(!dob){
                return res.status(400).json({
                    response_code:400,
                    error:'Date of Birth is required'
                });
            }
            if(!address){
                return res.status(400).json({
                    response_code:400,
                    error:'Address is required'
                });
            }
            if(!phoneNo){
                return res.status(400).json({
                    response_code:400,
                    error:'Phone Number is required'
                });
            }
            if(!email){
                return res.status(400).json({
                    response_code:400,
                    error:'Email is required'
                });
            }
            if(!password){
                return res.status(400).json({
                    response_code:400,
                    error:'Password id required'
                });
            }
            const role = await Role.findOne({name:'guest'});
            if(!role){
                return res.status(400).json({
                    response_code:400,
                    error:"Guest's Role is not defined"
                });
            }
            const searchGuest = await Auth.findOne({email:email});
            if(searchGuest){
                return res.status(400).json({
                    response_code:400,
                    error:'Email is already registered'
                });
            }
            const searchPhone = await Guest.findOne({phoneNo:phoneNo});
            if(searchPhone){
                return res.status(400).json({
                    response_code:400,
                    error:'Phone Number is already Registered'
                });
            }
            const encryptedPassword = await UtilService.hashPassword(password);
            const auth = await Auth.create({
                email,password:encryptedPassword,roleId:role.id
            }).fetch();
            const guest = await Guest.create({
                name, dob, address, phoneNo,emialInfo:auth.id
            });
            return res.status(200).json({
                response_code:200,
                status:'Guest Created successfully',
                result:guest
            });
        }catch(err){
            return res.status(400).json({
                response_code:400,
                error:err.cause.details
            });
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

    ManagerUpdateGuest: async(req,res)=>{
        try{
            const {guestId, managerId, name, dob, address, phoneNo} = req.allParams();
            if(!guestId){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest Id is required'
                });
            }
            if(!managerId){
                return res.status(400).json({
                    response_code:400,
                    error:'Manager Id is required'
                });
            }
            if(!name){
                return res.status(400).json({
                    response_code:400,
                    error:'Name is required'
                });
            }
            if(!dob){
                return res.status(400).json({
                    response_code:400,
                    error:'Date of Birth is required'
                });
            }
            if(!address){
                return res.status(400).json({
                    response_code:400,
                    error:'Address is required'
                });
            }
            if(!phoneNo){
                return res.status(400).json({
                    response_code:400,
                    error:'Phone Nu,ber is required'
                });
            }
            const searchGuest = await Guest.findOne({id:guestId});
            if(!searchGuest){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest with Given Id is not Present'
                });
            }
            const searchManager = await Manager.findOne({id:managerId});
            if(!searchManager){
                return res.status(400).json({
                    response_code:400,
                    error:'Manager with Given Id is not Present'
                });
            }
            const requestUpdate = await UpdateGuestApproval.create({
                guestId, managerId, name, dob, address, phoneNo
            });
            return res.status(200).json({
                response_code:200,
                status:'Request to update the Guest Info is send',
                result:requestUpdate
            });
        }catch(err){
            return res.status(400).json({
                response_code:400,
                error:err.cause.details
            })
        }
    },

    ManagerUpdateGuestList: async(req,res)=>{
        try {
            const updateApproval = await UpdateGuestApproval.find();
            return res.status(200).json({
                response_code:200,
                result:updateApproval
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err.cause.details
            })
        }
    },
    
    ApproveUpdateGuest: async(req,res)=>{
        try {
            const id = req.params.id;
            const searchRequest = await UpdateGuestApproval.findOne({id:id});
            if(!searchRequest){
                return res.status(400).json({
                    response_code:400,
                    error:'Request with Given Id is not present'
                });
            }
            let {status} = req.allParams();
            if(!status){
                return res.status(400).json({
                    response_code:400,
                    error:'Status is required'
                });
            }
            if(status=true){
                const updateStatus = await UpdateGuestApproval.updateOne({id:id})
                .set({
                    status:status
                });
                const updateguest = await Guest.updateOne({id:updateStatus.guestId})
                .set({
                    name:updateStatus.name,dob:updateStatus.dob, address:updateStatus.address, phoneNo:updateStatus.phoneNo
                });
                return res.status(200).json({
                    response_code:200,
                    status:'Guest Info is updated',
                    result:updateguest
                });
            }
            else{
                return res.status(200).json({
                    response_code:200,
                    result:'Guest Info is not updated'
                });
            }
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    getGuest: async(req,res)=>{
        try {
            const guests = await Guest.find();
            return res.status(200).json({
                response_code:200,
                status:'List of Guests',
                result:guests
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err.cause.details
            });
        }
    },

    getGuestId: async(req,res)=>{
        try {
            const id = req.params.id;
            const searchGuest = await Guest.findOne({id:id});
            if(!searchGuest){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest with Given Id is not Present'
                });
            }
            return res.status(200).json({
                response_code:200,
                result:searchGuest
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err.cause.details
            })
        }
    },
    deleteGuest: async(req,res)=>{
        try{
        const id = req.param.id;
        const deleteguest = await Guest.destroyOne({id:id});
        if(!deleteguest){
            return res.status(400).json({
                response_code:400,
                error:'Guest with Given Id is not Present'
            });
        }
        return res.status(200).json({
            response_code:200,
            status:'Guest Info is deleted',
            result:deleteguest
        });
    }catch(err){
        return res.status(400).json({
            response_code:400,
            error:err
        });
    }
    },

    ManagerDeleteGuest: async(req,res)=>{
        try {
            const {guestId,managerId, reason} = req.allParams();
            if(!guestId){
                return res.status(400).json({
                    response_code:400,
                    error:'GuestId is required'
                });
            }
            if(!managerId){
                return res.status(400).json({
                    response_code:400,
                    error:'ManagerId is required'
                });
            }
            if(!reason){
                return res.status(400).json({
                    response_code:400,
                    error:'Reason is required'
                });
            }
            const searchGuest = await Guest.findOne({id:guestId});
            if(!searchGuest){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest with Given Id is not Present'
                });
            }
            const searchManager = await Manager.findOne({id:managerId});
            if(!searchManager){
                return res.status(400).json({
                    response_code:400,
                    error:'Manager with Given Id is not Present'
                });
            }
            const requestDelete = await DeleteGuestApproval.create({
                guestId,managerId, reason
            });
            return res.status(200).json({
                response_code:200,
                error:'Request to delete the Guest Info is send'
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    ManagerDeleteGuestList: async(req,res)=>{
        try {
            const deleteApprovalList = await DeleteGuestApproval.find();
            return res.status(200).json({
                response_code:200,
                result:deleteApprovalList
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            })
        }
    },

    ApproveDeleteGuest: async(req,res)=>{
        try {
            const id = req.params.id;
            const searchRequest = await DeleteGuestApproval.findOne({id:id});
            if(!searchRequest){
                return res.status(400).json({
                    response_code:400,
                    error:'Delete Request with Given Id is not present'
                });
            }
            const searchGuest = await Guest.findOne({id:searchRequest.guestId});
            if(!searchGuest){
                    return res.status(400).json({
                        response_code:400,
                        error:'Guest Id not Found'
                    });
                }
            let status = req.params.status;
            if(!status){
                return res.status(400).json({
                    response_code:400,
                    error:'Status is required'
                });
            }
            if(status=='true'){
                const updateStatus = await DeleteGuestApproval.updateOne({id:id})
                .set({
                    status:status
                });
                const deleteGuest = await Guest.destroyOne({id:updateStatus.guestId});
                return res.status(200).json({
                    response_code:200,
                    status:'Guest Info is deleted',
                    result:deleteGuest
                });
            }
            else{
                return res.status(200).json({
                    response_code:200,
                    status:'Request to delete Guest Info is rejected'
                });
            }
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            })
        }
    }

};

