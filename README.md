# GMS
# Guest Management System

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu May 21 2020 16:33:39 GMT+0530 (India Standard Time) using Sails v1.2.3.

Step1: Configure datastores.js according to your system
````
{
    adapter:'sails-postgresql',
    url: 'postgresql://postgres:1234@localhost:5432/GMS',
}
````
Step2: Go to this route to create 3 roles with name of admin, manager, guest
````
'POST /create/role':'AdminController.createRole'
````
Step 3: Now go to this route to create admin with request body (name,email,password)
````
'POST /create/admin':'AdminController.createAdmin'
````
Step 4: Now go to this route to login with email and password in the request body and get the token in the response body
````
'POST /login/admin':'AdminController.adminLogin'
````
Step5: Now admin can perform CRUD manager through following routes and providing authorization in header
````
'POST /create/manager':'ManagerController.createManager'
'GET /managers':'ManagerController.getManagers',
'GET /manager/:id':'ManagerController.getManagerID',
'PUT /update/manager/:id':'ManagerController.updateManager',
'DELETE /delete/manager/:id':'ManagerController.deleteManager'
````
Step6: Now admin can perform CRUD room through following routes and providing authorization in header
````
'POST /create/room':'RoomController.createRoom',
'GET /rooms':'RoomController.getRoom',
'GET /room/:id':'RoomController.getRoomId',
'PUT /update/room/:id':'RoomController.updateRoom',
'DELETE /delete/room/:id':'RoomController.deleteRoom'
````
Step7: General user can view available rooms only through following route
````
'GET /available/rooms':'RoomController.generalUserRoom'
````
Step8: User can create the account providing the (name, dob, address, phoneNo, email, password) in request body through this route
````
'POST /create/guest':'GuestController.createGuest'
````
Step9: User can go to this route to login with email and password
````
'POST /login/guest':'GuestController.guestLogin'
````
Step10: User can view profile and update its Info
````
'PUT /update/guest':'GuestController.updateGuest'
'GET /profile':'GuestController.getProfile'
````
Step11: Admin and Manager can view the list of guests
````
'GET /guests':'GuestController.getGuest',
'GET /profile':'GuestController.getProfile',
'GET /guest/:id':'GuestController.getGuestId'
````
Step11: Manager request Admin to update the guest Info
````
'POST /request/update/guest':'GuestController.ManagerUpdateGuest',
'GET /list/update/guest':'GuestController.ManagerUpdateGuestList',
'PUT /approval/update/guest/:id':'GuestController.ApproveUpdateGuest'
````
Step12: Manager can update the status of guest through this route
````
'PUT /update/status/guest/:id':'GuestController.ManagerUpdateGuestStatus'
````
Step13: Admin can delete the guest through this route
````
'DELETE /delete/guest/:id':'GuestController.deleteGuest'
````
Step14: Manager can request the admin to delete the guest through this route
````
'POST /request/delete/guest':'GuestController.ManagerDeleteGuest',
'GET /list/delete/guest':'GuestController.ManagerDeleteGuestList'
'DELETE /approval/delete/guest/:id/:status':'GuestController.ApproveDeleteGuest'
````
Step15: User can apply for room through this route
````
'POST /apply/room':'RoomController.applyRoom'
````
Step16: Manager can aprove the booking through this route
````
'GET /list/request/rooms':'RoomController.requestRoomList',
'PUT /approve/rooms/:id':'RoomController.approveRoom'
````
