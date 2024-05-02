import { Component } from "react";
import Cookies from "js-cookie";
import { Link, Navigate as Redirect, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import './index.css'

class Signup extends Component {
  state = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangeFullName = (event) => {
    this.setState({ fullName: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleCheckboxChange = (gender) => {
    this.setState({ gender });
  };

  onSubmitSuccess = () => {
    this.props.navigate("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  handleInputErrors = (userDetails) => {
    const { fullName, username, password, confirmPassword, gender } =
      userDetails;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      toast.error("Please fill all fields");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password should be atleast 6 characters");
      return false;
    }

    return true;
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { fullName, username, password, confirmPassword, gender } =
      this.state;
    const userDetails = {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    };
    const success = this.handleInputErrors(userDetails);
    if (!success) return;
    try {
      const url = "/api/auth/signup";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (response.ok === true) {
        this.onSubmitSuccess();
      } else {
        this.onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      toast.error(error.message);
    }

    return;
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderConfirmPasswordField = () => {
    const { confirmPassword } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          Confirm PASSWORD
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="password-input-field"
          value={confirmPassword}
          onChange={this.onChangeConfirmPassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderFullName = () => {
    const { fullName } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          FULLNAME
        </label>
        <input
          type="text"
          id="fullName"
          className="username-input-field"
          value={fullName}
          onChange={this.onChangeFullName}
          placeholder="Username"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    );
  };

  genderComponent = () => {
    const { gender } = this.state;

    return (
      <div>
        <div>
          <label className={`${gender === "Male" ? "selected" : ""}`}>
            <span>Male</span>
            <input
              type="checkbox"
              checked={gender === "Male"}
              onChange={() => this.handleCheckboxChange("Male")}
            />
          </label>
        </div>
        <div>
          <label className={`${gender === "Female" ? "selected" : ""}`}>
            <span>Female</span>
            <input
              type="checkbox"
              checked={gender === "Female"}
              onChange={() => this.handleCheckboxChange("Female")}
            />
          </label>
        </div>
      </div>
    );
  };
  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderFullName()}</div>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">
            {this.renderConfirmPasswordField()}
          </div>

          {this.genderComponent()}
          <Link to="/login">Already Have Account?</Link>
          <button type="submit" className="login-button">
            Signup
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export function SignupWithRouter(props) {
  const navigate = useNavigate();
  return <Signup navigate={navigate}></Signup>;
}

export default SignupWithRouter;
