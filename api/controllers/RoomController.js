/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createRoom: async(req,res)=>{
        try{
            const {RoomNo, cost, status, type } = req.allParams();
            if(!RoomNo){
                return res.status(400).json({
                    response_code:400,
                    error:'RoomNo is requred'
                });
            }
            if(!cost){
                return res.badRequest({
                    response_code:400,
                    error:'cost is required'
                });
            }
            if(!status){
                return res.badRequest({
                    response_code:400,
                    error:'status is required'
                })
            }
            if(!type){
                return res.badRequest({
                    response_code:400,
                    error:'type is required'
                });
            }
            const searchRoom = await Room.findOne({RoomNo:RoomNo});
            if(searchRoom){
                return res.badRequest({
                    response_code:400,
                    error:'roomNo is already present'
                });
            }
            const room = await Room.create({
                RoomNo:RoomNo, cost:cost, status:status, type:type
            }).fetch();
            return res.status(200).json({
                response_code:200,
                status:'Room is created',
                result:room
            });
        }catch(err){
            return res.status(200).json({
                response_code:400,
                error:err
            });
        }
    },
    
    getRoom: async(req,res)=>{
        try{
            const rooms = await Room.find();
            return res.status(200).json({
                response_code:200,
                result:rooms
            });
        }catch(err){
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    getRoomId: async(req,res)=>{
        try{
            const id = req.params.id;
            const searchRoom = await Room.findOne({id:id});
            if(!searchRoom){
                return res.badRequest({
                    response_code:400,
                    error:'room not found'
                });
            }
            return res.status(200).json({
                response_code:200,
                result:searchRoom
            });
        }catch(err){
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },
    updateRoom: async(req,res)=>{
        try{
            const id = req.params.id;
            const searchRoom = await Room.findOne({id:id});
            if(!searchRoom){
                return res.badRequest({
                    response_code:400,
                    error:'Room not found'
                });
            }
            const {RoomNo, cost, status, type} = req.allParams();
            if(!RoomNo){
                return res.status(400).json({
                    response_code:400,
                    error:'RoomNo is requred'
                });
            }
            if(!cost){
                return res.badRequest({
                    response_code:400,
                    error:'cost is required'
                });
            }
            if(!status){
                return res.badRequest({
                    response_code:400,
                    error:'status is required'
                })
            }
            if(!type){
                return res.badRequest({
                    response_code:400,
                    error:'type is required'
                });
            }
            const room = await Room.updateOne({id:id})
            .set({
                RoomNo, cost, status, type
            });
            return res.status(200).json({
                response_code:200,
                status:'Room Information is updated',
                result:room
            });
        }catch(err){
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    ManagerUpdateRoom: async(req,res)=>{
        try {
            const id = req.params.id;
            const searchRoom = await Room.findOne({id:id});
            if(!searchRoom){
                return res.status(200).json({
                    response_code:400,
                    error:'Room Number with Given Id is not Present'
                });
            }
            const {status} = req.allParams();
            if(!status){
                return res.status(400).json({
                    response_code:400,
                    error:'Status is required'
                });
            }
            if(!(typeof status =='boolean')){
                return res.status(400).json({
                    response_code:400,
                    error:'Invalid status(try true or false)'
                });
            }
            const room = await Room.updateOne({id:id})
            .set({
                status
            });
            return res.status(200).json({
                response_code:200,
                status:'Status is updated',
                result:room
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err.cause.details
            });
        }
    },

    deleteRoom: async(req,res)=>{
        try{
            const id = req.params.id;
            const searchRoom = await Room.findOne({id:id});
            if(!searchRoom){
                return res.badRequest({
                    response_code:400,
                    error:'RoomNo with given Id is not Present'
                });
            }
            const deleteroom = await Room.destroyOne({id:id});
            return res.status(200).json({
                response_code:200,
                status:'Room Information is Deleted',
                result:deleteroom
            });
        }catch(err){
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },
};

