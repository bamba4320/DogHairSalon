import React, { Component } from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AppointmentShow from "./Pages/AppointmentShow";
import EditProfilePage from "./Pages/EditProfile";
import EditAppointments from "./Pages/EditAppointments";
import AddAppointment from "./Pages/AddAppointment";
class App extends Component {
  constructor(props) {
    super(props);
    this.onLoggingin = this.onLoggingin.bind(this);
    this.state = {
      isLogedIn: false,
      user: {
        userId: 0,
        userUserName: "",
        userPassword: "",
        userName: ""
      },
      content: <LoginPage updateApp={this.onLoggingin} />
    };
    this.showAppointments = this.showAppointments.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showProfileEdit = this.showProfileEdit.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.onLogoff = this.onLogoff.bind(this);
    this.onEditAppointment = this.onEditAppointment.bind(this);
    this.onAddAppointment = this.onAddAppointment.bind(this);
    this.afterSignUp = this.afterSignUp.bind(this);
    this.afterProfileUpdate = this.afterProfileUpdate.bind(this);
    this.reopenAppointments = this.reopenAppointments.bind(this);
    this.afterDelete = this.afterDelete.bind(this);
  }
  render() {
    if (this.state.isLogedIn) {
      return (
        <div className="App">
          <div className="NavBar">
            <div>
              <h1>Pet Hair Salon</h1>
            </div>
            <ul>
              <li>
                <button className="NavButton" onClick={this.showAppointments}>
                  Appointments
                </button>
              </li>
              <li>
                <button className="NavButton" onClick={this.showProfileEdit}>
                  Edit Profile
                </button>
              </li>
              <li>
                <button className="NavButton" onClick={this.onLogoff}>
                  Log Off
                </button>
              </li>
              <li>
                <h3>Hello, {this.state.user.userName}</h3>
              </li>
            </ul>
          </div>
          <div className="Content">{this.state.content}</div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container">
            <div className="NavBar">
              <div>
                <h1>Pet Hair Salon</h1>
              </div>
              <ul>
                <li>
                  <button className="NavButton" onClick={this.showLogin}>
                    Login
                  </button>
                </li>
                <li>
                  <button className="NavButton" onClick={this.showSignup}>
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>
            <div className="Content">{this.state.content}</div>
          </div>
        </div>
      );
    }
  }

  afterProfileUpdate(user) {
    this.setState({ user: user });
    this.showAppointments();
  }

  showAppointments() {
    let x = (
      <AppointmentShow
        clientId={this.state.user.userId}
        editapp={this.onEditAppointment}
        addapp={this.onAddAppointment}
        rerender={this.reopenAppointments}
      />
    );
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    sleep(200).then(() => {
      this.setState({
        content: x
      });
    });
  }

  reopenAppointments() {
    this.showAppointments();
  }

  showLogin() {
    this.setState({ content: <LoginPage updateApp={this.onLoggingin} /> });
  }
  showSignup() {
    this.setState({ content: <SignUpPage updateApp={this.afterSignUp} /> });
  }

  afterDelete() {
    this.setState({ isLogedIn: false });
    this.showLogin();
  }

  afterSignUp(loggegUser) {
    let prop = { ...this.state.user };
    prop = loggegUser;
    console.log(prop);
    this.setState({ User: prop });
    console.log(this.state.user);
    this.showLogin();
  }

  showProfileEdit() {
    this.setState({ isLogedIn: true });
    let x = (
      <EditProfilePage
        clientId={this.state.user.userId}
        user={this.state.user}
        done={this.afterProfileUpdate}
        afterdelete={this.afterDelete}
      />
    );
    this.setState({
      content: x
    });
  }

  onLoggingin(loggegUser) {
    this.setState({ isLogedIn: true });
    this.setState({ user: loggegUser });
    console.log(this.state.user);
    this.showAppointments();
  }

  onLogoff() {
    this.setState({ isLogedIn: false });
    this.showLogin();
  }

  onEditAppointment(app) {
    let x = (
      <EditAppointments
        clientId={this.state.user.userId}
        appToEdit={app}
        done={this.reopenAppointments}
      />
    );
    this.setState({
      content: x
    });
  }

  onAddAppointment(review) {
    let x = (
      <AddAppointment
        clientId={this.state.user.userId}
        done={this.showAppointments}
        user={this.state.user}
        review={review}
      />
    );
    this.setState({ content: x });
  }
}

export default App;
