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
  'POST /create/role':'AdminController.createRole',
  
  //create Admin
  'POST /create/admin':'AdminController.createAdmin',
  
  //Manager
  'POST /create/manager':'ManagerController.createManager',
  'POST /login/manager':'ManagerController.managerLogin',
  'GET /managers':'ManagerController.getManagers',
  'GET /manager/:id':'ManagerController.getManagerID',
  'PUT /update/manager/:id':'ManagerController.updateManager',
  'DELETE /delete/manager/:id':'ManagerController.deleteManager',

  //Room
  'POST /create/room':'RoomController.createRoom',
  'GET /rooms':'RoomController.getRoom',
  'GET /room/:id':'RoomController.getRoomId',
  'PUT /update/room/:id':'RoomController.updateRoom',
  'DELETE /delete/room/:id':'RoomController.deleteRoom',









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
