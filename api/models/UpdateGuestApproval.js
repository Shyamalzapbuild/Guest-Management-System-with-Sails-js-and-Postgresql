/**
 * UpdateGuestApproval.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    guestId:{
      type:"number",
      required:true
    },
    managerId:{
      type:'number',
      required:true
    },
    status:{
      type: 'boolean', 
      defaultsTo: false
    },
    name:{
      type:'String',
      required:true
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
    }
  },

};

