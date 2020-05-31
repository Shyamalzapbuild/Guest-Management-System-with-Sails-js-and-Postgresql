/**
 * RequestRoom.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    guestId:{
      model:'guest',
      required:true
    },
    roomId:{
      model:'room',
      required:true
    },
    checkIn:{
      type: 'ref',
      columnType: 'date',
      required: true,
    }, 
    checkout:{
      type: 'ref',
      columnType: 'date',
      required: true,
    },
    managerId:{
      model:'manager'
    },
    status:{
      type:'boolean',
      defaultsTo: false
    }
  },

};

