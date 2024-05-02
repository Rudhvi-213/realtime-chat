import { Component } from "react";
import Cookies from "js-cookie";
import { Link, Navigate as Redirect, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import './index.css

class Login extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = () => {
    this.props.navigate("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  handleInputErrors = (userDetails) => {
    const { username, password } = userDetails;
    if (!username || !password) {
      toast.error("Please fill all fields");
      return false;
    }

    return true;
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const userDetails = { username, password };
    const success = this.handleInputErrors(userDetails);
    if (!success) return;

    try {
      const url = "/api/auth/login";
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
      console.log(data);

      if (response.ok === true) {
        this.onSubmitSuccess();
      } else {
        console.log("79");
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
      console.log("Working");
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>

          <Link to="/signup">Create an Account</Link>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export function LoginWithRouter(props) {
  const navigate = useNavigate();
  return <Login navigate={navigate}></Login>;
}

export default LoginWithRouter;

// import { Component } from "react";
// import Cookies from "js-cookie";
// import { Link, useNavigate } from "react-router-dom";
// import { Navigate as Redirect } from "react-router-dom";
// import toast from "react-hot-toast";

// // import "./index.css";

// class LoginForm extends Component {
//   state = {
//     username: "",
//     password: "",
//     showSubmitError: false,
//     errorMsg: "",
//   };

//   onChangeUsername = (event) => {
//     this.setState({ username: event.target.value });
//   };

//   onChangePassword = (event) => {
//     this.setState({ password: event.target.value });
//   };

//   onSubmitSuccess = () => {
//     const navigate = useNavigate();
//     navigate("/");
//     // <Redirect to="/" />;
//   };

//   onSubmitFailure = (errorMsg) => {
//     this.setState({ showSubmitError: true, errorMsg });
//   };

//   handleInputErrors = (userDetails) => {
//     const { username, password } = userDetails;
//     if (!username || !password) {
//       toast.error("Please fill all fields");
//       return false;
//     }

//     return true;
//   };

//   submitForm = async (event) => {
//     // const navigate = useNavigate();
//     event.preventDefault();
//     const { username, password } = this.state;

//     const userDetails = { username, password };
//     const success = this.handleInputErrors(userDetails);
//     if (!success) return;
//     try {
//       const url = "/api/auth/login";
//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userDetails),
//       };
//       const response = await fetch(url, options);
//       console.log(response);
//       const data = await response.json();

//       if (data.error) {
//         console.log(data.error);
//         throw new Error(data.error);
//       }

//       console.log(data);

//       if (response.ok === true) {
//         console.log("71");
//         // navigate("/");
//         this.onSubmitSuccess();
//       } else {
//         this.onSubmitFailure(data.error_msg);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   renderPasswordField = () => {
//     const { password } = this.state;

//     return (
//       <>
//         <label className="input-label" htmlFor="password">
//           PASSWORD
//         </label>
//         <input
//           type="password"
//           id="password"
//           className="password-input-field"
//           value={password}
//           onChange={this.onChangePassword}
//           placeholder="Password"
//         />
//       </>
//     );
//   };

//   renderUsernameField = () => {
//     const { username } = this.state;

//     return (
//       <>
//         <label className="input-label" htmlFor="username">
//           USERNAME
//         </label>
//         <input
//           type="text"
//           id="username"
//           className="username-input-field"
//           value={username}
//           onChange={this.onChangeUsername}
//           placeholder="Username"
//         />
//       </>
//     );
//   };

//   render() {
//     const { showSubmitError, errorMsg } = this.state;
//     const jwtToken = Cookies.get("jwt_token");

//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />;
//     }

//     return (
//       <div className="login-form-container">
//         <form className="form-container" onSubmit={this.submitForm}>
//           <div className="input-container">{this.renderUsernameField()}</div>
//           <div className="input-container">{this.renderPasswordField()}</div>
//           <Link to="/signup">Don't Have Account</Link>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//           {showSubmitError && <p className="error-message">*{errorMsg}</p>}
//         </form>
//       </div>
//     );
//   }
// }

// export default LoginForm;
