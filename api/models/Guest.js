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
      type:'Boolean',
      required:true
    },
    dob:{
      type:'String',
      required:true
    },
    proof:{
      type:'String',
      required:true
    },
    phoneNo:{
      type:'String',
      required:true
    },
    email:{
      model:'auth',
      unique:true
    },
    history:{
      model:'history'
    },
    roomApproval:{
      collection:'roomApproval',
      via:'guest'
    }
  },

};

