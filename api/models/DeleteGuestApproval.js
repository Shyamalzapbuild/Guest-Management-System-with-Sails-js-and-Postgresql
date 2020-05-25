/**
 * DeleteGuestApproval.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    guestId:{
      type:'number',
      required:true
    },
    managerId:{
      type:'number',
      required:true
    },
    reason:{
      type:'String',
      required:true
    },
    status:{
      type:'boolean',
      defaultsTo:false
    }
  },

};

