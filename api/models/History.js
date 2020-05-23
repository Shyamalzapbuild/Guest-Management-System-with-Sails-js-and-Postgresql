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
      columnType: 'timestamp',
      required: true,
    },
    checkOut:{
      type:'String',
      columnType:'timestamp',
    },
    room:{
      model:'room'
    },
    guestId:{
      collection:'guest',
      via:'history'
    }
  },

};

