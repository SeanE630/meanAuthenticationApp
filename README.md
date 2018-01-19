# meanAuthenticationApp

API for registering users in MongoDB and authentication using JSon Web Tokens. This app uses Passport and passport-jwt and uses a JWT Strategy

# VERSION 
1.0.0

# USAGE
npm install (to install dependencies) npm start (starts server )

# ENDPOINTS 
POST /users/register //Registers User 
POST /users/authenticate           //Returns a web token
GET /users/profile //Needs JSON web token to authorize
