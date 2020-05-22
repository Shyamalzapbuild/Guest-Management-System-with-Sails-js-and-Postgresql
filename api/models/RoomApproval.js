/**
 * RoomApproval.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Answer:{
      type:'String',
      required:true
    },
    guest:{
      model:'guest'
    },
    manager:{
      model:'manager'
    },
    room:{
      model:'room'
    },
  },

};

