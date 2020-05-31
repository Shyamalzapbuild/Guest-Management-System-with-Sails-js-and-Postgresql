/**
 * Guest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'String',
      required:true
    },
    status:{
      type: 'boolean', 
      defaultsTo: false
    },
    dob:{
      type: 'ref',
      columnType: 'date',
      required: true,
    },
    address:{
      type:'String',
      required:true
    },
    phoneNo:{
      type:'String',
      required:true
    },
    emailInfo:{
      model:'auth',
      unique:true
    },
    history:{
      collection:'history',
      via:'guestId'
    },
    requestRoom:{
      collection:'requestRoom',
      via:'guestId'
    }
  },

};

