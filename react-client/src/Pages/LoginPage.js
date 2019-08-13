import React, { Component } from "react";
import ConstFile from "../ConstFile";
import "../cssFiles/LoginPage.css";
import App from "../App";
//class to login page component
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.isLogedIn = false;
    this.urls = new ConstFile();
    this.UserId = 0;
    this.state = { UserUserName: "", UserPassword: "" };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.onAuthenticateSuccess = this.onAuthenticateSuccess.bind(this);
  }

  //render function - what will be shown on browser
  render() {
    if (!this.isLogedIn) {
      return (
        <div>
          <form className="Login">
            <div className="LoginInputArea">
              <div>
                <h2>Loggin in</h2>
              </div>
              <div id="usernameInput">
                <label id="UILable" htmlFor="username">
                  Username:{" "}
                </label>
                <input
                  name="username"
                  id="UIinput"
                  type="text"
                  value={this.state.UserUserName}
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div id="passwordInput">
                <label id="UPLable" htmlFor="password">
                  Password:{" "}
                </label>
                <input
                  id="UPinput"
                  name="password"
                  type="password"
                  value={this.state.UserPassword}
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>
            <div id="SubmitArea">
              <button id="SubBtn" type="button" onClick={this.authenticate}>
                Login
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return <App />;
    }
  }

  //event handlers - what occured when input changes
  handleUsernameChange(event) {
    this.setState({ UserUserName: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ UserPassword: event.target.value });
  }
  //event handler - what occured when button is clicked
  authenticate() {
    //data to send
    const body = JSON.stringify(this.state);
    console.log(body);
    let url = this.urls.serverURL + this.urls.authenticateUser;
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "https://localhost:44379",
        "Content-Type": "application/json"
      }),
      body: body
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(res => {
            this.onAuthenticateSuccess(res);
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onAuthenticateSuccess(resBody) {
    //set the server to return also User / User Id for data
    console.log(resBody);
    if (resBody.authenticationChecked === true) {
      this.props.updateApp(resBody.obj);
      console.log("success");
    } else {
      //post error
      alert(
        "Username or password are incorrect\nIf you aren't signed up, please do."
      );
      console.log("invalid");
    }
  }
}
export default LoginPage;
