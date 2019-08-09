import React from 'react';
import './App.css';
import Main from "./Screens/Main/Main";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "../src/Screens/Home/Home";
import Admin from "../src/Screens/Admin/Admin";
import AskResetPassword from "../src/Screens/Admin/AskResetPassword";
import ResetPassword from "./Screens/Admin/ResetPassword";

const App: React.FC = () => {
  return (
      <div>
      <a
        href="https://github.com/obiwankenoobi/react-express-boilerplate"
        //targer="_blank"
      >
        <img
          style={{ position: "absolute", top: 0, right: 0, border: 0 }}
          src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          alt="Fork me on GitHub"
        />
      </a>

      <div style={{ position: "absolute", top: 3, left: 3, border: 0 }}>
        <div>
          <a
            className="github-button"
            href="https://github.com/obiwankenoobi/react-express-boilerplate"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star obiwankenoobi/react-express-boilerplate on GitHub"
          >
            Star
          </a>
        </div>
        <div>
          <a
            className="github-button"
            href="https://github.com/obiwankenoobi"
            aria-label="Follow @obiwankenoobi on GitHub"
          >
            Follow @obiwankenoobi
          </a>
        </div>
      </div>
      <Router>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route
            exact
            path="/resetpassword/:token/:email"
            component={ResetPassword}
          />
          <Route exact path="/resetpassword" component={AskResetPassword} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
