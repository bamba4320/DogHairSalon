class ConstFile {
  constructor() {
    this.serverURL = "https://localhost:44379/api/";
    this.addUserUrl = "User/addUser";
    this.authenticateUser = "User/Authenticate";
    this.changeUsername = "User/ChangeUsername";
    this.changePassword = "User/ChangePassword";
    this.changeName = "User/ChangeName";
    this.validUsername = "User/ValidUsername";
    this.getAllAppointments = "Appointment/GetAllAppointments";
    this.updateAppointment = "Appointment/UpdateAppointment";
    this.cancelAppointment = "Appointment/Cancel";
    this.addAppointment = "Appointment/AddAppointment";
    this.authenticateUserInAppointment = "Appointment/IsAppointmentOfUser";
    this.deleteUser = "User/DeleteUser?Userid=";
    this.getUserById = "User/GetUserById?UserId=";
  }
}

export default ConstFile;
