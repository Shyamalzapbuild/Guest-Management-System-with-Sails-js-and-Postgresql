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
      defaultsTo: false
    },
    history:{
      collection:'history',
      via:'roomId'
    },
    requestRoom:{
      collection:'requestRoom',
      via:'roomId'
    }
  },

};

