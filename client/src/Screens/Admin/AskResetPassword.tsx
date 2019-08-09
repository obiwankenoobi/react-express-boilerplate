import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonMU from "@material-ui/core/Button";
import config from "../../config";
import "../../css/Main.css";
import { connect } from "react-redux";

import { _askResetPassword } from "../../redux/actions/authActions";

const Style = {
  container: {
    width: "80%",
    flex: 1,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto"
  }
};

type Props = {
  _askResetPassword:Function;
}

type State = {
  email:string;
  [key:string]:string;
}


class AskResetPassword extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  // get query params - this.props.match.params.redirectParam

  handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //e.preventDefault()

    const target = e.target;
    const value = target.value;
    const name = target.name;
    // updating the state with the target name as key and the value var as value
    this.setState(
      { [name]: value } as any , () => {
        if (config.__DEGUGGING__) {
          console.log(this.state[name]);
        }
      });
  };

  render() {
    const { _askResetPassword } = this.props;
    return (
      <div className="admin-signup-section container-signup container">
        <h3 className="forgot-pass">enter email</h3>
        <div>
          <input
            className="admin-form"
            onChange={e => this.handleInputChange(e)}
            value={this.state.email}
            name="email"
            type="text"
            placeholder="email"
          />
          <br />
          <ButtonMU
            variant="contained"
            color="primary"
            onClick={() => _askResetPassword()}
          >
            reset
          </ButtonMU>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: {} }) => ({});
const mapDispatchToProps = { _askResetPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AskResetPassword);
