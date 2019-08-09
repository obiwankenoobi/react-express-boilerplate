import { MongoClient, MongoError } from "mongodb";
import mongoose from "mongoose";

// checking for enviroment var for the mongo server and connect to it if there is one
// if there isnt connect to localhost
if (process.env.mongoUrl) {
  mongoose
    .connect(process.env.mongoUrl, {
      auth: {
        user: process.env.mongoUsername || "",
        password: process.env.mongoPw || ""
      }
    })
    .then(() => console.log("connection successful"))
    .catch((err:MongoError) => console.error(err));
} else {
  const url = "mongodb://localhost:27017/db";
  mongoose.connect(
    url, { useNewUrlParser: true },
    () => console.log("connected to mongo")
  );
}

//@@@@@@@@@@@@@ if you use local host @@@@@@@@@@@@@@@@@
// var url = "mongodb://localhost:27017/db";
// mongoose.connect(url, { useNewUrlParser: true }, console.log('connected to mongo'));
//@@@@@@@@@@@@@ if you use local host @@@@@@@@@@@@@@@@@

//@@@@@@@@@@@@@ if you dont use local host @@@@@@@@@@@@@@@@@
// mongoose.connect(process.env.mongoUrl, {
//     auth: {
//       user: process.env.mongoUsername,
//       password: process.env.mongoPw
//     }
//   })
//   .then(() => console.log('connection successful'))
//   .catch((err) => console.error(err));
//@@@@@@@@@@@@@ if you dont use local host @@@@@@@@@@@@@@@@@

mongoose.Promise = global.Promise;

module.exports = {
  mongoose
};
