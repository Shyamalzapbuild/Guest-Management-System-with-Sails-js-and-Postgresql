/**
 * Manager.js
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
    phoneNo:{
      type:'String',
      required:true,
      unique:true
    },
    address:{
      type:'String',
      required:true
    },
    emailInfo:{
      model:'auth',
      unique:true
    },
    requestRoom:{
      collection:'requestRoom',
      via:'managerId'
    }
  },

};

