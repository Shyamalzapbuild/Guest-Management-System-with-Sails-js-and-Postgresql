/**
 * RequestRoom.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    guest:{
      model:'guest',
      required:true
    },
    room:{
      model:'room',
      required:true
    }
  },

};

