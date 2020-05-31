/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createRoom: async(req,res)=>{
        try{
            const {RoomNo, cost, type } = req.allParams();
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
                RoomNo:RoomNo, cost:cost, type:type
            }).fetch();
            return res.status(200).json({
                response_code:200,
                status:'Room is created',
                result:room
            });
        }catch(err){
            return res.status(400).json({
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

    generalUserRoom: async(req,res)=>{
        try {
            const room = await Room.find({
                where:{status:false},
                select:['RoomNo','cost','type','status']});
                if(!room){
                    return res.status(400).jso({
                        response_code:400,
                        error:'No room is free'
                    })
                }
            return res.status(200).json({
                response_code:200,
                status:'List of available Rooms',
                result:room
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    applyRoom: async(req,res)=>{
        try {
            const guestId = req.guestId;
            const {roomId, checkIn, checkout} = req.allParams();
            if(!guestId){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest Id is required'
                });
            }
            if(!roomId){
                return res.status(400).json({
                    response_code:400,
                    error:'Room Id is required'
                });
            }
            if(!checkIn){
                return res.status(400).json({
                    response_code:400,
                    error:'CheckIn date Required'
                });
            }
            if(!checkout){
                return res.status(400).json({
                    response_code:400,
                    error:'Checkout date required'
                });
            }
            if(!checkIn.match(/^\d{4}-\d{2}-\d{2}$/)){
                return res.status(400).json({
                    response_code:400,
                    error:'Invalid checkin date(YYYY-MM-DD)'
                });
            }
            if(!checkout.match(/^\d{4}-\d{2}-\d{2}$/)){
                return res.status(400).json({
                    response_code:400,
                    error:'Invalid checkout date(YYYY-MM-DD)'
                });
            }
            var date = Date.now();
            var checkin =new Date(checkIn);
            var checkouts =new Date(checkout);
            var timein = checkin.getTime();
            var timeout = checkouts.getTime();
            if(!(timein>date)){
                return res.status(400).json({
                    response_code:400,
                    error:'enter the upcoming date for booking'
                })
            }
            if(!((timeout>date) &&(timeout>timein))){
                return res.status(400).json({
                    response_code:400,
                    error:'checkout date should be after the checkin date'
                })
            }
            const guest = await Guest.findOne({id:guestId});
            if(!guest){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest with Given Id is not present'
                });
            }
            if(guest.status == true){
                return res.status(400).json({
                    response_code:400,
                    error:'You are already booked a room'
                });
            }
            const room = await Room.findOne({id:roomId});
            if(!room){
                return res.status(400).json({
                    response_code:400,
                    error:'Room with given Id is not present'
                });
            }
            if(room.status == true){
                return res.status(400).json({
                    response_code:400,
                    error:'Room is already booked'
                });
            }
            const applyroom = await RequestRoom.create({
                roomId,guestId, checkIn, checkout
            });
            return res.status(200).json({
                response_code:200,
                status:'You successfully apply for room',
                result:applyroom
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    requestRoomList :async(req,res)=>{
        try {
            const requestList = await RequestRoom.find();
            return res.status(200).json({
                response_code:200,
                status:'List of request Room',
                result:requestList
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            })
        }
    },

    approveRoom: async(req,res)=>{
        try {
            const id = req.params.id;
            const managerId = req.managerId;
            const {status} = req.allParams();
            if(!managerId){
                return res.status(400).json({
                    response_code:400,
                    error:'ManagerId is required'
                });
            }
            if(!status){
                return res.status(400).json({
                    response_code:400,
                    error:'Status is required'
                });
            }
            const searchrequest = await RequestRoom.findOne({id:id});
            if(!searchrequest){
                return res.status(400).json({
                    response_code:400,
                    error:'Request with given Id is not found'
                });
            }
            const room = await Room.findOne({id:searchrequest.roomId});
            if(room.status == true){
                return res.status(400).json({
                    response_code:400,
                    error:'Room is already Booked'
                });
            }
            const guest = await Guest.findOne({id:searchrequest.guestId});
            if(guest.status == true){
                return res.status(400).json({
                    response_code:400,
                    error:'Guest has already booked a room'
                });
            }
            var date = Date.now();
            var check =new Date(searchrequest.checkIn);
            var time = check.getTime();
            if(!(time>date)){
                return res.status(400).json({
                    response_code:400,
                    error:'Booking request date is exceeded'
                });
            }
            const updaterequestroom = await RequestRoom.updateOne({id:id})
            .set({
                managerId,status
            });
            if(!updaterequestroom){
                return res.status(400).json({
                    response_code:400,
                    error:'Unable to update Request Room status'
                });
            }
            const roomhistory = await RoomHistory.create({
                checkIn:searchrequest.checkIn, checkOut:searchrequest.checkout,status,room:room.id
            })
            const Checkin = await History.create({
                checkIn:searchrequest.checkIn, checkOut:searchrequest.checkout,roomId:room.id,guestId:guest.id
            });
            return res.status(200).json({
                response_code:200,
                status:'Room is booked for respective guest',
                result:Checkin
            });
        } catch (err) {
            return res.status(400).json({
                response_code:400,
                error:err
            });
        }
    },

    getRoomId: async(req,res)=>{
        try{
            const id = req.params.id;
            const searchRoom = await Room.findOne({id:id}).populate('history');
            if(!searchRoom){
                return res.status(400).json({
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
                return res.status(400).json({
                    response_code:400,
                    error:'Room not found'
                });
            }
            const {RoomNo, cost, type} = req.allParams();
            if(!RoomNo){
                return res.status(400).json({
                    response_code:400,
                    error:'RoomNo is requred'
                });
            }
            if(!cost){
                return res.status(400).json({
                    response_code:400,
                    error:'cost is required'
                });
            }
            if(!type){
                return res.status(400).json({
                    response_code:400,
                    error:'type is required'
                });
            }
            const room = await Room.updateOne({id:id})
            .set({
                RoomNo, cost, type
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
                return res.status(400).json({
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
            const historyStatus = await RoomHistory.update({room:id})
            .set({
                status
            });
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
                return res.status(400).json({
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

