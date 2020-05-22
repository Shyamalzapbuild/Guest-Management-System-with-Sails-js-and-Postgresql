/**
 * Auth.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email:{
      type:"String",
      required:true,
      unique:true,
      isEmail:true
    },
    password:{
      type:"String",
      required:true
    },
    roleId:{
      model:'role',
      columnName:'role_id'
    },
    admin:{
      collection:'admin',
      via:'authId'
    },
    manager:{
      collection:'manager',
      via:'authId'
    },
    guest:{
      collection:'guest',
      via:'email'
    }
  }
};

