# React-Express Boilerplate
All you need to bootstrap your React-Express project. Nothing more, Nothing less.

## Motivation
This repo includes all the annoying part of bootstraping a project. I know there is ton of them online but nothing was as completed and all of themwere way to compleceted and over engineered. I had to spent a week just to understand how they worked. Here I include only the most important parts of any project such as:
* authentication (through passport)
* authorization (through passport-jwt)
* account activation through email (with nodemailer)
* [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
* redux 
* redux-persist

**This setup works with local instance of mongo only if you have mongo installed on your machine**
if you dont have mongo installed you can follow [this](https://docs.mongodb.com/manual/administration/install-community/) instructions. then to start it simply run `sudo mongod` from the command line.


## built-in Auth - using passport-mongoose 
this boilerplate built with passport auth with mongo database: 
simply add your login data in the config.js file and uncomment the necessary part from db/mongoos.js
or , use it as is on localhost. 
passport have to get two fields from the client to work: 
**password** // (must be named "password")
**username** // (must be name "username")

## built-in email activation 
on signup the user will get an email to activate their account 
**note** - that require from you to have a domain name or smtp server to send the email. 
simply add the username and the password from your smtp account in the `.env` file and you good to go. 
on activation - the user schema in the db will be updated with the value "true" on "active" prop. 
then passport can recognize the user as verified account. 
You can find smtp providers [here](https://github.com/discourse/discourse/blob/master/docs/INSTALL-email.md)




## built-in password reset using email
I added an end point for your users to reset their password if they need to

## protected routes with JWT
when you login token will be generated for you and will be sent to the client where it will be stored in your persist state and will be used to access authorization


## React-frontend
the frontend use React and built with **react-router** by default. You can add your routes in the [App.js](client/src/App.js) file 

# to use 
* simply clone the repo, add the smtp cords as described below inside `/server/.env`.

## .env
```
# .env	
    
    cookieParserSecret=<SECRET> 
    JWTsecret=<SECRET>
    nodemailerEmail=<Email for the SMTP server>
    nodemailerPw=<Password for the SMTP server>
    smtp=<SMTP address i.e. smtpout.europe.secureserver.net>
    mongoUsername=<MONGO USERNAME>
    mongoPw=<MONGO PASSWORD>
    mongoUrl=<MONGO URL>
    server=localhost:port // default port: 3001
    frontEndServer=localhost:port

```

## Redux 
The repo use Redux to manage its state. To add new actions you can go `./client/src/redux/actions` And the reducers are here `./client/src/redux/reducers`

**to use the client with your remote server dont forget to update the username and the password to your db in [.env](./server/.env)**

* then:
```sh
cd server/ 
npm install && npm start
cd client/
npm install && npm start
```
Thats it! now your React front end run on `http://localhost:3000`. and your server run on `http://localhost:3001` 

# Known issues
* setting 
`server` inside [.env](./server/.env) to numeric address (i.e 10.0.0.11) will couse the confirmation email not to be sent. make sure to use alphabetical address

# DEMO [here](https://express-react-boilerplate.herokuapp.com/) 
### Its a free heroku server so give it a second to load
email: demo@demo.com;

password: demo;

**Note** You cant signup new users with the demo

**pull requests are welcome (:**



 