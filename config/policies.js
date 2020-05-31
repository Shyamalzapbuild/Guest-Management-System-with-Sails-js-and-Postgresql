/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  ManagerController:{
    'createManager':'isLoggedIn',
    'getManagers':'isLoggedIn',
    'getManagerID':'isLoggedIn',
    'updateManager':'isLoggedIn',
    'deleteManager':'isLoggedIn',
  },
  RoomController:{
    'createRoom':'isLoggedIn',
    'getRoom':['isLoggedIn','isLoggedIn1'],
    'getRoomId':['isLoggedIn','isLoggedIn1'],
    'applyRoom':'isLoggedIn2',
    'requestRoomList':'isLoggedIn1',
    'approveRoom':'isLoggedIn1',
    'updateRoom':'isLoggedIn',
    'ManagerUpdateRoom':'isLoggedIn1',
    'deleteRoom':'isLoggedIn',
  },
  GuestController:{
    'updateGuest':'isLoggedIn2',
    'ManagerUpdateGuest':'isLoggedIn1',
    'ManagerUpdateGuestList':'isLoggedIn',
    'ApproveUpdateGuest':'isLoggedIn',
    'getGuest':['isLoggedIn','isLoggedIn1'],
    'getProfile':'isLoggedIn2',
    'getGuestId':['isLoggedIn','isLoggedIn1'],
    'deleteGuest':'isLoggedIn',
    'ManagerDeleteGuest':'isLoggedIn1',
    'ApproveDeleteGuest':'isLoggedIn',
    'ManagerDeleteGuestList':'isLoggedIn',
  }

};
