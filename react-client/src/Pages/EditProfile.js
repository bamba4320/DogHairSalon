import React, { Component } from "react";
import ConstFile from "../ConstFile";
import "../cssFiles/EditProfile.css";
class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.urls = new ConstFile();
    this.state = {
      clientId: this.props.clientId,
      user: this.props.user
    };
    this.oldUsername = this.props.user.userUserName;
    this.oldPassword = this.props.user.userPassword;
    this.oldName = this.props.user.userName;
    this.handlerUserNameChange = this.handlerUserNameChange.bind(this);
    this.handlerPasswordChange = this.handlerPasswordChange.bind(this);
    this.handlerNameChange = this.handlerNameChange.bind(this);
    this.onApplyUNClick = this.onApplyUNClick.bind(this);
    this.onApplyUPClick = this.onApplyUPClick.bind(this);
    this.onApplyNClick = this.onApplyNClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onBackClicked = this.onBackClicked.bind(this);
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="Control">
        <div>
          <h2>Edit Profile</h2>
        </div>
        <form className="ProfileEditForm">
          <div className="InputDiv" id="EUN">
            <lable className="InputLable" htmlFor="unInput">
              UserName:
            </lable>
            <br />
            <input
              name="unInput"
              type="text"
              value={this.state.user.userUserName}
              onChange={this.handlerUserNameChange}
            />
            <button type="button" onClick={this.onApplyUNClick}>
              Apply
            </button>
          </div>
          <div className="InputDiv" id="EUP">
            <lable className="InputLable" htmlFor="upInput">
              Password:
            </lable>
            <br />
            <input
              name="upInput"
              type="password"
              value={this.state.user.userPassword}
              onChange={this.handlerPasswordChange}
            />
            <button type="button" onClick={this.onApplyUPClick}>
              Apply
            </button>
          </div>
          <div className="InputDiv" id="EN">
            <lable className="InputLable" htmlFor="nInput">
              Name:
            </lable>
            <br />
            <input
              name="nInput"
              type="text"
              value={this.state.user.userName}
              onChange={this.handlerNameChange}
            />
            <button type="button" onClick={this.onApplyNClick}>
              Apply
            </button>
          </div>
        </form>
        <div className="ButtonsCntl">
          <div id="deleteDiv">
            <button type="button" onClick={this.onDeleteClick}>
              Delete User
            </button>
          </div>
          <div id="backDiv">
            <button type="button" onClick={this.onBackClicked}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  onDeleteClick() {
    let url =
      this.urls.serverURL + this.urls.deleteUser + this.state.user.userId;
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Access-Control-Allow-Origin": "https://localhost:44379",
        "Content-Type": "application/json"
      }),
      body: {}
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(res => {
            if (!res.resultValue) {
              alert("something went wrong");
            } else {
              alert("User Deleted");
            }
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.props.afterdelete();
  }

  onBackClicked() {
    console.log(this.state.user.userUserName);
    let prop = {
      userId: this.state.user.userId,
      userUserName: this.oldUserName,
      userPassword: this.oldPassword,
      userName: this.oldName
    };
    this.setState({ user: prop });
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    sleep(200).then(() => {
      this.props.done(this.state.user);
    });
  }

  handlerUserNameChange(event) {
    let prop = { ...this.state.user };
    prop.userUserName = event.target.value;
    this.setState({ user: prop });
  }
  handlerPasswordChange(event) {
    let prop = { ...this.state.user };
    prop.userPassword = event.target.value;
    this.setState({ user: prop });
  }
  handlerNameChange(event) {
    let prop = { ...this.state.user };
    prop.userName = event.target.value;
    this.setState({ user: prop });
  }

  onApplyUNClick() {
    var user = {
      UserId: this.state.user.userId,
      OldUserName: this.oldUsername,
      NewUserName: this.state.user.userUserName
    };
    console.log(user);
    const body = JSON.stringify(user);
    console.log(body);
    let url = this.urls.serverURL + this.urls.changeUsername;
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
            if (!res.resultValue) {
              alert("something went wrong");
            }
            this.OldUserName = this.NewUserName;
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.props.done(this.state.user);
  }
  onApplyUPClick() {
    var user = {
      UserId: this.state.user.userId,
      OldPassword: this.oldPassword,
      NewPassword: this.state.user.userPassword
    };
    console.log(user);
    const body = JSON.stringify(user);
    console.log(body);
    let url = this.urls.serverURL + this.urls.changePassword;
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
            if (!res.resultValue) {
              alert("something went wrong");
            }
            this.oldPassword = this.NewPassword;
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.props.done(this.state.user);
  }
  onApplyNClick() {
    var user = {
      UserId: this.state.user.userId,
      OldName: this.oldName,
      NewName: this.state.user.userName
    };
    console.log(user);
    const body = JSON.stringify(user);
    console.log(body);
    let url = this.urls.serverURL + this.urls.changeName;
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
            if (!res.resultValue) {
              alert("something went wrong");
            }
            this.oldName = this.NewName;
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.props.done(this.state.user);
  }
}
export default EditProfilePage;
