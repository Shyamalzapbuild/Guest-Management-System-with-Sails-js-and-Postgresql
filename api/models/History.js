/**
 * History.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    checkIn:{
      type: 'ref',
      columnType: 'date',
      required: true,
    },
    checkOut:{
      type:'ref',
      columnType:'date',
      required:true
    },
    roomId:{
      model:'room'
    },
    guestId:{
      model:'guest'
    }
  },

};

