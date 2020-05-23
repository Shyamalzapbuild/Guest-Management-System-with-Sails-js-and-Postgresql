/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    role_id:{
      type:"number",
      required:true,
      unique:true
    },
    name:{
      type:"String",
      required:true
    },
    auth:{
      collection:'auth',
      via:'roleId'
    }
  },

};

