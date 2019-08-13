import React, { Component } from "react";
import ConstFile from "../ConstFile";
import "../cssFiles/SignUpPage.css";
//class of signup page
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.urls = new ConstFile();
    this.state = {
      User: {
        UserUsername: "",
        UserPassword: "",
        UserName: ""
      },
      valid: false,
      usernameValid: false
    };
    this.DoubleCheckPassword = "";
    this.checkUsernameValidity = this.checkUsernameValidity.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handelDoubleCheck = this.handelDoubleCheck.bind(this);
    this.onSubBtnClick = this.onSubBtnClick.bind(this);
  }
  // render function - what will be shown on browser
  render() {
    return (
      <div>
        <div>
          <h2>Signing Up</h2>
        </div>
        <div id="UUN" className="InputArea">
          <label id="UUNLable" htmlFor="newUserUsername">
            Username:
          </label>
          <input
            id="UUNInput"
            name="newUserUsername"
            type="text"
            value={this.state.User.UserUsername}
            onChange={this.handleUsername}
          />
        </div>
        <div id="UP" className="InputArea">
          <label id="UPLable" htmlFor="newUserPassword">
            New Password:
          </label>
          <input
            id="UPInput"
            name="newUserPassword"
            type="Password"
            value={this.state.User.UserPassword}
            onChange={this.handlePassword}
          />
        </div>
        <div id="UDP" className="InputArea">
          <label id="UDPLable" htmlFor="newUserDoublePassword">
            Confirm Password:
          </label>
          <input
            id="UDPInput"
            name="newUserDoublePassword"
            type="Password"
            value={this.DoubleCheckPassword}
            onChange={this.handelDoubleCheck}
          />
        </div>
        <div id="UN" className="InputArea">
          <label id="UNLable" htmlFor="newName">
            Name:
          </label>
          <input
            id="UNInput"
            name="newName"
            type="text"
            value={this.state.User.UserName}
            onChange={this.handleName}
          />
        </div>
        <div id="SubBtnArea">
          <button id="SubBtn" type="button" onClick={this.onSubBtnClick}>
            Submit
          </button>
        </div>
      </div>
    );
  }

  //event handlers - what will happen when input changes (update properties values)
  handleUsername(event) {
    var prop = { ...this.state.User };
    prop.UserUsername = event.target.value;
    this.setState({ User: prop });
  }

  handlePassword(event) {
    var prop = { ...this.state.User };
    prop.UserPassword = event.target.value;
    this.setState({ User: prop });
  }

  handleName(event) {
    var prop = { ...this.state.User };
    prop.UserName = event.target.value;
    this.setState({ User: prop });
  }

  //handel double password check
  handelDoubleCheck(event) {
    this.DoubleCheckPassword = event.target.value;
    this.setState({ valid: true });
    if (this.state.User.UserPassword === this.DoubleCheckPassword) {
      this.setState({ valid: false });
    }
  }

  //return if user is valid
  isValid = () => {
    return this.state.valid;
  };

  //check username with the database
  checkUsernameValidity() {
    let url = this.urls.serverURL + this.urls.validUsername;
    var prop = { ...this.state.User };
    const body = JSON.stringify(prop);
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "https://localhost:44379",
        "Content-Type": "application/json"
      }),
      body: body
    })
      .then(res => {
        res
          .json()
          .then(res => this.setState({ usernameValid: res.resultValue }));
        if (res.status === 200) {
        } else {
          alert("something went wrong...");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handle submit button click
  onSubBtnClick() {
    this.checkUsernameValidity();
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    sleep(200).then(() => {
      if (
        this.state.usernameValid &&
        this.state.User.UserPassword === this.DoubleCheckPassword
      ) {
        var prop = { ...this.state.User };
        const body = JSON.stringify(prop);
        console.log(body);
        let url = this.urls.serverURL + this.urls.addUserUrl;
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
            res.json().then(res => console.log(res));
            if (res.status === 200) {
              console.log(res.body);
            } else {
              /*handel falier*/
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log(this.state.usernameValid);
        if (!this.state.usernameValid) {
          alert("User name is taken");
        } else {
          alert("Passwords not match");
          prop = { ...this.state.User };
          prop.UserPassword = "";
          this.setState({ User: prop });
          this.DoubleCheckPassword = "";
        }
      }
    });
    sleep(200).then(() => {
      this.props.updateApp(this.state.User);
    });
  }
}
export default SignUpPage;
