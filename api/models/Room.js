/**
 * Room.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    RoomNo:{
      type:'Integer',
      required:true
    },
    cost:{
      type:'Integer',
      required:true
    },
    status:{
      type:'Boolean',
      required:true
    },
    date:{
      type:'String',
      required:true
    },
    history:{
      model:'history'
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

