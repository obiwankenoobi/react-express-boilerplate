import React, { Component } from "react";
import Swal from "sweetalert2";
import ButtonMU from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../../";
import {
  _login,
  _signup,
  _isSignedup,
  _logout
} from "../../redux/actions/authActions";
import { connect } from "react-redux";

type Props = {
  _signup:Function;
  _login:Function;
  _isSignedup:Function;
  _logout:Function;
  isHaveAccount:boolean;
  token:string;
}

type State = {
  isHaveAccount:boolean;
  password:string;
  email:string;
  username:string;
  token:string;
}

class Admin extends Component<Props, State> {
  state:State;

  constructor(props:Props) {
    super(props);

    this.state = {
      password: "",
      email: "",
      username: "",
      token: "",
      isHaveAccount:false
    };
  }

  handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value; // if this is checkbox the value is thr checked attr , else the value is the value attr
    const name = target.name;

    // updating the state with the target name as key and the value var as value
    this.setState({
      [name]: value
    } as any);
  };

  // removing isHaveAccount flag to show the signup
  moveToSignup = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isHaveAccount: !this.state.isHaveAccount
    });
  };

  signup = () => {
    const { _signup, _isSignedup } = this.props;
    const { password, email } = this.state;
    _signup(email, password);
    console.log(password, email);
  };

  login = () => {
    const { _login } = this.props;
    const { password, email } = this.state;
    _login(email, password);
    console.log(password, email);
  };

  logout = () => {
    const { _logout } = this.props;
    _logout();
  };

  render() {
    const { isHaveAccount, _isSignedup, token } = this.props;

    return (
      <div className="">
        {token ? ( // checking if there is a token
          <div className="admin-signup-section container-signup container">
            <h1> Admin </h1>
            <ButtonMU
              className="btn-signup"
              variant="contained"
              color="primary"
              onClick={this.logout}
            >
              Logout
            </ButtonMU>
            <br />
            {/* <ButtonMU
              className="btn-signup"
              variant="contained"
              color="primary"
              onClick={this.protectedRoute}
            >
              Protected route(:
            </ButtonMU> */}
          </div>
        ) : (
          <div className="admin-signup-section container-signup container">
            {isHaveAccount ? ( // checking if the user have account and render the login or signup based on that
              <div>
                <h3> Login </h3>
                <div>
                  <input
                    className="admin-form"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.email}
                    name="email"
                    type="text"
                    placeholder="email"
                  />
                  <input
                    className="admin-form"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                  <br />
                  <ButtonMU
                    className="btn-signup"
                    variant="contained"
                    color="primary"
                    onClick={this.login}
                  >
                    Login
                  </ButtonMU>
                  <ButtonMU
                    className="btn-signup"
                    variant="contained"
                    color="primary"
                    onClick={() => _isSignedup()}
                  >
                    I dont have account
                  </ButtonMU>
                  <br />
                  <Link
                    style={{
                      textDecoration: "none"
                    }}
                    to={{
                      pathname: "/resetpassword"
                    }}
                  >
                    <ButtonMU
                      className="btn-signup"
                      variant="outlined"
                      color="primary"
                    >
                      forgot password ?
                    </ButtonMU>
                  </Link>
                  {/* <ButtonMU
                    className="btn-signup"
                    variant="contained"
                    color="primary"
                    onClick={this.protectedRoute}
                  >
                    Protected route(:
                  </ButtonMU> */}
                </div>
              </div>
            ) : (
              <div>
                <h3> Signup </h3>
                <div>
                  <input
                    className="admin-form"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.email}
                    name="email"
                    type="text"
                    placeholder="email"
                  />
                  <input
                    className="admin-form"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                  <br />
                  <ButtonMU
                    className="btn-signup"
                    variant="contained"
                    color="primary"
                    onClick={this.signup}
                  >
                    Signup
                  </ButtonMU>
                  <ButtonMU
                    className="btn-signup"
                    variant="contained"
                    color="primary"
                    onClick={() => _isSignedup()}
                  >
                    I have account
                  </ButtonMU>
                  <br />
                  <Link
                    style={{
                      textDecoration: "none"
                    }}
                    to={{
                      pathname: "/"
                    }}
                  >
                    <ButtonMU
                      className="btn-signup"
                      variant="outlined"
                      color="primary"
                    >
                      Home
                    </ButtonMU>
                  </Link>
                  {/* <ButtonMU
                    className="btn-signup"
                    variant="contained"
                    color="primary"
                    onClick={this.protectedRoute}
                  >
                    Protected route(:
                  </ButtonMU> */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state:any) => ({
  isHaveAccount:state.auth.isHaveAccount,
  token:state.auth.token
});
const mapDispatchToProps = { _login, _signup, _isSignedup, _logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
