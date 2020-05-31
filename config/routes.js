/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //create Roles
  'POST /create/role':'AdminController.createRole',//done
  
  //create Admin
  'POST /create/admin':'AdminController.createAdmin',//done
  'POST /login/admin':'AdminController.adminLogin',//done
  
  //Manager
  'POST /create/manager':'ManagerController.createManager',//done
  'POST /login/manager':'ManagerController.managerLogin',//done
  'GET /managers':'ManagerController.getManagers',//done
  'GET /manager/:id':'ManagerController.getManagerID',//done
  'PUT /update/manager/:id':'ManagerController.updateManager',//done
  'DELETE /delete/manager/:id':'ManagerController.deleteManager',//done

  //Room
  'POST /create/room':'RoomController.createRoom',//done
  'GET /rooms':'RoomController.getRoom',//done
  'GET /available/rooms':'RoomController.generalUserRoom',//done
  'POST /apply/room':'RoomController.applyRoom',//done
  'GET /list/request/rooms':'RoomController.requestRoomList',//done
  'PUT /approve/rooms/:id':'RoomController.approveRoom',//done
  'GET /room/:id':'RoomController.getRoomId',//done
  'PUT /update/room/:id':'RoomController.updateRoom',//done
  'PUT /update/room/status/:id':'RoomController.ManagerUpdateRoom',//done
  'DELETE /delete/room/:id':'RoomController.deleteRoom',//done

  //Guest
  'POST /create/guest':'GuestController.createGuest',//done
  'POST /login/guest':'GuestController.guestLogin',//done
  'PUT /update/guest':'GuestController.updateGuest',//done
  'POST /request/update/guest':'GuestController.ManagerUpdateGuest',//done
  'GET /list/update/guest':'GuestController.ManagerUpdateGuestList',//done
  'PUT /approval/update/guest/:id':'GuestController.ApproveUpdateGuest',//done
  'PUT /update/status/guest/:id':'GuestController.ManagerUpdateGuestStatus',//done
  'GET /guests':'GuestController.getGuest',//done
  'GET /profile':'GuestController.getProfile',//done
  'GET /guest/:id':'GuestController.getGuestId',//done
  'DELETE /delete/guest/:id':'GuestController.deleteGuest',//done
  'POST /request/delete/guest':'GuestController.ManagerDeleteGuest',//done
  'GET /list/delete/guest':'GuestController.ManagerDeleteGuestList',//done
  'DELETE /approval/delete/guest/:id/:status':'GuestController.ApproveDeleteGuest',//done







  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
