/**
 * Room.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    RoomNo:{
      type:'number',
      required:true,
      unique:true
    },
    cost:{
      type:'number',
      required:true
    },
    type:{
      type:'number',
      required:true
    },
    status:{
      type:'Boolean',
      required:true
    },
    history:{
      collection:'roomHistory',
      via:'room'
    },
    roomApproval:{
      collection:'roomApproval',
      via:'room'
    },
    requestRoom:{
      collection:'requestRoom',
      via:'room'
    }
  },

};

