import cookieParser          from 'cookie-parser';
import express               from 'express';
import { Request, Response } from 'express';
import logger                from 'morgan';
import path                  from 'path';
import BaseRouter            from './routes';
import RateLimit             from "express-rate-limit";
import bodyParser            from "body-parser";
import session               from "express-session";
import cors                  from "cors";

import { MongoClient }       from "mongodb";
import                            "mongodb";

// passport imports
import passport              from "passport";
import LocalStrategyObj      from "passport-local";
import PassportJWT           from "passport-jwt";

import                            "./db/mongoose";
import { User }              from "./db/models/UserSchema";
import auth                  from "./api/auth";


const { Strategy: LocalStrategy } = LocalStrategyObj;
const { Strategy: JwtStrategy   } = PassportJWT;
const { ExtractJwt              } = PassportJWT;
const app = express();
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});


// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(limiter);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(cookieParser(process.env.cookieParserSecret));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.cookieParserSecret || ""
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// passport initialize
passport.use(new LocalStrategy(User.authenticate()));

// method for authorize user,
//it will assume the token is in header under Bearer Auth
passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWTsecret
      },
      (jwtPayload, cb) => {
        //find the user in db if needed
        return User.findOne({
          username: jwtPayload.username
        })
          .then(user => {
            return cb(null, user);
          })
          .catch(err => {
            return cb(err);
          });
      }
    )
  );
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


// use api
app.use('/auth', auth);

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
