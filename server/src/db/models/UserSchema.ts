import mongoose, { 
  MongooseDocument, 
  Schema,
  PassportLocalSchema,
  PassportLocalDocument,
  PassportLocalModel,
  model,
  Document,
  Model
 }                                from "mongoose"
import uniqueValidator            from "mongoose-unique-validator"
import passportLocalMongoose      from 'passport-local-mongoose';
import passport = require('passport');


interface IUser extends PassportLocalDocument {
  email:string;
  username:string;
  active:boolean;
  login:boolean;
  dateOfRegistration:Date;
  isTester:boolean;
  password:string;
}

interface IUserModel<T extends PassportLocalDocument> extends PassportLocalModel<T> {

}

const UserSchema:PassportLocalSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  active: {
    type: Boolean
  }, // the user activate his account
  login: {
    type: Boolean
  }, // the user is login or not
  dateOfRegistration: {
    type: Date
  },
  isTester: {
    type: Boolean,
    default: false
  } // is tester account
});

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(passportLocalMongoose, {
  findByUsername: function(model:any, queryParameters:any) {
    // Add additional query parameter - AND condition - active: true
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});




export const User:IUserModel<IUser> = model<IUser>('User', UserSchema);



