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
      Appointment: this.props.appToEdit
    };
    this.onBackClicked = this.onBackClicked.bind(this);
    this.oldDateTime = this.state.Appointment.time.split("T");
    this.handleDateChange = this.handleDateChange.bind(this);
    this.SendEditAppointment = this.SendEditAppointment.bind(this);
    this.handelTimeChange = this.handelTimeChange.bind(this);
  }

  //change all input to multichoice
  render() {
    return (
      <div>
        <form className="MainForm">
          <div>
            <h2>Editting Appointment</h2>
          </div>
          <div className="DataDiv" id="username">
            <label id="username_lable">
              UserName: {this.state.Appointment.user.userName}
            </label>
          </div>
          <div className="DataDiv" id="olddate">
            <label>
              Old date and Time:{" "}
              {this.oldDateTime[0] + " " + this.oldDateTime[1]}
            </label>
          </div>
          <div className="DataDiv" id="date">
            <label id="time" onChange={this.handleDateChange}>
              Pick Date:{" "}
            </label>
            <DatePickerInput
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
            <button
              type="button"
              id="DNTbtn"
              onClick={this.SendEditAppointment}
            >
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
  SendEditAppointment() {
    let prop = { ...this.state.Appointment };
    console.log(prop.time);
    let temp = prop.time.split("T");
    prop.time = temp[0] + " " + temp[1];

    this.setState({ Appointment: prop });
    console.log(this.state.Appointment);
    let bodyToJson = {
      AppointmentId: this.state.Appointment.appointmentId,
      oldDateTime: this.oldDateTime[0] + " " + this.oldDateTime[1],
      newDateTime: this.state.Appointment.time
    };
    console.log(bodyToJson);
    const body = JSON.stringify(bodyToJson);
    console.log(body);
    let url = this.urls.serverURL + this.urls.updateAppointment;
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
            alert("Appointment has Updated");
          });
        } else {
          /*handel falier*/
          alert("oops....\nsomething went wrong\nTry again please");
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
    this.props.done();
  }
  onBackClicked() {
    this.props.done();
  }
}
export default AddAppointmentPage;
