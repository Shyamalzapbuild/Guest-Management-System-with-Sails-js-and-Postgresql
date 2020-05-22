/**
 * History.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    checkIn:{
      type:'String',
      required:true
    },
    checkOut:{
      type:'String'
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

