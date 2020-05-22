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
      required:true
    },
    address:{
      type:'String',
      required:true
    },
    emialInfo:{
      model:'auth',
      unique:true
    },
    roomApproval:{
      collection:'roomApproval',
      via:'manager'
    }
  },

};

