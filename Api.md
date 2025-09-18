# Dev Tinder API

## authRouter
-POST /signup
-POST /login
-POSt /logout

## profileRouter
-GET/profile/View
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-POST/request/send/interested/:userId
-POST/request/send/ignore/:userId
<!-- Single API for both ignore & interested -->
-POST/request/send/:status/:userId


-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

## userRouter
-GET/user/connections
-GET/user/requests
-GET/user/feed - Gets you profiles of other users on the platform

status:ignore,intrested,accepted,rejected
