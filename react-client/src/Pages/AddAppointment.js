import React, { Component } from "react";
import DatePickerInput from "react-day-picker/DayPickerInput";
import ConstFile from "../ConstFile";
import "react-day-picker/lib/style.css";
import "../cssFiles/EditAddAppointment.css";
class AddAppointmentPage extends Component {
  constructor(props) {
    super(props);
    this.urls = new ConstFile();
    this.state = {
      LogedInUserId: this.props.clientId,
      Appointment: {
        user: this.props.user,
        appointmentId: 0,
        time: ""
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.SendNewAppointment = this.SendNewAppointment.bind(this);
    this.handelTimeChange = this.handelTimeChange.bind(this);
    this.onBackClicked = this.onBackClicked.bind(this);
  }

  //change all input to multichoice
  render() {
    return (
      <div>
        <form className="MainForm">
          <div>
            <h2>Add Appointment</h2>
          </div>
          <div className="DataDiv" id="username">
            <label id="username_lable">
              UserName: {this.state.Appointment.user.userName}
            </label>
          </div>
          <div className="DataDiv" id="date">
            <label id="time" onChange={this.handleDateChange}>
              Pick Date:{" "}
            </label>
            <DatePickerInput
              disabledDays={{ daysOfWeek: [6] }}
              onDayChange={day => this.handleDateChange(day)}
              selectedDay={this.state.selectedDay}
            />
          </div>
          <div className="DataDiv" id="time">
            <label id="time">Time:</label>
            <input
              id="timeInput"
              type="time"
              onChange={this.handelTimeChange}
            />
          </div>
          <div id="apply">
            <button type="button" id="DNTbtn" onClick={this.SendNewAppointment}>
              Apply on TimeAndDate
            </button>
          </div>
          <div id="back">
            <button type="button" onClick={this.onBackClicked}>
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleDateChange(day) {
    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    month = month <= 9 ? "0" + month.toString() : month.toString();
    let daydate = day.getDate();
    daydate = daydate <= 9 ? "0" + daydate.toString() : daydate.toString();
    let date = year + "-" + month + "-" + daydate;
    let prop = { ...this.state.Appointment };
    let datetime = this.state.Appointment.time.split("T");
    prop.time = date + "T" + datetime[1];
    this.setState({ Appointment: prop });
  }

  handelTimeChange() {
    let x = document.getElementById("timeInput").value;
    let datetime = this.state.Appointment.time.split("T");
    datetime = datetime[0] + "T" + x + ":00";
    let prop = { ...this.state.Appointment };
    prop.time = datetime;
    this.setState({ Appointment: prop });
  }

  //check validy with regex
  SendNewAppointment() {
    let prop = { ...this.state.Appointment };
    prop.time = prop.time.split("T").join(" ");
    this.setState({ Appointment: prop });
    const body = JSON.stringify(this.state.Appointment);
    let url = this.urls.serverURL + this.urls.addAppointment;
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
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        alert(err);
      });
    this.props.review();
    this.props.done();
  }
  onBackClicked() {
    this.props.done();
  }
}
export default AddAppointmentPage;
