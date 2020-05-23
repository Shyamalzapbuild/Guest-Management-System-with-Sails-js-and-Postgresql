/**
 * RoomHistory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    date:{
      type: 'ref',
      columnType: 'timestamp',
      required:true
    },
    status:{
      type:'String',
      required:true
    },
    room:{
      model:'room'
    }
  },

};

