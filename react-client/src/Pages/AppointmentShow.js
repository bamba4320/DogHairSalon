import React, { Component } from "react";
import ConstFile from "../ConstFile";
import "../cssFiles/AppointmentShow.css";
class AppointmentsShow extends Component {
  constructor(props) {
    super(props);
    this.urls = new ConstFile();
    this.state = {
      LogedInUserId: this.props.clientId,
      AppointmentsLst: []
    };
    this.authenticateUserAppointment = this.authenticateUserAppointment.bind(
      this
    );
    this.getAppointments = this.getAppointments.bind(this);
    this.onAppointmentClick = this.onAppointmentClick.bind(this);
    this.count = 0;
    this.authnticationResult = false;
    this.onAddClick = this.onAddClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  //function to get json string of all appointments from server
  getAppointments() {
    let url = this.urls.serverURL + this.urls.getAllAppointments;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "https://localhost:44379"
      })
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(res => {
            this.setState({ AppointmentsLst: res });
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

  render() {
    if (this.count === 0) {
      this.getAppointments();
      this.count++;
    }
    var lst = [];
    this.state.AppointmentsLst.forEach(app => {
      lst.push(
        <tr key={app.appointmentId}>
          <td>{app.user.userName}</td>
          <td colSpan="2">
            {app.time.split("T")[0] + " " + app.time.split("T")[1]}
          </td>
          <td>
            {" "}
            <button type="button" onClick={() => this.onAppointmentClick(app)}>
              Edit
            </button>
          </td>
          <td>
            <button type="button" onClick={() => this.onCancel(app)}>
              Cancel
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <div id="head">
          <h2>Appointment show</h2>
        </div>
        <div className="table_show">
          <table id="appointments_table">
            <thead>
              <tr>
                <th>User name</th>
                <th colSpan="2">Appointment Time</th>
                <th colSpan="2" />
              </tr>
            </thead>
            <tbody>{lst}</tbody>
          </table>
          <button type="button" onClick={this.onAddClick}>
            Add appointment
          </button>
        </div>
      </div>
    );
  }

  onAppointmentClick(app) {
    this.authnticationResult = false;
    this.authenticateUserAppointment(app);
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    sleep(200).then(() => {
      if (this.authnticationResult) {
        console.log("rediracting");
        this.props.editapp(app);
      } else {
        console.log("nop.");
      }
    });
  }

  onCancel(app) {
    this.authnticationResult = false;
    this.authenticateUserAppointment(app);
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    sleep(200).then(() => {
      console.log(this.authnticationResult);
      if (this.authnticationResult) {
        if (
          window.confirm("Are you sure you want \nto cancel that appointment")
        ) {
          let url = this.urls.serverURL + this.urls.cancelAppointment;
          console.log(url);
          let temp = { AppointmentId: app.appointmentId };
          const body = JSON.stringify(temp);
          console.log(body);
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
                  if (res.resultValue === true) {
                    this.getAppointments();
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
        }
      } else {
        console.log("nop.");
      }
    });
  }

  authenticateUserAppointment(app) {
    let url = this.urls.serverURL + this.urls.authenticateUserInAppointment;
    let temp = { UID: this.state.LogedInUserId, AID: app.appointmentId };
    const body = JSON.stringify(temp);
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
            this.authnticationResult = res.resultValue;
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

  onAddClick() {
    this.props.addapp(this.getAppointments);
  }
}
export default AppointmentsShow;
