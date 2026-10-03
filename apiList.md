# devTinder API

## authRouter

1.  POST - /signup
2.  POST - /login
3.  POST - /logout

## profileRouter

1.  GET - /profile/view
2.  PATCH - /pofile/update
3.  PATCH - /profile/password

## requestRouter

1.  POST - /request/send/:connectionStatus/:toUserId
2.  POST - /request/review/:connectionStatus/:toUserId

## user

1.  GET - /user/request/received
2.  GET - /user/connection
3.  GET - /user/feed

